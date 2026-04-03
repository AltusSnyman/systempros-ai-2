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

export type LeadGenWebsitesProps = Record<string, never>;

const Background = ({ frame }: { frame: number }) => {
  const glow = interpolate(Math.sin(frame / 45), [-1, 1], [0.10, 0.20]);
  return (
    <>
      <AbsoluteFill style={{ backgroundColor: BG }} />
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 0%, rgba(59,130,246,${glow}) 0%, transparent 60%)` }} />
      <div style={{ position: 'absolute', top: 44, right: 44, width: 55, height: 55, borderTop: `3px solid rgba(59,130,246,0.4)`, borderRight: `3px solid rgba(59,130,246,0.4)` }} />
      <div style={{ position: 'absolute', bottom: 44, left: 44, width: 55, height: 55, borderBottom: `3px solid rgba(59,130,246,0.4)`, borderLeft: `3px solid rgba(59,130,246,0.4)` }} />
    </>
  );
};

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
        <span style={{ color: ACCENT, fontSize: 13, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' }}>Website Conversion</span>
      </div>
      <div style={{ transform: `translateY(${titleY}px)`, opacity: titleSpring, marginBottom: 22 }}>
        <div style={{ color: '#FFF', fontSize: 80, fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.03em' }}>LEAD GEN</div>
        <div style={{ color: '#FFF', fontSize: 80, fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.03em' }}>WEBSITES</div>
      </div>
      <div style={{ width: lineWidth, height: 4, backgroundColor: ACCENT, borderRadius: 2, marginBottom: 24 }} />
      <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 22, fontWeight: 400, lineHeight: 1.5, margin: 0, opacity: tagOp }}>Your website. Engineered to book.</p>
    </AbsoluteFill>
  );
};

// ================== SCENE A: Before/After (90-260) ==================
const SceneA = ({ frame, fps }: { frame: number; fps: number }) => {
  const localFrame = frame - 90;
  const fadeIn = interpolate(localFrame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const beforeSpring = spring({ frame: localFrame - 5, fps, config: { damping: 160 } });
  const afterSpring = spring({ frame: localFrame - 25, fps, config: { damping: 160 } });

  // Arrow draws at frame 35-65
  const arrowDraw = interpolate(localFrame, [35, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Checkmarks appear
  const check1Op = interpolate(localFrame, [80, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const check2Op = interpolate(localFrame, [100, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const check3Op = interpolate(localFrame, [120, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, opacity: fadeIn, gap: 30 }}>
      <div style={{ fontSize: 14, letterSpacing: '0.2em', color: ACCENT, fontWeight: 700, textTransform: 'uppercase' }}>The Transformation</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, width: 900 }}>
        {/* BEFORE */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
          opacity: beforeSpring, transform: `translateX(${interpolate(beforeSpring, [0, 1], [-50, 0])}px)` }}>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, letterSpacing: '0.18em', fontWeight: 700 }}>BEFORE</span>
          <svg width="260" height="200" viewBox="0 0 260 200">
            {/* Browser chrome */}
            <rect x="5" y="5" width="250" height="190" rx="8" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
            <rect x="5" y="5" width="250" height="26" rx="8" fill="rgba(255,255,255,0.06)" />
            <circle cx="20" cy="18" r="4" fill="rgba(255,255,255,0.15)" />
            <circle cx="32" cy="18" r="4" fill="rgba(255,255,255,0.15)" />
            <circle cx="44" cy="18" r="4" fill="rgba(255,255,255,0.15)" />
            {/* Content blocks */}
            <rect x="15" y="40" width="230" height="40" rx="4" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <rect x="15" y="90" width="230" height="60" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <rect x="15" y="160" width="230" height="30" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          </svg>
          <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14, letterSpacing: '0.1em', fontWeight: 600 }}>BROCHURE SITE</span>
        </div>

        {/* Center arrow */}
        <div style={{ width: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <svg width="100" height="50" viewBox="0 0 100 50">
            <path d={`M 5 25 L ${95 * arrowDraw} 25`} stroke={ACCENT} strokeWidth="3" strokeLinecap="round"
              strokeDasharray="90" strokeDashoffset={90 * (1 - arrowDraw)} />
            {arrowDraw > 0.8 && (
              <path d="M 82 15 L 95 25 L 82 35" stroke={ACCENT} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            )}
          </svg>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke={ACCENT} strokeWidth="1.8" fill={ACCENT} fillOpacity={0.3} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* AFTER */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
          opacity: afterSpring, transform: `translateX(${interpolate(afterSpring, [0, 1], [50, 0])}px)` }}>
          <span style={{ color: ACCENT, fontSize: 13, letterSpacing: '0.18em', fontWeight: 700 }}>AFTER</span>
          <svg width="260" height="200" viewBox="0 0 260 200">
            <rect x="5" y="5" width="250" height="190" rx="8" fill="none" stroke={ACCENT} strokeWidth="1.5" />
            <rect x="5" y="5" width="250" height="26" rx="8" fill="rgba(59,130,246,0.08)" />
            <circle cx="20" cy="18" r="4" fill={ACCENT} />
            <circle cx="32" cy="18" r="4" fill="rgba(59,130,246,0.5)" />
            <circle cx="44" cy="18" r="4" fill="rgba(59,130,246,0.3)" />
            {/* Form element */}
            <rect x="15" y="40" width="150" height="14" rx="3" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <rect x="15" y="60" width="150" height="14" rx="3" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <rect x="15" y="80" width="100" height="22" rx="11" fill={ACCENT} />
            {/* Calendar widget */}
            <rect x="180" y="40" width="72" height="72" rx="6" fill="rgba(59,130,246,0.15)" stroke={ACCENT} strokeWidth="1" />
            <line x1="180" y1="52" x2="252" y2="52" stroke={ACCENT} strokeWidth="1" />
            <rect x="188" y="58" width="10" height="10" rx="2" fill="rgba(59,130,246,0.4)" />
            <rect x="202" y="58" width="10" height="10" rx="2" fill={ACCENT} />
            <rect x="216" y="58" width="10" height="10" rx="2" fill="rgba(59,130,246,0.4)" />
            <rect x="188" y="72" width="10" height="10" rx="2" fill="rgba(59,130,246,0.4)" />
            <rect x="202" y="72" width="10" height="10" rx="2" fill="rgba(59,130,246,0.4)" />
            {/* Chat bubble */}
            <rect x="15" y="115" width="230" height="30" rx="6" fill="rgba(59,130,246,0.1)" stroke={ACCENT} strokeWidth="1" />
            <text x="25" y="134" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily={FONT}>💬 Ask me anything...</text>
            {/* Footer */}
            <rect x="15" y="158" width="230" height="28" rx="4" fill="rgba(59,130,246,0.08)" stroke="rgba(59,130,246,0.2)" strokeWidth="1" />
          </svg>
          <span style={{ color: ACCENT, fontSize: 14, letterSpacing: '0.1em', fontWeight: 600 }}>LEAD MACHINE</span>
        </div>
      </div>

      {/* Checkmarks */}
      <div style={{ display: 'flex', gap: 32 }}>
        {[
          { label: 'Smart Forms', op: check1Op },
          { label: 'Booking Calendar', op: check2Op },
          { label: 'AI Chat', op: check3Op },
        ].map(({ label, op }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: op }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', backgroundColor: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#FFF', fontSize: 11, fontWeight: 800 }}>✓</span>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15, fontWeight: 600 }}>{label}</span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ================== SCENE B: Funnel (260-420) ==================
const SceneB = ({ frame, fps }: { frame: number; fps: number }) => {
  const localFrame = frame - 260;
  const fadeIn = interpolate(localFrame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const label1Op = interpolate(localFrame, [20, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const label2Op = interpolate(localFrame, [55, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const label3Op = interpolate(localFrame, [90, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeOp = interpolate(localFrame, [120, 145], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subtextOp = interpolate(localFrame, [130, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Funnel path draw
  const funnelDraw = interpolate(localFrame, [5, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, opacity: fadeIn, gap: 20 }}>
      <div style={{ fontSize: 14, letterSpacing: '0.2em', color: ACCENT, fontWeight: 700, textTransform: 'uppercase' }}>Conversion Funnel</div>
      <div style={{ position: 'relative', width: 520, height: 380 }}>
        <svg width="520" height="380" style={{ position: 'absolute', top: 0, left: 0 }}>
          {/* Funnel outline */}
          <path
            d="M 60 20 L 460 20 L 310 180 L 310 340 L 210 340 L 210 180 Z"
            fill="none" stroke={ACCENT} strokeWidth="2" opacity={0.5}
            strokeDasharray="1200" strokeDashoffset={1200 * (1 - funnelDraw)}
          />
          {/* Funnel fill sections */}
          <path d="M 60 20 L 460 20 L 380 80 L 140 80 Z" fill="rgba(59,130,246,0.08)" />
          <path d="M 140 80 L 380 80 L 330 160 L 190 160 Z" fill="rgba(59,130,246,0.12)" />
          <path d="M 190 160 L 330 160 L 310 340 L 210 340 Z" fill="rgba(59,130,246,0.18)" />
          {/* Divider lines */}
          <line x1="140" y1="80" x2="380" y2="80" stroke={ACCENT} strokeWidth="1.5" opacity="0.4" />
          <line x1="190" y1="160" x2="330" y2="160" stroke={ACCENT} strokeWidth="1.5" opacity="0.4" />
        </svg>
        {/* Labels */}
        <div style={{ position: 'absolute', top: 30, left: 0, right: 0, textAlign: 'center', opacity: label1Op }}>
          <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 22, fontWeight: 700 }}>1,000 Visitors</span>
        </div>
        <div style={{ position: 'absolute', top: 100, left: 0, right: 0, textAlign: 'center', opacity: label2Op }}>
          <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 19, fontWeight: 700 }}>124 Qualified Leads</span>
        </div>
        <div style={{ position: 'absolute', top: 285, left: 0, right: 0, textAlign: 'center', opacity: label3Op }}>
          <span style={{ color: ACCENT, fontSize: 24, fontWeight: 900 }}>47 Bookings</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <div style={{ opacity: badgeOp, backgroundColor: ACCENT, borderRadius: 100, padding: '8px 24px' }}>
          <span style={{ color: '#FFF', fontSize: 18, fontWeight: 800 }}>4.7% Conversion Rate</span>
        </div>
        <div style={{ opacity: subtextOp, color: 'rgba(255,255,255,0.5)', fontSize: 15, letterSpacing: '0.04em' }}>
          Automated follow-up at every stage
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ================== SCENE C: Bar chart (420-560) ==================
const SceneC = ({ frame, fps }: { frame: number; fps: number }) => {
  const localFrame = frame - 420;
  const fadeIn = interpolate(localFrame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const months = ['Month 1', 'Month 2', 'Month 3', 'Month 4'];
  const beforeHeights = [50, 55, 48, 60];
  const afterHeights = [80, 140, 195, 240];

  const chartDraw = interpolate(localFrame, [20, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOp = interpolate(localFrame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const maxH = 240;
  const chartH = 280;
  const chartW = 800;
  const barW = 30;
  const groupSpacing = chartW / 4;

  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, opacity: fadeIn, gap: 24 }}>
      <div style={{ opacity: titleOp, textAlign: 'center' }}>
        <div style={{ color: ACCENT, fontSize: 13, letterSpacing: '0.2em', fontWeight: 700, textTransform: 'uppercase', marginBottom: 6 }}>Monthly Leads</div>
        <div style={{ color: '#FFF', fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em' }}>YOUR RESULTS TRAJECTORY</div>
      </div>
      <svg width={chartW + 60} height={chartH + 60} viewBox={`0 0 ${chartW + 60} ${chartH + 60}`}>
        {/* Axes */}
        <line x1="50" y1="10" x2="50" y2={chartH + 10} stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <line x1="50" y1={chartH + 10} x2={chartW + 50} y2={chartH + 10} stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />

        {months.map((month, i) => {
          const groupX = 50 + i * groupSpacing + groupSpacing / 2 - barW - 4;
          const bH = beforeHeights[i]! * chartDraw;
          const aH = afterHeights[i]! * chartDraw;
          return (
            <g key={month}>
              {/* Before bar */}
              <rect
                x={groupX}
                y={chartH + 10 - bH}
                width={barW}
                height={bH}
                fill="rgba(255,255,255,0.18)"
                rx="3"
              />
              {/* After bar */}
              <rect
                x={groupX + barW + 8}
                y={chartH + 10 - aH}
                width={barW}
                height={aH}
                fill={ACCENT}
                rx="3"
              />
              {/* Month label */}
              <text x={groupX + barW + 4} y={chartH + 30} textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="11" fontFamily={FONT}>{month}</text>
            </g>
          );
        })}
        {/* Legend */}
        <rect x="55" y="15" width="12" height="12" fill="rgba(255,255,255,0.18)" rx="2" />
        <text x="72" y="25" fill="rgba(255,255,255,0.45)" fontSize="11" fontFamily={FONT}>Before</text>
        <rect x="120" y="15" width="12" height="12" fill={ACCENT} rx="2" />
        <text x="137" y="25" fill="rgba(255,255,255,0.7)" fontSize="11" fontFamily={FONT}>After</text>
      </svg>
    </AbsoluteFill>
  );
};

export const LeadGenWebsites = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const globalFadeOut = interpolate(frame, [570, 600], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ opacity: globalFadeOut }}>
      <Background frame={frame} />
      <Sequence from={0} durationInFrames={90}><Intro frame={frame} fps={fps} /></Sequence>
      <Sequence from={90} durationInFrames={170}><SceneA frame={frame} fps={fps} /></Sequence>
      <Sequence from={260} durationInFrames={160}><SceneB frame={frame} fps={fps} /></Sequence>
      <Sequence from={420} durationInFrames={140}><SceneC frame={frame} fps={fps} /></Sequence>
      <Brand frame={frame} />
    </AbsoluteFill>
  );
};
