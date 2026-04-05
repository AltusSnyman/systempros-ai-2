import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const ACCENT = '#3B82F6';
const RED = '#EF4444';
const GREEN = '#22C55E';
const YELLOW = '#EAB308';
const BG = '#0A0A0A';
const FONT = "'Inter', system-ui, -apple-system, sans-serif";

const TERMINAL_LINES = [
  { text: '$ git clone https://github.com/openclaw/openclaw', color: 'rgba(255,255,255,0.7)', delay: 10 },
  { text: '  Cloning into "openclaw"...', color: 'rgba(255,255,255,0.45)', delay: 28 },
  { text: '$ npm install', color: 'rgba(255,255,255,0.7)', delay: 45 },
  { text: '  ERROR: peer dep conflict @anthropic/sdk@0.20', color: RED, delay: 62 },
  { text: '$ node setup.js --bridge --whatsapp', color: 'rgba(255,255,255,0.7)', delay: 82 },
  { text: '  ✗ Bridge auth failed: invalid token', color: RED, delay: 98 },
  { text: '$ sudo chmod +x ./run.sh && ./run.sh', color: 'rgba(255,255,255,0.7)', delay: 115 },
  { text: '  FATAL: SOUL.md parse error at line 1', color: RED, delay: 130 },
];

const DFY_ITEMS = [
  { text: 'Server environment configured & secured', delay: 0 },
  { text: 'WhatsApp + iMessage bridge connected', delay: 18 },
  { text: 'SOUL.md personality written for you', delay: 36 },
  { text: 'Top 50 skills installed & tested', delay: 54 },
];

export const OpenClawSetup = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const glow = interpolate(Math.sin(frame / 38), [-1, 1], [0.06, 0.14]);
  const fadeOut = interpolate(frame, [575, 600], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Intro 0-82
  const introOp = interpolate(frame, [70, 94], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleSp = spring({ frame: frame - 12, fps, config: { damping: 180 } });
  const catOp = interpolate(frame, [5, 28], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lineW = interpolate(frame, [30, 76], [0, 210], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOp = interpolate(frame, [52, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Scene A: Terminal errors (82-280)
  const sceneAOp = interpolate(frame, [80, 105], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sceneAExit = interpolate(frame, [270, 294], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const termFrame = frame - 82;

  // Scene B: DIY fail stats (280-430)
  const sceneBOp = interpolate(frame, [278, 302], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sceneBExit = interpolate(frame, [420, 444], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Scene C: DFY solution (430-580)
  const sceneCOp = interpolate(frame, [428, 452], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dfyFrame = frame - 430;

  return (
    <AbsoluteFill style={{ opacity: fadeOut, fontFamily: FONT }}>
      <AbsoluteFill style={{ backgroundColor: BG }} />
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 0%, rgba(239,68,68,${glow}) 0%, transparent 50%)` }} />

      {/* ── INTRO ── */}
      <AbsoluteFill style={{ opacity: introOp, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 80 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, opacity: catOp }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: RED }} />
          <span style={{ color: RED, fontSize: 13, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' }}>Installation Reality</span>
        </div>
        <div style={{ opacity: titleSp, transform: `translateY(${interpolate(titleSp, [0, 1], [50, 0])}px)`, marginBottom: 18 }}>
          <div style={{ color: '#FFF', fontSize: 80, fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.04em' }}>THE SETUP</div>
          <div style={{ color: RED, fontSize: 80, fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.04em' }}>WALL</div>
        </div>
        <div style={{ width: lineW, height: 4, backgroundColor: RED, borderRadius: 2, marginBottom: 22 }} />
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 22, fontWeight: 400, margin: 0, opacity: subOp }}>Most DIY installs end in failure.</p>
      </AbsoluteFill>

      {/* ── SCENE A: TERMINAL ── */}
      <AbsoluteFill style={{ opacity: Math.min(sceneAOp, sceneAExit), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
        <div style={{ color: RED, fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700 }}>The DIY Experience</div>
        <div style={{ color: '#FFF', fontSize: 32, fontWeight: 900, marginBottom: 12 }}>One Wrong Line = Total Brick</div>

        <div style={{ width: 820, borderRadius: 14, border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#111', overflow: 'hidden' }}>
          {/* Terminal header */}
          <div style={{ padding: '12px 18px', backgroundColor: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 8 }}>
            {['#ef4444', '#f59e0b', '#22c55e'].map((c) => (
              <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: c, opacity: 0.8 }} />
            ))}
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, marginLeft: 8 }}>openclaw — setup</span>
          </div>
          {/* Lines */}
          <div style={{ padding: '18px 22px', fontFamily: 'monospace', display: 'flex', flexDirection: 'column', gap: 8, minHeight: 340 }}>
            {TERMINAL_LINES.map((line, i) => {
              const op = interpolate(termFrame, [line.delay, line.delay + 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
              const isError = line.color === RED;
              return (
                <div key={i} style={{ opacity: op, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  {isError && (
                    <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: RED, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                      <span style={{ color: '#fff', fontSize: 9, fontWeight: 900 }}>✗</span>
                    </div>
                  )}
                  <span style={{ color: line.color, fontSize: 14, lineHeight: 1.5 }}>{line.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ opacity: interpolate(termFrame, [138, 158], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
          padding: '10px 24px', borderRadius: 100, border: `1px solid ${RED}35`, backgroundColor: `${RED}08` }}>
          <span style={{ color: RED, fontSize: 13, fontWeight: 600 }}>Average DIY setup time: 8+ hours. Success rate: 27%.</span>
        </div>
      </AbsoluteFill>

      {/* ── SCENE B: FAIL STATS ── */}
      <AbsoluteFill style={{ opacity: Math.min(sceneBOp, sceneBExit), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
        <div style={{ color: RED, fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700 }}>The Numbers Don't Lie</div>
        <div style={{ color: '#FFF', fontSize: 38, fontWeight: 900, letterSpacing: '-0.02em', textAlign: 'center' }}>
          Why People <span style={{ color: RED }}>Give Up</span>
        </div>
        <div style={{ display: 'flex', gap: 18, marginTop: 10 }}>
          {[
            { val: '73%', label: 'fail to complete setup', color: RED },
            { val: '8h+', label: 'average time lost', color: YELLOW },
            { val: '3x', label: 'average restart attempts', color: YELLOW },
          ].map((s, i) => {
            const sp = spring({ frame: frame - 280 - i * 20, fps, config: { damping: 160 } });
            return (
              <div key={s.label} style={{ width: 270, padding: '28px 22px', borderRadius: 16, border: `1.5px solid ${s.color}35`, backgroundColor: `${s.color}08`, textAlign: 'center', opacity: sp, transform: `translateY(${interpolate(sp, [0, 1], [30, 0])}px)` }}>
                <div style={{ color: s.color, fontSize: 52, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}>{s.val}</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, marginTop: 8 }}>{s.label}</div>
              </div>
            );
          })}
        </div>
        <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 15, marginTop: 8,
          opacity: interpolate(frame - 280, [80, 105], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
          Bridge configs, dependency conflicts, SOUL.md syntax errors...
        </div>
      </AbsoluteFill>

      {/* ── SCENE C: DFY SOLUTION ── */}
      <AbsoluteFill style={{ opacity: sceneCOp, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22 }}>
        <div style={{ color: GREEN, fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700 }}>The Done-For-You Alternative</div>
        <div style={{ color: '#FFF', fontSize: 40, fontWeight: 900, letterSpacing: '-0.02em', textAlign: 'center' }}>
          We Handle <span style={{ color: GREEN }}>Everything.</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: 640, marginTop: 8 }}>
          {DFY_ITEMS.map((item, i) => {
            const itemSp = spring({ frame: dfyFrame - item.delay, fps, config: { damping: 160 } });
            return (
              <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 16, opacity: itemSp, transform: `translateX(${interpolate(itemSp, [0, 1], [-30, 0])}px)` }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: `${GREEN}25`, border: `2px solid ${GREEN}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: GREEN, fontSize: 13, fontWeight: 900 }}>✓</span>
                </div>
                <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, fontWeight: 500 }}>{item.text}</span>
              </div>
            );
          })}
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 14, marginTop: 12,
          padding: '16px 32px', borderRadius: 100, backgroundColor: GREEN,
          opacity: interpolate(dfyFrame, [80, 105], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
          transform: `scale(${interpolate(spring({ frame: dfyFrame - 80, fps, config: { damping: 160 } }), [0, 1], [0.85, 1])})`,
        }}>
          <span style={{ color: '#000', fontSize: 18, fontWeight: 800 }}>Live in 48–72 hours</span>
        </div>
      </AbsoluteFill>

      {/* Brand */}
      <div style={{ position: 'absolute', bottom: 38, right: 56, display: 'flex', alignItems: 'center', gap: 8,
        opacity: interpolate(frame, [558, 578], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
        <div style={{ width: 14, height: 14, borderRadius: 3, backgroundColor: ACCENT }} />
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, fontWeight: 600, letterSpacing: '0.14em' }}>SYSTEMPROS.AI</span>
      </div>
    </AbsoluteFill>
  );
};

export default OpenClawSetup;
