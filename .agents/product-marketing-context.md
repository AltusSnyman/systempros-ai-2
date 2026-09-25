# Product Marketing Context — System Pros AI

Client: SystemPros.ai (systempros.ai). Single client; never reuse another client's facts or copy. Created 2026-09-25 from PRODUCT.md, about-systemprosai.md, DESIGN.md, the live site, the Google listing, the GoHighLevel location and Search Console. **UNVERIFIED** items need the owner (Altus) before they ship.

## Business
- Brand: SystemPros.ai / System Pros AI. Installs AI revenue and operations systems for SMBs (1–50 staff) in NZ and AU (primary) and the US (growth). Positioning: "engineered, commissioned", 30 years enterprise architecture (owner claim, from about doc).
- Contact per about doc: US +1 844 697 9038, AU +61 2 5563 2110, NZ +64 21 255 0493, email alt@altcutman.com. GoHighLevel location email hello@systempros.ai. **Which email is public: UNVERIFIED.**
- GoHighLevel location "System Pros" (id in .env): address Sheridan, WY, US; timezone Pacific/Auckland; phone +64 21 255 0493.
- **Google listing is "Ai and Automation Agency"** (kgmid /g/11l30pgtcl), category Marketing agency, 5.0 from 17 reviews, phone 021 255 0493, Open 24 hours; description says it is the umbrella for System Pros Ai, Tradie Front Desk and Chiron Strategy Group. **Relationship between the listing name and the systempros.ai brand: UNVERIFIED / decision needed.**
- Sister brands owned by the same operator: Tradie Front Desk (tradiefrontdesk.ai, has its own Search Console domain property), Chiron Strategy Group, altcutman.com, aiagencymentorship.ai, aiphoneagent.ai. Watch for cannibalisation.

## Offer (from PRODUCT.md)
SP-01 Revenue Triad (voice AI: receptionist, speed-to-lead, reactivation) `/voice-ai`; SP-02 Lead Gen Websites `/lead-gen-websites`; SP-03 Lead Reactor (Meta ads → <10 s multichannel) `/lead-reactor`; SP-04 Private Assistant (OpenClaw) `/private-assistant` + `/openclaw/*`; SP-05 Consulting (Blueprint + Turnkey) `/consulting` (+ NZ, AU); SP-06 Training `/training`. Industry pages under `/solutions/*` and `/marketing-for-*`. Pricing: value-based, fixed scope; `/pricing` page exists. **Published prices: UNVERIFIED.**
- Claims to verify before repeating: "most deployments live within 48 hours", "under 10 seconds", "30 years", OpenClaw "247,000+ GitHub stars", "3,000+ skills".

## Conversion
- Single action: **Book a Free Consultation** (`/contact`, GoHighLevel booking widget L9a1VqF4ljVNaUhi30Df). `/audit` embeds a GoHighLevel prospecting widget (AI readiness audit). GoHighLevel chat widgets on some solution pages.
- No GA4/GTM on the live home page (2026-09-25). No measurement.

## Audience and voice (PRODUCT.md)
Owners of revenue-hungry local businesses, 40–65, non-technical, phone-first. Voice: seasoned, engineered, plainspoken; numbers over adjectives; "dossier, not dashboard"; one CTA.

## Tech
Astro 6 + React islands + Tailwind 4 + Remotion, Netlify (netlify.toml, publish dist), site https://systempros.ai, sitemap 42 URLs. Repo github.com/AltusSnyman/systempros-ai-2 `main` (push via the machine's gh login as AltusSnyman). Design system in DESIGN.md; many design skills vendored in .claude/skills.

## Baselines (2026-09-25)
Search Console: URL-prefix property https://systempros.ai/ added 2026-09-25, **unverified until the verification file deploys** (public/google03c8911973530a77.html on branch growth/onboard-2026-09-25). GA4: none. GEO: see tools/geo-optimizer/reports/2026-09-25-*.
