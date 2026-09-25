#!/usr/bin/env node
// tools/dataforseo/run.mjs
//
// Zero-dependency DataForSEO reporting script for Chris & Co. Mobile Detailing.
// Four subcommands: volumes, maps, domains, gbp (or "all" to run every one).
//
// Usage:
//   node tools/dataforseo/run.mjs <volumes|maps|domains|gbp|all> [--dry-run] [--out <dir>]
//
// Credentials: DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD, read from the environment
// first and falling back to a simple parse of the repo's .env file. Credential
// VALUES are never printed, logged, or written to any file this script creates.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// tools/dataforseo -> repo root
const REPO_ROOT = path.resolve(__dirname, '..', '..');
const ENV_PATH = path.join(REPO_ROOT, '.env');
const KEYWORDS_PATH = path.join(__dirname, 'keywords.json');
const DEFAULT_OUT_DIR = path.join(__dirname, 'reports');

const API_BASE = 'https://api.dataforseo.com';
const LOCATION_CODE = 2554; // New Zealand
const LANGUAGE_CODE = 'en';

const MAPS_COORDINATES = [
  { name: 'Orewa', coordinate: '-36.5859,174.6935,14z' },
  { name: 'Albany', coordinate: '-36.7280,174.7000,14z' },
  { name: 'Warkworth', coordinate: '-36.4000,174.6600,14z' },
];

const MAPS_KEYWORDS = ['mobile car detailing', 'car detailing', 'mobile car wash'];

const COMPETITOR_DOMAINS = [
  'mobilehand.co.nz',
  'selectvalet.co.nz',
  'acedetailers.co.nz',
  'royalfinishco.com',
  'precisiondetailing.co.nz',
  'nzautodetailing.com',
];

const TARGET_BUSINESS_NAME = 'Chris & Co. Mobile Detailing';

// ---------------------------------------------------------------------------
// .env parsing / credentials
// ---------------------------------------------------------------------------

function parseEnvFile(filePath) {
  const result = {};
  if (!existsSync(filePath)) return result;
  const content = readFileSync(filePath, 'utf8');
  for (const rawLine of content.split('\n')) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const eqIndex = line.indexOf('=');
    if (eqIndex === -1) continue;
    const key = line.slice(0, eqIndex).trim();
    let value = line.slice(eqIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"') && value.length >= 2) ||
      (value.startsWith("'") && value.endsWith("'") && value.length >= 2)
    ) {
      value = value.slice(1, -1);
    }
    result[key] = value;
  }
  return result;
}

function getCredentials() {
  let login = process.env.DATAFORSEO_LOGIN;
  let password = process.env.DATAFORSEO_PASSWORD;

  if (!login || !password) {
    const envFile = parseEnvFile(ENV_PATH);
    login = login || envFile.DATAFORSEO_LOGIN;
    password = password || envFile.DATAFORSEO_PASSWORD;
  }

  if (!login || !password) {
    console.error(
      [
        'Missing DataForSEO credentials.',
        '',
        'Set both DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD as environment variables,',
        `or add them as KEY=value lines in ${ENV_PATH}.`,
        '',
        'Neither variable was found in the environment or in .env.',
      ].join('\n')
    );
    process.exit(1);
  }

  return { login, password };
}

// ---------------------------------------------------------------------------
// HTTP helpers
// ---------------------------------------------------------------------------

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function redactedAuthHeader() {
  return 'Basic <redacted>';
}

/**
 * POST an array-of-tasks body to a DataForSEO /live endpoint, with retry on
 * 429/5xx (2 retries, exponential backoff).
 */
async function postLive(endpointPath, tasks, credentials) {
  // Trial accounts accept one task per request ("You can set only one task at a time").
  // Send tasks one by one and merge the task arrays back into a single response shape.
  if (Array.isArray(tasks) && tasks.length > 1) {
    const merged = { tasks: [], cost: 0, tasks_count: 0, tasks_error: 0 };
    for (const task of tasks) {
      const one = await postLiveSingle(endpointPath, [task], credentials);
      merged.tasks.push(...(one.tasks || []));
      merged.cost += Number(one.cost || 0);
      merged.tasks_count += Number(one.tasks_count || 0);
      merged.tasks_error += Number(one.tasks_error || 0);
      merged.status_code = one.status_code; merged.status_message = one.status_message; merged.version = one.version;
      await new Promise((r) => setTimeout(r, 250));
    }
    return merged;
  }
  return postLiveSingle(endpointPath, tasks, credentials);
}

async function postLiveSingle(endpointPath, tasks, credentials) {
  const url = `${API_BASE}${endpointPath}`;
  const auth = Buffer.from(`${credentials.login}:${credentials.password}`).toString('base64');
  const body = JSON.stringify(tasks);

  const maxRetries = 2;
  let attempt = 0;
  let lastError;

  while (attempt <= maxRetries) {
    let response;
    try {
      response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
        body,
      });
    } catch (err) {
      lastError = err;
      if (attempt === maxRetries) throw err;
      await sleep(500 * 2 ** attempt);
      attempt += 1;
      continue;
    }

    if (response.status === 429 || response.status >= 500) {
      if (attempt === maxRetries) {
        const text = await response.text().catch(() => '');
        throw new Error(`HTTP ${response.status} from ${url}: ${text}`);
      }
      await sleep(500 * 2 ** attempt);
      attempt += 1;
      continue;
    }

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(`HTTP ${response.status} from ${url}: ${text}`);
    }

    return response.json();
  }

  throw lastError ?? new Error(`Request to ${url} failed after ${maxRetries} retries`);
}

function chunk(array, size) {
  const out = [];
  for (let i = 0; i < array.length; i += size) {
    out.push(array.slice(i, i + size));
  }
  return out;
}

// ---------------------------------------------------------------------------
// Shared reporting helpers
// ---------------------------------------------------------------------------

function todayStamp() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function totalCost(response) {
  if (!response) return undefined;
  if (typeof response.cost === 'number') return response.cost;
  if (Array.isArray(response.tasks)) {
    const sum = response.tasks.reduce((acc, t) => acc + (typeof t.cost === 'number' ? t.cost : 0), 0);
    return sum || undefined;
  }
  return undefined;
}

function taskFailures(response) {
  const failures = [];
  if (!response || !Array.isArray(response.tasks)) return failures;
  for (const task of response.tasks) {
    if (task.status_code !== 20000) {
      failures.push({
        id: task.id,
        status_code: task.status_code,
        status_message: task.status_message,
      });
    }
  }
  return failures;
}

function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function writeReport({ outDir, cmd, endpoint, params, response, markdownBody }) {
  ensureDir(outDir);
  const stamp = todayStamp();
  const jsonPath = path.join(outDir, `${stamp}-${cmd}.json`);
  const mdPath = path.join(outDir, `${stamp}-${cmd}.md`);

  writeFileSync(jsonPath, `${JSON.stringify(response, null, 2)}\n`, 'utf8');

  const cost = totalCost(response);
  const header = [
    `# DataForSEO report — ${cmd}`,
    '',
    `- Date: ${stamp}`,
    `- Endpoint: \`${endpoint}\``,
    `- Cost reported by DataForSEO: ${cost !== undefined ? `$${cost}` : 'unknown (not present in response)'}`,
    `- Parameters: ${params}`,
    '',
  ].join('\n');

  writeFileSync(mdPath, `${header}${markdownBody}\n`, 'utf8');

  return { jsonPath, mdPath };
}

function fmt(value, fallback = '—') {
  if (value === undefined || value === null || value === '') return fallback;
  return String(value);
}

function mdTable(headers, rows) {
  const lines = [];
  lines.push(`| ${headers.join(' | ')} |`);
  lines.push(`| ${headers.map(() => '---').join(' | ')} |`);
  for (const row of rows) {
    lines.push(`| ${row.map((c) => fmt(c)).join(' | ')} |`);
  }
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Dry-run request preview
// ---------------------------------------------------------------------------

function printDryRun(label, endpointPath, tasks) {
  console.log(`\n=== ${label} (dry run) ===`);
  console.log(`POST ${API_BASE}${endpointPath}`);
  console.log(`Authorization: ${redactedAuthHeader()}`);
  console.log('Content-Type: application/json');
  console.log('Body:');
  console.log(JSON.stringify(tasks, null, 2));
}

// ---------------------------------------------------------------------------
// 1) volumes — dataforseo_labs/google/keyword_overview/live
// ---------------------------------------------------------------------------

const VOLUMES_ENDPOINT = '/v3/dataforseo_labs/google/keyword_overview/live';

function loadKeywords() {
  const raw = readFileSync(KEYWORDS_PATH, 'utf8');
  const keywords = JSON.parse(raw);
  if (!Array.isArray(keywords)) {
    throw new Error(`${KEYWORDS_PATH} did not parse to an array`);
  }
  return keywords;
}

function buildVolumesTasks() {
  const keywords = loadKeywords();
  const chunks = chunk(keywords, 100); // endpoint cap is 700; chunk at 100 to be safe
  return chunks.map((keywordChunk) => ({
    keywords: keywordChunk,
    location_code: LOCATION_CODE,
    language_code: LANGUAGE_CODE,
  }));
}

function summarizeVolumes(response, requestedKeywords) {
  const rows = [];
  const found = new Set();

  if (Array.isArray(response?.tasks)) {
    for (const task of response.tasks) {
      if (task.status_code !== 20000 || !Array.isArray(task.result)) continue;
      for (const bucket of task.result) {
       const list = Array.isArray(bucket?.items) ? bucket.items : [bucket];
       for (const item of list) {
        if (!item || !item.keyword) continue;
        found.add(item.keyword);
        const ki = item.keyword_info || {};
        const kp = item.keyword_properties || {};
        rows.push({
          keyword: item.keyword,
          volume: ki.search_volume,
          competition: ki.competition_level,
          competitionIndex: ki.competition,
          cpc: ki.cpc,
          lowBid: ki.low_top_of_page_bid,
          highBid: ki.high_top_of_page_bid,
          difficulty: kp.keyword_difficulty,
        });
       }
      }
    }
  }

  rows.sort((a, b) => (b.volume ?? -1) - (a.volume ?? -1));

  const missing = requestedKeywords.filter((k) => !found.has(k));

  const tableRows = rows.map((r) => [
    r.keyword,
    r.volume,
    r.competition,
    r.competitionIndex,
    r.cpc,
    r.lowBid,
    r.highBid,
    r.difficulty,
  ]);

  let body = '## Keyword volumes (sorted by search volume, descending)\n\n';
  body += mdTable(
    ['Keyword', 'Search volume', 'Competition', 'Competition index', 'CPC', 'Low top-of-page bid', 'High top-of-page bid', 'Difficulty'],
    tableRows
  );

  body += '\n\n## Keywords with no data returned\n\n';
  if (missing.length === 0) {
    body += 'None — every requested keyword returned data.\n';
  } else {
    body += missing.map((k) => `- ${k}`).join('\n') + '\n';
  }

  return body;
}

async function volumes({ dryRun, outDir, credentials }) {
  const tasks = buildVolumesTasks();

  if (dryRun) {
    printDryRun('volumes', VOLUMES_ENDPOINT, tasks);
    return { ok: true };
  }

  const response = await postLive(VOLUMES_ENDPOINT, tasks, credentials);
  const failures = taskFailures(response);

  const requestedKeywords = loadKeywords();
  const body = summarizeVolumes(response, requestedKeywords);

  const paramsDesc = `${requestedKeywords.length} keywords from keywords.json, chunked into ${tasks.length} task(s) of up to 100, location_code=${LOCATION_CODE}, language_code=${LANGUAGE_CODE}`;

  const { jsonPath, mdPath } = writeReport({
    outDir,
    cmd: 'volumes',
    endpoint: VOLUMES_ENDPOINT,
    params: paramsDesc,
    response,
    markdownBody: body,
  });

  logFailures('volumes', failures);
  console.log(`volumes: wrote ${jsonPath} and ${mdPath}`);

  return { ok: failures.length === 0, failures };
}

// ---------------------------------------------------------------------------
// 2) maps — serp/google/maps/live/advanced
// ---------------------------------------------------------------------------

const MAPS_ENDPOINT = '/v3/serp/google/maps/live/advanced';

function buildMapsTasks() {
  const tasks = [];
  for (const loc of MAPS_COORDINATES) {
    for (const keyword of MAPS_KEYWORDS) {
      tasks.push({
        keyword,
        location_coordinate: loc.coordinate,
        language_code: LANGUAGE_CODE,
        device: 'desktop',
        depth: 20,
        __location_name: loc.name, // stripped before sending; kept for our own bookkeeping
      });
    }
  }
  return tasks;
}

function stripBookkeeping(tasks) {
  return tasks.map(({ __location_name, ...rest }) => rest);
}

function summarizeMaps(response, taskMeta) {
  let body = '';

  if (!Array.isArray(response?.tasks)) {
    return 'No tasks returned in response.\n';
  }

  response.tasks.forEach((task, index) => {
    const meta = taskMeta[index] || {};
    const label = `${fmt(meta.__location_name, 'unknown location')} — "${fmt(meta.keyword, 'unknown keyword')}"`;
    body += `## ${label}\n\n`;

    if (task.status_code !== 20000) {
      body += `Task failed: ${fmt(task.status_message)} (status ${fmt(task.status_code)})\n\n`;
      return;
    }

    const items = task.result?.[0]?.items ?? [];
    const mapsItems = items.filter((it) => it && (it.rank_absolute || it.rank_group));

    const rows = mapsItems.map((it) => [
      it.rank_absolute ?? it.rank_group,
      it.title,
      it.rating?.value,
      it.rating?.votes_count ?? it.rating?.reviews_count,
      it.category,
    ]);

    body += mdTable(['Rank', 'Business', 'Rating', 'Reviews', 'Category'], rows);
    body += '\n\n';

    const targetLower = TARGET_BUSINESS_NAME.toLowerCase();
    const match = mapsItems.find((it) => (it.title || '').toLowerCase().includes('chris & co') || (it.title || '').toLowerCase().includes(targetLower));

    if (match) {
      body += `**${TARGET_BUSINESS_NAME} appears at rank ${fmt(match.rank_absolute ?? match.rank_group)}.**\n\n`;
    } else {
      body += `**${TARGET_BUSINESS_NAME} does not appear in the top ${mapsItems.length || 'N'} results for this query at this location.**\n\n`;
    }
  });

  return body;
}

async function maps({ dryRun, outDir, credentials }) {
  const rawTasks = buildMapsTasks();
  const sendTasks = stripBookkeeping(rawTasks);

  if (dryRun) {
    printDryRun('maps', MAPS_ENDPOINT, sendTasks);
    return { ok: true };
  }

  const response = await postLive(MAPS_ENDPOINT, sendTasks, credentials);
  const failures = taskFailures(response);

  const body = summarizeMaps(response, rawTasks);

  const paramsDesc = `${MAPS_COORDINATES.length} coordinates (${MAPS_COORDINATES.map((c) => c.name).join(', ')}) x ${MAPS_KEYWORDS.length} keywords (${MAPS_KEYWORDS.join(', ')}) = ${sendTasks.length} tasks, language_code=${LANGUAGE_CODE}, device=desktop, depth=20`;

  const { jsonPath, mdPath } = writeReport({
    outDir,
    cmd: 'maps',
    endpoint: MAPS_ENDPOINT,
    params: paramsDesc,
    response,
    markdownBody: body,
  });

  logFailures('maps', failures);
  console.log(`maps: wrote ${jsonPath} and ${mdPath}`);

  return { ok: failures.length === 0, failures };
}

// ---------------------------------------------------------------------------
// 3) domains — dataforseo_labs/google/domain_rank_overview/live
// ---------------------------------------------------------------------------

const DOMAINS_ENDPOINT = '/v3/dataforseo_labs/google/domain_rank_overview/live';

function buildDomainsTasks() {
  return COMPETITOR_DOMAINS.map((domain) => ({
    target: domain,
    location_code: LOCATION_CODE,
    language_code: LANGUAGE_CODE,
  }));
}

function summarizeDomains(response) {
  if (!Array.isArray(response?.tasks)) {
    return 'No tasks returned in response.\n';
  }

  const rows = response.tasks.map((task, index) => {
    const domain = COMPETITOR_DOMAINS[index];
    if (task.status_code !== 20000) {
      return [domain, `FAILED: ${task.status_message}`, '', '', ''];
    }
    const organic = task.result?.[0]?.items?.[0]?.metrics?.organic ?? task.result?.[0]?.metrics?.organic ?? {};
    const buckets = [
      organic.pos_1,
      organic.pos_2_3,
      organic.pos_4_10,
      organic.pos_11_20,
      organic.pos_21_30,
      organic.pos_31_40,
      organic.pos_41_50,
      organic.pos_51_100,
    ]
      .map((v) => (v === undefined || v === null ? '—' : v))
      .join(' / ');

    return [domain, organic.count, organic.etv, buckets];
  });

  let body = '## Competitor domain comparison\n\n';
  body += mdTable(
    ['Domain', 'Organic keyword count', 'Estimated traffic (ETV)', 'Position buckets (pos_1 / 2-3 / 4-10 / 11-20 / 21-30 / 31-40 / 41-50 / 51-100)'],
    rows
  );
  body += '\n';
  return body;
}

async function domains({ dryRun, outDir, credentials }) {
  const tasks = buildDomainsTasks();

  if (dryRun) {
    printDryRun('domains', DOMAINS_ENDPOINT, tasks);
    return { ok: true };
  }

  const response = await postLive(DOMAINS_ENDPOINT, tasks, credentials);
  const failures = taskFailures(response);

  const body = summarizeDomains(response);
  const paramsDesc = `${COMPETITOR_DOMAINS.length} domains (${COMPETITOR_DOMAINS.join(', ')}), location_code=${LOCATION_CODE}, language_code=${LANGUAGE_CODE}`;

  const { jsonPath, mdPath } = writeReport({
    outDir,
    cmd: 'domains',
    endpoint: DOMAINS_ENDPOINT,
    params: paramsDesc,
    response,
    markdownBody: body,
  });

  logFailures('domains', failures);
  console.log(`domains: wrote ${jsonPath} and ${mdPath}`);

  return { ok: failures.length === 0, failures };
}

// ---------------------------------------------------------------------------
// 4) gbp — business_data/google/my_business_info/live
// ---------------------------------------------------------------------------

const GBP_ENDPOINT = '/v3/business_data/google/my_business_info/live';
const GBP_LOCATION_NAME = 'Auckland,Auckland,Auckland,New Zealand';

function buildGbpTasks() {
  return [
    {
      keyword: TARGET_BUSINESS_NAME,
      location_name: GBP_LOCATION_NAME,
      language_code: LANGUAGE_CODE,
    },
  ];
}

function summarizeGbp(response) {
  if (!Array.isArray(response?.tasks) || response.tasks.length === 0) {
    return 'No tasks returned in response.\n';
  }

  const task = response.tasks[0];
  if (task.status_code !== 20000) {
    return `Task failed: ${fmt(task.status_message)} (status ${fmt(task.status_code)})\n`;
  }

  const item = task.result?.[0]?.items?.[0] ?? task.result?.[0] ?? {};

  const hasHours = Boolean(item.work_time || item.hours);
  const hoursBlock = item.work_time ?? item.hours;

  const hasAddressOrPin =
    Boolean(item.address) || (item.latitude !== undefined && item.longitude !== undefined);

  const lines = [
    `- **Title:** ${fmt(item.title)}`,
    `- **Category:** ${fmt(item.category)}`,
    `- **Additional categories:** ${fmt(Array.isArray(item.additional_categories) ? item.additional_categories.join(', ') : item.additional_categories)}`,
    `- **Rating:** ${fmt(item.rating?.value)} (${fmt(item.rating?.votes_count, '0')} reviews)`,
    `- **Hours block present:** ${hasHours ? 'yes' : 'no'}`,
    `- **Hours detail:** ${hasHours ? '\n\n\`\`\`json\n' + JSON.stringify(hoursBlock, null, 2) + '\n\`\`\`\n' : 'not returned'}`,
    `- **Website URL:** ${fmt(item.url)}`,
    `- **Address present:** ${item.address ? 'yes — ' + fmt(item.address) : 'no'}`,
    `- **Lat/long present:** ${item.latitude !== undefined && item.longitude !== undefined ? `yes — ${item.latitude}, ${item.longitude}` : 'no'}`,
    `- **Service area:** ${fmt(item.category_ids ? undefined : item.service_area ? JSON.stringify(item.service_area) : undefined, 'not returned')}`,
    `- **Is claimed:** ${item.is_claimed === undefined ? 'not returned' : item.is_claimed ? 'yes' : 'no'}`,
  ];

  let body = '## Google Business Profile facts\n\n';
  body += lines.join('\n');
  body += '\n';
  return body;
}

async function gbp({ dryRun, outDir, credentials }) {
  const tasks = buildGbpTasks();

  if (dryRun) {
    printDryRun('gbp', GBP_ENDPOINT, tasks);
    return { ok: true };
  }

  const response = await postLive(GBP_ENDPOINT, tasks, credentials);
  const failures = taskFailures(response);

  const body = summarizeGbp(response);
  const paramsDesc = `keyword="${TARGET_BUSINESS_NAME}", location_name="${GBP_LOCATION_NAME}", language_code=${LANGUAGE_CODE}`;

  const { jsonPath, mdPath } = writeReport({
    outDir,
    cmd: 'gbp',
    endpoint: GBP_ENDPOINT,
    params: paramsDesc,
    response,
    markdownBody: body,
  });

  logFailures('gbp', failures);
  console.log(`gbp: wrote ${jsonPath} and ${mdPath}`);

  return { ok: failures.length === 0, failures };
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

function logFailures(cmd, failures) {
  if (failures.length === 0) return;
  console.error(`${cmd}: ${failures.length} task(s) failed:`);
  for (const f of failures) {
    console.error(`  - task ${fmt(f.id)}: status ${fmt(f.status_code)} — ${fmt(f.status_message)}`);
  }
}

function parseArgs(argv) {
  const args = { command: undefined, dryRun: false, outDir: DEFAULT_OUT_DIR };
  const rest = [...argv];
  const command = rest.shift();
  args.command = command;

  for (let i = 0; i < rest.length; i += 1) {
    const arg = rest[i];
    if (arg === '--dry-run') {
      args.dryRun = true;
    } else if (arg === '--out') {
      const val = rest[i + 1];
      if (!val) {
        console.error('--out requires a directory argument');
        process.exit(1);
      }
      args.outDir = path.resolve(val);
      i += 1;
    } else {
      console.error(`Unknown argument: ${arg}`);
      process.exit(1);
    }
  }

  return args;
}

const COMMANDS = { volumes, maps, domains, gbp };

async function runAll({ dryRun, outDir, credentials }) {
  const results = {};
  let anyFailed = false;
  for (const [name, fn] of Object.entries(COMMANDS)) {
    try {
      const result = await fn({ dryRun, outDir, credentials });
      results[name] = result;
      if (!result.ok) anyFailed = true;
    } catch (err) {
      anyFailed = true;
      console.error(`${name}: request failed — ${err.message}`);
      results[name] = { ok: false, error: err.message };
    }
  }
  return { ok: !anyFailed, results };
}

async function main() {
  const argv = process.argv.slice(2);
  const { command, dryRun, outDir } = parseArgs(argv);

  if (!command || (!COMMANDS[command] && command !== 'all')) {
    console.error('Usage: node tools/dataforseo/run.mjs <volumes|maps|domains|gbp|all> [--dry-run] [--out <dir>]');
    process.exit(1);
  }

  // Dry-run never touches credentials or the network.
  const credentials = dryRun ? { login: '<redacted>', password: '<redacted>' } : getCredentials();

  let outcome;
  if (command === 'all') {
    outcome = await runAll({ dryRun, outDir, credentials });
  } else {
    try {
      outcome = await COMMANDS[command]({ dryRun, outDir, credentials });
    } catch (err) {
      console.error(`${command}: request failed — ${err.message}`);
      process.exit(1);
    }
  }

  if (!outcome.ok) {
    process.exit(1);
  }
}

main();

export { volumes, maps, domains, gbp };
