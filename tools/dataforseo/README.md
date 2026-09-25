# DataForSEO reporting script

Thin, zero-dependency Node script (see `plan.md` §7) that pulls four DataForSEO
reports for Chris & Co. Mobile Detailing: keyword volumes, local Maps rankings,
competitor domain overviews, and the Google Business Profile record.

**Status as of 2026-09-20: the script has NOT been run against the live API.**
Credentials have not arrived yet and no spend is authorised. Only `--dry-run`
and `node --check` have been used to verify it.

## Credentials

Two environment variables, read in this order:

1. `DATAFORSEO_LOGIN` / `DATAFORSEO_PASSWORD` from the process environment, or
2. the same two keys parsed out of the repo's `.env` file (`/Volumes/KINGSTON/projects/chrisco/.env`).

`.env` is git-ignored. The script never prints, logs, or writes either value to
any file — reports only ever contain the API's response data.

## Subcommands

Run from the repo root:

```bash
# Keyword search volumes for the 60 keywords in keywords.json
node tools/dataforseo/run.mjs volumes

# Local Maps rankings: 3 coordinates x 3 keywords = 9 tasks
node tools/dataforseo/run.mjs maps

# Competitor domain overview for 6 competitors
node tools/dataforseo/run.mjs domains

# Google Business Profile facts for the listing
node tools/dataforseo/run.mjs gbp

# Run all four in sequence
node tools/dataforseo/run.mjs all
```

Flags (all subcommands, including `all`):

- `--dry-run` — prints the exact request URL, headers (Authorization redacted)
  and JSON body that would be sent, and makes no network call. This is how
  the script can be verified with no credentials present.
- `--out <dir>` — write reports to `<dir>` instead of the default
  `tools/dataforseo/reports/`.

## Endpoints and rough cost

| Command | Endpoint | Approx. cost |
|---|---|---|
| `volumes` | `POST /v3/dataforseo_labs/google/keyword_overview/live` | a few cents (1 task for 60 keywords, chunked at 100/task) |
| `maps` | `POST /v3/serp/google/maps/live/advanced` | cents (9 tasks — 3 coordinates x 3 keywords) |
| `domains` | `POST /v3/dataforseo_labs/google/domain_rank_overview/live` | cents (6 tasks — 1 per competitor domain) |
| `gbp` | `POST /v3/business_data/google/my_business_info/live` | a cent or two (1 task) |

DataForSEO's Labs and SERP live endpoints are priced per task in fractions of
a dollar; a full `all` run across all four commands is expected to cost well
under a dollar total. The actual cost DataForSEO reports for each call is
recorded in the header of its `.md` report once the script has been run for
real.

## Reports

Each run writes two files per command into `tools/dataforseo/reports/`
(or the `--out` directory):

- `<YYYY-MM-DD>-<command>.json` — the raw, pretty-printed API response.
- `<YYYY-MM-DD>-<command>.md` — a human-readable summary (tables for volumes,
  maps rankings, and domain comparison; a facts list for GBP), with a header
  recording the date, endpoint, DataForSEO-reported cost, and parameters used.

**Reports are committed to the repo** (the lead wants the history).
**Credentials are never committed** — `.env` is already in `.gitignore`, and
`tools/dataforseo/reports/` is intentionally NOT git-ignored.

## Keywords

`tools/dataforseo/keywords.json` holds the 60-keyword array used by `volumes`,
copied verbatim from `chrisco-keyword-map.md` §8.

## Vendored skill (2026-09-21)

`.claude/skills/dataforseo/` is nikhilbhansali/dataforseo-skill-claude, vendored project-locally. Its client is patched to read `DATAFORSEO_LOGIN` / `DATAFORSEO_PASSWORD` from this repo's `.env` and to write CSVs to `tools/dataforseo/outputs/` (gitignored). Use it from the repo root:

```python
import sys; sys.path.insert(0, '.claude/skills/dataforseo/scripts')
from dataforseo_client import *
```

Always pass `location_name="New Zealand"` and `language_name="English"`. The trial account accepts one task per request.
