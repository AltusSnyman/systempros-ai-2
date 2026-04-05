import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const ACCENT = '#3B82F6';
const PURPLE = '#8B5CF6';
const BG = '#0A0A0A';
const FONT = "'Inter', system-ui, -apple-system, sans-serif";
const W = 1080;

const PLATFORMS = [
  { name: 'WhatsApp', color: '#25D366', angle: -90 },
  { name: 'iMessage', color: '#34C759', angle: -30 },
  { name: 'Slack', color: '#E01E5A', angle: 30 },
  { name: 'Discord', color: '#5865F2', angle: 90 },
  { name: 'Telegram', color: '#2AABEE', angle: 150 },
  { name: 'Email', color: ACCENT, angle: 210 },
];

const STATS = [
  { val: '247K+', label: 'GitHub Stars', color: PURPLE },
  { val: '3,000+', label: 'Skills on ClawHub', color: ACCENT },
  { val: '20+', label: 'Messaging Platforms', color: '#22C55E' },
  { val: '48–72h', label: 'Done-For-You Deploy', color: '#F59E0B' },
];

export const OpenClawHub = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const glow = interpolate(Math.sin(frame / 40), [-1, 1], [0.1, 0.22]);
  const fadeOut = interpolate(frame, [575, 600], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // ── INTRO (0-85) ────────────────────────────────────────────────────────────
  const introOp = interpolate(frame, [72, 95], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const catOp = interpolate(frame, [5, 28], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleSp = spring({ frame: frame - 12, fps, config: { damping: 180 } });
  const counterVal = Math.floor(interpolate(frame, [18, 75], [0, 247], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const lineW = interpolate(frame, [30, 75], [0, 220], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOp = interpolate(frame, [55, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // ── SCENE A: Platform Orbit (85-330) ───────────────────────────────────────
  const sceneAOp = interpolate(frame, [82, 108], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sceneAExit = interpolate(frame, [318, 344], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cx = W / 2, cy = 510, orbitR = 230;
  const centerSp = spring({ frame: frame - 85, fps, config: { damping: 140 } });
  const pulse = 1 + 0.05 * Math.sin(frame / 20);

  // ── SCENE B: Stats grid (330-575) ──────────────────────────────────────────
  const sceneBOp = interpolate(frame, [328, 352], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ opacity: fadeOut, fontFamily: FONT }}>
      {/* Background */}
      <AbsoluteFill style={{ backgroundColor: BG }} />
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 10%, rgba(139,92,246,${glow}) 0%, transparent 55%)` }} />
      <div style={{ position: 'absolute', top: 44, right: 44, width: 48, height: 48, borderTop: `2px solid rgba(139,92,246,0.3)`, borderRight: `2px solid rgba(139,92,246,0.3)` }} />
      <div style={{ position: 'absolute', bottom: 44, left: 44, width: 48, height: 48, borderBottom: `2px solid rgba(59,130,246,0.3)`, borderLeft: `2px solid rgba(59,130,246,0.3)` }} />

      {/* ── INTRO ── */}
      <AbsoluteFill style={{ opacity: introOp, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 80 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, opacity: catOp }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: PURPLE }} />
          <span style={{ color: PURPLE, fontSize: 13, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' }}>Open Source AI</span>
        </div>
        <div style={{ opacity: titleSp, transform: `translateY(${interpolate(titleSp, [0, 1], [50, 0])}px)`, marginBottom: 18 }}>
          <div style={{ color: '#FFF', fontSize: 86, fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.04em' }}>OPENCLAW</div>
          <div style={{ color: PURPLE, fontSize: 86, fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.04em' }}>247K+ STARS</div>
        </div>
        <div style={{ width: lineW, height: 4, backgroundColor: PURPLE, borderRadius: 2, marginBottom: 22 }} />
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 22, fontWeight: 400, margin: 0, opacity: subOp }}>The world's most powerful open-source AI assistant</p>
      </AbsoluteFill>

      {/* ── SCENE A: ORBIT ── */}
      <AbsoluteFill style={{ opacity: Math.min(sceneAOp, sceneAExit) }}>
        <div style={{ position: 'absolute', top: 68, left: 0, right: 0, textAlign: 'center' }}>
          <div style={{ color: PURPLE, fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700 }}>One AI. Every Platform.</div>
          <div style={{ color: '#FFF', fontSize: 34, fontWeight: 900, marginTop: 6 }}>Your Intelligence Follows You</div>
        </div>
        <svg width={W} height={W} style={{ position: 'absolute', top: 0, left: 0 }}>
          <circle cx={cx} cy={cy} r={orbitR} fill="none" stroke="rgba(139,92,246,0.1)" strokeWidth="1.5" />
          <g transform={`translate(${cx},${cy})`}>
            <circle r={64} fill="rgba(139,92,246,0.12)" stroke={PURPLE} strokeWidth="2"
              transform={`scale(${interpolate(centerSp, [0, 1], [0.2, 1]) * pulse})`}
              style={{ filter: 'drop-shadow(0 0 18px rgba(139,92,246,0.45))' }} />
            <text textAnchor="middle" y={-4} fill={PURPLE} fontSize="16" fontWeight="900" fontFamily={FONT} opacity={centerSp}>OPEN</text>
            <text textAnchor="middle" y={16} fill={PURPLE} fontSize="16" fontWeight="900" fontFamily={FONT} opacity={centerSp}>CLAW</text>
          </g>
          {PLATFORMS.map((p, i) => {
            const rad = (p.angle * Math.PI) / 180;
            const px = cx + orbitR * Math.cos(rad), py = cy + orbitR * Math.sin(rad);
            const pSp = spring({ frame: frame - 85 - i * 14, fps, config: { damping: 155 } });
            const lineP = interpolate(frame - 85, [10 + i * 14, 40 + i * 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            const lineLen = orbitR - 52;
            const nx = Math.cos(rad), ny = Math.sin(rad);
            // Flowing dot
            const t = ((frame / 35 + i * 0.17) % 1);
            const dotX = cx + (52 + lineLen * t) * nx, dotY = cy + (52 + lineLen * t) * ny;
            return (
              <g key={p.name}>
                <line x1={cx + 52 * nx} y1={cy + 52 * ny} x2={cx + (52 + lineLen * lineP) * nx} y2={cy + (52 + lineLen * lineP) * ny}
                  stroke={p.color} strokeWidth="1.5" opacity={0.4} />
                <circle cx={dotX} cy={dotY} r="4" fill={p.color} opacity={lineP * 0.8} />
                <circle cx={px} cy={py} r={36} fill={`${p.color}18`} stroke={p.color} strokeWidth="1.5"
                  opacity={pSp} style={{ transformOrigin: `${px}px ${py}px`, transform: `scale(${interpolate(pSp, [0, 1], [0.2, 1])})` }} />
                <text x={px} y={py + 5} textAnchor="middle" fill={p.color} fontSize="10" fontWeight="700" fontFamily={FONT} opacity={pSp}>{p.name.slice(0, 3).toUpperCase()}</text>
              </g>
            );
          })}
        </svg>
        <div style={{ position: 'absolute', bottom: 72, left: 0, right: 0, textAlign: 'center',
          opacity: interpolate(frame - 85, [140, 168], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
          <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, fontWeight: 500 }}>20+ platforms · One unified intelligence</span>
        </div>
      </AbsoluteFill>

      {/* ── SCENE B: STATS ── */}
      <AbsoluteFill style={{ opacity: sceneBOp, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
        <div style={{ color: PURPLE, fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700 }}>By The Numbers</div>
        <div style={{ color: '#FFF', fontSize: 38, fontWeight: 900, letterSpacing: '-0.02em' }}>
          Why <span style={{ color: PURPLE }}>OpenClaw</span> is Trending
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, justifyContent: 'center', width: 880, marginTop: 8 }}>
          {STATS.map((s, i) => {
            const sp = spring({ frame: frame - 330 - i * 18, fps, config: { damping: 160 } });
            return (
              <div key={s.label} style={{
                width: 390, padding: '28px 24px', borderRadius: 16,
                border: `1.5px solid ${s.color}35`, backgroundColor: `${s.color}08`,
                display: 'flex', alignItems: 'center', gap: 20,
                opacity: sp, transform: `translateY(${interpolate(sp, [0, 1], [30, 0])}px)`,
              }}>
                <div style={{ color: s.color, fontSize: 48, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}>{s.val}</div>
                <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, fontWeight: 500 }}>{s.label}</div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* Brand */}
      <div style={{ position: 'absolute', bottom: 38, right: 56, display: 'flex', alignItems: 'center', gap: 8,
        opacity: interpolate(frame, [560, 580], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
        <div style={{ width: 14, height: 14, borderRadius: 3, backgroundColor: ACCENT }} />
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, fontWeight: 600, letterSpacing: '0.14em' }}>SYSTEMPROS.AI</span>
      </div>
    </AbsoluteFill>
  );
};

export default OpenClawHub;
