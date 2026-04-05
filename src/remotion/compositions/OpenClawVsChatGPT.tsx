import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

const ACCENT = '#3B82F6';
const RED = '#EF4444';
const GREEN = '#22C55E';
const BG = '#0A0A0A';
const FONT = "'Inter', system-ui, -apple-system, sans-serif";
const W = 1080;

const ROWS = [
  { feature: 'Where Your Data Goes', them: 'OpenAI Servers → trains their model', us: 'Your device. Nobody else sees it.' },
  { feature: 'Platforms', them: 'Web browser only', us: 'WhatsApp, iMessage, Slack + 17 more' },
  { feature: 'Monthly Cost', them: '$20–$100/mo forever', us: 'One-time setup. Open source.' },
  { feature: 'Memory', them: 'Resets every conversation', us: 'Persistent memory across weeks/months' },
  { feature: 'Personality', them: 'Generic "helpful assistant"', us: 'Custom SOUL.md — sounds like you' },
];

export const OpenClawVsChatGPT = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const glow = interpolate(Math.sin(frame / 38), [-1, 1], [0.08, 0.16]);
  const fadeOut = interpolate(frame, [575, 600], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Intro 0-85
  const introOp = interpolate(frame, [72, 96], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleSp = spring({ frame: frame - 14, fps, config: { damping: 180 } });
  const catOp = interpolate(frame, [5, 28], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lineW = interpolate(frame, [30, 78], [0, 230], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOp = interpolate(frame, [55, 82], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Scene A: Data flow split (85-295)
  const sceneAOp = interpolate(frame, [82, 108], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sceneAExit = interpolate(frame, [284, 308], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const splitFrame = frame - 85;
  // Left: data particles fly upward (to cloud)
  const cloudOp = interpolate(splitFrame, [20, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  // Right: data stays, lock icon appears
  const lockSp = spring({ frame: splitFrame - 30, fps, config: { damping: 160 } });

  // Scene B: Comparison table (295-575)
  const sceneBOp = interpolate(frame, [292, 316], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ opacity: fadeOut, fontFamily: FONT }}>
      <AbsoluteFill style={{ backgroundColor: BG }} />
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 0%, rgba(59,130,246,${glow}) 0%, transparent 55%)` }} />
      <div style={{ position: 'absolute', top: 44, right: 44, width: 48, height: 48, borderTop: `2px solid rgba(239,68,68,0.25)`, borderRight: `2px solid rgba(59,130,246,0.25)` }} />

      {/* ── INTRO ── */}
      <AbsoluteFill style={{ opacity: introOp, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 80 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, opacity: catOp }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: RED }} />
          <span style={{ color: RED, fontSize: 13, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' }}>Privacy vs Public AI</span>
        </div>
        <div style={{ opacity: titleSp, transform: `translateY(${interpolate(titleSp, [0, 1], [50, 0])}px)`, marginBottom: 18 }}>
          <div style={{ color: '#FFF', fontSize: 80, fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.04em' }}>OPENCLAW</div>
          <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 56, fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em' }}>vs ChatGPT</div>
        </div>
        <div style={{ width: lineW, height: 4, backgroundColor: ACCENT, borderRadius: 2, marginBottom: 22 }} />
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 22, fontWeight: 400, margin: 0, opacity: subOp }}>Privacy is the new luxury.</p>
      </AbsoluteFill>

      {/* ── SCENE A: DATA FLOW ── */}
      <AbsoluteFill style={{ opacity: Math.min(sceneAOp, sceneAExit) }}>
        <div style={{ position: 'absolute', top: 72, left: 0, right: 0, textAlign: 'center' }}>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700 }}>Where Does Your Data Go?</div>
          <div style={{ color: '#FFF', fontSize: 32, fontWeight: 900, marginTop: 8 }}>The Difference That Matters</div>
        </div>

        {/* Left side: Standard AI — data flies to cloud */}
        <div style={{ position: 'absolute', left: 60, top: 200, width: 440, textAlign: 'center' }}>
          <div style={{ color: RED, fontSize: 12, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 16 }}>Standard AI (ChatGPT)</div>
          <svg width="440" height="400" style={{ overflow: 'visible' }}>
            {/* User device box */}
            <rect x="150" y="290" width="140" height="80" rx="10" fill="rgba(239,68,68,0.08)" stroke={RED} strokeWidth="1.5" />
            <text x="220" y="336" textAnchor="middle" fill={RED} fontSize="13" fontWeight="700" fontFamily={FONT}>YOUR DATA</text>
            {/* Cloud */}
            <g opacity={cloudOp} style={{ filter: 'drop-shadow(0 0 12px rgba(239,68,68,0.4))' }}>
              <ellipse cx="220" cy="80" rx="80" ry="45" fill="rgba(239,68,68,0.12)" stroke={RED} strokeWidth="1.5" />
              <text x="220" y="75" textAnchor="middle" fill={RED} fontSize="11" fontWeight="700" fontFamily={FONT}>BIG TECH</text>
              <text x="220" y="92" textAnchor="middle" fill={RED} fontSize="11" fontWeight="600" fontFamily={FONT}>SERVERS</text>
            </g>
            {/* Flowing data particles up */}
            {[0, 0.25, 0.5, 0.75].map((phase, di) => {
              const t = ((splitFrame / 45 + phase) % 1);
              const py = 290 - t * 220;
              const opacity = splitFrame > 10 ? Math.sin(t * Math.PI) * 0.7 : 0;
              return <circle key={di} cx={210 + di * 6} cy={py} r="4" fill={RED} opacity={opacity} />;
            })}
            <line x1="220" y1="125" x2="220" y2="288" stroke={RED} strokeWidth="1" opacity="0.25" strokeDasharray="6 6" />
            <text x="220" y="230" textAnchor="middle" fill={RED} fontSize="10" fontWeight="600" fontFamily={FONT} opacity="0.5">data leaks up</text>
          </svg>
          <div style={{ padding: '10px 18px', borderRadius: 10, border: `1px solid ${RED}35`, backgroundColor: `${RED}08`, marginTop: 8 }}>
            <div style={{ color: RED, fontSize: 13, fontWeight: 600 }}>❌ Your secrets train their model</div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ position: 'absolute', left: W / 2 - 0.5, top: 180, height: 680, width: 1, backgroundColor: 'rgba(255,255,255,0.08)' }} />

        {/* Right side: OpenClaw — data stays */}
        <div style={{ position: 'absolute', right: 60, top: 200, width: 440, textAlign: 'center' }}>
          <div style={{ color: GREEN, fontSize: 12, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 16 }}>OpenClaw (Your Hardware)</div>
          <svg width="440" height="400" style={{ overflow: 'visible' }}>
            {/* Device box */}
            <rect x="140" y="200" width="160" height="110" rx="12" fill="rgba(34,197,94,0.1)" stroke={GREEN} strokeWidth="2"
              style={{ filter: 'drop-shadow(0 0 14px rgba(34,197,94,0.3))' }} />
            <text x="220" y="248" textAnchor="middle" fill={GREEN} fontSize="13" fontWeight="700" fontFamily={FONT}>YOUR DATA</text>
            <text x="220" y="268" textAnchor="middle" fill={GREEN} fontSize="11" fontWeight="500" fontFamily={FONT}>stays here</text>
            {/* Lock icon */}
            <g transform={`translate(220, 310) scale(${interpolate(lockSp, [0, 1], [0.2, 1])})`} opacity={lockSp}
              style={{ transformOrigin: '220px 310px' }}>
              <rect x="-22" y="-20" width="44" height="36" rx="5" fill="rgba(34,197,94,0.2)" stroke={GREEN} strokeWidth="2" />
              <path d="M -12 -20 a 12 12 0 0 1 24 0" fill="none" stroke={GREEN} strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="0" cy="-2" r="5" fill={GREEN} />
            </g>
          </svg>
          <div style={{ padding: '10px 18px', borderRadius: 10, border: `1px solid ${GREEN}35`, backgroundColor: `${GREEN}08`, marginTop: 8 }}>
            <div style={{ color: GREEN, fontSize: 13, fontWeight: 600 }}>✅ Nobody else ever sees it</div>
          </div>
        </div>
      </AbsoluteFill>

      {/* ── SCENE B: COMPARISON TABLE ── */}
      <AbsoluteFill style={{ opacity: sceneBOp, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '0 70px' }}>
        <div style={{ color: ACCENT, fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700 }}>Feature Comparison</div>
        <div style={{ color: '#FFF', fontSize: 34, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 8 }}>OpenClaw Wins. Every Time.</div>

        <div style={{ width: '100%', borderRadius: 16, border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
          {/* Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', backgroundColor: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            {['Feature', 'ChatGPT / Public AI', 'OpenClaw'].map((h, i) => (
              <div key={h} style={{ padding: '12px 18px', color: i === 2 ? ACCENT : 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none', backgroundColor: i === 2 ? `${ACCENT}08` : 'transparent', textAlign: i > 0 ? 'center' : 'left' }}>{h}</div>
            ))}
          </div>
          {ROWS.map((row, i) => {
            const rowOp = interpolate(frame - 295, [i * 20, i * 20 + 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            return (
              <div key={row.feature} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: i < ROWS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', opacity: rowOp, backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                <div style={{ padding: '13px 18px', color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 600 }}>{row.feature}</div>
                <div style={{ padding: '13px 18px', color: 'rgba(255,255,255,0.4)', fontSize: 12, borderLeft: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>{row.them}</div>
                <div style={{ padding: '13px 18px', color: GREEN, fontSize: 12, fontWeight: 600, borderLeft: '1px solid rgba(59,130,246,0.12)', textAlign: 'center', backgroundColor: `${ACCENT}05` }}>{row.us}</div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* Brand */}
      <div style={{ position: 'absolute', bottom: 38, right: 56, display: 'flex', alignItems: 'center', gap: 8, fontFamily: FONT,
        opacity: interpolate(frame, [558, 578], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
        <div style={{ width: 14, height: 14, borderRadius: 3, backgroundColor: ACCENT }} />
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, fontWeight: 600, letterSpacing: '0.14em' }}>SYSTEMPROS.AI</span>
      </div>
    </AbsoluteFill>
  );
};

export default OpenClawVsChatGPT;
