# System Pros AI — Websites, Google Ads & "Marketing Agency" Keyword + GBP Research, 2026-09-25

**Budget cap:** US$0.90. **Account balance at start:** $1.9649 (DataForSEO login altussnyman@gmail.com). **Actual spend this run: $0.2440** (27% of cap). Cost was printed after every call; no single call exceeded $0.09. Balance remaining after run: ~$1.72.

Spend breakdown: `keywords_search_volume` NZ (40 terms) $0.09 · `keywords_search_volume` AU (42 terms) $0.09 · `serp_google_organic` depth 10 ×5 calls (4 planned + 1 extra to resolve the client's own GBP cid — see §5) $0.01 · `business_data/my_business_info` ×10 billed calls at $0.0054 each ($0.054 total) — 3 successful competitor lookups plus 7 attempts across different keyword/location combinations to resolve the client's own "Ai and Automation Agency" listing, none of which returned a profile (see data gap note below).

Raw data (gitignored, local only): `tools/dataforseo/outputs/2026-09-25-sp-websites-ads-agency-{nz,au}-websites-ads-agency.csv`, `2026-09-25-sp-serp-{web-design-auckland,marketing-agency-auckland,google-ads-agency-nz,web-design-sydney}.csv`, `2026-09-25-sp-serp-raw.json`, `2026-09-25-sp-my-business-info-{systempros,naked-marketing,marketing-minds,adcelerate}.csv`, `2026-09-25-sp-my-business-info-raw.json`.

**Data gap flagged up front:** `business_data/my_business_info` could not return a profile for "Ai and Automation Agency" under five different keyword/location combinations (exact name, name + NZ, name + "Auckland,Auckland,New Zealand", name + "systempros.ai", "systempros.ai" alone) — the API's live Google query for that exact name doesn't surface a Knowledge Panel today, even though the business does appear as a local-pack tile at #2/3 for "ai automation agency" (confirmed again in this run, cid `6678588339145064926`, rating 5.0/17 — matches `2026-09-25-sp-keywords.md` §5–6 exactly). The GBP section below is therefore built from that confirmed rating/category data plus the three competitor profiles that *did* return full data, not from a fresh full pull of the client's own listing. **Recommend a manual GBP dashboard login to verify current category, description, services, and URLs before acting on the FIX list in §6** — nothing there was invented, but "current state" for the client's own listing is inferred from the local + tech audits already in `plan.md` §1 finding #1, not re-verified live today.

---

## 1. Search volume — website design terms

### New Zealand (location 2554, top by volume)

| Keyword | Volume | Competition | CPC |
|---|---|---|---|
| web design auckland / website design auckland | 9,900 each | LOW | $10.76 |
| website builder | 1,600 | MEDIUM | $23.07 |
| web design / website design / web designer / website designer | 1,300 each | MEDIUM | $12.49 |
| website design nz | 1,000 | MEDIUM | $13.16 |
| web development | 480 | MEDIUM | $13.42 |
| web development nz | 320 | HIGH | $10.14 |
| wordpress website | 260 | MEDIUM | $6.83 |
| web design nz | 260 | MEDIUM | $6.46 |
| website designer nz | 260 | HIGH | $11.33 |
| web design agency | 170 | LOW | $8.15 |
| web design agency auckland | 110 | MEDIUM | — |
| small business website / website for small business | 90 each | MEDIUM | $8.64 |
| landing page design | 50 | LOW | $4.47 |
| web design agency nz | 20 | LOW | — |

**Caution:** "web design auckland" and "website design auckland" both returned exactly **9,900** — identical to the decimal point across two different query strings. That pattern is characteristic of Google Ads Keyword Planner bucketing broad, closely-related queries into one volume figure rather than two genuinely independent 9,900/mo searches. The SERP check in §3 confirms the *intent* behind this cluster is real and 100% commercial (nine of nine organic results are agency service pages), but treat the magnitude as directional, not literal — it should not be quoted to the client as "9,900 exact searches/month for each phrase."

**Exclude from targeting:** "website builder" (NZ 1,600 / AU 9,900) is DIY-tool intent (Wix, Squarespace, Rocketspark) — confirmed by `rocketspark.com` ranking #6 in the live "web design auckland" SERP — not hire-an-agency intent. Don't use it as a primary or secondary keyword.

### Australia (location 2036, top by volume)

| Keyword | Volume | Competition | CPC |
|---|---|---|---|
| website builder | 9,900 | MEDIUM | $20.24 |
| web design / website design / web designer / website designer | 6,600 each | MEDIUM | $16.82 |
| web development | 2,400 | LOW | $14.28 |
| website design sydney | 2,400 | MEDIUM | $29.37 |
| web design brisbane | 2,400 | MEDIUM | $31.44 |
| web design melbourne | 1,900 | MEDIUM | $16.80 |
| website design melbourne | 1,300 | HIGH | $34.88 |
| web design agency | 1,000 | LOW | $11.58 |
| wordpress website | 1,000 | MEDIUM | $15.31 |
| web design sydney | 1,000 | MEDIUM | $8.14 |
| web design australia / website design australia / website designer australia | 480 each | MEDIUM | $26.39 |
| small business website / website for small business | 390 each | MEDIUM | $19.72 |
| landing page design | 320 | LOW | $4.31 |
| web development australia | 260 | MEDIUM | $9.30 |
| web design agency australia | 90 | MEDIUM | $5.96 |

AU runs 5–7x NZ on the core website-design terms, consistent with every other keyword report run for this client. City-level demand (Sydney, Melbourne, Brisbane) is real and large — bigger individually than most of the AI-offer terms sized in the earlier report.

---

## 2. Search volume — Google Ads terms

### New Zealand

| Keyword | Volume | Competition | CPC |
|---|---|---|---|
| google ads agency | 260 | LOW | $25.43 |
| advertising agency nz | 260 | MEDIUM | $11.33 |
| advertising agency | 170 | MEDIUM | $8.88 |
| google ads specialist | 110 | LOW | $14.94 |
| google ads agency auckland | 90 | LOW | — |
| google ads management | 70 | LOW | $49.14 |
| ppc agency | 50 | LOW | — |
| google ads agency nz | 50 | MEDIUM | $17.72 |
| ppc agency nz | 30 | LOW | — |
| google ads management nz | 20 | HIGH | — |
| paid ads agency | 10 | LOW | — |
| ppc agency auckland | — (no measurable volume) | | |

### Australia

| Keyword | Volume | Competition | CPC |
|---|---|---|---|
| google ads agency | 1,300 | MEDIUM | $35.27 |
| advertising agency | 1,000 | MEDIUM | $28.18 |
| google ads management | 590 | MEDIUM | $32.24 |
| ppc agency | 590 | MEDIUM | $34.54 |
| google ads specialist | 390 | MEDIUM | $65.83 |
| google ads agency sydney | 390 | MEDIUM | $42.79 |
| advertising agency australia | 210 | MEDIUM | $18.90 |
| ppc agency sydney | 210 | LOW | — |
| google ads agency australia | 110 | MEDIUM | — |
| paid ads agency | 40 | MEDIUM | $21.62 |
| ppc agency australia | 50 | LOW | — |
| google ads management australia | 20 | LOW | — |

AU "google ads agency" (1,300/mo, MEDIUM competition, $35 CPC) is the single biggest un-served number in this whole run — no page on systempros.ai targets it today, and the site already has a Google Ads-adjacent proof point (the client runs Google Ads for clients per this task's brief) with nowhere to point it.

---

## 3. Search volume — "marketing agency" terms (supplementary to the existing `/marketing/` hub, which already targets "digital marketing agency")

| Keyword | NZ | AU |
|---|---|---|
| marketing agency auckland | 320 (HIGH comp) | — |
| digital marketing agency auckland | 480 | — |
| digital marketing agency nz / australia | 390 | 1,000 |
| marketing agency nz / australia | 140 | 480 |
| marketing agency sydney | — | 880 (HIGH) |
| marketing agency melbourne | — | 880 (HIGH) |
| marketing company nz / australia | 90 | 110 |
| online marketing nz / australia | 260 | 140 |

(Bare "marketing agency" — 390 NZ / 3,600 AU — and "marketing agency brisbane" 1,000 AU were sized in the prior `2026-09-25-sp-marketing-keywords.md` run; not re-billed here.) City-level "marketing agency" terms (Auckland/Sydney/Melbourne, 320–880/mo, mostly HIGH competition) are real but sit on top of a page the site already has — see §5.

---

## 4. Which of the three offers have real demand, and where

| Offer | NZ | AU | Read |
|---|---|---|---|
| **Website design (new-build)** | Real (web design/website design 1,300/mo; auckland-modified cluster large but volume-inflated, see §1 caution) | **Strong** (6,600/mo core terms, 5–7x NZ, plus large individual city numbers Sydney/Melbourne/Brisbane 1,000–2,400/mo each) | Confirmed commercial via SERP (§3.1) — this is real hire-a-designer demand, distinct from the "fix my existing site" demand `/lead-gen-websites/` already targets |
| **Google Ads (running the ads)** | Modest (google ads agency 260, advertising agency 170–260) | **Real and currently unserved** (google ads agency 1,300, ppc agency 590, google ads management 590 — all MEDIUM competition, no page targets any of them) | The clearest "cheap win, nobody's home" finding in this report — site already has the FB/IG ads page, has no Google Ads page |
| **"Marketing agency" (generic/city)** | Real but sits on an existing page (`/marketing/`) | Real and large (3,600–4,400/mo bare term, plus 480–1,000/mo city terms) | Not a new-page opportunity — see cannibalisation call in §5 |

**Bottom line:** two of the three ("web design" and "google ads agency") are genuine, currently-uncaptured demand that justify new pages. The third ("marketing agency") is real demand the site is already positioned to capture through `/marketing/` — the fix there is copy/title reinforcement, not a new URL.

---

## 5. SERP snapshot (`serp_google_organic`, depth 10)

| Query | Location | Top-10 page-type mix | PAA (verbatim) | systempros.ai present? |
|---|---|---|---|---|
| web design auckland | Auckland | 9/9 organic = agency service/portfolio pages (thewebguys.co.nz, smallbusinesswebdesigns.co.nz, zestydesign.co.nz, whiterabbit.nz, hartdesign.co.nz, toogooddigital.co.nz, geekfreewebdesign.co.nz) + 1 "top rated" listicle (moneyhub.co.nz) + 1 page-builder SaaS (rocketspark.com). 3-tile local pack: Small Business Web Designs (4.9★/105), The Web Guys NZ (4.9★/142), Geek Free Limited (4.9★/56) | "Is web design still worth it in 2026?" / "How much should a full website design cost?" / "What is the best website builder in New Zealand?" / "What does a web designer do?" | No |
| marketing agency auckland | Auckland | 9/9 organic = agency pages (tiberius.co.nz, fabricdigital.co.nz, mediar.co.nz, maxmarketing.co.nz, ppchero.co.nz, adcelerate.co.nz, broaden.nz) + 1 staffing-firm listicle (revenuebase.ai) + 1 directory (clutch.co). 3-tile local pack: **Naked Marketing (5.0★/85), Marketing Minds NZ (4.9★/58), Adcelerate Ltd (4.9★/76)** | "Is it worth it to hire a marketing agency?" / "How much does it cost to hire a marketing agency?" / "What are some famous advertising agencies in New Zealand?" / "What are the big 5 marketing companies?" | No (organic or local pack) |
| google ads agency nz | Auckland | 9/9 organic = agency service pages (firstpage.nz, likeablelab.com, impacto.co.nz, fabricdigital.co.nz, numeroagency.co.nz, wildseacreative.co.nz, stormimc.co.nz) + 1 directory (clutch.co) + 1 Facebook thread. 3-tile local pack: TooGood, **Adcelerate Ltd**, numero® | "How much does a Google Ads agency cost?" / "Is $500 a month enough for Google Ads?" / "How much do Google Ads cost in NZ?" / "How much should I pay someone to manage my Google Ads?" | No |
| web design sydney | Sydney | 9/9 organic = agency service/listicle pages (fireflydigital.net.au, webics.com.au, realweb.com.au, mattangel.com.au, thead.com.au, emediacreative.com.au, aiad.com.au, ebpearls.com.au) + 1 freelance marketplace (airtasker.com). 3-tile local pack: Small Business Web Designs (4.9★/130), Spark Interact (5.0★/81), Chromatix Web Design (5.0★/21) | "How much does it cost to design a website in Sydney?" / "How much should I pay a website designer?" / "Is web design still in demand in 2026?" / "How much should a full website design cost?" | No |

**Pattern, same as both prior reports:** "how much does it cost" dominates every PAA set. Every one of these four page-type mixes is fully commercial (no informational/SaaS results breaking in, unlike the softer GBP/reviews SERPs from the marketing report) — meaning these are hard, agency-saturated SERPs to rank into organically, not soft ones. systempros.ai appears in none of the four — organic or local pack.

**Adcelerate Ltd appears in two separate local packs** (marketing agency auckland *and* google ads agency nz) — it's the one competitor operating across both categories the client now wants to be found for, and is the closest existing comparable to System Pros AI's "websites + ads + marketing" combined positioning (its own GBP description confirms: "Google Ads, SEO, Social Media Marketing, Website Design & Development and more").

---

## 6. Proposed pages

### 6a. `/marketing/google-ads/` — **NEW, recommended for round 1**

| Field | Value |
|---|---|
| Primary keyword | google ads agency (AU 1,300 / NZ 260) |
| Secondary keywords | google ads management (AU 590 / NZ 70), ppc agency (AU 590 / NZ 50), google ads specialist (AU 390 / NZ 110), google ads agency auckland / sydney |
| Title (34 chars) | **"Google Ads Agency \| System Pros AI"** |
| H1 | "Google Ads Management That Feeds Your Pipeline" |

**Cannibalisation call — none.** `/marketing/facebook-instagram-ads/` owns Meta platform intent ("facebook ads agency," "meta ads agency," "instagram ads"); this page would own Google Search/PPC platform intent. No keyword overlap exists between the two term sets in §2 vs. the FB/IG page's existing terms. Structure it as the natural pair to the FB/IG page (cross-link both ways under a shared "Paid Ads" section on the `/marketing/` hub), and reuse the same pattern the FB/IG page already established: campaigns run inside the client's own Google Ads account, leads handed to `/lead-reactor/` for follow-up, fixed monthly fee separate from ad spend. This is the single cleanest addition to the round-1-approved marketing page set in `plan.md` §8 — it fills a real, MEDIUM-competition, currently-empty slot next to a page that already exists in the same content family.

### 6b. `/websites/` (or `/web-design/`) — **NEW, recommend round 2 (needs a short product-copy pass, not just metadata)**

| Field | Value |
|---|---|
| Primary keyword | web design (NZ 1,300 / AU 6,600) — "website design" is exactly tied in volume in both countries; pick "web design" as the canonical H1/title term for brevity |
| Secondary keywords | web designer / website designer (same volume), web design agency (NZ 170 / AU 1,000), wordpress website (NZ 260 / AU 1,000), web design sydney (AU 1,000), web design agency australia/nz |
| Title (46 chars) | **"Website Design & Build Agency \| System Pros AI"** |
| H1 | "A new website that gets found and books the job." |

**Cannibalisation call — this is the important one.** `/lead-gen-websites/` today is explicitly framed around **not** building a new site — its FAQ says verbatim: *"Do I need a new website? No. We re-engineer the website you already have — adding the forms, calendar, widgets and automation it's missing — rather than starting over from scratch."* (`src/pages/lead-gen-websites.astro` lines 18–20). Someone searching "web design auckland" or "website designer" wants the opposite: a new site built. Putting that FAQ answer in front of a new-build searcher actively contradicts their intent and would hurt conversion, not just dilute keyword targeting.

This task's brief confirms the owner does build new websites as well as re-engineer existing ones, so the service exists — the site's copy is just narrower than the offer. Recommendation:
1. **Do not retarget `/lead-gen-websites/`** at "web design" keywords — keep it exactly as-is for the "fix what I already have" segment; it's already correctly positioned and (per `2026-09-25-sp-keywords.md` §9) already carries "lead generation website" as its own primary term.
2. **Build a separate new page** for "design and build me a new site" intent, cross-linked both directions with a one-line qualifier on each ("Already have a site that just needs fixing? → Lead Gen Websites" / "Starting from scratch? → Website Design").
3. **Soften `/lead-gen-websites/`'s FAQ answer** from a flat "No" to something that doesn't turn away new-build searchers who land there anyway (mechanical/Haiku-level copy edit, not a new page) — e.g. acknowledge both paths and link to the new page.

### 6c. `/marketing/` hub — no new URL; reinforce existing page instead

**Cannibalisation call.** The hub already exists at `/marketing/`, already targets "digital marketing agency" (AU 4,400 / NZ 720, per `plan.md` §8) as its primary keyword, and its `ServiceSchema` `serviceType` is already `"MarketingAgency"`. The fresh volume in §3 confirms bare "marketing agency" (AU 3,600 / NZ 390) and the city variants (Auckland 320, Sydney/Melbourne 880 each) are real and larger in AU than "digital marketing agency" itself for the city terms — but they're a **restatement of the same buyer intent** the hub already targets, on the same page's natural territory. Building a second URL for "marketing agency" against a live `/marketing/` hub would be direct self-competition for an identical search intent.

**Recommendation:** add "marketing agency" as an explicit secondary keyword in the hub's meta description and body copy (it currently leads only with "AI-native" and "digital marketing agency" framing), and add one short section naming Auckland/Sydney/Melbourne explicitly to pick up the city-level searches — as a section on the existing page, not a new URL. No title change needed; the current title ("AI-Native Marketing for Local Businesses | System Pros AI") already reads naturally for both terms.

---

## 7. Google Business Profile optimisation — "Ai and Automation Agency" listing

Built from: the confirmed rating/cid data in this run (§5, local-pack tile, 5.0★/17 reviews, cid `6678588339145064926`), the three competitor profiles pulled via `business_data/my_business_info` this run, `plan.md` §1 finding #1 and §2b (owner-approved decisions on naming), and `plan.md` §1 finding #13 (GBP not yet connected in GoHighLevel). **The client's own current category/description/services/URLs could not be re-confirmed live via API this run (see data gap note above) — verify each "current state" assumption below in the GBP dashboard before editing.**

### Competitor category comparison (top 3 local-pack results for "marketing agency auckland")

| Business | Primary category | Additional categories | Rating | Photos |
|---|---|---|---|---|
| Naked Marketing | Marketing agency | Advertising agency, Copywriting service, Graphic designer, Internet marketing service, Marketing consultant, Photography service, Web hosting company, Website designer (8) | 5.0★/85 | 165 |
| Marketing Minds NZ | Marketing agency | E-commerce agency, Service establishment, Internet marketing service, Marketing consultant, Media consultant (5) | 4.9★/58 | 20 |
| Adcelerate Ltd | Advertising agency | Internet marketing service, Marketing agency, Web hosting company (3) | 4.9★/76 | 27 |

All three stack 3–8 additional categories, and all three include categories that map directly to a website-design and internet-marketing offer, not just "marketing agency" alone. This is the benchmark for the FIX list below.

### OK / FIX list

| # | Item | Status | Recommendation (exact wording where applicable) |
|---|---|---|---|
| 1 | Primary category | **FIX** (unverified current value — plan.md records it as "Marketing agency") | Given the business now sells AI systems, websites, marketing *and* ads, keep primary as **"Marketing agency"** only if Google doesn't offer a closer AI/consulting category; the closer fit is **"Business management consultant"** (matches `plan.md`'s original default and the AI-consulting core offer). Decide with Altus which one drives more of the actual lead volume today before switching primary — switching primary categories can cause a short-term ranking dip, so this is the one item worth a manual check first, not a blind swap. |
| 2 | Secondary/additional categories | **FIX** | Add, in this order: **Advertising agency** (matches the ads offer and Adcelerate's primary category), **Software company** (matches AI systems/OpenClaw), **Website designer** (matches the new website-design page in §6b), **Internet marketing service** (matches the `/marketing/` hub), **Marketing consultant**. That's 5 additional categories — mid-pack against competitors' 3–8. |
| 3 | Business description | **FIX** (current text unverified — see data gap note; treat this as a full replacement, not a diff) | 737 characters: *"System Pros AI is the AI systems and marketing practice of Ai and Automation Agency Ltd, based in Auckland, serving New Zealand and Australia. We build AI voice receptionists, AI consulting and automation systems, and websites that book jobs — then run the marketing that keeps the pipeline full: Google Business Profile management, review generation, social media posting, and Google and Meta ads. Ai and Automation Agency Ltd is also the team behind Tradie Front Desk (AI front-desk systems for trades) and Chiron Strategy Group. Every engagement starts with a free consultation and a fixed price. If missed calls, a slow website, or marketing you don't have time to run are costing you jobs, book a free consultation at systempros.ai."* — names System Pros AI in sentence one, links Tradie Front Desk and Chiron Strategy Group per the existing umbrella-brand relationship already documented in `plan.md` finding #1, and doesn't invent any service not already confirmed in `plan.md` §2b or this task's brief. |
| 4 | Services list | **FIX** | AI Voice Receptionist · AI Consulting & Automation · Website Design & Build · Google Business Profile Management · Review & Reputation Management · Social Media Management · Facebook & Instagram Ads Management · Google Ads Management — matches the round-1 marketing page set in `plan.md` §8 plus the two new pages proposed in §6. |
| 5 | Website URL | **FIX (verify)** | Should be `https://systempros.ai/` exactly (not a UTM-tagged or www variant) — could not confirm current value live; check in dashboard. |
| 6 | Appointment URL | **FIX** | Point to `https://systempros.ai/contact/` (the page already running the GoHighLevel booking calendar per `plan.md` finding #13) — appointment links are a distinct GBP field from the website URL and are frequently left blank; if it's currently empty, that's a directly measurable missed-booking gap given "how much does it cost" / booking-intent PAA dominates every SERP in this and the prior two reports. |
| 7 | Service areas | **FIX (verify)** | Should list **New Zealand** (nationwide, not just Auckland) and **Australia** (nationwide or, if the field requires discrete areas, Sydney/Melbourne/Brisbane/Auckland) rather than a tight local radius — this is a remote-delivered service business per the AU/NZ market split already agreed in `plan.md` §2b, not a walk-in Auckland storefront. A radius-only service area is very likely under-representing the actual sellable area today. |
| 8 | Attributes | **FIX (verify after category change)** | Competitors carry service_options (`offers_online_appointments`), and Naked Marketing additionally carries accessibility/amenities/crowd attributes appropriate to a physical office. As a remote consulting/software business, the relevant attribute to confirm is **"Online appointments"** — accessibility/amenities/crowd attributes don't apply and shouldn't be added just to pad the profile. Note: available attributes are gated by category, so re-check this list after item #2's category changes take effect. |
| 9 | Photos | **FIX** | Competitors run 20–165 photos; own-listing photo count could not be confirmed this run. Minimum plan: logo, a cover/hero image, 3–5 team or founder photos, 3–5 "product" screenshots (dashboard/booking-flow/AI receptionist call transcript), and before/after website screenshots once the `/websites/` page ships — matches the "prove it, don't just claim it" gap flagged in `plan.md` finding #8. |
| 10 | Posts (Google Updates) | **FIX — blocked on an owner action, not a code change** | `plan.md` finding #13 already confirms Google Business Profile is **not connected** in GoHighLevel, so no posting cadence can start until Altus connects it there (explicitly an account action per the plan's guardrails — not something to attempt via API). Once connected, a weekly post cadence (new page launches, a client result, a service reminder) is the standard follow-up. |
| 11 | `sameAs` / Maps URL in schema | **OK — already planned** | `plan.md` §2b already commits to adding the Google listing's Maps URL to the site's `sameAs` array and removing the incorrect LinkedIn link; no new recommendation needed here, just confirming this GBP research doesn't change that decision. |

---

## 8. Prioritised recommendations

1. **Build `/marketing/google-ads/` in round 1.** Real AU demand (1,300/mo "google ads agency", MEDIUM competition), zero cannibalisation with the existing FB/IG ads page, and the client already runs Google Ads for clients per this task's brief — the offer exists, the page doesn't.
2. **Scope `/websites/` as a round-2 build**, not a metadata-only change — it needs its own copy distinct from `/lead-gen-websites/`'s "we don't build new sites" framing, or the page will actively repel the exact searcher it's meant to convert.
3. **Soften the "Do I need a new website?" FAQ on `/lead-gen-websites/`** now, as a small mechanical fix, regardless of when `/websites/` ships — the current flat "No" is honest today but will misdirect any new-build searcher who lands there via search or a future `/websites/` cross-link.
4. **Do not build a standalone "marketing agency" page.** Add it as a secondary term and a city-named section to the existing `/marketing/` hub instead — a second URL would compete with a live page for the same intent.
5. **Verify the GBP listing's current category, description, services, website/appointment URLs, service area, and photo count manually** before acting on §7 — the API could not return the client's own profile this run (data gap noted up front), so every "FIX" there is built from the last confirmed audit plus fresh competitor benchmarking, not a fresh direct read.
6. **Treat the "9,900" web-design-Auckland volume figure as directional only** when discussing this with the client — the identical figure across two distinct query strings is a keyword-tool bucketing artifact, not confirmation of 9,900 literal monthly searches for each phrase.
7. **Flag Adcelerate Ltd as the one existing competitor to watch across both new pages** — it's the only business in this dataset ranking in local packs for both "marketing agency auckland" and "google ads agency nz," and its own GBP description already claims the combined "Google Ads, SEO, Social Media, Website Design" positioning System Pros AI is moving toward.

---

*Report generated 2026-09-25. All volumes are DataForSEO Google Ads historical search volume (live), not estimates. All SERP and GBP data is live-pulled and cited to its API call. No keyword volumes, competitor facts, or business details were invented; the one confirmed gap (client's own GBP profile not returned by the API this run) is flagged, not filled in.*
