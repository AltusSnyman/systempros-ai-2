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
const ORANGE = '#F97316';
const PURPLE = '#8B5CF6';
const RED = '#EF4444';
const BG = '#0A0A0A';
const FONT = "'Inter', system-ui, -apple-system, sans-serif";
const W = 1080;
const H = 1080;

const Background = ({ frame }: { frame: number }) => {
  const glow = interpolate(Math.sin(frame / 42), [-1, 1], [0.08, 0.18]);
  return (
    <>
      <AbsoluteFill style={{ backgroundColor: BG }} />
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 15%, rgba(59,130,246,${glow}) 0%, transparent 55%)` }} />
      <div style={{ position: 'absolute', top: 44, right: 44, width: 50, height: 50, borderTop: `2px solid rgba(34,197,94,0.3)`, borderRight: `2px solid rgba(34,197,94,0.3)` }} />
      <div style={{ position: 'absolute', bottom: 44, left: 44, width: 50, height: 50, borderBottom: `2px solid rgba(59,130,246,0.3)`, borderLeft: `2px solid rgba(59,130,246,0.3)` }} />
    </>
  );
};

// ── INTRO (0-90) ──────────────────────────────────────────────────────────────
const Intro = ({ frame, fps }: { frame: number; fps: number }) => {
  const catOp = interpolate(frame, [5, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleSp = spring({ frame: frame - 15, fps, config: { damping: 180 } });
  const titleY = interpolate(titleSp, [0, 1], [60, 0]);
  const lineW = interpolate(frame, [35, 80], [0, 200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOp = interpolate(frame, [60, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 80, fontFamily: FONT }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, opacity: catOp }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: GREEN }} />
        <span style={{ color: GREEN, fontSize: 13, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' }}>The 1-on-1 Advantage</span>
      </div>
      <div style={{ transform: `translateY(${titleY}px)`, opacity: titleSp, marginBottom: 20 }}>
        <div style={{ color: '#FFF', fontSize: 80, fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.03em' }}>STOP WATCHING</div>
        <div style={{ color: GREEN, fontSize: 80, fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.03em' }}>TUTORIALS</div>
      </div>
      <div style={{ width: lineW, height: 4, backgroundColor: GREEN, borderRadius: 2, marginBottom: 24 }} />
      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 22, fontWeight: 400, lineHeight: 1.5, margin: 0, opacity: subOp }}>
        No theory. No lectures. Pure application.
      </p>
    </AbsoluteFill>
  );
};

// ── SCENE A: The Learning Curve Collapse (90-290) ─────────────────────────────
const SceneA = ({ frame, fps }: { frame: number; fps: number }) => {
  const localFrame = frame - 90;
  const fadeIn = interpolate(localFrame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const chartDraw = interpolate(localFrame, [15, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const spDraw = interpolate(localFrame, [25, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });

  const cw = 840, ch = 340;
  const ox = (W - cw) / 2, oy = 260;

  // Self-learning: long flat shallow curve
  const selfPoints = (t: number) => ({
    x: ox + t * cw,
    y: oy + ch - 10 - ch * 0.1 * Math.pow(t, 0.5) * Math.min(chartDraw, 1.0),
  });

  // SystemPros: steep fast curve reaching mastery in 30% of time
  const spPoints = (t: number) => ({
    x: ox + t * cw * 0.35,
    y: oy + ch - 10 - ch * 0.92 * Math.pow(t, 0.4) * Math.min(spDraw, 1.0),
  });

  // Build path from 0..1 in steps
  const buildPath = (fn: (t: number) => { x: number; y: number }, steps: number, maxT = 1): string => {
    const pts = Array.from({ length: steps + 1 }, (_, i) => fn(i / steps * maxT));
    return pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  };

  const selfPath = buildPath(selfPoints, 60);
  const spPath = buildPath(spPoints, 60);
  const selfTotalLen = 820;
  const spTotalLen = 300;

  const labelsOp = interpolate(localFrame, [90, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ fontFamily: FONT, opacity: fadeIn }}>
      <div style={{ position: 'absolute', top: 68, left: 0, right: 0, textAlign: 'center' }}>
        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700 }}>The Learning Curve: Collapsed</div>
        <div style={{ color: '#FFF', fontSize: 36, fontWeight: 900, letterSpacing: '-0.02em', marginTop: 6 }}>
          Months of Tutorials vs. <span style={{ color: GREEN }}>3 Sessions</span>
        </div>
      </div>

      <svg width={W} height={H} style={{ position: 'absolute', top: 0, left: 0 }}>
        {/* Axes */}
        <line x1={ox} y1={oy} x2={ox} y2={oy + ch} stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
        <line x1={ox} y1={oy + ch} x2={ox + cw} y2={oy + ch} stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />

        {/* Axis labels */}
        <text x={ox - 10} y={oy + 5} textAnchor="end" fill="rgba(255,255,255,0.4)" fontSize="12" fontFamily={FONT}>Expert</text>
        <text x={ox - 10} y={oy + ch} textAnchor="end" fill="rgba(255,255,255,0.4)" fontSize="12" fontFamily={FONT}>Novice</text>
        <text x={ox} y={oy + ch + 25} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="12" fontFamily={FONT}>Start</text>
        <text x={ox + cw} y={oy + ch + 25} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="12" fontFamily={FONT}>12 months</text>

        {/* Horizontal mastery line */}
        <line x1={ox} y1={oy + ch * 0.09} x2={ox + cw} y2={oy + ch * 0.09}
          stroke={GREEN} strokeWidth="1" strokeDasharray="6 8" opacity="0.3" />
        <text x={ox + cw + 8} y={oy + ch * 0.09 + 5} fill={GREEN} fontSize="11" fontFamily={FONT} opacity="0.5">MASTERY</text>

        {/* Self-learning path */}
        <path d={selfPath} fill="none" stroke={RED} strokeWidth="2.5" strokeLinecap="round"
          strokeDasharray={selfTotalLen} strokeDashoffset={selfTotalLen * (1 - chartDraw)} opacity="0.7" />

        {/* SystemPros path */}
        <path d={spPath} fill="none" stroke={GREEN} strokeWidth="3" strokeLinecap="round"
          strokeDasharray={spTotalLen} strokeDashoffset={spTotalLen * (1 - spDraw)}
          style={{ filter: 'drop-shadow(0 0 8px rgba(34,197,94,0.6))' }} />

        {/* Session markers on SP path */}
        {[0.33, 0.67, 1.0].map((t, i) => {
          const pt = spPoints(t);
          const op = interpolate(localFrame, [50 + i * 18, 70 + i * 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return (
            <g key={i} opacity={op}>
              <circle cx={pt.x} cy={pt.y} r="8" fill={GREEN} style={{ filter: 'drop-shadow(0 0 6px rgba(34,197,94,0.8))' }} />
              <foreignObject x={pt.x - 50} y={pt.y - 38} width="100" height="28">
                <div style={{ backgroundColor: GREEN, borderRadius: 8, padding: '3px 10px', textAlign: 'center' }}>
                  <span style={{ color: '#fff', fontSize: 11, fontWeight: 700, fontFamily: FONT }}>Session {i + 1}</span>
                </div>
              </foreignObject>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div style={{
        position: 'absolute', bottom: 75, left: 0, right: 0,
        display: 'flex', gap: 28, justifyContent: 'center',
        opacity: labelsOp,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 3, backgroundColor: RED, borderRadius: 2, opacity: 0.7 }} />
          <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14 }}>YouTube / Self-study (12+ months)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 3, backgroundColor: GREEN, borderRadius: 2, boxShadow: '0 0 6px rgba(34,197,94,0.6)' }} />
          <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, fontWeight: 600 }}>SystemPros 1-on-1 (3 sessions)</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── SCENE B: Session Progress (290-460) ───────────────────────────────────────
const SceneB = ({ frame, fps }: { frame: number; fps: number }) => {
  const localFrame = frame - 290;
  const fadeIn = interpolate(localFrame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const SESSIONS = [
    {
      num: 1,
      topic: 'AI Fundamentals + First Automation',
      skills: ['Prompting mastery', 'First N8N workflow live', 'AI agent basics'],
      color: ACCENT,
    },
    {
      num: 2,
      topic: 'Your Platform Deep-Dive',
      skills: ['GoHighLevel CRM setup', 'Voice AI configured', 'Lead flow automated'],
      color: PURPLE,
    },
    {
      num: 3,
      topic: 'Advanced Integration + ROI Tracking',
      skills: ['Full stack connected', 'Revenue dashboards live', 'Team trained and running'],
      color: GREEN,
    },
  ];

  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, opacity: fadeIn, gap: 20 }}>
      <div style={{ color: GREEN, fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700 }}>What 3 Sessions Looks Like</div>
      <div style={{ color: '#FFF', fontSize: 38, fontWeight: 900, letterSpacing: '-0.02em', textAlign: 'center' }}>
        You Build. <span style={{ color: GREEN }}>We Guide. It Works.</span>
      </div>

      <div style={{ display: 'flex', gap: 20, marginTop: 12, width: 900 }}>
        {SESSIONS.map((s, i) => {
          const cardSp = spring({ frame: localFrame - (20 + i * 22), fps, config: { damping: 160 } });
          return (
            <div key={s.num} style={{
              flex: 1,
              padding: '22px 20px',
              borderRadius: 16,
              border: `1.5px solid ${s.color}35`,
              backgroundColor: `${s.color}08`,
              opacity: cardSp,
              transform: `translateY(${interpolate(cardSp, [0, 1], [40, 0])}px)`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: `${s.color}25`, border: `2px solid ${s.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: s.color, fontSize: 13, fontWeight: 900 }}>{s.num}</span>
                </div>
                <div style={{ color: s.color, fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Session {s.num}</div>
              </div>
              <div style={{ color: '#FFF', fontSize: 14, fontWeight: 700, marginBottom: 14, lineHeight: 1.35 }}>{s.topic}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {s.skills.map((skill, si) => {
                  const skillOp = interpolate(localFrame, [50 + i * 22 + si * 12, 70 + i * 22 + si * 12], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                  return (
                    <div key={skill} style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: skillOp }}>
                      <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: `${s.color}25`, border: `1.5px solid ${s.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ color: s.color, fontSize: 9, fontWeight: 900 }}>✓</span>
                      </div>
                      <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12 }}>{skill}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '12px 24px', borderRadius: 100,
        border: `1px solid ${GREEN}35`, backgroundColor: `${GREEN}08`,
        opacity: interpolate(localFrame, [110, 138], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        marginTop: 8,
      }}>
        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>Every session recorded ·</span>
        <span style={{ color: GREEN, fontSize: 13, fontWeight: 600 }}>Keep it forever</span>
      </div>
    </AbsoluteFill>
  );
};

// ── SCENE C: After Training — Results (460-590) ────────────────────────────────
const SceneC = ({ frame, fps }: { frame: number; fps: number }) => {
  const localFrame = frame - 460;
  const fadeIn = interpolate(localFrame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const RESULTS = [
    { label: 'Automation workflows running', icon: '⚡', color: ACCENT, val: '12+' },
    { label: 'Hours saved per week', icon: '⏱', color: GREEN, val: '18h' },
    { label: 'Manual tasks eliminated', icon: '🤖', color: PURPLE, val: '94%' },
    { label: 'Revenue uplift average', icon: '📈', color: ORANGE, val: '+67%' },
  ];

  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, opacity: fadeIn, gap: 22 }}>
      <div style={{ color: GREEN, fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700 }}>After Training</div>
      <div style={{ color: '#FFF', fontSize: 42, fontWeight: 900, letterSpacing: '-0.02em', textAlign: 'center' }}>
        Your Business After <span style={{ color: GREEN }}>3 Sessions</span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', width: 800, marginTop: 12 }}>
        {RESULTS.map((r, i) => {
          const cardSp = spring({ frame: localFrame - (20 + i * 16), fps, config: { damping: 160 } });
          return (
            <div key={r.label} style={{
              width: 360,
              padding: '24px 28px',
              borderRadius: 16,
              border: `1.5px solid ${r.color}30`,
              backgroundColor: `${r.color}08`,
              display: 'flex', alignItems: 'center', gap: 18,
              opacity: cardSp,
              transform: `translateY(${interpolate(cardSp, [0, 1], [30, 0])}px)`,
            }}>
              <span style={{ fontSize: 26 }}>{r.icon}</span>
              <div>
                <div style={{ color: r.color, fontSize: 38, fontWeight: 900, lineHeight: 1 }}>{r.val}</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, marginTop: 4 }}>{r.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '14px 28px', borderRadius: 12,
        border: `1.5px solid ${ACCENT}35`, backgroundColor: `${ACCENT}08`,
        opacity: interpolate(localFrame, [100, 128], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        marginTop: 4,
      }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: GREEN, boxShadow: '0 0 6px rgba(34,197,94,0.8)' }} />
        <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: 600 }}>Learn from practitioners. Not theorists.</span>
      </div>
    </AbsoluteFill>
  );
};

const Brand = ({ frame }: { frame: number }) => {
  const op = interpolate(frame, [565, 590], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <div style={{ position: 'absolute', bottom: 38, right: 56, display: 'flex', alignItems: 'center', gap: 8, opacity: op, fontFamily: FONT }}>
      <div style={{ width: 14, height: 14, borderRadius: 3, backgroundColor: ACCENT }} />
      <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, fontWeight: 600, letterSpacing: '0.14em' }}>SYSTEMPROS.AI</span>
    </div>
  );
};

export const TrainingResults = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const globalFadeOut = interpolate(frame, [578, 600], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const introOp = interpolate(frame, [76, 98], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sceneAOp = interpolate(frame, [85, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sceneAExit = interpolate(frame, [280, 305], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sceneBOp = interpolate(frame, [285, 312], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sceneBExit = interpolate(frame, [450, 475], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sceneCOp = interpolate(frame, [455, 480], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ opacity: globalFadeOut }}>
      <Background frame={frame} />
      <AbsoluteFill style={{ opacity: introOp }}><Intro frame={frame} fps={fps} /></AbsoluteFill>
      <AbsoluteFill style={{ opacity: Math.min(sceneAOp, sceneAExit) }}><SceneA frame={frame} fps={fps} /></AbsoluteFill>
      <AbsoluteFill style={{ opacity: Math.min(sceneBOp, sceneBExit) }}><SceneB frame={frame} fps={fps} /></AbsoluteFill>
      <AbsoluteFill style={{ opacity: sceneCOp }}><SceneC frame={frame} fps={fps} /></AbsoluteFill>
      <Brand frame={frame} />
    </AbsoluteFill>
  );
};

export default TrainingResults;
