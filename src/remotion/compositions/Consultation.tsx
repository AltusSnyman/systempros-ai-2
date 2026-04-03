import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
  Easing,
} from 'remotion';

const ACCENT = '#3B82F6';
const BG = '#0A0A0A';
const FONT = "'Inter', system-ui, -apple-system, sans-serif";

export type ConsultationProps = Record<string, never>;

const Background = ({ frame }: { frame: number }) => {
  const glow = interpolate(Math.sin(frame / 45), [-1, 1], [0.10, 0.22]);
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
        <span style={{ color: ACCENT, fontSize: 13, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' }}>Strategy & Audit</span>
      </div>
      <div style={{ transform: `translateY(${titleY}px)`, opacity: titleSpring, marginBottom: 22 }}>
        <div style={{ color: '#FFF', fontSize: 80, fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.03em' }}>CONSULTATION</div>
      </div>
      <div style={{ width: lineWidth, height: 4, backgroundColor: ACCENT, borderRadius: 2, marginBottom: 24 }} />
      <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 22, fontWeight: 400, lineHeight: 1.5, margin: 0, opacity: tagOp }}>We find the leaks. Then we fix them.</p>
    </AbsoluteFill>
  );
};

// ================== SCENE A: Audit (90-260) ==================
const SceneA = ({ frame, fps }: { frame: number; fps: number }) => {
  const localFrame = frame - 90;
  const fadeIn = interpolate(localFrame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const boxes = [
    { label: 'CRM', icon: 'crm' },
    { label: 'Phone', icon: 'phone' },
    { label: 'Website', icon: 'web' },
    { label: 'Team', icon: 'team' },
  ];

  const boxResults = [false, true, false, true]; // true = problem (X), false = check

  // Magnifying glass moves left to right
  const magX = interpolate(localFrame, [20, 110], [60, 820], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.quad),
  });

  // Each box flashes as magnifier passes
  const boxPositions = [130, 320, 510, 700];
  const boxFlash = boxPositions.map((bx) =>
    Math.abs(magX - bx) < 80 ? interpolate(Math.abs(magX - bx), [0, 80], [1, 0]) : 0
  );

  // Result icons appear after magnifier passes
  const resultOps = boxPositions.map((bx) =>
    interpolate(localFrame, [
      ((bx - 60) / 760) * 90 + 20,
      ((bx - 60) / 760) * 90 + 40,
    ], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );

  const counterOp = interpolate(localFrame, [115, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOp = interpolate(localFrame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, opacity: fadeIn, gap: 40 }}>
      <div style={{ opacity: titleOp, fontSize: 14, letterSpacing: '0.2em', color: ACCENT, fontWeight: 700, textTransform: 'uppercase' }}>Forensic Audit</div>

      {/* Business workflow boxes */}
      <div style={{ position: 'relative', width: 900, height: 160 }}>
        {/* Connecting lines */}
        <svg width="900" height="160" style={{ position: 'absolute', top: 0, left: 0 }}>
          {boxPositions.slice(0, -1).map((bx, i) => (
            <line key={i} x1={bx + 80} y1="80" x2={boxPositions[i + 1]!} y2="80"
              stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="8 4" />
          ))}
          {/* Animated magnifying glass */}
          <g transform={`translate(${magX - 20}, 50)`}>
            <circle cx="0" cy="0" r="30" fill="none" stroke={ACCENT} strokeWidth="3" />
            <line x1="21" y1="21" x2="38" y2="38" stroke={ACCENT} strokeWidth="3" strokeLinecap="round" />
          </g>
        </svg>

        {boxes.map((box, i) => {
          const bx = boxPositions[i]!;
          return (
            <div key={box.label} style={{
              position: 'absolute', left: bx - 10, top: 30, width: 100, height: 100,
              borderRadius: 14,
              border: `2px solid ${boxFlash[i]! > 0.3 ? ACCENT : 'rgba(255,255,255,0.12)'}`,
              backgroundColor: `rgba(59,130,246,${0.05 + boxFlash[i]! * 0.12})`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              boxShadow: boxFlash[i]! > 0.3 ? `0 0 24px rgba(59,130,246,${boxFlash[i]! * 0.4})` : 'none',
              gap: 6
            }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                {box.icon === 'crm' && <><rect x="4" y="4" width="20" height="20" rx="3" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" /><line x1="4" y1="10" x2="24" y2="10" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" /><line x1="10" y1="10" x2="10" y2="24" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" /></>}
                {box.icon === 'phone' && <path d="M6 5C6 4.5 6.5 4 7 4h4l1.5 4-2 1.5C11.2 12.2 15.8 16.8 18.5 17.5l1.5-2 4 1.5V21c0 .5-.5 1-1 1C10 22 6 14 6 5Z" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />}
                {box.icon === 'web' && <><circle cx="14" cy="14" r="10" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" /><ellipse cx="14" cy="14" rx="4" ry="10" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" /><line x1="4" y1="14" x2="24" y2="14" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" /></>}
                {box.icon === 'team' && <><circle cx="10" cy="10" r="5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" /><circle cx="18" cy="10" r="5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" /><path d="M4 24 C4 18 16 18 16 24" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" /><path d="M12 24 C12 18 24 18 24 24" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" /></>}
              </svg>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 600 }}>{box.label}</span>
              {/* Result icon */}
              <div style={{ position: 'absolute', top: -12, right: -12, opacity: resultOps[i]! }}>
                {boxResults[i] ? (
                  <div style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#FFF', fontSize: 12, fontWeight: 800 }}>✗</span>
                  </div>
                ) : (
                  <div style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#FFF', fontSize: 12, fontWeight: 800 }}>✓</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ opacity: counterOp, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <div style={{ backgroundColor: '#ef4444', borderRadius: 100, padding: '10px 28px' }}>
          <span style={{ color: '#FFF', fontSize: 18, fontWeight: 800 }}>PROBLEMS FOUND: 4</span>
        </div>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>Detailed report included</span>
      </div>
    </AbsoluteFill>
  );
};

// ================== SCENE B: Roadmap (260-420) ==================
const SceneB = ({ frame, fps }: { frame: number; fps: number }) => {
  const localFrame = frame - 260;
  const fadeIn = interpolate(localFrame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const timelineDraw = interpolate(localFrame, [10, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const milestones = [
    { label: 'WEEK 1–2', title: 'Deep Audit', x: 120 },
    { label: 'WEEK 3', title: 'Strategy Blueprint', x: 340 },
    { label: 'MONTH 1–3', title: 'Implementation', x: 580 },
    { label: 'ONGOING', title: 'Optimize & Scale', x: 800 },
  ];

  const badgeOp = interpolate(localFrame, [120, 145], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOp = interpolate(localFrame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, opacity: fadeIn, gap: 32 }}>
      <div style={{ opacity: titleOp, fontSize: 14, letterSpacing: '0.2em', color: ACCENT, fontWeight: 700, textTransform: 'uppercase' }}>Implementation Roadmap</div>

      <div style={{ position: 'relative', width: 920, height: 280 }}>
        <svg width="920" height="280" viewBox="0 0 920 280">
          {/* Timeline line */}
          <line x1="60" y1="120" x2={60 + 800 * timelineDraw} y2="120"
            stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round"
            strokeDasharray="800" strokeDashoffset={800 * (1 - timelineDraw)} />
          <line x1="60" y1="120" x2="860" y2="120" stroke="rgba(255,255,255,0.08)" strokeWidth="2.5" />

          {milestones.map((m, i) => {
            const milestoneOp = interpolate(localFrame, [25 + i * 20, 45 + i * 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            const dropLen = interpolate(localFrame, [35 + i * 20, 60 + i * 20], [0, 60], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            return (
              <g key={m.title} opacity={milestoneOp}>
                {/* Dot */}
                <circle cx={m.x} cy="120" r="8" fill={ACCENT} style={{ filter: 'drop-shadow(0 0 8px rgba(59,130,246,0.6))' }} />
                {/* Drop line */}
                <line x1={m.x} y1="120" x2={m.x} y2={120 + dropLen} stroke={ACCENT} strokeWidth="1.5" opacity="0.4" />
                {/* Label box */}
                <foreignObject x={m.x - 80} y="185" width="160" height="80">
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <span style={{ color: ACCENT, fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textAlign: 'center', fontFamily: FONT }}>{m.label}</span>
                    <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 600, textAlign: 'center', fontFamily: FONT }}>{m.title}</span>
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>
      </div>

      <div style={{ opacity: badgeOp, display: 'flex', gap: 20, alignItems: 'center' }}>
        <div style={{ backgroundColor: 'rgba(59,130,246,0.12)', border: `1.5px solid ${ACCENT}`, borderRadius: 12, padding: '12px 24px' }}>
          <span style={{ color: ACCENT, fontSize: 16, fontWeight: 800 }}>30+ YEARS IT EXPERIENCE</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ================== SCENE C: ROI Growth (420-560) ==================
const SceneC = ({ frame, fps }: { frame: number; fps: number }) => {
  const localFrame = frame - 420;
  const fadeIn = interpolate(localFrame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const chartDraw = interpolate(localFrame, [15, 90], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const titleOp = interpolate(localFrame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelsOp = interpolate(localFrame, [80, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const W = 800, H = 280;
  // Hockey-stick curve points
  const xLabels = ['Before', '3mo', '6mo', '12mo'];
  const points = [
    { x: 60, y: H - 30 },
    { x: 60 + (W - 80) * 0.33, y: H - 60 },
    { x: 60 + (W - 80) * 0.66, y: H - 160 },
    { x: 60 + (W - 80), y: H - 260 },
  ];

  // Interpolated path up to chartDraw
  const totalLen = 680;
  const gradientId = 'roiGrad';

  // Build path string
  const pathD = `M ${points[0]!.x} ${points[0]!.y} C ${points[0]!.x + 80} ${points[0]!.y}, ${points[1]!.x - 60} ${points[1]!.y}, ${points[1]!.x} ${points[1]!.y} C ${points[1]!.x + 80} ${points[1]!.y - 20}, ${points[2]!.x - 80} ${points[2]!.y + 20}, ${points[2]!.x} ${points[2]!.y} C ${points[2]!.x + 80} ${points[2]!.y - 60}, ${points[3]!.x - 80} ${points[3]!.y + 20}, ${points[3]!.x} ${points[3]!.y}`;
  const areaD = `${pathD} L ${points[3]!.x} ${H - 10} L ${points[0]!.x} ${H - 10} Z`;

  const keyPoints = [
    { x: points[1]!.x, y: points[1]!.y, label: '+43% efficiency' },
    { x: points[2]!.x, y: points[2]!.y, label: '+127% leads' },
    { x: points[3]!.x, y: points[3]!.y, label: '+2.4x revenue' },
  ];

  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, opacity: fadeIn, gap: 24 }}>
      <div style={{ opacity: titleOp, textAlign: 'center' }}>
        <div style={{ color: ACCENT, fontSize: 13, letterSpacing: '0.2em', fontWeight: 700, textTransform: 'uppercase', marginBottom: 6 }}>TYPICAL CLIENT TRAJECTORY</div>
        <div style={{ color: '#FFF', fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em' }}>ROI GROWTH CHART</div>
      </div>

      <svg width={W + 40} height={H + 40} viewBox={`0 0 ${W + 40} ${H + 40}`}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={ACCENT} stopOpacity="0.35" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Grid */}
        {[0.25, 0.5, 0.75].map((t, i) => (
          <line key={i} x1="60" y1={H - 10 - (H - 40) * t} x2={W} y2={H - 10 - (H - 40) * t}
            stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        ))}

        {/* Axes */}
        <line x1="60" y1="10" x2="60" y2={H - 10} stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <line x1="60" y1={H - 10} x2={W} y2={H - 10} stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />

        {/* Area fill */}
        <path d={areaD} fill={`url(#${gradientId})`} opacity={chartDraw * 0.8} />

        {/* Line */}
        <path d={pathD} fill="none" stroke={ACCENT} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray={totalLen} strokeDashoffset={totalLen * (1 - chartDraw)} />

        {/* X labels */}
        {xLabels.map((label, i) => (
          <text key={label} x={points[i]!.x} y={H + 20} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="13" fontFamily={FONT}>{label}</text>
        ))}

        {/* Key point dots */}
        {keyPoints.map((kp, i) => {
          const kpOp = interpolate(localFrame, [70 + i * 12, 88 + i * 12], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return (
            <g key={kp.label} opacity={kpOp}>
              <circle cx={kp.x} cy={kp.y} r="7" fill={ACCENT} style={{ filter: 'drop-shadow(0 0 6px rgba(59,130,246,0.8))' }} />
              <foreignObject x={kp.x - 65} y={kp.y - 35} width="130" height="28">
                <div style={{ backgroundColor: ACCENT, borderRadius: 8, padding: '3px 10px', textAlign: 'center' }}>
                  <span style={{ color: '#FFF', fontSize: 11, fontWeight: 700, fontFamily: FONT }}>{kp.label}</span>
                </div>
              </foreignObject>
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

export const Consultation = () => {
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
