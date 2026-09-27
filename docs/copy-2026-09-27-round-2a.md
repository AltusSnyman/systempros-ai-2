# System Pros AI, round 2a: spec and lead copy (2026-09-27)

Evidence: Search Console URL inspection of all 51 sitemap URLs (2026-09-27): 39 indexed, 6 crawled-not-indexed, 3 discovered, 3 unknown. /contact/ crawled not indexed (last crawl 2026-09-13). Research for the cost page: DataForSEO AU (ai receptionist 880/mo, ai receptionist australia 390, ai answering service 260, ai receptionist cost 20; PAA "How much does an AI receptionist cost?" on every related query; Google shows an AI Overview quoting $14–$600/month). Raw JSON in tools/dataforseo/outputs (gitignored).
Rules: copy verbatim, AU/NZ English, no vendor or tool names (never GoHighLevel, Merchynt, Paige, Retell, Vapi etc.), no guarantees, no unverifiable stats. Plans are priced in **US dollars** (PricingSection formats USD); always write "US$" on this page.

## 1. Thin pages out of the index
Add `<meta name="robots" content="noindex, follow">` (via a Layout prop, e.g. `noindex`) and exclude from the sitemap (`@astrojs/sitemap` `filter`):
- /solutions/ai-business-solutions/
- /solutions/landscaping/
- /marketing-for-landscaping/
They stay live for ads and internal links; no redirects. Do not touch the other /solutions/* or /marketing-for-* pages.

## 2. /contact/: text Google can index (add below the booking calendar section, above the footer CTA)
H2: **Before you book: common questions**
Render as a visible list plus FAQPage JSON-LD from the same array:
1. **Is the consultation really free?** — Yes. It's a 30-minute call with no obligation. You leave with a clear view of where leads and calls are slipping through, whether or not you work with us.
2. **What happens after the call?** — You receive a written recommendation: the system we'd build, the timeline and a fixed monthly price. Nothing starts until you've agreed to it.
3. **Do you work with businesses outside New Zealand?** — Yes. We work with businesses in New Zealand, Australia and the United States, and you can call the local number for your country above.
4. **What should I have ready?** — A rough idea of how many calls and enquiries you get each week, how you handle them now, and which tools you already use for bookings or customers. If you don't know the numbers, that's fine; we'll work them out together.

## 3. Mobile overflow (no sideways scroll at 375px)
Fix the pre-existing horizontal overflow on /industries/, /lead-gen-websites/ (the "Zero to lead machine" timeline) and /lead-reactor/ (the "We build. We run. We convert." block). Visual design unchanged at desktop.

## 4. Home demo video (90.5 MB, 1920×1080, 4 min, autoplays on page load)
- Re-encode `public/assets/demo-video.mp4` to 1280×720 H.264 (CRF ~28, `-movflags +faststart`, AAC 96k), target ≤ 20 MB; keep the original out of the repo if it isn't already tracked (check git history size impact; if the 90 MB file is tracked, replace it in place).
- Add a poster image (a frame at ~3 s, WebP), `preload="none"`, and start playback only when the video scrolls into view (IntersectionObserver); keep muted autoplay behaviour and the existing mute toggle once playing.

## 5. New page: /voice-ai/ai-receptionist-cost/
- Title: **AI Receptionist Cost in Australia (2026) | System Pros AI** (57)
- Description: **What an AI receptionist costs in Australia: market prices, what drives the cost, and how it compares with a human receptionist or answering service.** (148)
- H1: **How much does an AI receptionist cost in Australia?**
- Breadcrumb: Home › Voice AI › AI receptionist cost. Schema: Article (datePublished/dateModified 2026-09-27, author Organization #org), FAQPage, BreadcrumbList.
- Link in from /voice-ai/ (cost FAQ answer area or a line near pricing), /voice-ai/australia/ (its "How much does an AI receptionist cost in Australia?" FAQ: add a visible link line under the FAQ list), and /pricing/ (near the AI receptionist FAQ). Add to the Voice AI nav/footer group only if that group lists sub-pages already.

### The short answer
**In Australia, self-serve AI receptionist apps start at around A$100 a month, and managed services that are built and run for you usually cost A$300 to A$600 a month or more. A full-time human receptionist costs over A$50,000 a year before super. What you should pay depends on your call volume, what the AI needs to do, and whether you want to set it up yourself or have it done for you.**

Caption: Market ranges from published Australian price lists, checked September 2026. Prices change often; check the provider before you buy.

### What the market charges
Three pricing models are common:
- **Self-serve apps, about A$100–A$150 a month.** You set up the scripts, the phone number and the calendar yourself. Good for simple call answering and message taking.
- **Managed services, about A$300–A$600+ a month.** A provider builds the AI, connects it to your calendar and customer system, and keeps it working. Some charge a one-off setup fee.
- **Per-minute or per-call pricing.** You pay for what you use, often on top of a monthly fee. It looks cheap until a busy month.

### What drives the price
- **Call volume.** More calls means more minutes and more work for the system.
- **What the AI has to do.** Taking a message is simpler than qualifying a lead, quoting, and booking straight into your calendar.
- **Connections.** Linking to your calendar, customer records and follow-up texts takes setup time.
- **Who runs it.** A self-serve app needs your time every week. A managed service includes someone watching the calls and improving the script.
- **Hidden extras.** Setup fees, per-minute overages and phone number charges are the costs people most often miss.

### AI receptionist vs a human receptionist vs an answering service
| Option | Typical cost | Covers |
|---|---|---|
| Full-time receptionist | From about A$53,300 a year at the award minimum, about A$59,700 with super, before leave and on-costs | Office hours |
| Typical receptionist salaries | About A$41,000–A$70,000 a year | Office hours |
| Live answering service | Several hundred to a few thousand dollars a month, depending on call volume | Business hours or 24/7, message taking |
| AI receptionist | About A$100–A$600+ a month | 24/7, every call answered at once |

Sources line under the table: **Award minimum: Fair Work Ombudsman, Clerks – Private Sector Award, Level 1 Year 1, A$26.97 an hour from 1 July 2026 (38-hour week). Salary ranges: PayScale and Hays Australia, 2026.** Link "Fair Work Ombudsman" to https://awards.fairwork.gov.au/MA000002.html .

An AI receptionist doesn't replace a great front-desk person who knows your customers. It covers the calls nobody is free to answer: after hours, during jobs, at lunch and on busy Mondays. For most small businesses that's where the lost work is.

### What we charge
We're not the cheapest option, and we don't try to be. System Pros AI builds and runs the whole system for you: an AI receptionist that answers every call, books into your calendar, follows up by text and hands hot leads to you straight away. Managed plans start from **US$997 a month**, and the scope and price are fixed in writing after a free consultation. See the <a href="/pricing/">plans and what they include</a>.

If you only need calls answered and messages taken, a self-serve app may be all you need, and we'll tell you so on the call.

### Is an AI receptionist worth it?
Work it out from one number: what a missed call costs you. If a new customer is worth A$500 and you miss five calls a week that would have turned into two jobs, that's A$1,000 a week walking to a competitor. An AI receptionist that catches even some of those usually pays for itself quickly. If you rarely miss calls, it may not be worth it yet.

### FAQs (visible + FAQPage JSON-LD from one array)
1. **How much does an AI receptionist cost in Australia?** — Self-serve apps start at around A$100 a month. Managed services that are built and run for you usually cost A$300 to A$600 a month or more, sometimes with a setup fee. System Pros AI's managed plans start from US$997 a month.
2. **Are AI receptionists worth it?** — They're worth it when missed calls are costing you work. If a single new customer is worth hundreds of dollars and calls go unanswered during jobs or after hours, an AI receptionist usually pays for itself. If you rarely miss calls, it may not be.
3. **Can an AI receptionist replace a human receptionist?** — For answering, booking and taking messages, often yes, and it works 24/7. For relationships, complex complaints and in-person work, a person is still better. Many businesses use AI for overflow and after-hours calls.
4. **Is there a free AI receptionist?** — Some apps have free trials or very limited free plans. For a business number that customers rely on, expect to pay a monthly fee.
5. **Do AI receptionists charge per minute?** — Some do, usually on top of a monthly fee. Check what happens in a busy month before you sign up. Our plans are a fixed monthly price agreed up front.
6. **Which AI receptionist is best in Australia?** — The best one is the one that fits how your business takes bookings. Look for local phone numbers, an Australian accent option, calendar booking, text follow-up, and a clear monthly price with no surprise overages.

### CTA block
H2: **Get a fixed price for your business**
Line: **Book a free 30-minute consultation. We'll look at your calls, tell you honestly whether an AI receptionist is worth it, and give you a fixed monthly price in writing.**
Button: **Book a Free Consultation** → /contact/ (use the site's standard CTA label and component)

## 6. Search Console after deploy (lead does this)
Request indexing: /contact/, /voice-ai/ai-receptionist-cost/, /voice-ai/australia/. Resubmit sitemap.

## Done-checks
Build passes; new page title 57 / description 148, one H1, JSON-LD parses (Article, FAQPage, BreadcrumbList, plus site-wide), FAQ text = JSON-LD text; noindex present on the 3 pages and they're absent from sitemap-0.xml; /contact/ FAQ renders + FAQPage; no horizontal overflow at 375px on /industries/, /lead-gen-websites/, /lead-reactor/, the new page and /contact/; home video ≤ 20 MB, not requested on initial load (network check), plays when scrolled into view; no vendor names; screenshots saved to reports/round-2a-2026-09-27/.
