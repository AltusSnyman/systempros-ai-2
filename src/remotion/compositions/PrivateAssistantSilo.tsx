import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';

const ACCENT = '#3B82F6';
const RED = '#EF4444';
const ORANGE = '#F97316';
const PURPLE = '#8B5CF6';
const BG = '#0A0A0A';
const FONT = "'Inter', system-ui, -apple-system, sans-serif";
const W = 1080;
const H = 1080;

const Background = ({ frame }: { frame: number }) => {
  const glow = interpolate(Math.sin(frame / 45), [-1, 1], [0.08, 0.18]);
  return (
    <>
      <AbsoluteFill style={{ backgroundColor: BG }} />
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 30%, rgba(239,68,68,${glow}) 0%, transparent 55%)` }} />
      <div style={{ position: 'absolute', top: 44, left: 44, width: 50, height: 50, borderTop: `2px solid rgba(239,68,68,0.3)`, borderLeft: `2px solid rgba(239,68,68,0.3)` }} />
      <div style={{ position: 'absolute', bottom: 44, right: 44, width: 50, height: 50, borderBottom: `2px solid rgba(59,130,246,0.3)`, borderRight: `2px solid rgba(59,130,246,0.3)` }} />
    </>
  );
};

// ── APP BUBBLE ────────────────────────────────────────────────────────────────
const APP_BUBBLES = [
  { name: 'ChatGPT', color: '#10B981', initials: 'GPT', orbitR: 195, speed: 0.008, phase: 0.0 },
  { name: 'Notion', color: '#F5F5F5', initials: 'N', orbitR: 240, speed: 0.011, phase: 1.1 },
  { name: 'Slack', color: '#E01E5A', initials: 'SL', orbitR: 210, speed: 0.006, phase: 2.3 },
  { name: 'Email', color: ACCENT, initials: 'EM', orbitR: 260, speed: 0.013, phase: 0.7 },
  { name: 'Calendar', color: '#F97316', initials: 'CA', orbitR: 185, speed: 0.009, phase: 3.6 },
  { name: 'Docs', color: '#4285F4', initials: 'GD', orbitR: 250, speed: 0.007, phase: 1.8 },
  { name: 'WhatsApp', color: '#25D366', initials: 'WA', orbitR: 220, speed: 0.012, phase: 4.2 },
  { name: 'Browser', color: '#F59E0B', initials: '🌐', orbitR: 200, speed: 0.010, phase: 5.1 },
];

// ── INTRO (0-90) ──────────────────────────────────────────────────────────────
const Intro = ({ frame, fps }: { frame: number; fps: number }) => {
  const catOp = interpolate(frame, [5, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleSp = spring({ frame: frame - 15, fps, config: { damping: 180 } });
  const titleY = interpolate(titleSp, [0, 1], [60, 0]);
  const lineW = interpolate(frame, [35, 75], [0, 200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOp = interpolate(frame, [55, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 80, fontFamily: FONT }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, opacity: catOp }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: RED }} />
        <span style={{ color: RED, fontSize: 13, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' }}>The Problem</span>
      </div>
      <div style={{ transform: `translateY(${titleY}px)`, opacity: titleSp, marginBottom: 20 }}>
        <div style={{ color: '#FFF', fontSize: 82, fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.03em' }}>THE SILO</div>
        <div style={{ color: RED, fontSize: 82, fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.03em' }}>TAX</div>
      </div>
      <div style={{ width: lineW, height: 4, backgroundColor: RED, borderRadius: 2, marginBottom: 24 }} />
      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 22, fontWeight: 400, lineHeight: 1.5, margin: 0, opacity: subOp }}>
        The hidden cost of fragmented focus
      </p>
    </AbsoluteFill>
  );
};

// ── SCENE A: Fragmented Chaos (90-290) ────────────────────────────────────────
const SceneA = ({ frame, fps }: { frame: number; fps: number }) => {
  const localFrame = frame - 90;
  const fadeIn = interpolate(localFrame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cx = W / 2;
  const cy = H / 2 - 80;

  const CONSEQUENCES = [
    { label: 'CONTEXT SWITCHING', sub: '20 min of deep focus lost per switch', color: RED },
    { label: 'DATA LEAK RISK', sub: 'Your secrets train their models', color: ORANGE },
    { label: 'TOOL OVERLOAD', sub: 'Avg. 9 apps open simultaneously', color: PURPLE },
  ];

  return (
    <AbsoluteFill style={{ fontFamily: FONT, opacity: fadeIn }}>
      {/* Heading */}
      <div style={{ position: 'absolute', top: 70, left: 0, right: 0, textAlign: 'center' }}>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>
          The High Cost of Fragmented Focus
        </div>
        <div style={{ color: '#FFF', fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em' }}>
          9 Apps. Zero Answers.
        </div>
      </div>

      {/* Orbiting bubbles */}
      <svg width={W} height={H} style={{ position: 'absolute', top: 0, left: 0 }}>
        {APP_BUBBLES.map((app, i) => {
          const t = localFrame * app.speed + app.phase;
          const px = cx + app.orbitR * Math.cos(t);
          const py = cy + app.orbitR * 0.55 * Math.sin(t);
          const bSpring = spring({ frame: localFrame - i * 8, fps, config: { damping: 150 } });
          const bOp = interpolate(localFrame, [i * 8, i * 8 + 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

          // Chaotic line from center
          const lineOp = interpolate(localFrame, [20, 50], [0, 0.15], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return (
            <g key={app.name} opacity={bOp}>
              <line x1={cx} y1={cy} x2={px} y2={py} stroke={app.color} strokeWidth="1" opacity={lineOp} strokeDasharray="4 6" />
              <circle cx={px} cy={py} r={38} fill={`${app.color}18`} stroke={app.color} strokeWidth="1.5"
                style={{ filter: `drop-shadow(0 0 8px ${app.color}50)` }}
                transform={`scale(${interpolate(bSpring, [0, 1], [0.2, 1])})`}
                style2={{ transformOrigin: `${px}px ${py}px` }}
              />
              <text x={px} y={py + 5} textAnchor="middle" fill={app.color} fontSize="11" fontWeight="800" fontFamily={FONT}>{app.initials}</text>
            </g>
          );
        })}

        {/* Central stressed icon */}
        <g transform={`translate(${cx},${cy})`}>
          <circle r={52} fill="rgba(239,68,68,0.08)" stroke="rgba(239,68,68,0.35)" strokeWidth="2"
            style={{ filter: 'drop-shadow(0 0 12px rgba(239,68,68,0.3))' }}
          />
          {/* Brain/frustration icon - question marks */}
          <text textAnchor="middle" y={-8} fill={RED} fontSize="28" fontWeight="900" fontFamily={FONT}>?</text>
          <text textAnchor="middle" y={20} fill="rgba(239,68,68,0.6)" fontSize="12" fontWeight="700" fontFamily={FONT}>YOU</text>
        </g>
      </svg>

      {/* Consequence pills */}
      <div style={{
        position: 'absolute', bottom: 80, left: 0, right: 0,
        display: 'flex', gap: 16, justifyContent: 'center', padding: '0 60px',
        flexWrap: 'wrap',
      }}>
        {CONSEQUENCES.map((c, i) => {
          const op = interpolate(localFrame, [80 + i * 25, 110 + i * 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return (
            <div key={c.label} style={{
              opacity: op,
              padding: '14px 22px',
              borderRadius: 12,
              border: `1px solid ${c.color}40`,
              backgroundColor: `${c.color}0C`,
              minWidth: 260,
              textAlign: 'center',
            }}>
              <div style={{ color: c.color, fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 4 }}>{c.label}</div>
              <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, fontWeight: 400 }}>{c.sub}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ── SCENE B: Stats + Data Leak (290-460) ──────────────────────────────────────
const SceneB = ({ frame, fps }: { frame: number; fps: number }) => {
  const localFrame = frame - 290;
  const fadeIn = interpolate(localFrame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const STATS = [
    { value: '23 min', label: 'Lost per context switch', color: RED, icon: '⏱' },
    { value: '$47k', label: 'Annual productivity cost', color: ORANGE, icon: '💸' },
    { value: '100%', label: 'Data sent to Big Tech', color: PURPLE, icon: '🔓' },
  ];

  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, opacity: fadeIn, gap: 20 }}>
      <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700 }}>The Hidden Cost</div>
      <div style={{ color: '#FFF', fontSize: 40, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 8 }}>
        You're paying a <span style={{ color: RED }}>Silo Tax</span>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'flex', gap: 20, marginTop: 16 }}>
        {STATS.map((s, i) => {
          const cardSp = spring({ frame: localFrame - (30 + i * 20), fps, config: { damping: 160 } });
          const cardY = interpolate(cardSp, [0, 1], [50, 0]);
          return (
            <div key={s.label} style={{
              opacity: cardSp,
              transform: `translateY(${cardY}px)`,
              width: 240,
              padding: '28px 24px',
              borderRadius: 16,
              border: `1.5px solid ${s.color}35`,
              backgroundColor: `${s.color}0A`,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ color: s.color, fontSize: 48, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}>{s.value}</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 500, marginTop: 8, lineHeight: 1.4 }}>{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* Setup Wall callout */}
      <div style={{
        marginTop: 24,
        padding: '20px 32px',
        borderRadius: 12,
        border: '1px solid rgba(239,68,68,0.3)',
        backgroundColor: 'rgba(239,68,68,0.06)',
        maxWidth: 640,
        textAlign: 'center',
        opacity: interpolate(localFrame, [110, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
      }}>
        <div style={{ color: RED, fontSize: 12, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 6 }}>The Setup Wall</div>
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, lineHeight: 1.6 }}>
          OpenClaw is the world's most powerful open-source AI — but one wrong config line and it's a brick.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── SCENE C: Solution Bridge (460-590) ────────────────────────────────────────
const SceneC = ({ frame, fps }: { frame: number; fps: number }) => {
  const localFrame = frame - 460;
  const fadeIn = interpolate(localFrame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const PLATFORMS = [
    { name: 'WhatsApp', color: '#25D366', angle: -90 },
    { name: 'iMessage', color: '#34C759', angle: -30 },
    { name: 'Slack', color: '#E01E5A', angle: 30 },
    { name: 'Discord', color: '#5865F2', angle: 90 },
    { name: 'Telegram', color: '#2AABEE', angle: 150 },
    { name: 'Email', color: ACCENT, angle: 210 },
  ];
  const cx = W / 2, cy = H / 2 + 20, orbitR = 200;

  return (
    <AbsoluteFill style={{ fontFamily: FONT, opacity: fadeIn }}>
      <div style={{ position: 'absolute', top: 75, left: 0, right: 0, textAlign: 'center' }}>
        <div style={{ color: ACCENT, fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>The Solution</div>
        <div style={{ color: '#FFF', fontSize: 36, fontWeight: 900, letterSpacing: '-0.02em' }}>
          One Intelligence. <span style={{ color: ACCENT }}>Every Platform.</span>
        </div>
      </div>

      <svg width={W} height={H} style={{ position: 'absolute', top: 0, left: 0 }}>
        {/* Orbit ring */}
        <circle cx={cx} cy={cy} r={orbitR} fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />

        {/* Center brain */}
        <g transform={`translate(${cx},${cy})`}>
          <circle r={62} fill="rgba(59,130,246,0.12)" stroke={ACCENT} strokeWidth="2"
            style={{ filter: 'drop-shadow(0 0 20px rgba(59,130,246,0.5))' }}
          />
          <text textAnchor="middle" y={-5} fill={ACCENT} fontSize="18" fontWeight="900" fontFamily={FONT}>YOUR</text>
          <text textAnchor="middle" y={18} fill={ACCENT} fontSize="18" fontWeight="900" fontFamily={FONT}>AI</text>
        </g>

        {/* Platform nodes */}
        {PLATFORMS.map((p, i) => {
          const rad = (p.angle * Math.PI) / 180;
          const px = cx + orbitR * Math.cos(rad);
          const py = cy + orbitR * Math.sin(rad);
          const pSp = spring({ frame: localFrame - (10 + i * 10), fps, config: { damping: 160 } });
          const lineProgress = interpolate(localFrame, [15 + i * 10, 40 + i * 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const lineLen = orbitR - 52;

          return (
            <g key={p.name}>
              <line
                x1={cx + 52 * Math.cos(rad)} y1={cy + 52 * Math.sin(rad)}
                x2={cx + (52 + lineLen * lineProgress) * Math.cos(rad)}
                y2={cy + (52 + lineLen * lineProgress) * Math.sin(rad)}
                stroke={p.color} strokeWidth="1.5" opacity={0.5}
              />
              <circle cx={px} cy={py} r={36} fill={`${p.color}18`} stroke={p.color} strokeWidth="1.5"
                opacity={pSp}
                style={{ transformOrigin: `${px}px ${py}px`, transform: `scale(${interpolate(pSp, [0, 1], [0.2, 1])})` }}
              />
              <text x={px} y={py + 5} textAnchor="middle" fill={p.color} fontSize="10" fontWeight="700" fontFamily={FONT} opacity={pSp}>{p.name.slice(0,3).toUpperCase()}</text>
            </g>
          );
        })}
      </svg>

      {/* Bottom tag */}
      <div style={{
        position: 'absolute', bottom: 70, left: 0, right: 0, textAlign: 'center',
        opacity: interpolate(localFrame, [70, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '12px 28px', borderRadius: 100, border: `1px solid ${ACCENT}35`, backgroundColor: `${ACCENT}0A` }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#22C55E', boxShadow: '0 0 8px #22C55E' }} />
          <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, fontWeight: 600 }}>Done-for-you deployment in 48–72 hours</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Brand ─────────────────────────────────────────────────────────────────────
const Brand = ({ frame }: { frame: number }) => {
  const op = interpolate(frame, [565, 590], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <div style={{ position: 'absolute', bottom: 38, right: 56, display: 'flex', alignItems: 'center', gap: 8, opacity: op, fontFamily: FONT }}>
      <div style={{ width: 14, height: 14, borderRadius: 3, backgroundColor: ACCENT }} />
      <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, fontWeight: 600, letterSpacing: '0.14em' }}>SYSTEMPROS.AI</span>
    </div>
  );
};

// ── Main Export ───────────────────────────────────────────────────────────────
export const PrivateAssistantSilo = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const globalFadeOut = interpolate(frame, [580, 600], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Scene transitions
  const sceneAOp = interpolate(frame, [85, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sceneAExit = interpolate(frame, [280, 305], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sceneBOp = interpolate(frame, [285, 310], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sceneBExit = interpolate(frame, [450, 475], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sceneCOp = interpolate(frame, [455, 480], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const introOp = interpolate(frame, [75, 100], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

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

export default PrivateAssistantSilo;
