# System Pros AI — Marketing Service Keyword Research (DataForSEO), 2026-09-25

**Budget cap:** US$1.50. **Actual spend: $0.284** (19% of cap). Cost printed after every call, no call exceeded $0.09.

Spend breakdown: search volume (2 calls: NZ 36 terms, AU 46 terms) $0.18 · `labs_keyword_ideas` (2 calls, NZ + AU, limit 200 each) $0.072 · `serp_google_organic` (Auckland + Sydney × 4 keywords, depth 10) $0.032 — this SERP step was run twice ($0.016 each) because the first pass's flattened CSV export collapsed the `people_also_ask` items into a count instead of the question text; the second pass captured raw JSON so PAA could be extracted. Wasted $0.016, immaterial against the cap.

Raw data: `tools/dataforseo/outputs/2026-09-25-sp-marketing-volume-{nz,au}_*.csv`, `2026-09-25-sp-marketing-ideas-{nz,au}_*.csv`, `2026-09-25-sp-marketing-serp-{auckland,sydney}-*.csv` (gitignored, local only).

This run does not repeat any term already sized in `2026-09-25-sp-keywords.md` (the AI-offer keyword report) — this is the **marketing-service** offer only: GBP optimisation, review generation/management, social posting automation, Meta ads management, lead nurturing.

---

## 1. Search volume by country

### New Zealand (top by volume, ≥20/mo, base + limited local modifiers)

| Keyword | Volume | Competition | CPC |
|---|---|---|---|
| facebook ads management | 1,000 | LOW | $3.43 |
| digital marketing agency | 720 | LOW | $13.17 |
| marketing agency | 390 | MEDIUM | $9.16 |
| marketing agency auckland | 320 | HIGH | $8.04 |
| google my business management | 210 | LOW | $5.13 |
| instagram ads | 210 | LOW | $22.60 |
| social media management | 170 | MEDIUM | $8.72 |
| local seo | 140 | MEDIUM | $15.52 |
| social media management nz | 140 | MEDIUM | $6.84 |
| marketing agency nz | 140 | HIGH | $10.71 |
| marketing automation | 90 | LOW | $26.60 |
| google business profile optimization (US spelling) | 50 | LOW | — |
| local seo agency | 50 | LOW | — |
| facebook ads agency | 40 | LOW | $16.97 |
| review management | 30 | LOW | $5.22 |
| reputation management | 30 | LOW | — |
| google business profile management | 20 | LOW | — |
| google reviews management | 20 | MEDIUM | $14.40 |
| lead nurturing | 20 | LOW | — |
| google business profile optimisation (NZ spelling) | 10 | MEDIUM | — |
| marketing for tradies / dentists / salons / landscapers | 10 each | mixed | — |

City variants beyond "auckland" (nz/auckland on GBP-optimisation, local-seo-agency, facebook-ads-agency) returned **no measurable volume**.

### Australia (top by volume)

| Keyword | Volume | Competition | CPC |
|---|---|---|---|
| facebook ads management | 6,600 | LOW | $2.71 |
| digital marketing agency | 4,400 | MEDIUM | $21.33 |
| marketing agency | 3,600 | MEDIUM | $17.29 |
| instagram ads | 1,300 | LOW | $48.99 |
| google my business management | 1,000 | LOW | — |
| marketing agency brisbane | 1,000 | MEDIUM | $12.68 |
| local seo | 880 | LOW | $24.07 |
| social media management | 880 | MEDIUM | $13.51 |
| facebook ads agency | 880 | LOW | $26.91 |
| marketing agency sydney | 880 | HIGH | $17.11 |
| marketing agency melbourne | 880 | HIGH | $23.68 |
| marketing agency australia | 480 | MEDIUM | $11.61 |
| local seo agency | 390 | LOW | $15.39 |
| google business profile optimization (US spelling) | 320 | LOW | $4.78 |
| marketing automation | 320 | MEDIUM | $19.56 |
| **marketing for tradies** | 320 | MEDIUM | $16.54 |
| reputation management | 260 | LOW | $11.28 |
| marketing for dentists | 260 | MEDIUM | $31.58 |
| review management | 210 | LOW | $15.11 |
| google business profile management | 170 | LOW | — |
| meta ads agency | 140 | MEDIUM | $36.55 |
| google reviews management | 140 | LOW | $12.18 |
| lead nurturing | 110 | LOW | — |
| small business marketing | 110 | HIGH | $17.27 |
| google business profile optimisation | 90 | MEDIUM | $11.15 |
| get more google reviews | 50 | MEDIUM | $9.34 |
| social media automation | 40 | HIGH | $8.94 |
| marketing for salons | 40 | LOW | $11.96 |
| marketing for landscapers | 20 | LOW | $7.48 |
| content automation | 10 | LOW | — |

**AU is roughly 6–9x NZ** on every core term, consistent with the pattern already found in the AI-offer report. City modifiers (Sydney/Melbourne/Brisbane) only returned volume on `marketing agency`; GBP-optimisation and local-seo-agency city variants were flat/zero.

---

## 2. Which marketing services have real demand where

| Service | NZ | AU | Read |
|---|---|---|---|
| GBP optimisation / GMB management | Weak on the exact "optimisation" phrase (10–20/mo) but **"google my business management" is real** (210 NZ / 1,000 AU) | Same pattern, bigger | Buyers search the *management* framing far more than "optimisation" — title tags should lead with "management," not "optimisation" |
| Reviews / reputation management | Thin (20–30/mo across all variants) | Real but modest (140–260/mo) | Demand exists but every variant is under 300/mo in AU — a real page, not a headline bet |
| Social media management / automation | Real (170 NZ / 880 AU on "management"; "automation" is thin everywhere, ≤40) | Same | Sell as "management," don't lead with "automation" — nobody searches that phrase |
| Facebook/Instagram/Meta ads management | Agency-intent term ("facebook ads agency") is modest (40 NZ / 880 AU); **"facebook ads management" is huge (1,000 NZ / 6,600 AU) but unverified intent** — see §5 caution | | Biggest single number in the dataset, but flagged, not a "just target it" number |
| Local SEO | Real and sizeable (140 NZ / 880 AU on "local seo"; 50 NZ / 390 AU on "local seo agency") | | Bigger than most of the direct offer terms; worth a page even though it's adjacent to GBP work |
| Lead nurturing / marketing automation | Thin (20–90/mo) | Modest (110–320/mo) | Already functionally covered by `/lead-reactor/`'s copy — not enough independent volume to justify a standalone page |
| Marketing agency / digital marketing agency (generic) | Real (390–720/mo) | **Very large** (3,600–4,400/mo) | Head terms — useful for the hub page, but AU competition is a mix of large agencies and directories (§4); don't expect a quick win here |
| "marketing for tradies" | 10 (thin) | **320 (real, MEDIUM comp)** | **Belongs to tradiefrontdesk.ai per house rule — do not target on systempros.ai despite the real AU volume.** |
| "marketing for dentists" | 10 | 260 (real) | No sister-brand conflict; `/solutions/dental.astro` already exists — a content section there is a low-cost pickup, not a new page |
| "marketing for salons" / "marketing for landscapers" | 10 each | 40 / 20 | Thin at these volumes; existing `/marketing-for-hair-salons` and `/marketing-for-landscaping` pages already cover the angle — no further page investment justified by volume alone |

---

## 3. Keyword ideas (`labs_keyword_ideas`, seeds: "google business profile optimisation", "facebook ads agency", "review management", limit 200 each, filtered to volume ≥20)

NZ returned 96 ideas above the volume floor, AU returned 178. Most of the volume in both lists sits on **generic Google/Meta ads and general "SEO agency/digital agency" terms** that are outside the specific offer list in this brief (e.g. "google ads", "seo agency", "seo company", "seo consultant" pull 1,000–74,000/mo in AU) — these are flagged, not recommended, because System Pros AI's stated offer is GBP/reviews/social/Meta-ads/lead-nurture, not broad organic SEO or Google Ads management. If the client wants to expand into general SEO or Google Ads as a sellable service, this is the evidence it would be worth it; until then these are out of scope.

Standouts that **are** in scope or directly adjacent, not already in §1:

**NZ:**
| Keyword | Volume | Competition | CPC |
|---|---|---|---|
| social media marketing agency | 170 | LOW | $6.93 |
| digital marketing agency auckland | 480 | MEDIUM | $13.26 |
| advertising agency nz | 260 | MEDIUM | $11.33 |
| digital agency nz | 210 | MEDIUM | $11.11 |
| social media optimisation | 170 | LOW | — |
| lead generation agency | 20 | MEDIUM | $9.94 |

**AU:**
| Keyword | Volume | Competition | CPC |
|---|---|---|---|
| social media agency | 1,000 | HIGH | $22.45 |
| social media marketing agency | 1,000 | MEDIUM | $24.92 |
| social media ads | 880 | LOW | $30.27 |
| google ads management | 590 | MEDIUM | $32.24 |
| ppc agency | 590 | MEDIUM | $34.54 |
| ai seo agency | 390 | MEDIUM | $22.12 |
| performance marketing agency | 260 | LOW | $13.48 |
| digital pr | 170 | MEDIUM | $18.60 |
| small business seo agency | 170 | LOW | — |
| b2b seo agency | 110 | MEDIUM | — |

"ai seo agency" (AU 390, MEDIUM) is worth flagging separately: it's the one term in the whole dataset that matches System Pros AI's actual AI-native positioning rather than generic "agency" language — small volume but zero direct-name competitors likely to be fighting for it yet.

---

## 4. SERP snapshot (`serp_google_organic`, depth 10, Auckland + Sydney)

Page-type mix by query (both cities combined):

| Query | Dominant page type | Agency-service pages present? |
|---|---|---|
| google business profile optimisation | Google's own support doc + YouTube + Reddit rank #2–#5; then big-brand educational guides (Shopify, Mailchimp, Semrush, BrightLocal, Forbes-style) | Yes but mid-pack: `adhesion.co.nz` (NZ), `sgd.com.au`, `supple.com.au`, `ventraip.com.au`, `thryv.com.au` (AU) rank #6–11, not top |
| facebook ads agency | **100% commercial** — every result is an agency service page or a "best agencies" listicle | Yes, dominant: `adspaceagency.com`, `nikaconsulting.co.nz`, `sprocketdigital.co.nz`, `tractionmarketing.nz`, `numeroagency.co.nz` (NZ); `soupagency.com.au`, `firstpage.com.au`, `mojodojo.io`, `kingkong.co`, `onlinemarketinggurus.com.au`, `rankmybusiness.com.au` (AU) |
| review management | Mixed SaaS/education (inmoment.com, Google support, Forbes, HubSpot, Sprinklr, QuestionPro) plus a handful of local players (`webgenius.co.nz`, `juicycrm.nz`; `capterra.com.au`, `nextiva.com`, `thryv.com.au`, `shapo.io`, `podium.com.au`) | Present but not dominant — softest competition of the four terms checked |
| local seo agency | **Directory/listicle-heavy** — "top 7", "best of" pages (`nikaconsulting.co.nz` top-7, `fourstripes.co.nz`, `themanifest.com`, `agencies.semrush.com`, `outreachrush.com`) alongside real agencies (`mybrande.co.nz`, `impressive.com.au`, `clickclickmedia.com.au`, `sentius.com.au`, `localsearch.com.au`, `kiaoradigital.com.au`, `rocketagency.com.au`) | Yes, dense — hardest SERP of the four to break into on page count alone |

**PAA questions (verbatim, deduped across cities):**

- **google business profile optimisation:** "What does Google Business Profile Optimization do?" / "How much does it cost to optimize a Google My Business profile?" / "How can I optimize my Google My Business page?" / "Is SEO still worth it in 2026?"
- **facebook ads agency:** "How much do Facebook ad agencies charge?" / "What are the big 4 ad agencies?" / "Is $500 enough for Facebook ads?" / "Can I get an agency ad account for Facebook?"
- **review management:** "What is review management?" / "How do I manage my Google reviews?" / "What are the best review management platforms?" / "What are 5 star reviews examples?"
- **local seo agency:** "How much should I pay for local SEO?" / "How much does it cost to hire an SEO agency?" / "Is SEO dead now with AI?" / "How to get a local SEO?"

**Pricing is the dominant PAA pattern again** — same finding as the AI-offer report (§5 there). Every one of these four pages needs a visible, specific pricing or pricing-range section; `/pricing` currently exists on-site but should be linked from every new marketing page.

---

## 5. Caution: "facebook ads management" (1,000 NZ / 6,600 AU, LOW competition)

This is the single largest number in the dataset and wasn't SERP-checked in this run (the $1.50 budget only covered the four named seed queries). Two reasons to treat it carefully before writing a title tag around it:

1. It's ~8–20x the volume of "facebook ads agency," which is suspicious for a head term in this space — "management" head terms often mix in DIY searchers ("how do I manage my own Facebook ads") alongside hire-intent, whereas "facebook ads agency" is unambiguous hire-intent (confirmed 100% commercial SERP in §4).
2. Competition is LOW in both countries, which is consistent with either a genuine gap or a term Google doesn't consider high commercial value.

**Recommendation:** use "facebook ads management" as a secondary/meta-description term on the new Meta-ads page, but keep "facebook ads agency" as the primary H1/title target since its SERP is confirmed 100% agency-service intent. Run a dedicated SERP check on "facebook ads management" before committing budget to content built specifically around it.

---

## 6. Proposed Marketing page set

One hub + five service pages, matching the offer categories with real, verified demand (§2). Lead nurturing/marketing automation is deliberately **not** a standalone page — volume is thin (20–320/mo) and `/lead-reactor/`'s existing copy ("multichannel AI outreach... under 10-second response time") already functionally covers it.

| # | Page | Primary keyword | Secondary keywords | Suggested title (≤60 chars) | Suggested H1 | Connects to |
|---|---|---|---|---|---|---|
| 0 | `/marketing/` (hub) | digital marketing agency (AU 4,400 / NZ 720) | marketing agency, small business marketing, ai seo agency | **"AI-Native Marketing for Local Businesses"** (40) | "The AI-Native Marketing Agency for Local Businesses" | Links to all 5 pages below + `/lead-reactor/`, `/consulting/`, `/marketing-for-*` |
| 1 | `/marketing/google-business-profile` | google my business management (AU 1,000 / NZ 210) | google business profile optimisation/optimization, google business profile management | **"Google Business Profile Management"** (34) | "Google Business Profile Management & Optimisation" | `/marketing/local-seo` (avoid content overlap — link, don't duplicate), `/marketing/` hub |
| 2 | `/marketing/reviews-reputation` | review management (AU 210 / NZ 30) | reputation management, get more google reviews, google reviews management | **"Review & Reputation Management"** (30) | "Get More 5-Star Reviews, Automatically" | `/marketing/google-business-profile` (reviews live on GBP), `/marketing/` hub |
| 3 | `/marketing/social-media-management` | social media management (AU 880 / NZ 170) | social media automation, content automation, social media marketing agency | **"Social Media Management & Automation"** (36) | "Social Media Management, On Autopilot" | `/marketing/facebook-instagram-ads`, `/marketing/` hub |
| 4 | `/marketing/facebook-instagram-ads` | facebook ads agency (AU 880 / NZ 40) | meta ads agency, instagram ads, facebook ads management (secondary only — see §5) | **"Facebook & Instagram Ads Agency"** (31) | "Meta Ads Management That Feeds Your Pipeline" | `/lead-reactor/` (post-click follow-up — see cannibalisation note below), `/marketing/social-media-management` |
| 5 | `/marketing/local-seo` | local seo agency (AU 390 / NZ 50) | local seo (AU 880 / NZ 140) | **"Local SEO Agency"** (16) | "Local SEO That Gets You Found First" | `/marketing/google-business-profile`, `/marketing/` hub |

**Cannibalisation call — "facebook ads agency" vs `/lead-reactor/`:** `/lead-reactor/`'s current title is "Speed to Lead: Meta Ads to Booked Calls" and its H1/description are entirely about what happens *after* the ad click (multichannel voice/SMS/WhatsApp follow-up under 10 seconds) — it does not claim to run the ads themselves. The new `/marketing/facebook-instagram-ads` page should own "run/manage my ads" intent (facebook ads agency, meta ads agency) while `/lead-reactor/` keeps "speed to lead" and "what happens after the click." Cross-link both ways: the new page's CTA should reference Lead Reactor for the follow-up half of the funnel, and Lead Reactor's intro should reference the ads-management page for anyone who needs the ads run too. No keyword overlap exists between them today, so this is a design decision to make now, before both pages exist, not a fix.

**PAA to answer per page** (from §4, reuse verbatim where the page matches; write new ones for pages 2 and 3 which weren't SERP-checked in this budget):
- Page 1 (GBP): "What does Google Business Profile Optimization do?", "How much does it cost to optimize a Google My Business profile?", "How can I optimize my Google My Business page?"
- Page 2 (Reviews): "What is review management?", "How do I manage my Google reviews?", "What are the best review management platforms?"
- Page 4 (Ads): "How much do Facebook ad agencies charge?", "Is $500 enough for Facebook ads?" (reframe as a budget-qualifying FAQ)
- Page 5 (Local SEO): "How much should I pay for local SEO?", "How much does it cost to hire an SEO agency?"

**How the existing `/marketing-for-*` pages should connect:** `/marketing-for-hair-salons`, `/marketing-for-landscaping`, `/marketing-for-plumbing` stay as industry-specific landing pages — consistent with the AI-offer report's finding that industry-vertical pages carry no supporting exact-match search volume and should be treated as outbound/ad landing pages, not organic bets. The `/marketing/` hub and its five service pages should link *out* to these three pages as "see how this works for [industry]" cross-links, not the reverse. Do **not** add "marketing for tradies" language anywhere on systempros.ai despite its real AU volume (320/mo) — that belongs to tradiefrontdesk.ai per house rule. "marketing for dentists" (AU 260) has no such conflict and is a lower-cost pickup as a new section on the existing `/solutions/dental.astro` page rather than a new URL.

---

## 7. Prioritised recommendations

1. **Build `/marketing/google-business-profile` and `/marketing/reviews-reputation` first** — combined they cover the two biggest specific-service volume numbers after the ads-management caution (§5), and both have softer SERPs (mixed informational/commercial, not pure listicle-agency pages like local-seo-agency).
2. **Title the GBP page around "management," not "optimisation."** "google my business management" (1,000 AU / 210 NZ) outsizes "google business profile optimisation" (90 AU / 10 NZ) by roughly 10x — the current draft title above already reflects this, flagging it so it doesn't get re-drafted back to "optimisation" during copywriting.
3. **Do not build a page around "facebook ads management"** (1,000 NZ / 6,600 AU) without a follow-up SERP check — see §5. Use "facebook ads agency" as the verified primary keyword for page 4 instead.
4. **Resolve pricing transparency before publishing any of these five pages.** "How much does X cost / how much should I pay" is the dominant PAA pattern across all four SERP-checked terms (§4), matching the same finding already logged against the AI-offer pages in `2026-09-25-sp-keywords.md` §10.6 — this is now confirmed across both offer categories, not specific to AI products.
5. **Hold "marketing for tradies" off systempros.ai entirely**, despite it being the single largest industry-combo number found (AU 320) — it belongs to tradiefrontdesk.ai per the house rule, and diluting that boundary risks confusing the two brands' positioning.
6. **Treat "seo agency" / "seo company" / "seo consultant" / "google ads management" (AU 1,600–4,400/mo) as evidence for a possible future service, not a page to build now** — none of these are in System Pros AI's current offer list; building content for them would be selling a service that doesn't exist yet.
7. **Don't build a standalone lead-nurturing/marketing-automation page.** Combined volume (20–320/mo across NZ/AU) is thin next to the five services above, and `/lead-reactor/` already functionally owns this space — a metadata/copy pass on the existing page (adding "lead nurturing" and "marketing automation" as secondary terms) captures the term family without a new URL.

---

*Report generated 2026-09-25. All volumes are DataForSEO Google Ads historical search volume (live), not estimates. No keyword volumes were invented; every number traces to a specific API call logged in the cost breakdown above.*
