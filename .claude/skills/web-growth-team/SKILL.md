---
name: web-growth-team
description: Run any website SEO, copy, or design job as an orchestrated agent team with an explicit model doctrine (Fable lead / Opus lead / Sonnet subagents / Haiku mechanical). Use for SEO audits and rewrites, ranking plans for a keyword or location, building blog or content clusters, new landing pages, and full site builds. Triggers on "rank better for X", "SEO audit this site", "build a blog section", "new landing page", "build the whole site", "agent team for this website", "make this page convert".
---

# Web Growth Team

You are the **orchestrating lead** of an agent team that ships website work: SEO, copy, design, and build. This file is the standing operating procedure. Follow it in order. Do not skip the approval gate.

---

## 1. Model doctrine — non-negotiable

| Role | Model | Use it for |
|---|---|---|
| **Lead / orchestrator — default** | `opus` | Planning, synthesis, the approval gate, and **writing all final customer-facing copy**. Correct for ~80% of jobs. |
| **Lead / orchestrator — escalated** | `fable` | Only when an escalation trigger below is met. |
| **Subagents — the fleet** | `sonnet` | Research, audits, SERP reading, competitor teardowns, drafts, outlines, component build, QA verification. Everything parallel. |
| **Mechanical tail** | `haiku` | Alt text, meta length trims, internal link checks, sitemap/robots, file renames, redirect maps, CSV formatting. |

**Escalate the lead to `fable` only if two or more are true:**
- The job is a full site (6+ new pages) or a large migration.
- It will run unattended for more than about an hour.
- It spans three or more phases without a human check-in.
- Information architecture must be invented from scratch, not adapted.
- There is real money on the line (paid traffic pointed at it, a launch date).

Otherwise **stay on `opus`**. Fable is roughly double the cost and its edge is long autonomous multi-stage work, not taste. A three-page landing site does not need it.

**Never fan out final brand voice.** Five Sonnets writing five pages produces five subtly different brands. Subagents produce research, outlines, structured briefs, and raw drafts. The lead writes or rewrites the shipped words in a single pass so the voice holds. Design and components *are* safe to parallelise.

State the roster out loud at kickoff: `Lead: Opus 5. Fleet: 4× Sonnet 5. Mechanical: Haiku 4.5.` Say it again if it changes mid-job, with the reason.

---

## 2. Skill routing — call these, do not improvise

Marketing skills come from the `marketing-skills` plugin ([coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills)). Design comes from `ui-ux-pro-max`. Invoke them; never reinvent their frameworks from memory.

| Phase | Skill | Model that runs it |
|---|---|---|
| Context | `product-marketing-context` | Lead |
| Audit | `seo-audit`, `page-cro`, `analytics-tracking` | Sonnet, parallel |
| Research | `content-strategy`, `competitor-alternatives`, `ai-seo` | Sonnet, parallel |
| Architecture | `site-architecture`, `programmatic-seo` | Lead |
| Copy | `copywriting`, `copy-editing`, `marketing-psychology` | **Lead writes final; Sonnet drafts only** |
| Design | `ui-ux-pro-max`, `dataviz` (charts only) | Sonnet builds, Lead reviews |
| Technical | `schema-markup`, `ai-seo` | Sonnet |
| Conversion | `page-cro`, `form-cro`, `popup-cro`, `ab-test-setup` | Sonnet audits, Lead decides |

---

## 3. The pipeline

### Phase 0 — Context lock (Lead, solo, no subagents)

**This is agency work — multiple clients.** Every client gets its own context file, and context never crosses between them.

Read `.agents/product-marketing-context.md` in the client's repo. If it does not exist, run the `product-marketing-context` skill and create it. Do not proceed without: business and services, **service area**, ideal customer, the offer, real proof (reviews, jobs completed, certifications), voice notes, the primary conversion action, and the tech stack.

**Agency rules:**
- Confirm out loud which client you are working on before anything else. If the repo or URL is ambiguous, ask — do not guess.
- One context file per client, living in that client's repo. Never read a different client's context, copy, or proof into this job.
- Voice, proof, pricing, and testimonials are client-specific and non-transferable. Structural patterns (a good service-page skeleton, a schema template) are transferable — reuse those freely.
- If you notice a client is a direct competitor of another client, say so and stop.

If facts are missing, ask for them in one batched round. Never invent proof, statistics, review counts, or years-in-business.

### Phase 1 — Research fan-out (Sonnet, parallel)

Launch these concurrently in a single message. Each returns structured findings only — no prose essays.

1. **Technical audit** — `seo-audit` skill against the live URLs. Titles, H1s, meta, canonicals, indexability, Core Web Vitals, mobile, internal linking.
2. **Keyword and intent map** — head terms, long-tail, and question queries. Source from Google autocomplete, People Also Ask, related searches, forum and Reddit threads, and competitor headings. Tag each with intent: transactional / commercial / informational. Note seasonality.
3. **SERP and competitor teardown** — read the actual top 10 for the money terms. What page type ranks, word count, sections present, schema used, what the SERP features are.
4. **Local signals** *(run whenever the business serves a geography)* — Google Business Profile completeness, NAP consistency, citations, local pack composition, suburb and region terms, review volume vs competitors.
5. **Conversion audit** — `page-cro` skill. Where does the current page lose people.

*No paid SEO tools are assumed.* Volume figures are estimates, and must be labelled as such. Search Console and GA4 data, if connected, beat any estimate — use them first.

### Phase 2 — Synthesis and plan (Lead, solo)

Produce `plan.md`. It must contain:

- **Page map** — every page, its URL slug, page type, primary keyword, secondary keywords, search intent, and word count target.
- **Keyword → URL table** — one primary keyword per URL. Flag and resolve any cannibalisation.
- **Internal linking graph** — what links to what, with anchor text.
- **Priority order** — quick wins (ship this week) separated from structural work.
- **Schema plan** — which JSON-LD type per page.
- **Effort and sequence** — which agent does what, in what order, on which model.
- **Success metric** — the specific query set and the conversion event being moved.

### Phase 3 — Approval gate 🛑

**Stop. Present `plan.md`. Build nothing until the human says go.** If the session is unattended, still stop — write the plan, deliver it, and say clearly that build is pending approval.

### Phase 4 — Build

**Default stack: Astro.** Build in Astro unless the existing repo says otherwise, then match what is already there.

Astro rules — these are the reason it was chosen, so do not undo them:

- **Zero JS by default.** No framework component unless the page genuinely needs interactivity, and then `client:visible` or `client:idle`, never `client:load` on below-fold widgets.
- **Content Collections** for anything repeatable — blog posts, service pages, locations. Define the schema in `src/content.config.ts` with Zod, including SEO fields (`title`, `description`, `canonical`, `ogImage`, `publishDate`, `updatedDate`). Type safety here is what stops half-finished meta shipping.
- **One `<SEO />` component** in a shared layout owning title, meta description, canonical, Open Graph, and JSON-LD. Every page passes props to it. No page hand-rolls its own head tags.
- `@astrojs/sitemap` for the sitemap, `@astrojs/image` or `astro:assets` for images — WebP/AVIF, explicit width and height on every image, `loading="lazy"` below the fold.
- Static output (`output: 'static'`) unless something truly needs SSR.
- Schema JSON-LD rendered from a typed helper, not pasted per page.

General build discipline:

- Work on a branch: `growth/<slug>-<date>`. Never commit to the default branch.
- If subagents edit files in parallel, give each one **worktree isolation** so they cannot collide.
- Match the existing component library and design tokens. Read neighbouring files before writing new ones. Do not introduce a new CSS approach.
- New visual work: run `ui-ux-pro-max` first for layout, type, and colour decisions.
- Finish with `npm run build` — it must pass before Phase 5 starts.

**Deployment: local → GitHub → Netlify.** Build and verify locally first; push only what builds.

- `netlify.toml` at the repo root: `command = "npm run build"`, `publish = "dist"`.
- **Every URL change needs a 301.** Put redirects in `netlify.toml` (or `public/_redirects`) in the same commit as the change — never as a follow-up. A rewrite that silently orphans a ranking URL is the single most expensive mistake in this pipeline.
- Push the branch and use the **Netlify deploy preview** as the review artifact. Run Phase 5 QA against the preview URL, not localhost.
- Add security and cache headers in `netlify.toml`. Confirm hashed assets get long cache lifetimes and HTML does not.
- Check `robots.txt` does not block the preview from being useful, and that the production sitemap URL is absolute and correct.
- Never push straight to `main`. Merge only after the gate in Phase 5 clears.

If the site is **not** in a repo (Webflow, WordPress, Squarespace, a client you cannot touch), the build phase produces the same work as documents instead: a copy deck per page, the meta and schema values ready to paste, and an ordered change list. The rest of the pipeline is unchanged.

**Copy production sequence:**

1. Sonnet subagent per page: research pack → structured outline → raw draft (`copywriting` skill).
2. **Lead does a single voice pass across every page together.** This is where the brand voice is set. Non-delegable.
3. `copy-editing` skill for the tightening sweep.
4. Haiku for meta titles (≤60 chars), meta descriptions (≤155), alt text, and slugs.

**Content clusters** (e.g. "build a blog section covering these questions"): one pillar page targeting the head term, 5–8 supporting posts each owning one question. Every supporting post links up to the pillar; the pillar links down to all. Answer the query in the first 100 words — that is what wins featured snippets and AI citations. Add FAQ schema. Run `ai-seo` on the cluster so it is quotable by LLMs, not just crawlable.

### Phase 5 — Adversarial QA (Sonnet, parallel, distinct lenses)

Never let one agent check its own work. Launch verifiers, each with a different lens:

- **SEO compliance** — every page hits its plan spec: title, meta, H1, canonical, schema validates, internal links present.
- **Factual accuracy** — every claim, number, price, and credential traced to something in the context file or a cited source. Anything unverifiable gets cut, not softened.
- **Brand voice** — does it read as one company. Flag any page that drifts.
- **Accessibility and performance** — contrast, focus states, heading order, image sizing, Lighthouse. On Astro, also check that no unnecessary hydration directive crept in.
- **Build integrity** — `npm run build` passes, links resolve, no 404s, redirects mapped, sitemap contains every intended URL and nothing else.

A finding survives only if the verifier can state the concrete failure. Fix, then re-verify the fixed items.

### Phase 6 — Ship and measure

Merge the branch, let Netlify build production, then verify **on the live domain**: pages render, redirects fire with a 301, sitemap is live, schema passes Google's Rich Results test.

Deliver a one-page client summary: what changed, what it targets, what to watch in Search Console, and when to check (14 / 30 / 90 days). Submit the updated sitemap in Search Console. Set the `ab-test-setup` skill loose if anything is worth testing.

---

## 4. The three standing job types

**A. Optimise an existing site for SEO.**
Phase 0 → 1 → 2 → gate → 4 (edit in place) → 5 → 6. Fix what exists before adding pages. Lead stays on **Opus**.

**B. Rank for a target term, then build the content to do it.**
> *"Come up with a plan to rank for landscaping in Auckland."*

Phase 0 → 1 with **local signals on** → 2 produces the full page map including a service-area architecture and a question-driven cluster (lawn care in an Auckland climate, native planting, seasonal timing, cost guides) → gate → 4 builds pillar + supporting posts → 5 → 6. Lead on **Opus**; escalate to **Fable** only if the cluster runs past ~8 pages in one unattended session.

**C. Build an entire new website.**
Phase 0 → 1 → `site-architecture` for the full IA → 2 → gate → 4 in waves (design system → templates → page copy → content) → 5 → 6. Lead on **Fable**. This is the case it exists for.

---

## 5. Guardrails

- **No invented facts.** No fabricated review counts, statistics, awards, client names, or years trading. If it is not in the context file or a source you can cite, it does not ship.
- **No keyword stuffing.** Write for the reader; the keyword map is a targeting tool, not a quota.
- **Local honesty.** Only claim service areas the business actually serves. Location pages must contain genuinely local content, not a find-and-replace of the suburb name.
- **One primary keyword per URL.** Cannibalisation is a self-inflicted wound.
- **Show the roster and the cost shape.** Before a large fan-out, say how many agents on which models. The human should never be surprised by a bill.
- **The gate is real.** One checkpoint, at the plan. Research and audit freely without asking; build nothing until the plan is approved. After approval, run through build, QA, and deploy preview without stopping again — surface problems, do not pause for permission on each one.
- **No client bleed.** One client's copy, proof, or positioning never appears in another's work.
- **Never push to `main` directly**, and never change a URL without shipping its redirect in the same commit.

---

## 6. Kickoff template

```
Client: [name]
Job type: [A optimise / B rank-and-build / C full site]
Site: [live url + repo path]
Target: [keyword / location / goal]
Stack: [Astro by default — name it if the repo is something else]
Constraints: [deadline, page count, must-keep URLs]
```

Respond with: the roster, the model choice **and one line of reasoning for it**, then start Phase 0.
