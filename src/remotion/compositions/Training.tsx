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

export type TrainingProps = Record<string, never>;

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
        <span style={{ color: ACCENT, fontSize: 13, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' }}>1-on-1 Sessions</span>
      </div>
      <div style={{ transform: `translateY(${titleY}px)`, opacity: titleSpring, marginBottom: 22 }}>
        <div style={{ color: '#FFF', fontSize: 80, fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.03em' }}>TRAINING</div>
      </div>
      <div style={{ width: lineWidth, height: 4, backgroundColor: ACCENT, borderRadius: 2, marginBottom: 24 }} />
      <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 22, fontWeight: 400, lineHeight: 1.5, margin: 0, opacity: tagOp }}>Learn the tools driving real results. By doing.</p>
    </AbsoluteFill>
  );
};

// ================== SCENE A: Tool Grid (90-260) ==================
const SceneA = ({ frame, fps }: { frame: number; fps: number }) => {
  const localFrame = frame - 90;
  const fadeIn = interpolate(localFrame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const tools = [
    { name: 'Claude Code', desc: 'AI Coding Agent', iconType: 'terminal' },
    { name: 'GoHighLevel', desc: 'CRM & Automation', iconType: 'crm' },
    { name: 'N8N', desc: 'Workflow Builder', iconType: 'node' },
    { name: 'Make.com', desc: 'Visual Automation', iconType: 'make' },
    { name: 'Voice AI', desc: 'AI Agents', iconType: 'wave' },
    { name: 'OpenClaw', desc: 'AI Assistant', iconType: 'paw' },
  ];

  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, opacity: fadeIn, gap: 30 }}>
      <div style={{ fontSize: 14, letterSpacing: '0.2em', color: ACCENT, fontWeight: 700, textTransform: 'uppercase' }}>Tools We Train You On</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center', width: 800 }}>
        {tools.map((tool, i) => {
          const cardSpring = spring({ frame: localFrame - (i * 16 + 10), fps, config: { damping: 160 } });
          const row = Math.floor(i / 3), col = i % 3;
          return (
            <div key={tool.name} style={{
              width: 230, height: 130, borderRadius: 16,
              border: `1.5px solid rgba(59,130,246,0.3)`,
              backgroundColor: 'rgba(59,130,246,0.06)',
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center',
              padding: '0 24px', gap: 8,
              opacity: cardSpring,
              transform: `translateY(${interpolate(cardSpring, [0, 1], [40, 0])}px) scale(${interpolate(cardSpring, [0, 1], [0.85, 1])})`,
            }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                {tool.iconType === 'terminal' && (
                  <>
                    <rect x="2" y="4" width="24" height="20" rx="3" stroke={ACCENT} strokeWidth="1.5" fill="none" />
                    <path d="M7 10 L11 14 L7 18" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <line x1="13" y1="18" x2="21" y2="18" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" />
                  </>
                )}
                {tool.iconType === 'crm' && (
                  <>
                    <rect x="2" y="2" width="24" height="24" rx="3" stroke={ACCENT} strokeWidth="1.5" fill="none" />
                    <line x1="2" y1="9" x2="26" y2="9" stroke={ACCENT} strokeWidth="1.5" />
                    <line x1="9" y1="9" x2="9" y2="26" stroke={ACCENT} strokeWidth="1.5" />
                    <circle cx="5.5" cy="5.5" r="1.5" fill={ACCENT} />
                  </>
                )}
                {tool.iconType === 'node' && (
                  <>
                    <circle cx="6" cy="14" r="3.5" stroke={ACCENT} strokeWidth="1.5" fill="none" />
                    <circle cx="22" cy="7" r="3.5" stroke={ACCENT} strokeWidth="1.5" fill="none" />
                    <circle cx="22" cy="21" r="3.5" stroke={ACCENT} strokeWidth="1.5" fill="none" />
                    <line x1="9.5" y1="14" x2="18.5" y2="7" stroke={ACCENT} strokeWidth="1.5" />
                    <line x1="9.5" y1="14" x2="18.5" y2="21" stroke={ACCENT} strokeWidth="1.5" />
                  </>
                )}
                {tool.iconType === 'make' && (
                  <>
                    <circle cx="14" cy="14" r="10" stroke={ACCENT} strokeWidth="1.5" fill="none" />
                    <circle cx="14" cy="14" r="5" stroke={ACCENT} strokeWidth="1.5" fill="none" />
                    <circle cx="14" cy="14" r="2" fill={ACCENT} />
                  </>
                )}
                {tool.iconType === 'wave' && (
                  <path d="M2 14 Q4 8 6 14 Q8 20 10 14 Q12 8 14 14 Q16 20 18 14 Q20 8 22 14 Q24 20 26 14" stroke={ACCENT} strokeWidth="1.5" fill="none" strokeLinecap="round" />
                )}
                {tool.iconType === 'paw' && (
                  <>
                    <circle cx="14" cy="16" r="6" stroke={ACCENT} strokeWidth="1.5" fill="none" />
                    <circle cx="7" cy="9" r="3" stroke={ACCENT} strokeWidth="1.5" fill="none" />
                    <circle cx="21" cy="9" r="3" stroke={ACCENT} strokeWidth="1.5" fill="none" />
                    <circle cx="10" cy="5" r="2" stroke={ACCENT} strokeWidth="1.5" fill="none" />
                    <circle cx="18" cy="5" r="2" stroke={ACCENT} strokeWidth="1.5" fill="none" />
                  </>
                )}
              </svg>
              <div>
                <div style={{ color: '#FFF', fontSize: 15, fontWeight: 700 }}>{tool.name}</div>
                <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, fontWeight: 500 }}>{tool.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ================== SCENE B: Skill Bars (260-420) ==================
const SceneB = ({ frame, fps }: { frame: number; fps: number }) => {
  const localFrame = frame - 260;
  const fadeIn = interpolate(localFrame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const skills = [
    { label: 'AI Prompting', pct: 94 },
    { label: 'Automation Workflows', pct: 88 },
    { label: 'Voice AI Setup', pct: 91 },
    { label: 'CRM Mastery', pct: 86 },
    { label: 'ROI Tracking', pct: 90 },
  ];

  const titleOp = interpolate(localFrame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, opacity: fadeIn, gap: 36 }}>
      <div style={{ opacity: titleOp, textAlign: 'center' }}>
        <div style={{ color: ACCENT, fontSize: 13, letterSpacing: '0.2em', fontWeight: 700, textTransform: 'uppercase', marginBottom: 6 }}>Skill Development</div>
        <div style={{ color: '#FFF', fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em' }}>YOUR TEAM AFTER TRAINING</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 22, width: 700 }}>
        {skills.map((skill, i) => {
          const barFill = interpolate(localFrame, [20 + i * 15, 70 + i * 15], [0, skill.pct], {
            extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
            easing: Easing.out(Easing.cubic),
          });
          const labelOp = interpolate(localFrame, [15 + i * 15, 35 + i * 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const pctOp = interpolate(localFrame, [65 + i * 15, 80 + i * 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

          return (
            <div key={skill.label} style={{ display: 'flex', flexDirection: 'column', gap: 8, opacity: labelOp }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15, fontWeight: 600 }}>{skill.label}</span>
                <span style={{ color: ACCENT, fontSize: 15, fontWeight: 800, opacity: pctOp }}>{Math.floor(barFill)}%</span>
              </div>
              <div style={{ height: 10, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 6, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: `${barFill}%`, backgroundColor: ACCENT,
                  borderRadius: 6, boxShadow: '0 0 10px rgba(59,130,246,0.4)',
                  transition: 'none'
                }} />
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ================== SCENE C: 1-on-1 Visual (420-560) ==================
const SceneC = ({ frame, fps }: { frame: number; fps: number }) => {
  const localFrame = frame - 420;
  const fadeIn = interpolate(localFrame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const leftSpring = spring({ frame: localFrame - 5, fps, config: { damping: 160 } });
  const rightSpring = spring({ frame: localFrame - 20, fps, config: { damping: 160 } });
  const centerSpring = spring({ frame: localFrame - 35, fps, config: { damping: 160 } });

  // Flowing dots along connection path
  const numDots = 5;
  const gearAngle = (localFrame / 60) * Math.PI * 2;

  const footerOp = interpolate(localFrame, [80, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeOp = interpolate(localFrame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, opacity: fadeIn, gap: 40 }}>
      <div style={{ fontSize: 14, letterSpacing: '0.2em', color: ACCENT, fontWeight: 700, textTransform: 'uppercase' }}>1-on-1 Learning</div>

      <div style={{ position: 'relative', width: 800, height: 300 }}>
        <svg width="800" height="300" style={{ position: 'absolute', top: 0, left: 0 }}>
          {/* Left person */}
          <g opacity={leftSpring} transform={`translate(${interpolate(leftSpring, [0, 1], [-40, 0])}, 0)`}>
            <circle cx="140" cy="100" r="40" fill="rgba(59,130,246,0.12)" stroke={ACCENT} strokeWidth="2" />
            <circle cx="140" cy="80" r="18" fill="rgba(59,130,246,0.2)" stroke={ACCENT} strokeWidth="1.5" />
            <path d="M105 140 Q140 120 175 140" fill="rgba(59,130,246,0.15)" stroke={ACCENT} strokeWidth="1.5" />
            <text x="140" y="180" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="13" fontWeight="600" fontFamily={FONT}>You</text>
          </g>

          {/* Connection lines with flowing dots */}
          {Array.from({ length: numDots }, (_, di) => {
            const t = ((localFrame / 40 + di / numDots) % 1);
            const cx1 = 200, cy1 = 110, cx2 = 600, cy2 = 110;
            // Bezier point
            const bx = cx1 + (cx2 - cx1) * t;
            const by = cy1 + Math.sin(t * Math.PI) * -30;
            const dotOp = interpolate(localFrame, [40, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            return (
              <circle key={di} cx={bx} cy={by} r="4" fill={ACCENT} opacity={dotOp * (0.4 + 0.6 * Math.sin(t * Math.PI))} />
            );
          })}
          <path d="M 200 110 Q 400 60 600 110" fill="none" stroke={ACCENT} strokeWidth="1.5" strokeDasharray="8 6" opacity="0.25" />

          {/* Center gear/brain */}
          <g transform={`translate(400, 130) rotate(${(gearAngle * 180) / Math.PI})`} opacity={centerSpring}>
            {Array.from({ length: 8 }, (_, ti) => {
              const ta = (ti / 8) * Math.PI * 2;
              return (
                <rect
                  key={ti}
                  x="-6"
                  y="-45"
                  width="12"
                  height="14"
                  rx="3"
                  fill={ACCENT}
                  transform={`rotate(${(ti / 8) * 360})`}
                  opacity="0.7"
                />
              );
            })}
            <circle r="28" fill="rgba(59,130,246,0.15)" stroke={ACCENT} strokeWidth="2" />
            <text textAnchor="middle" y="6" fill={ACCENT} fontSize="16" fontWeight="800" fontFamily={FONT}>AI</text>
          </g>

          {/* Right person */}
          <g opacity={rightSpring} transform={`translate(${interpolate(rightSpring, [0, 1], [40, 0])}, 0)`}>
            <circle cx="660" cy="100" r="40" fill="rgba(59,130,246,0.12)" stroke={ACCENT} strokeWidth="2" />
            <circle cx="660" cy="80" r="18" fill="rgba(59,130,246,0.2)" stroke={ACCENT} strokeWidth="1.5" />
            <path d="M625 140 Q660 120 695 140" fill="rgba(59,130,246,0.15)" stroke={ACCENT} strokeWidth="1.5" />
            <text x="660" y="180" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="13" fontWeight="600" fontFamily={FONT}>Expert</text>
          </g>
        </svg>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, letterSpacing: '0.04em', textAlign: 'center', margin: 0, opacity: footerOp }}>
          Custom curriculum. Recorded. Actionable.
        </p>
        <div style={{ opacity: badgeOp, display: 'flex', alignItems: 'center', gap: 12, backgroundColor: ACCENT, borderRadius: 100, padding: '10px 24px' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="2" y="3" width="14" height="12" rx="2" stroke="white" strokeWidth="1.5" fill="none" />
            <line x1="2" y1="7" x2="16" y2="7" stroke="white" strokeWidth="1.5" />
          </svg>
          <span style={{ color: '#FFF', fontSize: 15, fontWeight: 700 }}>Book a Session</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Training = () => {
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
