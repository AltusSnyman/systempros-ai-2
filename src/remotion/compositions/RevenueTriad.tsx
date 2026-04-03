import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from 'remotion';

const ACCENT = '#3B82F6';
const BG = '#0A0A0A';
const FONT = "'Inter', system-ui, -apple-system, sans-serif";

export type RevenueTriadProps = Record<string, never>;

// --- Shared background ---
const Background = ({ frame }: { frame: number }) => {
  const bgGlowOpacity = interpolate(Math.sin(frame / 45), [-1, 1], [0.12, 0.22]);
  return (
    <>
      <AbsoluteFill style={{ backgroundColor: BG }} />
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 0%, rgba(59,130,246,${bgGlowOpacity}) 0%, transparent 60%)`,
        }}
      />
      <div style={{ position: 'absolute', top: 44, right: 44, width: 55, height: 55, borderTop: `3px solid rgba(59,130,246,0.4)`, borderRight: `3px solid rgba(59,130,246,0.4)` }} />
      <div style={{ position: 'absolute', bottom: 44, left: 44, width: 55, height: 55, borderBottom: `3px solid rgba(59,130,246,0.4)`, borderLeft: `3px solid rgba(59,130,246,0.4)` }} />
    </>
  );
};

// --- Phone icon SVG ---
const PhoneIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M6 6C6 5 7 4 8 4h4l2 5-2.5 2C12.5 14.5 17.5 19.5 21 20.5L23 18l5 2v4c0 1-1 2-2 2C12 26 6 14 6 6Z" stroke={ACCENT} strokeWidth="2" fill="none" />
  </svg>
);

// --- Arrow-out icon ---
const ArrowOutIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M8 24 L24 8 M24 8 H14 M24 8 V18" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// --- Refresh icon ---
const RefreshIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M16 6 A10 10 0 1 1 6 16" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M6 10 L6 16 L12 16" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

// --- Branding ---
const Brand = ({ frame }: { frame: number }) => {
  const op = interpolate(frame, [555, 580], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <div style={{ position: 'absolute', bottom: 38, right: 58, display: 'flex', alignItems: 'center', gap: 8, opacity: op, fontFamily: FONT }}>
      <div style={{ width: 16, height: 16, borderRadius: 3, backgroundColor: ACCENT }} />
      <span style={{ color: 'rgba(255,255,255,0.32)', fontSize: 13, fontWeight: 600, letterSpacing: '0.14em' }}>SYSTEMPROS.AI</span>
    </div>
  );
};

// ================== INTRO (0-90) ==================
const Intro = ({ frame, fps }: { frame: number; fps: number }) => {
  const catOp = interpolate(frame, [5, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleSpring = spring({ frame: frame - 15, fps, config: { damping: 180 } });
  const titleY = interpolate(titleSpring, [0, 1], [60, 0]);
  const lineWidth = interpolate(frame, [35, 75], [0, 180], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tagOp = interpolate(frame, [55, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px', fontFamily: FONT }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22, opacity: catOp }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: ACCENT }} />
        <span style={{ color: ACCENT, fontSize: 13, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' }}>Voice AI Agents</span>
      </div>
      <div style={{ transform: `translateY(${titleY}px)`, opacity: titleSpring, marginBottom: 22 }}>
        <div style={{ color: '#FFF', fontSize: 80, fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.03em' }}>THE REVENUE</div>
        <div style={{ color: '#FFF', fontSize: 80, fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.03em' }}>TRIAD</div>
      </div>
      <div style={{ width: lineWidth, height: 4, backgroundColor: ACCENT, borderRadius: 2, marginBottom: 24 }} />
      <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 22, fontWeight: 400, lineHeight: 1.5, margin: 0, opacity: tagOp }}>Three AI agents. Zero revenue leakage.</p>
    </AbsoluteFill>
  );
};

// ================== SCENE A: Triangle (90-270) ==================
const SceneA = ({ frame, fps }: { frame: number; fps: number }) => {
  const localFrame = frame - 90;

  // Node springs
  const node1Spring = spring({ frame: localFrame - 0, fps, config: { damping: 140, stiffness: 140 } });
  const node2Spring = spring({ frame: localFrame - 18, fps, config: { damping: 140, stiffness: 140 } });
  const node3Spring = spring({ frame: localFrame - 36, fps, config: { damping: 140, stiffness: 140 } });

  // Triangle positions (center 540,540): top-center, bottom-left, bottom-right
  const cx = 540; const cy = 460;
  const r = 200;
  const p1 = { x: cx, y: cy - r }; // top
  const p2 = { x: cx - r * 0.87, y: cy + r * 0.5 }; // bottom-left
  const p3 = { x: cx + r * 0.87, y: cy + r * 0.5 }; // bottom-right

  // Lines draw after frame 55 local
  const pathLen = 350;
  const line12 = interpolate(localFrame, [55, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line23 = interpolate(localFrame, [65, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line31 = interpolate(localFrame, [75, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const labelOp = interpolate(localFrame, [110, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const NodeCircle = ({
    x, y, sp, icon, label, sublabel
  }: {
    x: number; y: number; sp: number; icon: React.ReactNode; label: string; sublabel: string
  }) => {
    const scale = interpolate(sp, [0, 1], [0.3, 1]);
    return (
      <g transform={`translate(${x},${y})`} style={{ opacity: sp }}>
        <circle r={68} fill="rgba(59,130,246,0.12)" stroke={ACCENT} strokeWidth="2" transform={`scale(${scale})`} />
        <foreignObject x={-22} y={-22} width={44} height={44} transform={`scale(${scale})`}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44 }}>{icon}</div>
        </foreignObject>
        <text x={0} y={90} textAnchor="middle" fill={ACCENT} fontSize={13} fontWeight={700} letterSpacing="0.12em" fontFamily={FONT}>{label}</text>
        <text x={0} y={110} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize={12} fontFamily={FONT}>{sublabel}</text>
      </g>
    );
  };

  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      <svg width="1080" height="1080" style={{ position: 'absolute', top: 0, left: 0 }}>
        {/* Connecting lines */}
        <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
          stroke={ACCENT} strokeWidth="2" opacity={0.5}
          strokeDasharray={pathLen} strokeDashoffset={pathLen * (1 - line12)} />
        <line x1={p2.x} y1={p2.y} x2={p3.x} y2={p3.y}
          stroke={ACCENT} strokeWidth="2" opacity={0.5}
          strokeDasharray={pathLen} strokeDashoffset={pathLen * (1 - line23)} />
        <line x1={p3.x} y1={p3.y} x2={p1.x} y2={p1.y}
          stroke={ACCENT} strokeWidth="2" opacity={0.5}
          strokeDasharray={pathLen} strokeDashoffset={pathLen * (1 - line31)} />
        {/* Nodes */}
        <NodeCircle x={p1.x} y={p1.y} sp={node1Spring} icon={<PhoneIcon />} label="INBOUND AGENT" sublabel="24/7 Receptionist" />
        <NodeCircle x={p2.x} y={p2.y} sp={node2Spring} icon={<ArrowOutIcon />} label="OUTBOUND AGENT" sublabel="Instant Lead Response" />
        <NodeCircle x={p3.x} y={p3.y} sp={node3Spring} icon={<RefreshIcon />} label="REACTIVATION AGENT" sublabel="Dormant Contacts" />
      </svg>
      <div style={{
        position: 'absolute', bottom: 100, left: 0, right: 0, textAlign: 'center',
        color: 'rgba(255,255,255,0.8)', fontSize: 16, fontWeight: 700, letterSpacing: '0.18em',
        textTransform: 'uppercase', opacity: labelOp
      }}>COMPLETE REVENUE COVERAGE</div>
    </AbsoluteFill>
  );
};

// ================== SCENE B: Flow (270-430) ==================
const SceneB = ({ frame, fps }: { frame: number; fps: number }) => {
  const localFrame = frame - 270;
  const fadeIn = interpolate(localFrame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Waveform bars oscillate
  const numBars = 6;
  const barHeights = Array.from({ length: numBars }, (_, i) => {
    const phase = (localFrame / 8) + i * 1.1;
    return 20 + 30 * Math.abs(Math.sin(phase));
  });

  // Arrow draw progress
  const arrow1 = interpolate(localFrame, [20, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrow2 = interpolate(localFrame, [50, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const box1Spring = spring({ frame: localFrame - 5, fps, config: { damping: 180 } });
  const box2Spring = spring({ frame: localFrame - 25, fps, config: { damping: 180 } });
  const box3Spring = spring({ frame: localFrame - 55, fps, config: { damping: 180 } });

  const subtextOp = interpolate(localFrame, [90, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const pulseAmt = Math.sin(localFrame / 15) * 0.3 + 0.7;

  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, opacity: fadeIn }}>
      <div style={{ fontSize: 14, letterSpacing: '0.2em', color: ACCENT, fontWeight: 700, marginBottom: 60, textTransform: 'uppercase' }}>Revenue Flow Diagram</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, width: 900 }}>
        {/* NEW LEAD box */}
        <div style={{
          width: 200, height: 140, border: `2px solid rgba(59,130,246,${pulseAmt * 0.8})`,
          borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'rgba(59,130,246,0.08)', transform: `scale(${interpolate(box1Spring, [0, 1], [0.5, 1])})`, opacity: box1Spring, gap: 8
        }}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="14" r="7" stroke={ACCENT} strokeWidth="2" fill="none" />
            <path d="M6 32 C6 24 30 24 30 32" stroke={ACCENT} strokeWidth="2" fill="none" />
          </svg>
          <span style={{ color: '#FFF', fontSize: 15, fontWeight: 700, letterSpacing: '0.08em' }}>NEW LEAD</span>
        </div>

        {/* Arrow 1 */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="120" height="30" viewBox="0 0 120 30">
            <line x1="0" y1="15" x2={120 * arrow1} y2="15" stroke={ACCENT} strokeWidth="2.5"
              strokeDasharray="120" strokeDashoffset={120 * (1 - arrow1)} />
            {arrow1 > 0.9 && <path d="M105 8 L120 15 L105 22" stroke={ACCENT} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
          </svg>
        </div>

        {/* AI Agent / waveform */}
        <div style={{
          width: 200, height: 140, border: `2px solid ${ACCENT}`, borderRadius: 16,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'rgba(59,130,246,0.12)', transform: `scale(${interpolate(box2Spring, [0, 1], [0.5, 1])})`, opacity: box2Spring, gap: 8
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 40 }}>
            {barHeights.map((h, i) => (
              <div key={i} style={{ width: 8, height: h, backgroundColor: ACCENT, borderRadius: 4, transition: 'none' }} />
            ))}
          </div>
          <span style={{ color: '#FFF', fontSize: 15, fontWeight: 700, letterSpacing: '0.08em' }}>AI AGENT</span>
        </div>

        {/* Arrow 2 */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="120" height="30" viewBox="0 0 120 30">
            <line x1="0" y1="15" x2={120 * arrow2} y2="15" stroke={ACCENT} strokeWidth="2.5"
              strokeDasharray="120" strokeDashoffset={120 * (1 - arrow2)} />
            {arrow2 > 0.9 && <path d="M105 8 L120 15 L105 22" stroke={ACCENT} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
          </svg>
        </div>

        {/* BOOKED box */}
        <div style={{
          width: 200, height: 140, border: `2px solid #22c55e`,
          borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'rgba(34,197,94,0.08)', transform: `scale(${interpolate(box3Spring, [0, 1], [0.5, 1])})`, opacity: box3Spring, gap: 8
        }}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <rect x="4" y="8" width="28" height="24" rx="3" stroke="#22c55e" strokeWidth="2" fill="none" />
            <line x1="4" y1="14" x2="32" y2="14" stroke="#22c55e" strokeWidth="2" />
            <path d="M12 22 L16 26 L24 18" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ color: '#22c55e', fontSize: 15, fontWeight: 700, letterSpacing: '0.08em' }}>BOOKED</span>
        </div>
      </div>
      <div style={{ marginTop: 60, color: 'rgba(255,255,255,0.55)', fontSize: 20, letterSpacing: '0.05em', opacity: subtextOp }}>
        Response time <span style={{ color: ACCENT, fontWeight: 700 }}>&lt; 30 seconds</span>
      </div>
    </AbsoluteFill>
  );
};

// ================== SCENE C: Stats (430-560) ==================
const SceneC = ({ frame, fps }: { frame: number; fps: number }) => {
  const localFrame = frame - 430;
  const card1Spring = spring({ frame: localFrame - 0, fps, config: { damping: 160 } });
  const card2Spring = spring({ frame: localFrame - 20, fps, config: { damping: 160 } });
  const card3Spring = spring({ frame: localFrame - 40, fps, config: { damping: 160 } });

  const barHeight = interpolate(localFrame, [40, 100], [0, 120], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const counterVal = Math.floor(interpolate(localFrame, [40, 110], [0, 300], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  }));

  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, gap: 50 }}>
      <div style={{ fontSize: 14, letterSpacing: '0.2em', color: ACCENT, fontWeight: 700, textTransform: 'uppercase' }}>Results at a Glance</div>
      <div style={{ display: 'flex', gap: 40 }}>
        {/* Card 1 */}
        <div style={{
          width: 240, height: 280, border: `1.5px solid rgba(59,130,246,0.35)`, borderRadius: 20,
          backgroundColor: 'rgba(59,130,246,0.07)', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          opacity: card1Spring, transform: `translateY(${interpolate(card1Spring, [0, 1], [60, 0])}px)`, gap: 12
        }}>
          <span style={{ color: ACCENT, fontSize: 72, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}>24/7</span>
          <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, fontWeight: 500, letterSpacing: '0.06em' }}>Availability</span>
        </div>
        {/* Card 2 */}
        <div style={{
          width: 240, height: 280, border: `1.5px solid rgba(59,130,246,0.35)`, borderRadius: 20,
          backgroundColor: 'rgba(59,130,246,0.07)', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          opacity: card2Spring, transform: `translateY(${interpolate(card2Spring, [0, 1], [60, 0])}px)`, gap: 12
        }}>
          <svg width="180" height="130" viewBox="0 0 180 130">
            <line x1="20" y1="125" x2="165" y2="125" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <rect x="30" y={125 - barHeight} width="50" height={barHeight} fill={ACCENT} rx="4" />
            <text x="55" y={120 - barHeight} textAnchor="middle" fill="#FFF" fontSize="18" fontWeight="700" fontFamily={FONT}>73%</text>
          </svg>
          <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, fontWeight: 500, letterSpacing: '0.04em', textAlign: 'center' }}>More Appointments</span>
        </div>
        {/* Card 3 */}
        <div style={{
          width: 240, height: 280, border: `1.5px solid rgba(59,130,246,0.35)`, borderRadius: 20,
          backgroundColor: 'rgba(59,130,246,0.07)', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          opacity: card3Spring, transform: `translateY(${interpolate(card3Spring, [0, 1], [60, 0])}px)`, gap: 12
        }}>
          <span style={{ color: ACCENT, fontSize: 72, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}>{counterVal}+</span>
          <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, fontWeight: 500, letterSpacing: '0.04em' }}>Leads Recovered</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ================== MAIN EXPORT ==================
export const RevenueTriad = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const globalFadeOut = interpolate(frame, [570, 600], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ opacity: globalFadeOut }}>
      <Background frame={frame} />
      <Sequence from={0} durationInFrames={90}><Intro frame={frame} fps={fps} /></Sequence>
      <Sequence from={90} durationInFrames={180}><SceneA frame={frame} fps={fps} /></Sequence>
      <Sequence from={270} durationInFrames={160}><SceneB frame={frame} fps={fps} /></Sequence>
      <Sequence from={430} durationInFrames={130}><SceneC frame={frame} fps={fps} /></Sequence>
      <Brand frame={frame} />
    </AbsoluteFill>
  );
};
