import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from 'remotion';

const ACCENT = '#3B82F6';
const CYAN = '#22D3EE';
const RED = '#EF4444';
const GREEN = '#22C55E';
const BG = '#0A0A0A';
const FONT = "'Inter', system-ui, -apple-system, sans-serif";
const W = 1080;

const Background = ({ frame }: { frame: number }) => {
  const glow = interpolate(Math.sin(frame / 45), [-1, 1], [0.08, 0.16]);
  return (
    <>
      <AbsoluteFill style={{ backgroundColor: BG }} />
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 0%, rgba(34,211,238,${glow}) 0%, transparent 55%)` }} />
      <div style={{ position: 'absolute', top: 44, right: 44, width: 50, height: 50, borderTop: `2px solid rgba(34,211,238,0.3)`, borderRight: `2px solid rgba(34,211,238,0.3)` }} />
      <div style={{ position: 'absolute', bottom: 44, left: 44, width: 50, height: 50, borderBottom: `2px solid rgba(59,130,246,0.3)`, borderLeft: `2px solid rgba(59,130,246,0.3)` }} />
    </>
  );
};

// ── INTRO (0-90) ──────────────────────────────────────────────────────────────
const Intro = ({ frame, fps }: { frame: number; fps: number }) => {
  const catOp = interpolate(frame, [5, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleSp = spring({ frame: frame - 15, fps, config: { damping: 180 } });
  const titleY = interpolate(titleSp, [0, 1], [60, 0]);
  const lineW = interpolate(frame, [35, 80], [0, 240], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOp = interpolate(frame, [60, 88], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 80, fontFamily: FONT }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, opacity: catOp }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: CYAN }} />
        <span style={{ color: CYAN, fontSize: 13, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' }}>The Architecture Gap</span>
      </div>
      <div style={{ transform: `translateY(${titleY}px)`, opacity: titleSp, marginBottom: 20 }}>
        <div style={{ color: '#FFF', fontSize: 78, fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.03em' }}>BUYING A TOOL</div>
        <div style={{ color: CYAN, fontSize: 78, fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.03em' }}>≠ AUTOMATION</div>
      </div>
      <div style={{ width: lineW, height: 4, backgroundColor: CYAN, borderRadius: 2, marginBottom: 24 }} />
      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 22, fontWeight: 400, lineHeight: 1.5, margin: 0, opacity: subOp }}>
        Most businesses buy AI. Few actually automate.
      </p>
    </AbsoluteFill>
  );
};

// ── SCENE A: Split Architecture Comparison (90-290) ───────────────────────────
const SceneA = ({ frame, fps }: { frame: number; fps: number }) => {
  const localFrame = frame - 90;
  const fadeIn = interpolate(localFrame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // LEFT: Amateur chaos — disconnected tool bubbles
  const AMATEUR_TOOLS = [
    { name: 'ChatGPT', x: 155, y: 280, color: '#10B981' },
    { name: 'Zapier', x: 280, y: 380, color: '#FF4A00' },
    { name: 'GHL', x: 100, y: 430, color: '#4F46E5' },
    { name: 'Notion', x: 230, y: 500, color: '#F5F5F5' },
    { name: 'Voice AI', x: 320, y: 310, color: ACCENT },
  ];

  // RIGHT: SystemPros architecture — clean connected nodes
  const SP_NODES = [
    { name: 'CRM', x: 750, y: 290, color: ACCENT },
    { name: 'Voice AI', x: 870, y: 360, color: CYAN },
    { name: 'Lead Gen', x: 700, y: 400, color: '#22C55E' },
    { name: 'Automation', x: 830, y: 460, color: '#8B5CF6' },
    { name: 'Analytics', x: 750, y: 530, color: '#F59E0B' },
  ];
  const SP_CENTER = { x: 790, y: 415 };

  return (
    <AbsoluteFill style={{ fontFamily: FONT, opacity: fadeIn }}>
      {/* Divider */}
      <div style={{ position: 'absolute', left: W / 2, top: 130, bottom: 80, width: 1, backgroundColor: 'rgba(255,255,255,0.08)' }} />

      {/* Section labels */}
      <div style={{ position: 'absolute', top: 80, left: 0, width: W / 2, textAlign: 'center' }}>
        <div style={{ color: RED, fontSize: 12, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Random Tools Approach</div>
        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, marginTop: 4 }}>"We have AI" — but nothing's connected</div>
      </div>
      <div style={{ position: 'absolute', top: 80, left: W / 2, width: W / 2, textAlign: 'center' }}>
        <div style={{ color: GREEN, fontSize: 12, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' }}>SystemPros Architecture</div>
        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, marginTop: 4 }}>Every system wired to every other</div>
      </div>

      <svg width={W} height={W} style={{ position: 'absolute', top: 0, left: 0 }}>
        {/* LEFT: chaotic connections (random dashes) */}
        {AMATEUR_TOOLS.map((a, i) =>
          AMATEUR_TOOLS.slice(i + 1).map((b, j) => {
            const lineOp = interpolate(localFrame, [10 + i * 5, 35 + i * 5], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            return (
              <line key={`${i}-${j}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke={RED} strokeWidth="1" opacity={lineOp * 0.2} strokeDasharray="4 8" />
            );
          })
        )}
        {AMATEUR_TOOLS.map((t, i) => {
          const sp = spring({ frame: localFrame - i * 10, fps, config: { damping: 150 } });
          return (
            <g key={t.name} opacity={sp}>
              <circle cx={t.x} cy={t.y} r={38} fill={`${t.color}15`} stroke={t.color} strokeWidth="1.5" strokeDasharray="6 3" />
              <text x={t.x} y={t.y + 5} textAnchor="middle" fill={t.color} fontSize="11" fontWeight="700" fontFamily={FONT}>{t.name}</text>
              {/* Error badge */}
              <circle cx={t.x + 28} cy={t.y - 28} r="12" fill={RED} opacity={interpolate(localFrame, [40 + i * 8, 58 + i * 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })} />
              <text x={t.x + 28} y={t.y - 24} textAnchor="middle" fill="#FFF" fontSize="13" fontWeight="900" fontFamily={FONT}
                opacity={interpolate(localFrame, [40 + i * 8, 58 + i * 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}>✗</text>
            </g>
          );
        })}

        {/* RIGHT: clean hub-and-spoke */}
        {SP_NODES.map((n, i) => {
          const lineProgress = interpolate(localFrame, [15 + i * 12, 45 + i * 12], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const dx = n.x - SP_CENTER.x, dy = n.y - SP_CENTER.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const nx = dx / dist, ny = dy / dist;
          return (
            <line key={n.name}
              x1={SP_CENTER.x + nx * 28} y1={SP_CENTER.y + ny * 28}
              x2={SP_CENTER.x + nx * (28 + (dist - 28 - 32) * lineProgress)}
              y2={SP_CENTER.y + ny * (28 + (dist - 28 - 32) * lineProgress)}
              stroke={n.color} strokeWidth="1.5" opacity={0.5}
            />
          );
        })}
        {/* Center node */}
        <circle cx={SP_CENTER.x} cy={SP_CENTER.y} r={30}
          fill="rgba(59,130,246,0.15)" stroke={ACCENT} strokeWidth="2"
          style={{ filter: 'drop-shadow(0 0 14px rgba(59,130,246,0.4))' }}
        />
        <text x={SP_CENTER.x} y={SP_CENTER.y + 5} textAnchor="middle" fill={ACCENT} fontSize="11" fontWeight="800" fontFamily={FONT}>CORE</text>

        {SP_NODES.map((n, i) => {
          const sp = spring({ frame: localFrame - (10 + i * 12), fps, config: { damping: 160 } });
          return (
            <g key={n.name} opacity={sp}>
              <circle cx={n.x} cy={n.y} r={32} fill={`${n.color}18`} stroke={n.color} strokeWidth="1.5" />
              <text x={n.x} y={n.y + 5} textAnchor="middle" fill={n.color} fontSize="10" fontWeight="700" fontFamily={FONT}>{n.name}</text>
              {/* Check badge */}
              <circle cx={n.x + 24} cy={n.y - 24} r={11} fill={GREEN}
                opacity={interpolate(localFrame, [50 + i * 8, 68 + i * 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
              />
              <text x={n.x + 24} y={n.y - 20} textAnchor="middle" fill="#FFF" fontSize="12" fontWeight="900" fontFamily={FONT}
                opacity={interpolate(localFrame, [50 + i * 8, 68 + i * 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}>✓</text>
            </g>
          );
        })}
      </svg>

      {/* Bottom result bars */}
      <div style={{
        position: 'absolute', bottom: 70, left: 40, right: 40,
        display: 'flex', gap: 20,
        opacity: interpolate(localFrame, [120, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
      }}>
        <div style={{ flex: 1, padding: '14px 20px', borderRadius: 12, border: `1px solid ${RED}35`, backgroundColor: `${RED}08`, textAlign: 'center' }}>
          <div style={{ color: RED, fontSize: 22, fontWeight: 900 }}>$0</div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 2 }}>ROI from random tools</div>
        </div>
        <div style={{ flex: 1, padding: '14px 20px', borderRadius: 12, border: `1px solid ${GREEN}35`, backgroundColor: `${GREEN}08`, textAlign: 'center' }}>
          <div style={{ color: GREEN, fontSize: 22, fontWeight: 900 }}>+2.4x</div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 2 }}>Average revenue uplift</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── SCENE B: 30-Year Trust Credentials (290-470) ──────────────────────────────
const SceneB = ({ frame, fps }: { frame: number; fps: number }) => {
  const localFrame = frame - 290;
  const fadeIn = interpolate(localFrame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const TIMELINE = [
    { year: '1994', label: 'Enterprise IT Engineering', color: ACCENT },
    { year: '2002', label: 'Data Architecture & Security', color: CYAN },
    { year: '2010', label: 'Cloud & API Infrastructure', color: '#8B5CF6' },
    { year: '2018', label: 'AI & Neural Networks', color: '#22C55E' },
    { year: '2024', label: 'AI Automation for Business', color: '#F59E0B' },
  ];

  const CREDS = [
    { label: 'SOC-2 Practices', icon: '🔐' },
    { label: '99.99% Uptime', icon: '🟢' },
    { label: 'NZ · AU · USA', icon: '🌏' },
    { label: 'GDPR Compliant', icon: '⚖️' },
  ];

  const timelineProgress = interpolate(localFrame, [20, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });

  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, opacity: fadeIn, gap: 24 }}>
      <div style={{ color: CYAN, fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700 }}>Built by Engineers, Not Marketers</div>
      <div style={{ color: '#FFF', fontSize: 44, fontWeight: 900, letterSpacing: '-0.03em', textAlign: 'center' }}>
        30 Years of IT Experience
      </div>

      {/* Timeline bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: 740, marginTop: 8 }}>
        {TIMELINE.map((item, i) => {
          const barProgress = interpolate(localFrame, [20 + i * 14, 70 + i * 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
          const labelOp = interpolate(localFrame, [18 + i * 14, 38 + i * 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const barW = ((parseInt(item.year) - 1990) / 34) * 100;
          return (
            <div key={item.year} style={{ display: 'flex', alignItems: 'center', gap: 16, opacity: labelOp }}>
              <div style={{ color: item.color, fontSize: 13, fontWeight: 800, width: 44, textAlign: 'right' }}>{item.year}</div>
              <div style={{ flex: 1, height: 8, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${barW * barProgress}%`, backgroundColor: item.color, borderRadius: 4, boxShadow: `0 0 8px ${item.color}60` }} />
              </div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: 500, width: 220 }}>{item.label}</div>
            </div>
          );
        })}
      </div>

      {/* Credential pills */}
      <div style={{
        display: 'flex', gap: 14, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center',
        opacity: interpolate(localFrame, [110, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
      }}>
        {CREDS.map((c) => (
          <div key={c.label} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 20px', borderRadius: 100,
            border: `1px solid ${ACCENT}35`, backgroundColor: `${ACCENT}08`,
          }}>
            <span style={{ fontSize: 16 }}>{c.icon}</span>
            <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: 600 }}>{c.label}</span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ── SCENE C: ROI Comparison (470-590) ─────────────────────────────────────────
const SceneC = ({ frame, fps }: { frame: number; fps: number }) => {
  const localFrame = frame - 470;
  const fadeIn = interpolate(localFrame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const BARS = [
    { label: 'Without Consultation', val: 12, max: 100, color: RED },
    { label: 'DIY AI Install', val: 28, max: 100, color: '#F97316' },
    { label: 'SystemPros Audit + Build', val: 91, max: 100, color: GREEN },
  ];

  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, opacity: fadeIn, gap: 28 }}>
      <div style={{ color: CYAN, fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700 }}>Strategy vs. Guesswork</div>
      <div style={{ color: '#FFF', fontSize: 40, fontWeight: 900, letterSpacing: '-0.02em', textAlign: 'center' }}>
        AI ROI: <span style={{ color: CYAN }}>Architecture Matters</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 740, marginTop: 10 }}>
        {BARS.map((bar, i) => {
          const barFill = interpolate(localFrame, [20 + i * 20, 80 + i * 20], [0, bar.val], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
          const labelOp = interpolate(localFrame, [18 + i * 20, 36 + i * 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return (
            <div key={bar.label} style={{ opacity: labelOp }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, fontWeight: 600 }}>{bar.label}</span>
                <span style={{ color: bar.color, fontSize: 15, fontWeight: 800 }}>{Math.floor(barFill)}%</span>
              </div>
              <div style={{ height: 14, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 7, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${barFill}%`, backgroundColor: bar.color, borderRadius: 7, boxShadow: `0 0 12px ${bar.color}50` }} />
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 12,
        padding: '14px 28px', borderRadius: 100,
        border: `1.5px solid ${CYAN}40`, backgroundColor: `${CYAN}0A`,
        opacity: interpolate(localFrame, [110, 135], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
      }}>
        <span style={{ color: CYAN, fontSize: 16, fontWeight: 700 }}>We find the leaks. Then we fix them.</span>
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

export const ConsultationGap = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const globalFadeOut = interpolate(frame, [578, 600], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const introOp = interpolate(frame, [76, 98], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sceneAOp = interpolate(frame, [85, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sceneAExit = interpolate(frame, [280, 305], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sceneBOp = interpolate(frame, [285, 312], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sceneBExit = interpolate(frame, [460, 485], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sceneCOp = interpolate(frame, [465, 488], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

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

export default ConsultationGap;
