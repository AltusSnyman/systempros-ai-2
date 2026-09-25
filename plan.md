# System Pros AI — growth plan, round 1 "one name, measured, found"

Prepared 2026-09-25 by the lead (Opus 5.5) from four Sonnet audits (technical + schema, local + GoHighLevel inventory, keywords + SERPs via DataForSEO for NZ/AU/US, conversion) plus the GEO baseline. Evidence: `tools/dataforseo/reports/2026-09-25-sp-keywords.md` (committed) and the session scratchpad reports (summarised here). Roster: lead Opus 5.5 · builders Sonnet 5 (parallel) · mechanical Haiku 4.5 · verifiers Sonnet 5. Branch `growth/onboard-2026-09-25` (growth kit + Search Console verification file already committed).

## 1. Where the site stands (2026-09-25)

**Good.** 42 URLs all 200, one H1 each, canonicals match, no duplicate titles or near-duplicate pages (worst pair 16% shared), strong security headers, single-CTA design executed well on most pages, Remotion bundles lazy-hydrated. Local = GitHub = live at 3354b4a.

| # | Finding | Evidence | Impact |
|---|---|---|---|
| 1 | **Three names for one business.** Google listing "Ai and Automation Agency" (Marketing agency, 5.0/17 reviews, umbrella for System Pros, Tradie Front Desk, Chiron Strategy Group); site schema "SystemPros.ai"; body copy "System Pros". | Local audit; Layout.astro:68 | Google cannot connect the 17 reviews or the local listing to systempros.ai. |
| 2 | **Structured data points at a stranger.** `sameAs` links linkedin.com/company/systempros, which is an unrelated US security-alarm company. | Layout.astro:78, fetched | Actively misidentifies the business. |
| 3 | **Contact details disagree.** Terms page lists different US (+1 951…) and AU (+61 7…) numbers from the footer; NZ number malformed in schema (+64-2-125-50493); AU/NZ pages carry the US contact in their Service schema; GoHighLevel address Sheridan WY; emails alt@altcutman.com vs hello@systempros.ai. | Tech + local audits | Trust and local relevance both suffer. |
| 4 | **Nothing is measured.** No GA4, GTM or pixel on any page, including /contact and /audit. Search Console property added today, unverified until deploy. | Tech + CRO audits | No way to tell what works. |
| 5 | **Logo and social image 404 on every page** (`/logo.png`, `/social-preview.png`). | Tech audit | Broken share previews everywhere; Google's logo requirement unmet. |
| 6 | **The conversion page is the slowest page.** /contact LCP 5.8 s desktop / 6.8 s mobile, booking calendar blank for 5 s on a phone; its title reads "Schedule Your AI Architecture Audit" (collides with /audit). GoHighLevel widgets render default blue, against DESIGN/PRODUCT rules. | CRO audit | Visitors who decided to book hit a blank gap. |
| 7 | **Competing CTAs and a dead-end funnel.** /pricing says "Get a quote" ×6; /audit has no route back to "Book a Free Consultation" until the footer and has no inbound links at all. | CRO + tech | Splits the one action PRODUCT.md demands. |
| 8 | **Proof unused.** The 5.0/17 Google rating appears nowhere; homepage testimonials are first-name-only with unverifiable percentages. | CRO | Weak trust for a sceptical 40–65 audience. |
| 9 | **Four orphan pages** (/audit, /marketing-for-hair-salons, /marketing-for-landscaping, /marketing-for-plumbing). 29 titles and 26 descriptions over length (home description 225 chars; /openclaw title 80). | Tech | Pages Google can reach only via sitemap; truncated snippets. |
| 10 | **Zero rankings.** DataForSEO ranked-keywords: systempros.ai and tradiefrontdesk.ai rank for nothing trackable in NZ, AU or US. | Keyword report §4 | Starting from zero. |
| 11 | **Demand is not where the site aims.** NZ volumes are tiny (ai receptionist 90/mo, ai agency nz 50); AU is 6–7× larger (ai consultant 1,000, ai receptionist 880, ai voice 4,400); US larger still. "openclaw" is 246k/mo US, 27k AU, 4.4k NZ ("what is openclaw" 18.1k US, "openclaw skills" 5.4k, "openclaw install" 2.9k) and the site already has a six-page OpenClaw cluster that ranks for none of it. Industry pages (/solutions/*, /marketing-for-*) have no measurable volume anywhere. "How much does it cost" dominates People Also Ask for every offer. | Keyword report §1–3, §5 | The cheapest wins are titles on pages that already exist. |
| 12 | **GEO** home 50, voice-ai 51, consulting/new-zealand 56 (target ≥68). No llms.txt. Blog Article dates stuck in May–June 2024. | geo-optimizer, tech | Weak for AI answers, which this brand should own. |
| 13 | **GoHighLevel**: /contact uses calendar L9a1VqF4ljVNaUhi30Df ("System Pros - Strategy"); Google Business Profile **not connected** in GoHighLevel; the 7 connected social accounts are personal-brand (Altus / Alt Cutman), none branded System Pros. | Local audit (read-only GETs) | Reviews and posting cannot run through GoHighLevel until the profile is connected. |

## 2. Owner decisions needed (Altus) → answers go in §2b

| Topic | Why it matters | Default if unanswered |
|---|---|---|
| Google listing name and brand model | One listing currently serves three brands | Rename to "System Pros AI" with descriptor; TFD and Chiron get their own listings later |
| Listing category | "Marketing agency" vs what is sold | Primary "Business management consultant", secondary "Software company", keep "Marketing agency" secondary |
| Public email and phones per country | Contact must agree everywhere | hello@systempros.ai; NZ 021 255 0493, AU +61 2 5563 2110, US +1 844 697 9038 (footer set); fix terms page |
| Address shown | Wyoming address vs NZ operation | No public address; service areas NZ + AU (+ US) |
| Correct LinkedIn / Facebook URLs | sameAs is wrong | Remove the wrong LinkedIn until the real one is supplied |
| Publish prices? | PAA "how much" on every offer | "From" ranges only if Altus gives them; otherwise "fixed price after a free audit" answer |
| OpenClaw as a traffic play? | Huge US volume, mostly informational | Yes: retitle the cluster, add an OpenClaw pricing page, funnel to the Private Assistant offer |
| Which market leads | NZ tiny, AU real, US large | AU + NZ for services; US via OpenClaw content |
| Keep "AI receptionist" on systempros.ai? | Tradie Front Desk also sells it | Generic "AI receptionist" on /voice-ai; anything "tradie" stays with TFD |
| GA4 | No measurement | Create under altussnyman@gmail.com, same as the other clients |
| Testimonials | First-name-only with numbers | Keep text, drop unverifiable percentages unless confirmed; add the Google rating |
| Connect Google profile in GoHighLevel | Enables reply + daily post system | Altus connects it in GoHighLevel (account action, not code) |

## 2b. Owner answers (Altus, 2026-09-25) — these override every default above

- **Names:** the website and domain stay **System Pros AI** (schema `name` "System Pros AI", `alternateName` "SystemPros.ai"). The Google listing stays **"Ai and Automation Agency"** because that is the registered limited company: use it as schema `legalName` and in the footer line "System Pros AI is a brand of Ai and Automation Agency Ltd" (exact legal suffix to confirm), and add the Google listing's Maps URL to `sameAs` so Google joins the two. Do **not** rename the listing.
- **Goal:** SEO for System Pros AI, and **add pages** → the round-2 pages in §3 move into round 1 (/voice-ai/australia, /training/n8n, AU consulting services depth; /openclaw/pricing once prices are confirmed).
- **Contacts:** NZ 021 255 0493 (+64 21 255 0493), AU +61 2 5563 2110, US +1 844 697 9038, email hello@systempros.ai, no street address. Terms page numbers replaced. Remove the wrong LinkedIn sameAs.
- **Prices:** publish "from" prices. **Figures pending**: the current PricingSection.jsx tiers ($997 / $3,497 / $5,997 with template-style inclusions) are not confirmed; nothing ships as a price until Altus confirms per offer.
- **Round 1 approved**, plus "build the marketing side as well" → scope being confirmed with Altus (see §8).
- Defaults kept for: GA4 under altussnyman@gmail.com; generic "AI receptionist" on /voice-ai, "tradie" terms stay with Tradie Front Desk; testimonials keep text but drop unverifiable percentages; Altus connects the Google listing in GoHighLevel.

## 3. Page map and keyword → URL (one primary per URL)

| URL | Primary | Secondary | Market | Round |
|---|---|---|---|---|
| / | AI systems for small business | ai automation agency, ai agency nz/australia | NZ/AU | 1 (title/description, proof strip) |
| /voice-ai/ | ai receptionist | ai phone answering, virtual receptionist, ai voice agent | AU/US | 1 (retitle) |
| /consulting/ | ai consultant / ai consulting | ai consulting services, ai consultant company, ai automation consultant | AU/US | 1 (copy + title) |
| /consulting/australia/ | ai consultant australia | Sydney, Melbourne, Brisbane | AU | 1 |
| /consulting/new-zealand/ | ai agency nz | ai consultant auckland | NZ | 1 |
| /openclaw/ | what is openclaw | openclaw setup, openclaw pricing | US/AU | 1 (retitle) |
| /openclaw/skills/, /setup-guide/, /use-cases/, /vs-chatgpt/ | openclaw skills / openclaw install / openclaw use cases / openclaw vs chatgpt | | US/AU | 1 (titles) |
| /openclaw/pricing/ **new** | openclaw pricing | done-for-you openclaw setup cost | US/AU | 1 if prices or "from" wording approved, else 2 |
| /private-assistant/ | private ai assistant | openclaw for business (fold /openclaw/for-business later) | US | 1 (title) |
| /lead-reactor/ | speed to lead | | US | 1 (title) |
| /lead-gen-websites/ | lead generation website | | US | 1 (title) |
| /training/ | claude code training | n8n training, gohighlevel training | US/AU | 1 (title) |
| /pricing/ | ai automation pricing | how much does an ai receptionist cost | all | 1 (FAQ, CTA label) |
| /contact/ | book a free consultation | | all | 1 (title, speed, skin) |
| /voice-ai/australia/ **new** | ai receptionist australia | virtual receptionist Sydney/Melbourne/Brisbane | AU | 2 |
| /training/n8n/ **new** | n8n agency / n8n training | | AU/US | 2 |
| /solutions/*, /marketing-for-* | keep as ad/outbound landing pages; no SEO investment | | | — |

## 4. Priority order

**Round 1, this build (after approval):**
1. Measurement: GA4 + events (`consultation_click`, `booking_iframe_load`, `audit_form_view`, `call_click`) on every page.
2. Identity: one name in schema and copy (per §2b), correct sameAs, one phone set per country, fixed NZ format, regional contact in AU/NZ Service schema, `areaServed` types, terms page numbers, breadcrumb trailing slashes, logo and social image restored.
3. Conversion: /contact speed (preconnect, skeleton, fixed height), title fix, GoHighLevel widget colours to brand green where the widget allows, /pricing CTA label, /audit route back to the consultation, 5.0 Google rating strip on home, /contact, /pricing, header tap-to-call on mobile, orphan pages linked.
4. Found: titles and descriptions per §3 (Haiku trims the other ~25 over-length), People Also Ask "how much" answers on /pricing and each offer page (FAQPage schema), `llms.txt`, blog `BlogPosting` with honest dates, `/_astro/*` immutable cache.
5. OpenClaw cluster retitled; /openclaw/pricing if §2b allows.

**Owner / Altus, outside the code:** rename + recategorise the Google listing, connect it in GoHighLevel, decide on separate listings for Tradie Front Desk and Chiron, confirm real LinkedIn/Facebook, review campaign.

**Round 2:** /voice-ai/australia, /training/n8n, AU consulting depth, case studies with named clients, GEO chunking pass to ≥68.

## 5. Schema plan
One `ProfessionalService` (or `ConsultingService`) node with `@id` https://systempros.ai/#org, final name, logo that resolves, correct sameAs, contactPoint per country, areaServed NZ/AU/US; WebSite; BreadcrumbList with trailing slashes; Service per offer page with provider → #org; FAQPage where visible Q&A exists; BlogPosting on posts. No Review/AggregateRating.

## 6. Success metrics (re-check 2026-10-25, then 2026-12-25)
Search Console verified and indexing all 42+ pages; first impressions for "what is openclaw", "ai receptionist", "ai consultant" (AU); GA4 ≥10 consultation clicks/28 days; /contact LCP < 2.5 s mobile; GEO home ≥68; one business name everywhere.

## 7. Guardrails
No invented clients, numbers, reviews or prices. "30 years", "48 hours", "under 10 seconds", OpenClaw star and skill counts only if Altus confirms or a source is cited. Keep DESIGN.md/PRODUCT.md rules (light surfaces, brand green, one CTA, no blue/purple AI palette). Trade-specific "tradie" terms belong to tradiefrontdesk.ai. GoHighLevel: read-only unless Altus approves writes. Never push without Altus's word. Never change a URL without a 301 in netlify.toml / public/_redirects.
