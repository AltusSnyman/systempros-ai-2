# System Pros AI — project log

Live: https://systempros.ai · Repo that deploys: github.com/AltusSnyman/systempros-ai-2 `main` (Netlify) · Local folder: /Volumes/KINGSTON/projects/systemprosai-upgrade · Push: the machine's gh login (AltusSnyman). Secrets in `.env` (gitignored): GoHighLevel private token + location id, Kie key, DataForSEO.
Owner facts (Altus, 2026-09-25): brand on site "System Pros AI"; legal entity "Ai and Automation Agency Ltd" = the Google listing name (kgmid /g/11l30pgtcl, 5.0/17, Marketing agency; do not rename) · NZ 021 255 0493, AU +61 2 5563 2110, US +1 844 697 9038, hello@systempros.ai, no address · tiers Starter $997 / Business $3,497 / Pro $5,997 per month (inclusions to revise) · marketing service = GBP management, auto-posting to Google + Meta, reviews, Meta ads, ad-lead nurturing (GoHighLevel + a Myrchant AI agent; not named on the site).

## Done
| Round | What | Result |
|---|---|---|
| Onboarding (2026-09-25) | Growth kit installed; Search Console URL-prefix property added (verifies on deploy); GA4 G-RK0KNJTR2Z created; four Sonnet audits; DataForSEO (AI offers NZ/AU/US US$0.89; marketing services US$0.28); plan.md with §2b | GEO baseline home 50 / voice-ai 51 / consulting-nz 56 |
| Round 1 site (2026-09-25) | One name + legalName + correct contacts in schema, wrong LinkedIn removed, logo/social image restored, llms.txt, immutable asset cache; GA4 + 4 events; /contact title, speed skeleton, calendar placement; one CTA label; Google rating strip; /audit route back; orphans linked; titles/descriptions all ≤60/≤155; FAQ + schema on offers and /pricing ("plans from $997 a month"); new /voice-ai/australia/, /training/n8n/, AU consulting section | Live 2026-09-26 (main 84be0c9) |
| Marketing services (2026-09-25) | /marketing/ hub + GBP management, reviews & reputation, social media management, Facebook & Instagram ads; wired into nav, footer, Lead Reactor | Live 2026-09-26 |
| Websites, Google Ads, agency (2026-09-25) | /websites/ (web design: AU 6,600 / NZ 1,300); /marketing/google-ads/ (google ads agency AU 1,300 / NZ 260, ships only if Altus confirms he runs Google Ads); lead-gen FAQ no longer says 'No' to new builds; marketing hub picks up 'marketing agency' + Auckland/Sydney/Melbourne; Maps cid 6678588339145064926 in sameAs; Google profile fix list given to Altus | Live 2026-09-26 |
| Andrea page (2026-09-26) | /marketing/google-business-profile/ rebuilt as the Andrea Google Maps journey page (anatomy + click-share diagrams, heatmap, calculator, ads section, heatmap-scan CTA); /andrea/ 301; Recent builds gallery on /websites/; heatmap buttons to audit.seo.systempros.ai, /audit/ offered alongside | Live 2026-09-26 |
| Deploy (2026-09-26) | Pushed main 84be0c9; live checks pass; Search Console verified, sitemap submitted, indexing requested for the Andrea page, /websites/ and home | GEO after: home 68 (was 50), Andrea page 71, voice-ai 73 (was 51), websites 73 |
| Round 2a (2026-09-27) | /contact/ FAQ + FAQPage; new /voice-ai/ai-receptionist-cost/ (Article, FAQPage, breadcrumb; linked from /voice-ai/, /voice-ai/australia/, /pricing/, footer); noindex + sitemap exclusion for /solutions/ai-business-solutions/, /solutions/landscaping/, /marketing-for-landscaping/; mobile overflow fixed on /industries/, /lead-gen-websites/, /lead-reactor/; home video 90.5 MB → 16.1 MB, poster, plays on scroll | Live 2026-09-28 (main 6bf12c4); indexing requested for the cost page, /contact/, /voice-ai/australia/; sitemap resubmitted |
| Fixes (2026-09-28) | /pricing/ React #418 hydration error fixed (TimelineContent rendered a div inside a p); AI receptionist cost table stacks as cards under 640px; GoHighLevel stays named in the voice AI integration FAQs (Altus) | Live 2026-09-28 |

## Where things are
- `plan.md` (§2b owner answers, §8 marketing set), `.agents/product-marketing-context.md`, `changelog/`, `tools/dataforseo/reports/`, `tools/geo-optimizer/reports/`.
- Contacts and brand constants: `src/lib/site.ts`. Schema: `src/layouts/Layout.astro`. Marketing data: `src/data/marketing.ts`. Preview: `npm run preview -- --port 4340`.

## Owner items
- **Heatmap:** buttons link to Andrea's white-labelled audit https://audit.seo.systempros.ai/ (constant HEATMAP_AUDIT_URL in the Andrea page); /audit/ (GoHighLevel prospecting widget) offered alongside.
- **Recent builds:** owners of KA Plumbing, Hair By Melissa and Superior TKD gave the OK (Altus, 2026-09-26).
- GoHighLevel: set brand green #005031 on the booking calendar and audit widget; fix the "List Everything here" placeholder; connect the Ai and Automation Agency Google profile if reviews/posting should run through GoHighLevel.
- GA4: mark consultation_click (and call_click) as key events.
- Pricing: real tier inclusions; the "Save 20%" yearly badge vs $9,970/yr; marketing-service prices if they should be published.
- Legal pages name "Altcutman LLC" / "AI & Automation Agency LLC" and alt@altcutman.com: confirm the contracting entity; check the old /privacy numbers weren't the registered SMS-programme numbers.
- Unverified figures on untouched pages (/locations/* salary/savings, "$140,000/yr", competitor price comparisons, "10,000+ concurrent calls", "48 hours"): keep or remove.
- Real LinkedIn/Facebook URLs for schema.

## Next
- Request indexing when quota allows: /voice-ai/australia/, /training/n8n/, /marketing/ and the other marketing pages (sitemap already submitted).
- Round 2: /openclaw/pricing, "marketing for dentists" section on /solutions/dental, mobile overflow on /industries, /lead-gen-websites, /lead-reactor timeline, 90 MB home video, case studies with named clients.
- Re-check 2026-10-25.
