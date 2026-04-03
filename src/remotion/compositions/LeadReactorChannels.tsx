import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from 'remotion';

const ACCENT = '#3B82F6';
const GREEN = '#22C55E';
const FONT = "'Inter', system-ui, -apple-system, sans-serif";
const W = 1080;
const H = 1080;

const CHANNELS = [
  { label: 'VOICE AI', sublabel: 'Instant AI Call', color: '#3B82F6', openRate: 95, angleDeg: -90 },
  { label: 'iMESSAGE', sublabel: '98% Open Rate', color: '#A855F7', openRate: 98, angleDeg: -30 },
  { label: 'WHATSAPP', sublabel: 'Direct Message', color: '#22C55E', openRate: 93, angleDeg: 30 },
  { label: 'SMS', sublabel: 'Text Fallback', color: '#F59E0B', openRate: 90, angleDeg: 90 },
  { label: 'EMAIL', sublabel: 'Smart Nurture', color: '#EC4899', openRate: 22, angleDeg: 150 },
  { label: 'MESSENGER', sublabel: 'Facebook Chat', color: '#06B6D4', openRate: 85, angleDeg: 210 },
];

const toRad = (deg: number) => (deg * Math.PI) / 180;

const CHANNEL_ICONS: Record<string, string> = {
  'VOICE AI': 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.93 12.4 19.79 19.79 0 0 1 1.86 3.77 2 2 0 0 1 3.84 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z',
  'iMESSAGE': 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  'WHATSAPP': 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z',
  'SMS': 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6',
  'EMAIL': 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6',
  'MESSENGER': 'M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.01.043.027.06a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z',
};

// Animated dot flowing from center to channel
const FlowDot = ({
  cx: centerX, cy: centerY, tx, ty, phase, frame, color, opacity,
}: {
  cx: number; cy: number; tx: number; ty: number;
  phase: number; frame: number; color: string; opacity: number;
}) => {
  const t = ((frame / 45 + phase) % 1);
  const x = centerX + (tx - centerX) * t;
  const y = centerY + (ty - centerY) * t;
  return <circle cx={x} cy={y} r={5} fill={color} opacity={opacity * 0.8} />;
};

export const LeadReactorChannels = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const fadeOut = interpolate(frame, [565, 600], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const globalOpacity = Math.min(fadeIn, fadeOut);
  const bgPulse = Math.sin(frame / 45) * 0.03 + 0.12;

  // ── INTRO (0-90) ────────────────────────────────────────────────────────────
  const introOp = interpolate(frame, [70, 100], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const catOp = interpolate(frame, [10, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleSp = spring({ frame: frame - 20, fps, config: { damping: 200 } });
  const lineW = interpolate(frame, [35, 90], [0, 200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOp = interpolate(frame, [75, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // ── SCENE A: CHANNEL BURST (90-340) ────────────────────────────────────────
  const sceneAOp = interpolate(frame, [85, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sceneAExit = interpolate(frame, [330, 360], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const centerX = W / 2;
  const centerY = H / 2 + 20;
  const radius = 310;

  // Central node pulsing
  const centerPulse = Math.sin(frame / 20) * 5 + 50;
  const centerRingOp = Math.sin(frame / 15) * 0.3 + 0.4;

  // Channels spring in with stagger
  const channelSprings = CHANNELS.map((_, i) =>
    spring({ frame: frame - (100 + i * 20), fps, config: { damping: 200 } })
  );

  // Lines draw from center to channels
  const lineProgs = CHANNELS.map((_, i) =>
    interpolate(frame, [110 + i * 15, 155 + i * 15], [0, 1], {
      extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad),
    })
  );

  const dotsActive = frame > 200;

  // "T + Xs" timer label
  const timerCount = Math.min(Math.floor(interpolate(frame, [90, 200], [0, 10], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })), 10);

  // ── SCENE B: OPEN RATE BARS (340-490) ──────────────────────────────────────
  const sceneBOp = interpolate(frame, [335, 365], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sceneBExit = interpolate(frame, [480, 510], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const barFills = CHANNELS.map((ch, i) =>
    interpolate(frame, [360 + i * 18, 410 + i * 18], [0, ch.openRate], {
      extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad),
    })
  );

  // ── SCENE C: CONVERGENCE (490-560) ─────────────────────────────────────────
  const sceneCOp = interpolate(frame, [485, 515], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const convSp = spring({ frame: frame - 510, fps, config: { damping: 200 } });
  const brandOp = interpolate(frame, [548, 570], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0A0A0A', opacity: globalOpacity, fontFamily: FONT }}>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 50%, rgba(59,130,246,${bgPulse}) 0%, transparent 60%)` }} />
      {Array.from({ length: 7 }, (_, i) => (
        <div key={i} style={{ position: 'absolute', top: `${(i + 1) * (100 / 8)}%`, left: 0, right: 0, height: 1, backgroundColor: 'rgba(255,255,255,0.03)' }} />
      ))}

      {/* ── INTRO ──────────────────────────────────────────────────────────────── */}
      <AbsoluteFill style={{ opacity: introOp, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, opacity: catOp }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: ACCENT }} />
          <span style={{ color: ACCENT, fontSize: 13, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' as const }}>Multi-Channel Automation</span>
        </div>
        <div style={{ transform: `translateY(${interpolate(titleSp, [0, 1], [50, 0])}px)`, opacity: titleSp, marginBottom: 18 }}>
          <div style={{ color: '#fff', fontSize: 82, fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.03em' }}>THE CHAIN</div>
          <div style={{ color: ACCENT, fontSize: 82, fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.03em' }}>REACTION</div>
        </div>
        <div style={{ width: lineW, height: 4, backgroundColor: ACCENT, borderRadius: 2, marginBottom: 24 }} />
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 22, fontWeight: 400, lineHeight: 1.5, margin: 0, opacity: subOp, maxWidth: 680 }}>
          6 channels. Simultaneously. In under 10 seconds. Because one channel is one chance to lose them.
        </p>
      </AbsoluteFill>

      {/* ── SCENE A: BURST DIAGRAM ──────────────────────────────────────────────── */}
      <AbsoluteFill style={{ opacity: Math.min(sceneAOp, sceneAExit) }}>
        <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>

          {/* Lines from center to each channel */}
          {CHANNELS.map((ch, i) => {
            const rad = toRad(ch.angleDeg);
            const tx = centerX + radius * Math.cos(rad);
            const ty = centerY + radius * Math.sin(rad);
            const prog = lineProgs[i];
            return (
              <line key={`line-${i}`}
                x1={centerX} y1={centerY}
                x2={centerX + (tx - centerX) * prog}
                y2={centerY + (ty - centerY) * prog}
                stroke={ch.color} strokeWidth={2} strokeDasharray="8 4" opacity={0.5}
              />
            );
          })}

          {/* Flowing dots */}
          {dotsActive && CHANNELS.map((ch, i) => {
            const rad = toRad(ch.angleDeg);
            const tx = centerX + radius * Math.cos(rad);
            const ty = centerY + radius * Math.sin(rad);
            return [0, 0.33, 0.66].map((ph) => (
              <FlowDot key={`dot-${i}-${ph}`}
                cx={centerX} cy={centerY} tx={tx} ty={ty}
                phase={ph + i * 0.05} frame={frame} color={ch.color} opacity={lineProgs[i]} />
            ));
          })}

          {/* Channel nodes */}
          {CHANNELS.map((ch, i) => {
            const rad = toRad(ch.angleDeg);
            const nx = centerX + radius * Math.cos(rad);
            const ny = centerY + radius * Math.sin(rad);
            const sp = channelSprings[i];
            const scale = interpolate(sp, [0, 1], [0, 1]);
            const op = interpolate(sp, [0, 1], [0, 1]);

            // Label position (push outward)
            const labelR = radius + 80;
            const lx = centerX + labelR * Math.cos(rad);
            const ly = centerY + labelR * Math.sin(rad);

            return (
              <g key={`ch-${i}`} transform={`translate(${nx}, ${ny})`} opacity={op}>
                <g transform={`scale(${scale})`}>
                  <circle r={42} fill={`${ch.color}18`} stroke={ch.color} strokeWidth={2} />
                  <svg x={-12} y={-12} width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={ch.color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d={CHANNEL_ICONS[ch.label]} />
                  </svg>
                  {/* Label outside */}
                  <text x={lx - nx} y={ly - ny - 8} textAnchor="middle" fill="white" fontSize={12} fontWeight={700} fontFamily={FONT}>{ch.label}</text>
                  <text x={lx - nx} y={ly - ny + 8} textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize={10} fontFamily={FONT}>{ch.sublabel}</text>
                </g>
              </g>
            );
          })}

          {/* Central node */}
          <g>
            <circle cx={centerX} cy={centerY} r={centerPulse + 20} fill="none" stroke={ACCENT} strokeWidth={1} opacity={centerRingOp * 0.4} />
            <circle cx={centerX} cy={centerY} r={58} fill="rgba(59,130,246,0.12)" stroke={ACCENT} strokeWidth={2.5} />
            <text x={centerX} y={centerY - 8} textAnchor="middle" fill={ACCENT} fontSize={13} fontWeight={800} fontFamily={FONT}>LEAD</text>
            <text x={centerX} y={centerY + 10} textAnchor="middle" fill={ACCENT} fontSize={13} fontWeight={800} fontFamily={FONT}>SUBMITS</text>
          </g>

          {/* Timer */}
          {dotsActive && (
            <g>
              <rect x={centerX - 55} y={centerY + 75} width={110} height={30} rx={15} fill="rgba(59,130,246,0.15)" stroke={ACCENT} strokeWidth={1} />
              <text x={centerX} y={centerY + 95} textAnchor="middle" fill={ACCENT} fontSize={13} fontWeight={700} fontFamily={FONT}>T + {timerCount}s</text>
            </g>
          )}
        </svg>

        {/* Label */}
        <div style={{ position: 'absolute', top: 60, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: sceneAOp }}>
          <div style={{ padding: '8px 24px', borderRadius: 100, border: `1px solid rgba(59,130,246,0.3)`, backgroundColor: 'rgba(59,130,246,0.06)' }}>
            <span style={{ color: ACCENT, fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' as const }}>{'6 simultaneous channels — < 10 seconds'}</span>
          </div>
        </div>
      </AbsoluteFill>

      {/* ── SCENE B: OPEN RATE BARS ──────────────────────────────────────────────── */}
      <AbsoluteFill style={{ opacity: Math.min(sceneBOp, sceneBExit) }}>
        <div style={{ position: 'absolute', top: 80, left: 0, right: 0, textAlign: 'center' as const }}>
          <div style={{ color: '#fff', fontSize: 36, fontWeight: 900, letterSpacing: '-0.02em' }}>Why We Hit Every Channel</div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16, marginTop: 8 }}>Open / Answer Rates by Channel</div>
        </div>

        <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
          {CHANNELS.map((ch, i) => {
            const barMaxW = 560;
            const filledW = (barFills[i] / 100) * barMaxW;
            const y = 220 + i * 120;
            return (
              <g key={i}>
                {/* Background track */}
                <rect x={200} y={y + 20} width={barMaxW} height={44} rx={6} fill="rgba(255,255,255,0.04)" />
                {/* Filled bar */}
                <rect x={200} y={y + 20} width={filledW} height={44} rx={6} fill={ch.color} opacity={0.8} />
                {/* Label */}
                <text x={180} y={y + 48} textAnchor="end" fill="rgba(255,255,255,0.7)" fontSize={14} fontWeight={700} fontFamily={FONT}>{ch.label}</text>
                {/* Value */}
                <text x={200 + filledW + 12} y={y + 48} fill={ch.color} fontSize={16} fontWeight={800} fontFamily={FONT}>{Math.round(barFills[i])}%</text>
              </g>
            );
          })}
          {/* Email note */}
          <text x={200 + (22 / 100) * 560 + 65} y={820} fill="rgba(236,72,153,0.6)" fontSize={11} fontFamily={FONT}>← single-channel reliance</text>
        </svg>
      </AbsoluteFill>

      {/* ── SCENE C: CONVERGENCE RESULT ──────────────────────────────────────────── */}
      <AbsoluteFill style={{
        opacity: sceneCOp, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 100,
      }}>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' as const, marginBottom: 24 }}>
          The end goal of every channel
        </div>

        <div style={{
          width: 160, height: 160, borderRadius: '50%',
          backgroundColor: `${GREEN}18`,
          border: `3px solid ${GREEN}`,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 0 60px ${GREEN}40`,
          transform: `scale(${interpolate(convSp, [0, 1], [0, 1])})`,
          opacity: interpolate(convSp, [0, 1], [0, 1]),
          marginBottom: 32,
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /><path d="M9 16l2 2 4-4" />
          </svg>
          <span style={{ color: GREEN, fontSize: 13, fontWeight: 800, letterSpacing: '0.1em', marginTop: 8 }}>BOOKED</span>
        </div>

        <div style={{ color: '#fff', fontSize: 44, fontWeight: 900, letterSpacing: '-0.03em', textAlign: 'center' as const, marginBottom: 16 }}>
          6 Channels →<br /><span style={{ color: GREEN }}>1 Booked Meeting</span>
        </div>
        <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 18, textAlign: 'center' as const, maxWidth: 560 }}>
          Synced directly to your Google or Outlook calendar.<br />You just show up.
        </div>
      </AbsoluteFill>

      {/* Brand */}
      <div style={{ position: 'absolute', bottom: 38, right: 58, display: 'flex', alignItems: 'center', gap: 8, opacity: brandOp }}>
        <div style={{ width: 16, height: 16, borderRadius: 3, backgroundColor: ACCENT }} />
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, fontWeight: 600, letterSpacing: '0.14em' }}>SYSTEMPROS.AI</span>
      </div>
    </AbsoluteFill>
  );
};
