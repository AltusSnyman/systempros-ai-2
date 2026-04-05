# Remotion Infographic Animation System

## Core Runtime
- **Remotion 4.0** rendered inside `@remotion/player` as React components
- `useCurrentFrame()` — the single frame counter (0 to ~600)
- `useVideoConfig()` — gives `fps` (30), `width` (1080), `height` (1080)
- Everything is **pure math** — no CSS transitions, no setTimeout. Every value is derived from `frame`

---

## The 4 Animation Primitives

**1. `interpolate(frame, [startFrame, endFrame], [fromValue, toValue], { extrapolateRight: 'clamp' })`**
Linear or eased transitions between any two numbers. Used for opacity, translateY, scale, strokeDashoffset.

**2. `spring({ frame, fps, config: { damping, stiffness, mass } })`**
Physics-based bounce. Used for card entrances, counter pops, icon scale-in. Typical config: `{ damping: 14, stiffness: 120 }` for snappy. `{ damping: 20, stiffness: 80 }` for smooth.

**3. `Easing.bezier(x1, y1, x2, y2)`**
Passed into `interpolate`'s `easing` option. `Easing.out(Easing.cubic)` = ease-out deceleration. `Easing.inOut(Easing.quad)` = smooth S-curve.

**4. Scene crossfade pattern:**
```js
const sceneAOp = interpolate(frame, [0, 15], [0, 1]);       // fade in
const sceneAExit = interpolate(frame, [140, 160], [1, 0]);  // fade out
const opacityA = Math.min(sceneAOp, sceneAExit);            // both gates
```
Each scene lives in an absolutely-positioned `<div>` with `opacity` + `translateY` offset for a floating-in effect.

---

## Specific Effects Used

### SVG Line Drawing
```js
const length = 200; // total path length
const drawn = interpolate(frame, [startF, endF], [length, 0]);
// <line strokeDasharray={length} strokeDashoffset={drawn} />
```
Lines "draw themselves" — used for flow diagrams, arrows, connection lines between nodes.

### Animated Flowing Particles Along Lines
```js
const t = ((frame / speed + phaseOffset) % 1); // 0→1 loop
const x = x1 + (x2 - x1) * t;
const y = y1 + (y2 - y1) * t;
```
Small dots that continuously travel along connection lines. Creates the "data flowing" effect between hubs and nodes.

### Orbital Node Animation
```js
const angle = (frame / totalFrames) * Math.PI * 2 + (index * (Math.PI * 2 / totalNodes));
const x = centerX + Math.cos(angle) * radius;
const y = centerY + Math.sin(angle) * radius;
```
Platform icons (WhatsApp, Slack, etc.) rotate around a central hub. Each node offset by `index * (2π / count)` so they're evenly spaced.

### Counter Roll Animation
```js
const value = Math.floor(interpolate(frame, [startF, endF], [0, targetNumber], { easing: Easing.out(Easing.cubic) }));
```
Numbers count up from 0. Used for "247K stars", "3,000+ skills", stat cards.

### Staggered Card Entrances
```js
items.map((item, i) => {
  const delay = baseFrame + i * 12; // 12-frame stagger between cards
  const progress = spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 120 } });
  return { opacity: progress, translateY: (1 - progress) * 30 };
})
```
Cards slide up and fade in one after another with spring physics.

### Terminal Typing / Cascading Text
```js
lines.map((line, i) => {
  const appear = interpolate(frame, [startF + i * 8, startF + i * 8 + 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  // opacity: appear, translateX: (1 - appear) * -10
})
```
Error lines "type in" from the left in sequence, giving a terminal feel.

### Split-screen Reveal
Two `<div>`s side by side. Left clips in from left edge using `clipPath: inset(0 X% 0 0)` where X interpolates 100→0. Right does the same from the right. Creates a "curtain open" effect.

### Pulse / Glow Ring
```js
const pulse = (Math.sin(frame / 20) + 1) / 2; // 0→1→0 oscillation
// boxShadow: `0 0 ${10 + pulse * 20}px rgba(59,130,246,${0.3 + pulse * 0.4})`
```
Breathing glow on central hub nodes, status indicators.

### Bar Chart Growth
```js
const height = interpolate(frame, [startF, startF + 40], [0, targetHeight], { easing: Easing.out(Easing.cubic) });
```
Bars grow from 0 upward. Staggered by index × 8 frames.

---

## Visual Design Constants
- Background: `#0A0A0A` (near-black)
- Primary accent: `#3B82F6` (blue-500)
- Success: `#22C55E` (green-500)
- Danger: `#EF4444` (red-500)
- Text primary: `#FFFFFF`
- Text secondary: `rgba(255,255,255,0.5)`
- Card background: `rgba(255,255,255,0.03)` with `1px solid rgba(255,255,255,0.08)` border
- Font: Inter/system-ui, weights 400/700/900

---

## Composition Structure
- **1080×1080** (1:1 square for social)
- **600 frames at 30fps = 20 seconds**
- Scene rhythm: Intro (0–85) → Scene A (85–210) → Scene B (210–350) → Scene C (350–500) → Brand tag (500–600)
- Each scene crossfade window: **15–20 frames**
- Brand tag: company name + tagline fades in at frame 500, stays to end

---

## File Structure

```
src/remotion/
  Root.tsx                          # Registers all compositions via <Composition>
  compositions/
    RevenueTriad.tsx                # Voice AI agents animation
    LeadGenWebsites.tsx             # Lead gen funnel animation
    LeadReactor.tsx                 # Multi-channel outreach flow
    LeadReactorSpeed.tsx            # Speed-to-lead stats
    LeadReactorChannels.tsx         # Channel grid animation
    PrivateAssistantSilo.tsx        # "Silo Tax" app chaos → unified AI
    PrivateAssistantSkills.tsx      # Skills counter + demo flows
    ConsultationGap.tsx             # Tool chaos vs SystemPros hub
    TrainingResults.tsx             # Learning curve + results grid
    OpenClawHub.tsx                 # Platform orbit + stats
    OpenClawVsChatGPT.tsx           # Privacy split-screen + comparison table
    OpenClawSetup.tsx               # Terminal errors → DFY checklist
```

---

## Delivery / Integration

- Rendered in-browser via `<Player>` from `@remotion/player`
- Props: `autoPlay`, `loop`, `controls={false}`, `style={{ width: '100%', height: '100%' }}`
- Mapped via `src/components/ProductVideoPlayer.tsx` — video ID string → composition component
- Hydrated with `client:visible` in Astro (only loads when scrolled into view)
- Used in pages as: `<ProductVideoPlayer id="openclaw-hub" client:visible />`

### Adding a New Composition
1. Create `src/remotion/compositions/MyNew.tsx`
2. Register in `src/remotion/Root.tsx`:
   ```tsx
   import { MyNew } from './compositions/MyNew';
   <Composition id="my-new" component={MyNew} durationInFrames={600} fps={30} width={1080} height={1080} />
   ```
3. Add to the `compositions` map in `src/components/ProductVideoPlayer.tsx`:
   ```ts
   'my-new': lazy(() => import('../remotion/compositions/MyNew').then(m => ({ default: m.MyNew }))),
   ```
4. Use in any Astro page: `<ProductVideoPlayer id="my-new" client:visible />`
