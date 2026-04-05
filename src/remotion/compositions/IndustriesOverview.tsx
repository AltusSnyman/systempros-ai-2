import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from 'remotion';

const ACCENT = '#3B82F6';
const CYAN = '#06B6D4';
const AMBER = '#F59E0B';
const PURPLE = '#8B5CF6';
const GREEN = '#22C55E';
const ROSE = '#F43F5E';
const BG = '#0A0A0A';
const FONT = "'Inter', system-ui, -apple-system, sans-serif";
const W = 1080;
const H = 1080;

// ── Background ────────────────────────────────────────────────────────────────
const Background = ({ frame }: { frame: number }) => {
  const glow = interpolate(Math.sin(frame / 60), [-1, 1], [0.06, 0.15]);
  return (
    <>
      <AbsoluteFill style={{ backgroundColor: BG }} />
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 25%, rgba(59,130,246,${glow}) 0%, transparent 60%)` }} />
      <div style={{ position: 'absolute', top: 44, left: 44, width: 50, height: 50, borderTop: `2px solid rgba(59,130,246,0.2)`, borderLeft: `2px solid rgba(59,130,246,0.2)` }} />
      <div style={{ position: 'absolute', bottom: 44, right: 44, width: 50, height: 50, borderBottom: `2px solid rgba(59,130,246,0.2)`, borderRight: `2px solid rgba(59,130,246,0.2)` }} />
    </>
  );
};

// ── INDUSTRY DATA ─────────────────────────────────────────────────────────────
const INDUSTRIES = [
  { emoji: '🏠', name: 'Roofing',     col: 0, row: 0 },
  { emoji: '🌿', name: 'Landscaping', col: 1, row: 0 },
  { emoji: '🦷', name: 'Dental',      col: 2, row: 0 },
  { emoji: '🦴', name: 'Chiropractic',col: 0, row: 1 },
  { emoji: '🧠', name: 'Counselling', col: 1, row: 1 },
  { emoji: '🚗', name: 'Detailing',   col: 2, row: 1 },
  { emoji: '🎯', name: 'Coaching',    col: 0, row: 2 },
  { emoji: '🌳', name: 'Senior Care', col: 1, row: 2 },
  { emoji: '⚡', name: 'Business AI', col: 2, row: 2 },
];
const GX = (col: number) => 195 + col * 345;
const GY = (row: number) => 280 + row * 228;

// Grid connection lines [fromIndex, toIndex]
const GRID_LINES: [number, number][] = [
  [0,1],[1,2],[3,4],[4,5],[6,7],[7,8],   // horizontal
  [0,3],[3,6],[1,4],[4,7],[2,5],[5,8],   // vertical
  [0,4],[2,4],[6,4],[8,4],               // diagonals to center
];

// ── SERVICE DATA ──────────────────────────────────────────────────────────────
const SERVICES = [
  { name: 'Revenue Triad',    short: 'VOICE AI', color: ACCENT,  angle: -90  },
  { name: 'Lead Gen Sites',   short: 'LEAD GEN', color: CYAN,    angle: -30  },
  { name: 'Lead Reactor',     short: 'REACTOR',  color: AMBER,   angle:  30  },
  { name: 'Private Asst.',    short: 'PRIVATE',  color: PURPLE,  angle:  90  },
  { name: 'Consultation',     short: 'CONSULT',  color: GREEN,   angle:  150 },
  { name: 'Training',         short: 'TRAINING', color: ROSE,    angle:  210 },
];
const CX = 540, CY = 575, ORBIT_R = 224;

// ── Intro (0-90) ──────────────────────────────────────────────────────────────
const Intro = ({ frame, fps }: { frame: number; fps: number }) => {
  const badgeOp = interpolate(frame, [5, 28], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const t1Sp = spring({ frame: frame - 18, fps, config: { damping: 180 } });
  const t2Sp = spring({ frame: frame - 34, fps, config: { damping: 180 } });
  const lineW = interpolate(frame, [44, 80], [0, 520], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const subOp = interpolate(frame, [60, 88], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 80, fontFamily: FONT }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 26, opacity: badgeOp }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: ACCENT, boxShadow: `0 0 12px ${ACCENT}` }} />
        <span style={{ color: ACCENT, fontSize: 13, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
          9 Industries / 6 Solutions / 1 Partner
        </span>
      </div>
      <div style={{ opacity: t1Sp, transform: `translateY(${interpolate(t1Sp, [0, 1], [60, 0])}px)` }}>
        <div style={{ color: '#FFF', fontSize: 86, fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.03em' }}>YOUR INDUSTRY.</div>
      </div>
      <div style={{ opacity: t2Sp, transform: `translateY(${interpolate(t2Sp, [0, 1], [60, 0])}px)` }}>
        <div style={{ color: ACCENT, fontSize: 86, fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em' }}>OUR SYSTEM.</div>
      </div>
      <div style={{ width: lineW, height: 3, backgroundColor: ACCENT, borderRadius: 2, marginTop: 26, marginBottom: 26 }} />
      <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 22, fontWeight: 400, lineHeight: 1.5, margin: 0, opacity: subOp, maxWidth: 560 }}>
        Full-stack AI. Built for your vertical.
      </p>
    </AbsoluteFill>
  );
};

// ── Scene A: Industry Constellation (90-290) ──────────────────────────────────
const SceneA = ({ frame, fps }: { frame: number; fps: number }) => {
  const lf = frame - 90;
  const fadeIn = interpolate(lf, [0, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ fontFamily: FONT, opacity: fadeIn }}>
      {/* Heading */}
      <div style={{ position: 'absolute', top: 68, left: 0, right: 0, textAlign: 'center' }}>
        <div style={{ color: 'rgba(255,255,255,0.38)', fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>
          Every Vertical
        </div>
        <div style={{ color: '#FFF', fontSize: 34, fontWeight: 800, letterSpacing: '-0.02em' }}>
          One Proven System.
        </div>
      </div>

      <svg width={W} height={H} style={{ position: 'absolute', top: 0, left: 0 }}>
        {/* Grid connecting lines — draw in one by one */}
        {GRID_LINES.map(([fi, ti], li) => {
          const from = INDUSTRIES[fi], to = INDUSTRIES[ti];
          const fx = GX(from.col), fy = GY(from.row);
          const tx = GX(to.col), ty = GY(to.row);
          const len = Math.sqrt((tx - fx) ** 2 + (ty - fy) ** 2);
          const drawn = interpolate(lf, [38 + li * 5, 75 + li * 5], [len, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return (
            <line key={li} x1={fx} y1={fy} x2={tx} y2={ty}
              stroke="rgba(59,130,246,0.18)" strokeWidth="1"
              strokeDasharray={len} strokeDashoffset={drawn}
            />
          );
        })}

        {/* Industry nodes */}
        {INDUSTRIES.map((ind, i) => {
          const x = GX(ind.col), y = GY(ind.row);
          const sp = spring({ frame: lf - i * 10, fps, config: { damping: 155 } });
          const nodeOp = interpolate(lf, [i * 10, i * 10 + 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const r = interpolate(sp, [0, 1], [0, 50]);
          return (
            <g key={ind.name} opacity={nodeOp}>
              <circle cx={x} cy={y} r={r}
                fill="rgba(59,130,246,0.07)" stroke="rgba(59,130,246,0.32)" strokeWidth="1.5"
                style={{ filter: 'drop-shadow(0 0 10px rgba(59,130,246,0.22))' }}
              />
              <text x={x} y={y + 10} textAnchor="middle" fontSize="26" fontFamily={FONT}>{ind.emoji}</text>
              <text x={x} y={y + 75} textAnchor="middle" fill="rgba(255,255,255,0.72)" fontSize="13" fontWeight="600" fontFamily={FONT}>{ind.name}</text>
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

// ── Scene B: 6-Service Wheel (290-510) ───────────────────────────────────────
const SceneB = ({ frame, fps }: { frame: number; fps: number }) => {
  const lf = frame - 290;
  const fadeIn = interpolate(lf, [0, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pulse = (Math.sin(lf / 22) + 1) / 2;

  return (
    <AbsoluteFill style={{ fontFamily: FONT, opacity: fadeIn }}>
      <div style={{ position: 'absolute', top: 68, left: 0, right: 0, textAlign: 'center' }}>
        <div style={{ color: 'rgba(255,255,255,0.38)', fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>
          The Full Stack
        </div>
        <div style={{ color: '#FFF', fontSize: 34, fontWeight: 800, letterSpacing: '-0.02em' }}>
          6 Systems. Deployed Together.
        </div>
      </div>

      <svg width={W} height={H} style={{ position: 'absolute', top: 0, left: 0 }}>
        {/* Orbit ring */}
        <circle cx={CX} cy={CY} r={ORBIT_R} fill="none" stroke="rgba(59,130,246,0.08)" strokeWidth="1.5" />

        {/* Lines + particles to each service */}
        {SERVICES.map((s, i) => {
          const rad = (s.angle * Math.PI) / 180;
          const innerR = 58, lineLen = ORBIT_R - innerR;
          const progress = interpolate(lf, [14 + i * 12, 46 + i * 12], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
          const x2 = CX + (innerR + lineLen * progress) * Math.cos(rad);
          const y2 = CY + (innerR + lineLen * progress) * Math.sin(rad);

          // Flowing particle
          const pt = ((lf / 34 + i * 0.18) % 1);
          const px = CX + (innerR + lineLen * pt) * Math.cos(rad);
          const py = CY + (innerR + lineLen * pt) * Math.sin(rad);
          const particleOp = interpolate(lf, [46 + i * 12, 68 + i * 12], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

          return (
            <g key={s.name}>
              <line
                x1={CX + innerR * Math.cos(rad)} y1={CY + innerR * Math.sin(rad)}
                x2={x2} y2={y2}
                stroke={s.color} strokeWidth="1.5" opacity={0.42}
              />
              <circle cx={px} cy={py} r={4} fill={s.color} opacity={particleOp}
                style={{ filter: `drop-shadow(0 0 5px ${s.color})` }}
              />
            </g>
          );
        })}

        {/* Central hub */}
        <circle cx={CX} cy={CY} r={60 + pulse * 4} fill="rgba(59,130,246,0.05)"
          stroke={`rgba(59,130,246,${0.18 + pulse * 0.22})`} strokeWidth="1.5"
          style={{ filter: `drop-shadow(0 0 ${14 + pulse * 12}px rgba(59,130,246,0.4))` }}
        />
        <circle cx={CX} cy={CY} r={52} fill="rgba(59,130,246,0.13)" stroke={ACCENT} strokeWidth="2" />
        <text x={CX} y={CY - 8} textAnchor="middle" fill={ACCENT} fontSize="14" fontWeight="900" fontFamily={FONT}>YOUR</text>
        <text x={CX} y={CY + 12} textAnchor="middle" fill={ACCENT} fontSize="14" fontWeight="900" fontFamily={FONT}>BUSINESS</text>

        {/* Service nodes */}
        {SERVICES.map((s, i) => {
          const rad = (s.angle * Math.PI) / 180;
          const nx = CX + ORBIT_R * Math.cos(rad);
          const ny = CY + ORBIT_R * Math.sin(rad);
          const sp = spring({ frame: lf - (18 + i * 12), fps, config: { damping: 155 } });
          const r = interpolate(sp, [0, 1], [0, 44]);

          // Outer label position (beyond the node)
          const labelR = ORBIT_R + 62;
          const lx = CX + labelR * Math.cos(rad);
          const ly = CY + labelR * Math.sin(rad);

          return (
            <g key={s.name} opacity={sp}>
              <circle cx={nx} cy={ny} r={r}
                fill={`${s.color}14`} stroke={s.color} strokeWidth="1.5"
                style={{ filter: `drop-shadow(0 0 10px ${s.color}55)` }}
              />
              <text x={nx} y={ny + 5} textAnchor="middle" fill={s.color} fontSize="10" fontWeight="800" fontFamily={FONT}>{s.short}</text>
              <text x={lx} y={ly + 5} textAnchor="middle" fill="rgba(255,255,255,0.58)" fontSize="11" fontWeight="600" fontFamily={FONT}>{s.name}</text>
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

// ── Scene C: Results Stats + Bar Chart (510-700) ──────────────────────────────
const SceneC = ({ frame, fps }: { frame: number; fps: number }) => {
  const lf = frame - 510;
  const fadeIn = interpolate(lf, [0, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const STATS = [
    { value: '+340%', label: 'More qualified leads',        color: GREEN  },
    { value: '< 10s', label: 'Response to every enquiry',   color: ACCENT },
    { value: '2.4×',  label: 'Average ROI in year one',     color: AMBER  },
  ];

  const BAR_DATA = [
    { label: 'Manual',     pct: 0.13, color: 'rgba(255,255,255,0.18)' },
    { label: 'Partial AI', pct: 0.44, color: `${ACCENT}55`            },
    { label: 'SystemPros', pct: 1.00, color: ACCENT                   },
  ];
  const BAR_MAX_H = 200;
  const BAR_W = 112;
  const BAR_Y = 840;
  const BARS_CX = [300, 540, 780]; // x-centers of the 3 bars

  return (
    <AbsoluteFill style={{ fontFamily: FONT, opacity: fadeIn }}>
      <div style={{ position: 'absolute', top: 68, left: 0, right: 0, textAlign: 'center' }}>
        <div style={{ color: 'rgba(255,255,255,0.38)', fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>Full Deployment</div>
        <div style={{ color: '#FFF', fontSize: 34, fontWeight: 800, letterSpacing: '-0.02em' }}>What It Looks Like.</div>
      </div>

      {/* Stat cards */}
      <div style={{ position: 'absolute', top: 185, left: 0, right: 0, display: 'flex', gap: 20, justifyContent: 'center', padding: '0 80px' }}>
        {STATS.map((s, i) => {
          const sp = spring({ frame: lf - (18 + i * 20), fps, config: { damping: 148 } });
          return (
            <div key={s.label} style={{
              opacity: sp,
              transform: `translateY(${interpolate(sp, [0, 1], [40, 0])}px)`,
              flex: 1,
              padding: '26px 18px',
              borderRadius: 16,
              border: `1.5px solid ${s.color}35`,
              backgroundColor: `${s.color}0A`,
              textAlign: 'center',
            }}>
              <div style={{ color: s.color, fontSize: 52, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}>{s.value}</div>
              <div style={{ color: 'rgba(255,255,255,0.48)', fontSize: 13, fontWeight: 500, marginTop: 10, lineHeight: 1.4 }}>{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* Bar chart */}
      <svg width={W} height={H} style={{ position: 'absolute', top: 0, left: 0 }}>
        <line x1={160} y1={BAR_Y} x2={920} y2={BAR_Y} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        {BAR_DATA.map((b, i) => {
          const barH = interpolate(lf, [58 + i * 14, 105 + i * 14], [0, b.pct * BAR_MAX_H], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
          const bx = BARS_CX[i];
          const labelOp = interpolate(lf, [78 + i * 14, 108 + i * 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return (
            <g key={b.label}>
              <rect x={bx - BAR_W / 2} y={BAR_Y - barH} width={BAR_W} height={Math.max(barH, 0)} rx={6}
                fill={b.color}
                style={i === 2 ? { filter: `drop-shadow(0 0 14px ${ACCENT}70)` } : {}}
              />
              <text x={bx} y={BAR_Y + 26} textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="12" fontWeight="600" fontFamily={FONT} opacity={labelOp}>{b.label}</text>
              <text x={bx} y={BAR_Y - barH - 12} textAnchor="middle" fill={b.color} fontSize="13" fontWeight="800" fontFamily={FONT} opacity={labelOp}>
                {Math.round(b.pct * 100)}%
              </text>
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

// ── Brand Tag ─────────────────────────────────────────────────────────────────
const Brand = ({ frame }: { frame: number }) => {
  const op = interpolate(frame, [710, 734], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <div style={{ position: 'absolute', bottom: 38, right: 56, display: 'flex', alignItems: 'center', gap: 8, opacity: op, fontFamily: FONT }}>
      <div style={{ width: 14, height: 14, borderRadius: 3, backgroundColor: ACCENT }} />
      <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, fontWeight: 600, letterSpacing: '0.14em' }}>SYSTEMPROS.AI</span>
      <span style={{ color: 'rgba(255,255,255,0.14)', fontSize: 12, letterSpacing: '0.08em' }}>The Full-Stack AI Partner</span>
    </div>
  );
};

// ── Main Export ───────────────────────────────────────────────────────────────
export const IndustriesOverview = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const globalFadeOut = interpolate(frame, [732, 750], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const introOp   = interpolate(frame, [74, 96],   [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sceneAOp  = interpolate(frame, [88, 112],  [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sceneAOut = interpolate(frame, [278, 302], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sceneBOp  = interpolate(frame, [288, 312], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sceneBOut = interpolate(frame, [496, 520], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sceneCOp  = interpolate(frame, [506, 530], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ opacity: globalFadeOut }}>
      <Background frame={frame} />
      <AbsoluteFill style={{ opacity: introOp }}><Intro frame={frame} fps={fps} /></AbsoluteFill>
      <AbsoluteFill style={{ opacity: Math.min(sceneAOp, sceneAOut) }}><SceneA frame={frame} fps={fps} /></AbsoluteFill>
      <AbsoluteFill style={{ opacity: Math.min(sceneBOp, sceneBOut) }}><SceneB frame={frame} fps={fps} /></AbsoluteFill>
      <AbsoluteFill style={{ opacity: sceneCOp }}><SceneC frame={frame} fps={fps} /></AbsoluteFill>
      <Brand frame={frame} />
    </AbsoluteFill>
  );
};

export default IndustriesOverview;
