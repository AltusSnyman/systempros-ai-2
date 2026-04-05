import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from 'remotion';

// ── Default Colours ──────────────────────────────────────────────────────────
const ACCENT  = '#3B82F6';
const CYAN    = '#06B6D4';
const AMBER   = '#F59E0B';
const PURPLE  = '#8B5CF6';
const GREEN   = '#22C55E';
const ROSE    = '#F43F5E';
const RED     = '#EF4444';
const BG      = '#0A0A0A';
const FONT    = "'Inter', system-ui, -apple-system, sans-serif";
const W = 1080;
const H = 1080;

// ── Six fixed services (colours always the same, application text varies) ────
const SERVICE_COLORS = [ACCENT, CYAN, AMBER, PURPLE, GREEN, ROSE];
const SERVICE_NAMES  = ['Revenue Triad', 'Lead Gen Sites', 'Lead Reactor', 'Private Asst.', 'Consultation', 'Training'];
const SERVICE_ANGLES = [-90, -30, 30, 90, 150, 210];

// ── Props ─────────────────────────────────────────────────────────────────────
export type IndustryShowcaseProps = {
  industryName?:  string;
  emoji?:         string;
  tagline?:       string;
  problemValue?:  string;
  problemLabel?:  string;
  problemCost?:   string;
  applications?:  string[];   // 6 items, one per service
  stats?: Array<{ value: string; label: string; color: string }>;
};

const DEFAULTS: Required<IndustryShowcaseProps> = {
  industryName: 'Roofing',
  emoji:        '🏠',
  tagline:      'Zero missed leads. Even during a storm.',
  problemValue: '37',
  problemLabel: 'missed storm calls per week',
  problemCost:  '$74k lost',
  applications: [
    'Handles 1,000 storm calls 24/7',
    'Books estimates online instantly',
    'Follows Meta leads in under 10s',
    'Field ops AI via WhatsApp',
    'Growth roadmap & profit audit',
    'AI upskilling for your crew',
  ],
  stats: [
    { value: '0',    label: 'Missed calls per storm', color: GREEN  },
    { value: '<10s', label: 'Lead response time',      color: ACCENT },
    { value: '3×',   label: 'More estimates booked',   color: AMBER  },
  ],
};

// ── Background ────────────────────────────────────────────────────────────────
const Background = ({ frame, accent }: { frame: number; accent: string }) => {
  const glow = interpolate(Math.sin(frame / 55), [-1, 1], [0.07, 0.16]);
  return (
    <>
      <AbsoluteFill style={{ backgroundColor: BG }} />
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 20%, ${accent}${Math.round(glow * 255).toString(16).padStart(2,'0')} 0%, transparent 55%)` }} />
      <div style={{ position: 'absolute', top: 40, left: 40, width: 48, height: 48, borderTop: `2px solid ${accent}35`, borderLeft: `2px solid ${accent}35` }} />
      <div style={{ position: 'absolute', bottom: 40, right: 40, width: 48, height: 48, borderBottom: `2px solid ${accent}35`, borderRight: `2px solid ${accent}35` }} />
    </>
  );
};

// ── INTRO (0-90) ──────────────────────────────────────────────────────────────
const Intro = ({ frame, fps, props }: { frame: number; fps: number; props: Required<IndustryShowcaseProps> }) => {
  const { industryName, emoji, tagline } = props;
  const accent = SERVICE_COLORS[0];

  const badgeOp = interpolate(frame, [5, 28], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const emojiSp = spring({ frame: frame - 10, fps, config: { damping: 200 } });
  const t1Sp    = spring({ frame: frame - 25, fps, config: { damping: 180 } });
  const subOp   = interpolate(frame, [50, 82], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lineW   = interpolate(frame, [40, 78], [0, 480], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });

  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 80, fontFamily: FONT }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, opacity: badgeOp }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: ACCENT, boxShadow: `0 0 12px ${ACCENT}` }} />
        <span style={{ color: ACCENT, fontSize: 13, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' }}>6 Systems — 1 Industry</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 12 }}>
        <div style={{ fontSize: 80, opacity: emojiSp, transform: `scale(${interpolate(emojiSp, [0, 1], [0.4, 1])})` }}>{emoji}</div>
        <div style={{ opacity: t1Sp, transform: `translateX(${interpolate(t1Sp, [0, 1], [-40, 0])}px)` }}>
          <div style={{ color: '#FFF', fontSize: 80, fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.03em' }}>{industryName.toUpperCase()}</div>
          <div style={{ color: ACCENT, fontSize: 24, fontWeight: 700, letterSpacing: '-0.01em', marginTop: 4 }}>AI</div>
        </div>
      </div>

      <div style={{ width: lineW, height: 3, backgroundColor: ACCENT, borderRadius: 2, marginBottom: 24 }} />

      <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 22, fontWeight: 400, lineHeight: 1.5, margin: 0, opacity: subOp, maxWidth: 540 }}>
        {tagline}
      </p>
    </AbsoluteFill>
  );
};

// ── SCENE A: THE PROBLEM (90-380) ─────────────────────────────────────────────
const SceneA = ({ frame, fps, props }: { frame: number; fps: number; props: Required<IndustryShowcaseProps> }) => {
  const { problemValue, problemLabel, problemCost } = props;
  const lf = frame - 90;
  const fadeIn = interpolate(lf, [0, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Animate numeric counter (if problemValue is a number)
  const numVal = parseInt(problemValue, 10);
  const counterVal = isNaN(numVal)
    ? problemValue
    : Math.floor(interpolate(lf, [30, 130], [0, numVal], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) })).toString();

  const statSp = spring({ frame: lf - 100, fps, config: { damping: 150 } });
  const costSp = spring({ frame: lf - 140, fps, config: { damping: 150 } });
  const pulse  = (Math.sin(lf / 18) + 1) / 2;

  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, opacity: fadeIn, gap: 0 }}>
      <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 16 }}>
        The Problem
      </div>
      <div style={{ color: '#FFF', fontSize: 36, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 48, textAlign: 'center', maxWidth: 700 }}>
        The Cost of Doing Nothing
      </div>

      {/* Main problem counter */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '40px 60px', borderRadius: 24,
        border: `2px solid ${RED}35`, backgroundColor: `${RED}08`,
        boxShadow: `0 0 ${40 + pulse * 20}px rgba(239,68,68,${0.12 + pulse * 0.1})`,
        marginBottom: 32,
      }}>
        <div style={{ color: RED, fontSize: 100, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.05em' }}>{counterVal}</div>
        <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 18, fontWeight: 600, marginTop: 8, textAlign: 'center' }}>{problemLabel}</div>
      </div>

      {/* Revenue cost card */}
      <div style={{
        opacity: costSp,
        transform: `translateY(${interpolate(costSp, [0, 1], [30, 0])}px)`,
        padding: '20px 40px', borderRadius: 14,
        border: `1.5px solid rgba(239,68,68,0.25)`, backgroundColor: 'rgba(239,68,68,0.05)',
        textAlign: 'center',
      }}>
        <div style={{ color: RED, fontSize: 13, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 4 }}>Revenue at risk</div>
        <div style={{ color: '#FFF', fontSize: 44, fontWeight: 900, letterSpacing: '-0.03em' }}>{problemCost}</div>
      </div>

      {/* "There's a better way" fade in */}
      <div style={{
        position: 'absolute', bottom: 90,
        opacity: interpolate(lf, [220, 260], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        color: ACCENT, fontSize: 15, fontWeight: 700, letterSpacing: '0.12em',
      }}>
        THERE IS A BETTER WAY ↓
      </div>
    </AbsoluteFill>
  );
};

// ── SCENE B: 6-SERVICE WHEEL (380-720) ───────────────────────────────────────
const SceneB = ({ frame, fps, props }: { frame: number; fps: number; props: Required<IndustryShowcaseProps> }) => {
  const { industryName, applications } = props;
  const lf    = frame - 380;
  const fadeIn = interpolate(lf, [0, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pulse  = (Math.sin(lf / 20) + 1) / 2;
  const CX = 540, CY = 590, ORBIT_R = 222;

  return (
    <AbsoluteFill style={{ fontFamily: FONT, opacity: fadeIn }}>
      <div style={{ position: 'absolute', top: 65, left: 0, right: 0, textAlign: 'center' }}>
        <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>The Solution</div>
        <div style={{ color: '#FFF', fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em' }}>6 Systems. Deployed Together.</div>
      </div>

      <svg width={W} height={H} style={{ position: 'absolute', top: 0, left: 0 }}>
        {/* Orbit ring */}
        <circle cx={CX} cy={CY} r={ORBIT_R} fill="none" stroke="rgba(59,130,246,0.08)" strokeWidth="1.5" />

        {/* Lines + particles */}
        {SERVICE_COLORS.map((color, i) => {
          const rad    = (SERVICE_ANGLES[i] * Math.PI) / 180;
          const innerR = 60, lineLen = ORBIT_R - innerR;
          const progress = interpolate(lf, [12 + i * 14, 46 + i * 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
          const x2 = CX + (innerR + lineLen * progress) * Math.cos(rad);
          const y2 = CY + (innerR + lineLen * progress) * Math.sin(rad);
          const pt  = ((lf / 32 + i * 0.2) % 1);
          const px  = CX + (innerR + lineLen * pt) * Math.cos(rad);
          const py  = CY + (innerR + lineLen * pt) * Math.sin(rad);
          const pOp = interpolate(lf, [46 + i * 14, 66 + i * 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return (
            <g key={i}>
              <line x1={CX + innerR * Math.cos(rad)} y1={CY + innerR * Math.sin(rad)} x2={x2} y2={y2} stroke={color} strokeWidth="1.5" opacity={0.4} />
              <circle cx={px} cy={py} r={4} fill={color} opacity={pOp} style={{ filter: `drop-shadow(0 0 5px ${color})` }} />
            </g>
          );
        })}

        {/* Hub */}
        <circle cx={CX} cy={CY} r={62 + pulse * 4} fill="rgba(59,130,246,0.05)"
          stroke={`rgba(59,130,246,${0.2 + pulse * 0.2})`} strokeWidth="1.5"
          style={{ filter: `drop-shadow(0 0 ${14 + pulse * 12}px rgba(59,130,246,0.4))` }}
        />
        <circle cx={CX} cy={CY} r={54} fill="rgba(59,130,246,0.13)" stroke={ACCENT} strokeWidth="2" />
        <text x={CX} y={CY - 7} textAnchor="middle" fill={ACCENT} fontSize="13" fontWeight="900" fontFamily={FONT}>{industryName.toUpperCase()}</text>
        <text x={CX} y={CY + 12} textAnchor="middle" fill={ACCENT} fontSize="11" fontWeight="700" fontFamily={FONT}>AI SYSTEM</text>

        {/* Service nodes */}
        {SERVICE_COLORS.map((color, i) => {
          const rad = (SERVICE_ANGLES[i] * Math.PI) / 180;
          const nx  = CX + ORBIT_R * Math.cos(rad);
          const ny  = CY + ORBIT_R * Math.sin(rad);
          const sp  = spring({ frame: lf - (20 + i * 14), fps, config: { damping: 155 } });
          const r   = interpolate(sp, [0, 1], [0, 46]);
          const lx  = CX + (ORBIT_R + 64) * Math.cos(rad);
          const ly  = CY + (ORBIT_R + 64) * Math.sin(rad);
          const app = (applications[i] || SERVICE_NAMES[i]);
          return (
            <g key={i} opacity={sp}>
              <circle cx={nx} cy={ny} r={r} fill={`${color}14`} stroke={color} strokeWidth="1.5"
                style={{ filter: `drop-shadow(0 0 10px ${color}50)` }}
              />
              <text x={nx} y={ny - 3} textAnchor="middle" fill={color} fontSize="9" fontWeight="800" fontFamily={FONT}>{SERVICE_NAMES[i].toUpperCase()}</text>
              {/* Application label outside the node */}
              <text x={lx} y={ly + 5} textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="10" fontWeight="500" fontFamily={FONT}>{app}</text>
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

// ── SCENE C: RESULTS (720-1120) ───────────────────────────────────────────────
const SceneC = ({ frame, fps, props }: { frame: number; fps: number; props: Required<IndustryShowcaseProps> }) => {
  const { stats, industryName } = props;
  const lf     = frame - 720;
  const fadeIn = interpolate(lf, [0, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const BAR_DATA = [
    { label: 'Before',     pct: 0.12, color: 'rgba(255,255,255,0.16)' },
    { label: 'Industry Avg', pct: 0.42, color: `${ACCENT}50`          },
    { label: 'SystemPros', pct: 1.00, color: ACCENT                   },
  ];
  const BAR_MAX_H = 195, BAR_W = 110;
  const BASELINE_Y = 855;
  const BAR_CX = [260, 540, 820];

  return (
    <AbsoluteFill style={{ fontFamily: FONT, opacity: fadeIn }}>
      <div style={{ position: 'absolute', top: 65, left: 0, right: 0, textAlign: 'center' }}>
        <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>Results</div>
        <div style={{ color: '#FFF', fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em' }}>{industryName} AI — By The Numbers</div>
      </div>

      {/* Stat cards */}
      <div style={{ position: 'absolute', top: 178, left: 0, right: 0, display: 'flex', gap: 18, justifyContent: 'center', padding: '0 72px' }}>
        {stats.map((s, i) => {
          const sp = spring({ frame: lf - (16 + i * 22), fps, config: { damping: 148 } });
          return (
            <div key={s.label} style={{
              opacity: sp, transform: `translateY(${interpolate(sp, [0, 1], [40, 0])}px)`,
              flex: 1, padding: '26px 16px', borderRadius: 16,
              border: `1.5px solid ${s.color}38`, backgroundColor: `${s.color}0A`, textAlign: 'center',
            }}>
              <div style={{ color: s.color, fontSize: 52, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}>{s.value}</div>
              <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, fontWeight: 500, marginTop: 10, lineHeight: 1.4 }}>{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* Comparison bar chart */}
      <svg width={W} height={H} style={{ position: 'absolute', top: 0, left: 0 }}>
        <line x1={140} y1={BASELINE_Y} x2={940} y2={BASELINE_Y} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        {BAR_DATA.map((b, i) => {
          const barH = interpolate(lf, [60 + i * 16, 110 + i * 16], [0, b.pct * BAR_MAX_H], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
          const bx   = BAR_CX[i];
          const lOp  = interpolate(lf, [78 + i * 16, 108 + i * 16], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return (
            <g key={b.label}>
              <rect x={bx - BAR_W / 2} y={BASELINE_Y - barH} width={BAR_W} height={Math.max(barH, 0)} rx={6}
                fill={b.color} style={i === 2 ? { filter: `drop-shadow(0 0 14px ${ACCENT}70)` } : {}}
              />
              <text x={bx} y={BASELINE_Y + 25} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="12" fontWeight="600" fontFamily={FONT} opacity={lOp}>{b.label}</text>
              <text x={bx} y={BASELINE_Y - barH - 12} textAnchor="middle" fill={b.color} fontSize="12" fontWeight="800" fontFamily={FONT} opacity={lOp}>{Math.round(b.pct * 100)}%</text>
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

// ── Brand Tag ─────────────────────────────────────────────────────────────────
const Brand = ({ frame }: { frame: number }) => {
  const op = interpolate(frame, [1130, 1155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <div style={{ position: 'absolute', bottom: 36, right: 52, display: 'flex', alignItems: 'center', gap: 8, opacity: op, fontFamily: FONT }}>
      <div style={{ width: 14, height: 14, borderRadius: 3, backgroundColor: ACCENT }} />
      <span style={{ color: 'rgba(255,255,255,0.28)', fontSize: 12, fontWeight: 600, letterSpacing: '0.14em' }}>SYSTEMPROS.AI</span>
    </div>
  );
};

// ── Main Export ───────────────────────────────────────────────────────────────
export const IndustryShowcase = (inputProps: IndustryShowcaseProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const props: Required<IndustryShowcaseProps> = { ...DEFAULTS, ...inputProps };
  if (inputProps.stats)        props.stats        = inputProps.stats;
  if (inputProps.applications) props.applications = inputProps.applications;

  const globalOut = interpolate(frame, [1180, 1200], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const introOp   = interpolate(frame, [74, 96],    [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sceneAOp  = interpolate(frame, [88, 112],   [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sceneAOut = interpolate(frame, [368, 392],  [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sceneBOp  = interpolate(frame, [376, 400],  [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sceneBOut = interpolate(frame, [708, 732],  [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sceneCOp  = interpolate(frame, [716, 740],  [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ opacity: globalOut }}>
      <Background frame={frame} accent={ACCENT} />
      <AbsoluteFill style={{ opacity: introOp }}><Intro frame={frame} fps={fps} props={props} /></AbsoluteFill>
      <AbsoluteFill style={{ opacity: Math.min(sceneAOp, sceneAOut) }}><SceneA frame={frame} fps={fps} props={props} /></AbsoluteFill>
      <AbsoluteFill style={{ opacity: Math.min(sceneBOp, sceneBOut) }}><SceneB frame={frame} fps={fps} props={props} /></AbsoluteFill>
      <AbsoluteFill style={{ opacity: sceneCOp }}><SceneC frame={frame} fps={fps} props={props} /></AbsoluteFill>
      <Brand frame={frame} />
    </AbsoluteFill>
  );
};

export default IndustryShowcase;
