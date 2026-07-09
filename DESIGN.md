# DESIGN.md — SystemPros.ai "Commissioning Dossier"

The visual system for the rebuilt site in `newsite/`. Every page and component must follow this file. When in doubt, re-read PRODUCT.md.

## Concept

An **engineering commissioning dossier in daylight**: the brand of a 30-year systems engineer who installs AI infrastructure for local businesses. Pure white paper, deep "commission green" ink carrying the identity (Committed color strategy: green owns 30–60% of the surface), copper as the signature/accent, hairline rules and dimension ticks as the layout grammar, and motion that behaves like systems switching on.

Named references: British Rail / NASA-era engineering manuals (structure), Vercel's discipline (restraint), deep-green heritage-engineering identity (Land Rover spec-plate green, not startup mint).

## Color — OKLCH tokens

```css
--color-paper:        oklch(1 0 0);              /* body bg — pure white, never tinted */
--color-ink:          oklch(0.21 0.02 165);      /* body text, near-black green-cast */
--color-muted:        oklch(0.45 0.025 165);     /* secondary text — min 4.5:1 on paper */
--color-green:        oklch(0.38 0.09 160);      /* PRIMARY. Buttons, links, headings-accent, rules */
--color-green-deep:   oklch(0.27 0.055 162);     /* drench surface: hero band, footer, statement sections */
--color-green-faint:  oklch(0.965 0.012 160);    /* tinted panel bg, table row alt */
--color-copper:       oklch(0.60 0.14 45);       /* ACCENT. Stamps, live indicators, key data, hover heat. White text on fills */
--color-line:         oklch(0.87 0.01 165);      /* hairlines, rules, table borders */
--color-paper-dim:    oklch(0.93 0.008 165);     /* on-drench text: use oklch(0.96 0.01 160) at 100%, never gray */
```

Rules:
- White text on green and copper fills. Never dark text on saturated mid-tone fills.
- On `green-deep` sections, text is near-white `oklch(0.97 0.01 160)`; secondary on-drench text is `oklch(0.82 0.03 160)` — never plain gray.
- Copper is a scalpel: stamps, "LIVE" dots, one number per section, hover states. If copper exceeds ~5% of a viewport, cut it back.
- No gradients anywhere except a barely-there paper vignette if needed. **Banned: gradient text, glassmorphism, blue/purple, dark-theme sections other than none — dark is not in this brand.**

## Typography

- **Display & body: `Archivo` (variable: wght 100–900, wdth 62–125)** — one family, committed. Loaded via Google Fonts variable axis (`Archivo:ital,wdth,wght@0,62..125,100..900`).
  - Display: wdth 125 (Expanded), wght 750–850, letter-spacing -0.02em, `text-wrap: balance`. Sentence case (not all-caps walls). Ceiling `clamp(2.6rem, 6vw, 5.5rem)`.
  - H2/H3: wdth 110–125, wght 700.
  - Body: wdth 100, wght 400/500, 16–18px, line-height 1.6, max 70ch.
- **Data face: `Fragment Mono`** — spec labels, figures, phone numbers, table headers, the stamp. Small sizes only (11–14px). This is the *dossier data* voice — use it where a real spec sheet would use it, not as decoration on every heading.
- Pairing axis: geometric-grotesque (Archivo) × typewriter mono (Fragment) — contrast by construction and role.

## Layout grammar

- **Rules and ticks, not cards.** Sections are separated by 1px `--color-line` hairlines with small dimension ticks (⊢ 8px perpendicular marks) at intersections. Content lives on the open page; boxes are rare.
- **Spec tables over card grids.** Product/feature lists render as full-width bordered tables or ruled rows (label in Fragment Mono, description in Archivo), NOT icon-card grids.
- **The stamp.** One brand device: a circular/rect "commissioning stamp" (SVG, copper stroke, Fragment Mono text e.g. "SYSTEMPROS · EST. 30 YRS · COMMISSIONED") used once per page max — hero or footer sign-off.
- Asymmetric 12-col grid; generous `clamp()` section spacing (e.g. `clamp(5rem, 12vh, 9rem)`), tight intra-group spacing.
- Container: max-w ~1200px with hairline left/right page-margins on xl screens (the "drawing frame").
- Numbered markers ONLY for genuinely sequential content (the 4-phase process). Never as section eyebrows.
- No tiny uppercase tracked eyebrows above every heading. Section headers may use a Fragment Mono ref-code (e.g. `SP-03 / LEAD REACTOR`) **as a table-of-contents system on product pages only** — it must look like a real drawing number, appear in the page TOC, and be consistent site-wide. If unsure, omit.

## Components

- **Buttons**: rectangular, 2px radius. Primary: green fill, white text, on hover the fill deepens + a 1px copper offset border "engages" (2px translate). Secondary: 1px ink border, transparent. All: Fragment Mono 13px uppercase-wide OR Archivo 15px 600 — pick one per site (use Archivo 600).
- **Links**: green, underline offset 3px, hover to copper.
- **Nav**: white bar, hairline bottom border, logo wordmark "SystemPros" set in Archivo Expanded 800 with a small copper square tick; Services dropdown = full-width ruled panel (spec-sheet rows), not floating glass card.
- **Footer**: `green-deep` drench, near-white text, ruled columns, the stamp, Fragment Mono contact numbers.
- **Schematic motif**: thin green SVG line-work (nodes + orthogonal connectors, like a wiring diagram: PHONE → AI AGENT → CRM → CALENDAR) that draws itself on scroll (`stroke-dashoffset`). This is the site's signature illustration language; use it for hero art and "how it works" diagrams. Reduced-motion: lines pre-drawn.
- **Media frames**: videos/Remotion players sit in a ruled frame with a Fragment Mono caption bar (`FIG. 03 — REVENUE TRIAD, CONTINUOUS OPERATION`) like dossier figures.

## Motion

- Library: CSS + Motion (framer-motion available). Easing `cubic-bezier(0.16, 1, 0.3, 1)` (out-expo family). Durations 300–700ms.
- Page-load hero choreography: rules draw in (scaleX), headline rises in two staggered lines, schematic draws, stamp rotates in last with a single 2° settle. One orchestrated sequence, then calm.
- Scroll: schematics draw, figures count up once (Fragment Mono), rows reveal with 40ms stagger. Content must be visible without JS — animate FROM visible defaults or use `animation` (not class-gated transitions).
- Hovers: precise, mechanical (border engages, tick marks appear). No scale-up bounce, no floaty parallax.
- Every animation has `@media (prefers-reduced-motion: reduce)` static fallback.

## Imagery

- Primary imagery = the schematic line-work + real product demos (Remotion players, industry videos in `public/assets/industry-videos/`, audio demos).
- Old dark-blue PNG art from the previous brand: do not reuse on light pages. Exception: actual screen-content (video demos) inside ruled media frames.
- Remotion compositions get rethemed to this palette (paper/green/copper) — see task for `src/remotion`.

## Tech notes

- Astro 6 + Tailwind 4 (`@theme` tokens in `src/styles/global.css`), React 19 islands, @remotion/player, motion.
- Tokens above are the single source; components use Tailwind utilities referencing them (`bg-paper`, `text-ink`, `bg-green`, `text-copper`, `border-line`, `bg-green-deep`, `bg-green-faint`, `text-muted`).
- Fonts: Google Fonts `Archivo` (variable, with wdth axis) + `Fragment Mono` (400/400i). Preload, `font-display: swap`.
- Semantic z-index scale: `--z-dropdown:10; --z-sticky:20; --z-overlay:30; --z-modal:40; --z-toast:50`.
