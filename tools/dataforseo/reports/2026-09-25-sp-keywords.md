# System Pros AI — Keyword Research (DataForSEO), 2026-09-25

**Budget cap:** US$4.00. **Account balance at start:** $3.14 (DataForSEO login altussnyman@gmail.com). **Actual spend this run: $0.89** (28% of cap, 28% of balance). Balance remaining after run: ~$2.25. Cost was tracked and printed after every call; no single call exceeded $0.09.

Spend breakdown: search volume (5 calls incl. the OpenClaw long-tail add-on) $0.54 · SERP organic (11 calls) $0.037 · SERP Maps (2 calls) $0.004 · Google Trends (2 calls) $0.022 · Labs ranked_keywords (10 calls: 4 own domains + 6 competitors) $0.1765 · Labs keyword_ideas (2 calls) $0.096.

Raw data: `tools/dataforseo/outputs/2026-09-25-sp-volume-{nz,au,us,openclaw}.csv`, `2026-09-25-sp-keyword-ideas-relevant.csv`, `2026-09-25-sp-ranked-competitors.csv` (gitignored, local only).

---

## 0. Headline finding: OpenClaw is the real demand driver, and it's not being captured

`openclaw` alone returns **246,000/mo US, 27,100/mo AU, 4,400/mo NZ** search volume — this checks out against SERP data (docs.openclaw.ai, Reddit threads, MakeUseOf reviews, Kimi.ai comparison articles all rank), confirming OpenClaw is a genuinely viral open-source AI agent project right now, consistent with the "247,000+ GitHub stars" claim in PRODUCT.md. The bare term is uncapturable (it's a head-term competing directly with the project's own docs site), but the long-tail modifiers that the site *already has dedicated pages for* carry real, largely untapped volume:

| Keyword | US | AU | NZ | Existing page |
|---|---|---|---|---|
| what is openclaw | 18,100 | 1,600 | 260 | `/openclaw/index.astro` — not currently targeting this exact phrase in title |
| openclaw skills | 5,400 | 590 | 90 | `/openclaw/skills.astro` |
| openclaw install | 2,900 | 390 | 50 | no dedicated page — folds into setup-guide |
| openclaw setup | 1,300 | 170 | 20 | `/openclaw/setup-guide.astro` |
| openclaw use cases | 1,300 | 170 | 20 | `/openclaw/use-cases.astro` |
| openclaw pricing | 590 | 90 | 10 | **no page exists** |
| openclaw telegram | 590 | — | 10 | no page exists |
| openclaw whatsapp | 480 | 70 | 10 | no page exists |
| openclaw setup guide | 260 | 40 | 10 | `/openclaw/setup-guide.astro` |
| openclaw vs chatgpt | 90 | 10 | 10 | `/openclaw/vs-chatgpt.astro` |
| openclaw for business | 40 | 10 | 10 | `/openclaw/for-business.astro` |

Confirmed via `labs_ranked_keywords`: **systempros.ai has zero ranked keywords in DataForSEO's index for NZ or AU** (same for tradiefrontdesk.ai — see §7). None of this OpenClaw demand is being captured yet. This is the single biggest opportunity in the dataset.

---

## 1. Search volume by country (offer terms)

Full lists in the CSVs; NZ terms=48, AU terms=68, US terms=23 (139 total, under the 200-term cap, "where sensible" applied — location modifiers only combined with the 10 most commercial base terms, not all 23).

**New Zealand (top by volume):**
| Keyword | Volume | Competition | CPC |
|---|---|---|---|
| ai agency | 1,000 | MEDIUM | $12.19 |
| ai consultant / ai consulting | 170 | MEDIUM | $11.96 |
| ai receptionist | 90 | MEDIUM | $9.62 |
| ai automation agency | 70 | MEDIUM | $8.88 |
| business automation | 50 | MEDIUM | $9.24 |
| ai agency nz | 50 | MEDIUM | $6.83 |
| ai receptionist nz | 40 | MEDIUM | $9.26 |
| ai consultant nz | 40 | HIGH | $8.89 |
| virtual receptionist | 20 | MEDIUM | $23.67 |
| lead generation website | 20 | MEDIUM | $44.48 |

Everything else in the NZ list (ai phone answering, gohighlevel agency, speed to lead, database reactivation, private ai assistant, n8n agency, make.com agency, the "auckland" city variants, all 5 industry combos) sits at **10 or below** — real but thin. Auckland-modified terms (`ai receptionist auckland` etc.) returned no measurable volume at all.

**Australia (top by volume):**
| Keyword | Volume | Competition | CPC |
|---|---|---|---|
| ai agency | 6,600 | MEDIUM | $14.39 |
| ai consultant / ai consulting | 1,000 | MEDIUM | $23.29 |
| ai receptionist | 880 | MEDIUM | $14.88 |
| virtual receptionist | 590 | MEDIUM | $37.83 |
| ai automation agency | 390 | MEDIUM | $12.05 |
| ai receptionist australia | 390 | MEDIUM | $19.48 |
| ai answering service | 260 | LOW | $16.85 |
| virtual receptionist australia | 260 | MEDIUM | $43.10 |
| business automation | 210 | MEDIUM | $23.39 |
| ai phone answering | 140 | HIGH | $18.93 |
| ai agency australia | 140 | LOW | $21.54 |
| virtual receptionist melbourne | 140 | LOW | $48.63 |
| ai consultant australia/sydney/melbourne | 110 each | MEDIUM | $14–28 |
| voice ai agent | 70 | LOW | $37.26 |
| lead generation website | 70 | MEDIUM | $24.56 |
| n8n agency | 70 | LOW | **$81.97** (very high CPC signal) |
| speed to lead | 50 | LOW | $13.94 |
| ai receptionist for tradies | 30 | MEDIUM | $16.92 |

AU is **6–7x the volume of NZ** on the core commercial terms and has real city-level demand (Sydney/Melbourne/Brisbane) that NZ's Auckland variants don't show at all. This should be the primary SEO country, not NZ.

**United States (small sizing set, no modifiers):**
| Keyword | Volume | CPC |
|---|---|---|
| ai receptionist | 49,500 | $34.22 |
| ai agency | 49,500 | $20.90 |
| ai consultant / ai consulting | 8,100 | $51.79 |
| ai automation agency | 4,400 | $19.48 |
| ai answering service | 3,600 | $47.55 |
| virtual receptionist | 2,900 | $105.02 |
| business automation | 1,600 | $15.40 |
| speed to lead | 880 | $15.07 |
| lead generation website | 880 | $99.47 |
| private ai assistant | 590 | $7.40 |
| gohighlevel agency | 320 | $28.61 |

US confirms the category is enormous but CPCs are brutal ($34–105) — US is a paid-ads/authority play, not a near-term organic target for a new domain with zero indexed rankings.

---

## 2. Which offers have real demand, by country

| Offer | NZ | AU | US |
|---|---|---|---|
| SP-05 Consulting (`/consulting`) | Real but small (170/mo "ai consultant") | **Strong** (1,000/mo "ai consultant"+"ai consulting", plus city variants) | Large but hyper-competitive ($52 CPC) |
| SP-01 Revenue Triad / voice AI (`/voice-ai`) | Weak (90/mo "ai receptionist") | **Strong** (880/mo + AU-specific + city terms; real competitor aidial.com.au ranks #3) | Large ($34 CPC, huge competition) |
| SP-04 Private Assistant / OpenClaw | Low on offer terms directly, but **massive on OpenClaw itself** — see §0 | Same pattern, smaller | **Very large** (18K+/mo "what is openclaw") |
| SP-02 Lead Gen Websites | ~None (20/mo) | Weak (70/mo) | Moderate (880/mo, but $99 CPC — commercial/agency intent, not homeowner) |
| SP-03 Lead Reactor / speed-to-lead / database reactivation | ~None (10/mo each) | Weak (50/mo speed-to-lead) | Moderate (880/mo speed-to-lead) |
| SP-06 Training | ~None | Weak (70/mo "claude code training", $3–7 CPC) | Moderate (720/mo "claude code training") |
| Industry combos (dentists/roofers/plumbers/chiropractors/tradies) | **No measurable volume** (≤10 each) | **No measurable volume** except "for tradies" (30/mo) | No measurable volume |

**Practical read:** AI Consulting and Voice AI/Receptionist are the two offers with real, sizeable, buyer-intent search demand — concentrated in Australia. OpenClaw/Private Assistant has by far the largest raw volume but it's mostly informational/curiosity traffic about the open-source project, not yet demand for "hire someone to install it," which matters for how those pages should convert (educate → offer, not direct commercial keyword match). Lead Gen Websites, Lead Reactor and Training show real but thin demand — worth holding existing pages, not worth new page investment on volume alone. The industry vertical pages (`/solutions/*`, `/marketing-for-*`) have **no supporting exact-match search volume anywhere** — they should be treated as sales-enablement/landing pages for outbound and ad traffic, not organic-acquisition bets.

---

## 3. Keyword ideas (`labs_keyword_ideas`, seeds: ai receptionist / ai automation agency / voice ai / ai consultant, limit 300, filtered to volume ≥20 AND relevant to the six offers)

NZ: **0** ideas cleared both filters — the NZ keyword graph around these seeds is dominated by irrelevant broad-match noise (consultant salaries, quantity surveyors, engineering jobs). NZ organic strategy should lean on the direct-match terms in §1, not seed expansion.

AU: **34** ideas cleared the filter. Standouts not already in the §1 list:
| Keyword | Volume | CPC | Competition |
|---|---|---|---|
| ai voice | 4,400 | $2.15 | LOW |
| ai voice agents | 210 | $41.00 | MEDIUM |
| ai consulting services | 170 | $23.61 | LOW |
| ai consultant company / ai consulting company | 140 each | $28.28 | LOW |
| ai automation tools | 110 | $44.03 | LOW |
| ai automation services | 90 | $17.61 | LOW |
| ai automation consultant | 50 | $30.51 | LOW |
| ai voice agent australia | 50 | $10.96 | MEDIUM |
| ai automation company | 40 | $14.22 | MEDIUM |
| ai business consultant | 40 | $13.01 | MEDIUM |
| ai automation for small businesses | 20 | $22.34 | MEDIUM |

"ai consulting services" / "ai consultant company" / "ai consulting company" are low-competition, decent-volume, and currently unaddressed by page copy on `/consulting` — cheap wins.

---

## 4. Who's already ranking (`labs_ranked_keywords`, limit 300)

- **systempros.ai** — 0 ranked keywords in NZ, 0 in AU.
- **tradiefrontdesk.ai** — 0 ranked keywords in NZ, 0 in AU.
- Both domains are effectively invisible in DataForSEO's keyword index right now. This also means **no cannibalisation risk exists today** — see §6.

Competitors identified from the SERP data in §5 and checked:

**NZ** — `theaiautomationagency.ai` (0 ranked keywords despite ranking organically in the live SERP — likely too new for the Labs index, same situation as systempros.ai) and a guessed domain for "Morningside AI" (0 keywords, domain likely wrong — Morningside AI's actual URL wasn't confirmed, flagging rather than guessing further). `automateai.co.nz` **does** have index data (48 keywords) and shows a working content-led strategy: ranks #2 for "ai automation" (210/mo NZ) from its homepage, plus a blog-driven cluster on "accounting software"/"AI courses" pulling 260–480/mo terms — i.e., its best NZ traffic doesn't come from head terms, it comes from adjacent SMB-software blog content.

**AU** — `aidial.com.au` is a direct competitor for the Revenue Triad offer: ranks **#3 for "ai receptionist" (880/mo)**, #3 for "ai receptionist australia" (390/mo), #12 for "virtual receptionist australia" (260/mo), off dedicated pages like `/ai-receptionist` and `/business-phone-answering-service`. `aiautomationagency.com.au` is a direct competitor for the Consulting/automation offer: ranks **#4 for "ai automation agency" (390/mo)**, #2 for "ai automation agency australia" (50/mo), #2 for "business automation agency" (390/mo) — all off its homepage, exact-match-domain SEO. `aivy.com.au` (255 ranked keywords) is a broad AI-content/review site (Bitwarden reviews, AI coding assistant comparisons, legal AI) rather than a focused competitor — it ranks for "ai agency" (#27, 6,600/mo) but isn't a head-to-head service competitor.

---

## 5. SERP snapshot (`serp_google_organic`, depth 20, Auckland + Sydney)

Neither `systempros.ai`, `tradiefrontdesk.ai` nor `altcutman.com` appear in **organic** results for any of the 5 keywords at either location. `systempros.ai` **does** appear as the **#2 of 3 local-pack tile** ("Ai and Automation Agency") embedded in the Auckland SERP for "ai automation agency" — the only appearance anywhere in this dataset.

Ads presence: only "ai automation agency" at Sydney showed paid ads (3). Local packs appeared for "ai automation agency" (both cities) and "ai consultant" (Sydney only) — receptionist and voice-agent queries triggered no local pack in either city, i.e. Google treats those as SaaS/informational queries, not local-service queries.

PAA questions (verbatim, deduped across cities):
- **ai receptionist:** "How much does an AI receptionist cost?" / "What do AI receptionists do?" / "How much is an AI receptionist worth?" / "Can AI replace a receptionist?" / "Which AI receptionist is best in Australia?"
- **ai automation agency:** "What do AI automation agencies do?" / "What is the AI Agency New Zealand?" / "Which AI automation agency is the top in the world?" / "What are the big 4 AI agents?" / "How do I start my own AI automation agency?"
- **ai consultant:** "What does an AI consultant actually do?" / "How much do AI consultants get paid?" / "How do I become an AI consultant?" / "Which 3 jobs will not survive AI?" / "How much do AI consultants charge?"
- **voice ai agent:** "What is an AI voice agent?" / "Is voice cloning illegal?" / "How much do AI voice agents cost?" / "Which is the best AI voice agent?"
- **ai receptionist for dentists:** "How much does an AI dental receptionist cost?" / "What is the best AI software for dental receptionists?" / "How much does it cost to get an AI receptionist?" / "Can AI replace a receptionist?"

"How much does X cost" is the dominant PAA pattern across every query — pricing transparency (currently marked UNVERIFIED in product-marketing-context.md) is the single most-asked question and should be resolved before it's used as page copy.

---

## 6. Maps (`serp_google_maps`, Auckland CBD, -36.8485,174.7633, 13z)

"Ai and Automation Agency" (the client's GBP listing) does **not** appear in the top 31 Maps results for "ai automation agency" or the top 86 for "ai consultant" at this exact coordinate/zoom — despite showing at #2/3 in the local-pack embedded in the organic SERP for the same keyword (§5). These two signals genuinely disagree, most likely because the organic-SERP local pack uses IP/location-string geo-bias ("Auckland,Auckland,New Zealand") while the dedicated Maps call used a tight CBD coordinate — worth a manual spot-check in an incognito browser from an Auckland IP rather than trusting either API result alone. Top Auckland Maps results for "ai automation agency": Automation Associates – Auckland (4.7★, 13 reviews), AngelX AI Limited (5★, 3), Morningside AI (4.4★, 7), Ambit (4.9★, 8), Conversologie (5★, 7). None have significant review volume (max 14) — the local AI-agency category in Auckland has no reviews moat yet.

---

## 7. Cannibalisation check (systempros.ai vs tradiefrontdesk.ai)

No overlap is observable today because **neither domain has any ranked keywords** in DataForSEO's index (§4). The risk is prospective, not current: tradiefrontdesk.ai's name signals a trades/tradie focus, and systempros.ai has `/solutions/roofing`, `/marketing-for-plumbing`, and the "ai receptionist for tradies" term family (the only industry combo with any measurable AU volume, 30/mo). **Recommendation:** keep trade-vertical keyword targeting (roofers, plumbers, tradies) on tradiefrontdesk.ai exclusively; have systempros.ai's `/solutions/*` pages target the non-trade verticals it already covers (dental, chiropractors, coaching, counselling, independent-living, landscaping, auto-detailing) plus the horizontal offers (consulting, voice AI, OpenClaw) where tradiefrontdesk.ai has no page at all.

---

## 8. Seasonality (`google_trends`, past 12 months, "ai receptionist" + "ai automation")

Both series are mostly at/near the trends noise floor for most of the year in NZ (frequently `null`/0). The most recent 3 weeks of data show a clear step up: NZ "ai automation" interest index went **1 → 6 → 7** over the last three weekly points (2026-09-13 to 2026-09-20) — a ~7x jump. AU shows the same term holding a steadier but still-rising **13 → 13 → 15** over the same weeks, against "ai receptionist" flat around 3–5. Read with caution (12 months of mostly-zero data around two sparse terms is a small sample) but directionally consistent with the OpenClaw virality finding in §0 — interest in this whole category looks to be inflecting upward right now in both countries, not seasonal in the traditional sense.

---

## 9. Keyword → URL map

**Existing pages (recommended primary keyword):**

| Page | Primary keyword | Country/volume |
|---|---|---|
| `/voice-ai` | ai receptionist | AU 880, US 49,500 |
| `/consulting` | ai consulting / ai consultant | AU 1,000, US 8,100 |
| `/consulting/australia` | ai consultant australia | AU 110 + city cluster (Sydney/Melbourne 110 each) |
| `/consulting/new-zealand` | ai agency nz | NZ 50 |
| `/openclaw/index` | what is openclaw | US 18,100, AU 1,600, NZ 260 |
| `/openclaw/setup-guide` | openclaw setup guide / openclaw setup / openclaw install | US 2,900 (install) |
| `/openclaw/skills` | openclaw skills | US 5,400, AU 590 |
| `/openclaw/use-cases` | openclaw use cases | US 1,300, AU 170 |
| `/openclaw/vs-chatgpt` | openclaw vs chatgpt | US 90 (low but zero competition) |
| `/openclaw/for-business` | openclaw for business | US 40 (thin — consider folding into `/private-assistant`) |
| `/private-assistant` | private ai assistant | US 590 |
| `/lead-reactor` | speed to lead | US 880 |
| `/lead-gen-websites` | lead generation website | US 880 (AU/NZ too thin to lead with) |
| `/training` | claude code training | US 720, AU 70 |
| `/locations/australia` | ai agency australia / virtual receptionist australia | AU 140 / 260 |
| `/locations/new-zealand` | ai agency nz | NZ 50 |

**New pages the volume actually supports (5, not padded to 8):**

1. **"OpenClaw Pricing"** (`/openclaw/pricing`) — "openclaw pricing" US 590/AU 90, zero competing page on-site today, directly answers the #1 PAA pattern ("how much does it cost") for a term the site already owns the topical cluster for.
2. **"OpenClaw on WhatsApp & Telegram"** (`/openclaw/whatsapp-telegram` or a section added to `/openclaw/use-cases`) — "openclaw whatsapp" US 480, "openclaw telegram" US 590, matches the Private Assistant offer's actual channels.
3. **AU voice-AI/receptionist city page** (`/voice-ai/australia` or fold into `/locations/australia`) — combined AU city volume (australia 390 + melbourne 140 + sydney 90 + brisbane 70 for virtual receptionist, plus the "ai receptionist australia" 390 term) rivals the whole NZ dataset; aidial.com.au already owns 3 of these positions and should be named as the benchmark to beat.
4. **"AI Consulting Services Australia"** page or section on `/consulting/australia` — "ai consulting services" AU 170, "ai consultant company"/"ai consulting company" AU 140 each, all LOW competition, currently unaddressed.
5. **n8n-specific page** (e.g. `/training/n8n` or a section on `/consulting`) — "n8n agency" AU 70/US 720 at the **highest CPC in the whole dataset ($82 AU, implying high buyer value**), consistent with Training's existing n8n coverage but with no dedicated page to rank for the term.

Everything else considered (industry combos, "database reactivation," "gohighlevel agency," "make.com agency," Melbourne/Sydney/Brisbane split pages beyond #3) had volume too thin (≤50/mo, often ≤10) to justify a new page — better served as sections on existing pages or left to paid/direct channels.

---

## 10. Prioritised recommendations

1. **Fix the OpenClaw title gap first.** `/openclaw/index.astro` should target "what is openclaw" (18,100 US/mo) directly in its title tag — the single largest, cheapest, most on-topic opportunity found in this whole run, and the client's own product literature already leans on OpenClaw's popularity.
   - Suggested title (≤60 chars): **"What Is OpenClaw? Setup, Skills & Pricing"** (42 chars)
2. **Build the missing OpenClaw pricing page.** No page today answers "how much does OpenClaw cost" despite it being the top PAA pattern site-wide and a 590/mo US term.
   - Suggested title: **"OpenClaw Pricing — Done-For-You Setup Cost"** (44 chars)
3. **Re-title `/voice-ai` around "AI receptionist," not generic branding**, and add an Australia-specific section/page — aidial.com.au is beatable (only #3, thin reviews, no NZ presence) and AU volume (880+city terms) dwarfs NZ (90).
   - Suggested title: **"AI Receptionist for Australian Businesses"** (44 chars)
4. **Strengthen `/consulting` and `/consulting/australia` copy** to include "ai consulting services," "ai consultant company," "ai automation consultant" — all low-competition AU terms currently unaddressed; aiautomationagency.com.au is winning this cluster largely off homepage-only optimisation, which is beatable with dedicated content.
5. **Do not invest further in `/solutions/*` or `/marketing-for-*` as SEO bets** — zero measurable exact-match volume across every industry combo tested (dentists, roofers, plumbers, chiropractors, tradies, hair salons, landscaping). Keep them for outbound/ad landing but stop expecting organic traffic from them.
6. **Resolve the pricing-transparency question at the product level.** "How much does X cost" dominates PAA for every offer category tested; `/pricing` currently has UNVERIFIED published prices per product-marketing-context.md — this is now confirmed as the highest-leverage content gap, not just a nice-to-have.
7. **Re-run the Auckland-CBD Maps check manually** (incognito, Auckland IP) to resolve the local-pack-vs-Maps-API disagreement in §6 before making local-SEO claims to the client.
8. **Hold the trades keyword line at tradiefrontdesk.ai.** No cannibalisation exists today, but don't let `/solutions/roofing` or `/marketing-for-plumbing` start targeting "tradie"-branded terms — that's the one industry combo with any real AU volume (30/mo) and it belongs to the sister brand.

---

*Report generated 2026-09-25. All volumes are DataForSEO Google Ads historical search volume (live), not estimates. No keyword volumes were invented; every number in this report traces to a specific API call logged in the cost breakdown above.*
