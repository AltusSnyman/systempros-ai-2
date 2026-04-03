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

export type PrivateAssistantProps = Record<string, never>;

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
        <span style={{ color: ACCENT, fontSize: 13, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' }}>Personal AI</span>
      </div>
      <div style={{ transform: `translateY(${titleY}px)`, opacity: titleSpring, marginBottom: 22 }}>
        <div style={{ color: '#FFF', fontSize: 80, fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.03em' }}>THE PRIVATE</div>
        <div style={{ color: '#FFF', fontSize: 80, fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.03em' }}>ASSISTANT</div>
      </div>
      <div style={{ width: lineWidth, height: 4, backgroundColor: ACCENT, borderRadius: 2, marginBottom: 24 }} />
      <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 22, fontWeight: 400, lineHeight: 1.5, margin: 0, opacity: tagOp }}>One AI. Every platform. Done for you.</p>
    </AbsoluteFill>
  );
};

// ================== SCENE A: Platform Network (90-270) ==================
const SceneA = ({ frame, fps }: { frame: number; fps: number }) => {
  const localFrame = frame - 90;
  const fadeIn = interpolate(localFrame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const centerSpring = spring({ frame: localFrame - 0, fps, config: { damping: 140 } });
  const pulse = 1 + 0.06 * Math.sin(localFrame / 18);

  const platforms = [
    { name: 'WhatsApp', angle: 0, color: '#25D366' },
    { name: 'Telegram', angle: 60, color: '#2AABEE' },
    { name: 'Discord', angle: 120, color: '#5865F2' },
    { name: 'Slack', angle: 180, color: '#E01E5A' },
    { name: 'iMessage', angle: 240, color: '#34C759' },
    { name: 'Email', angle: 300, color: ACCENT },
  ];

  const cx = 540, cy = 470, orbitR = 240;
  const labelOp = interpolate(localFrame, [130, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ fontFamily: FONT, opacity: fadeIn }}>
      <svg width="1080" height="1080" style={{ position: 'absolute', top: 0, left: 0 }}>
        {/* Orbit ring */}
        <circle cx={cx} cy={cy} r={orbitR} fill="none" stroke="rgba(59,130,246,0.1)" strokeWidth="1.5" />

        {/* Center AI hex */}
        <g transform={`translate(${cx},${cy})`}>
          <polygon
            points="0,-70 60.6,-35 60.6,35 0,70 -60.6,35 -60.6,-35"
            fill="rgba(59,130,246,0.15)"
            stroke={ACCENT}
            strokeWidth="2"
            transform={`scale(${interpolate(centerSpring, [0, 1], [0.2, 1]) * pulse})`}
            style={{ filter: 'drop-shadow(0 0 16px rgba(59,130,246,0.4))' }}
          />
          <text textAnchor="middle" y={8} fill={ACCENT} fontSize="22" fontWeight="900" fontFamily={FONT} opacity={centerSpring}>AI</text>
        </g>

        {/* Platform nodes */}
        {platforms.map((p, i) => {
          const rad = (p.angle * Math.PI) / 180;
          const px = cx + orbitR * Math.cos(rad);
          const py = cy + orbitR * Math.sin(rad);
          const pSpring = spring({ frame: localFrame - (i * 16 + 15), fps, config: { damping: 160 } });
          const lineProgress = interpolate(localFrame, [i * 16 + 35, i * 16 + 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const lineLen = orbitR - 50;

          return (
            <g key={p.name}>
              {/* Connection line */}
              <line
                x1={cx + 50 * Math.cos(rad)}
                y1={cy + 50 * Math.sin(rad)}
                x2={cx + (50 + lineLen * lineProgress) * Math.cos(rad)}
                y2={cy + (50 + lineLen * lineProgress) * Math.sin(rad)}
                stroke={ACCENT}
                strokeWidth="1.5"
                opacity={0.4}
                strokeDasharray={lineLen}
                strokeDashoffset={lineLen * (1 - lineProgress)}
              />
              {/* Platform circle */}
              <circle cx={px} cy={py} r={40} fill={`${p.color}18`} stroke={p.color} strokeWidth="1.5"
                opacity={pSpring} transform={`scale(${interpolate(pSpring, [0, 1], [0.3, 1])} , ${interpolate(pSpring, [0, 1], [0.3, 1])})`}
                style={{ transformOrigin: `${px}px ${py}px` }}
              />
              <text x={px} y={py + 5} textAnchor="middle" fill={p.color} fontSize="12" fontWeight="700" fontFamily={FONT} opacity={pSpring}>{p.name.charAt(0)}</text>
              <text x={px} y={py + 58} textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="11" fontFamily={FONT} opacity={pSpring}>{p.name}</text>
            </g>
          );
        })}
      </svg>
      <div style={{
        position: 'absolute', bottom: 100, left: 0, right: 0, textAlign: 'center',
        color: 'rgba(255,255,255,0.7)', fontSize: 15, fontWeight: 700, letterSpacing: '0.16em',
        textTransform: 'uppercase', opacity: labelOp
      }}>20+ Platforms Supported</div>
    </AbsoluteFill>
  );
};

// ================== SCENE B: Skills Counter (270-420) ==================
const SceneB = ({ frame, fps }: { frame: number; fps: number }) => {
  const localFrame = frame - 270;
  const fadeIn = interpolate(localFrame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const counterVal = Math.floor(interpolate(localFrame, [20, 100], [0, 3000], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  }));

  const numSquares = 30;
  const pillsOp = interpolate(localFrame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, opacity: fadeIn, gap: 32 }}>
      <div style={{ fontSize: 14, letterSpacing: '0.2em', color: ACCENT, fontWeight: 700, textTransform: 'uppercase' }}>ClawHub Marketplace</div>

      {/* Grid of skill squares */}
      <div style={{ display: 'flex', flexWrap: 'wrap', width: 360, gap: 6, justifyContent: 'center' }}>
        {Array.from({ length: numSquares }, (_, i) => {
          const sqOp = interpolate(localFrame, [20 + i * 2, 35 + i * 2], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return (
            <div key={i} style={{
              width: 44, height: 44, borderRadius: 8,
              border: `1.5px solid rgba(59,130,246,${0.2 + (i % 3) * 0.15})`,
              backgroundColor: `rgba(59,130,246,${0.05 + (i % 4) * 0.04})`,
              opacity: sqOp, display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2 L11 7 L16 7 L12 10.5 L13.5 16 L9 13 L4.5 16 L6 10.5 L2 7 L7 7 Z" stroke={ACCENT} strokeWidth="1.2" fill="rgba(59,130,246,0.3)" />
              </svg>
            </div>
          );
        })}
      </div>

      {/* Counter */}
      <div style={{ textAlign: 'center' }}>
        <span style={{ color: ACCENT, fontSize: 80, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}>{counterVal.toLocaleString()}+</span>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, fontWeight: 600, letterSpacing: '0.1em', marginTop: 8 }}>SKILLS</div>
      </div>

      {/* Pill features */}
      <div style={{ display: 'flex', gap: 16, opacity: pillsOp }}>
        {['Custom SOUL.md', 'Persistent Memory', 'Proactive Automation'].map((pill) => (
          <div key={pill} style={{
            padding: '10px 20px', borderRadius: 100,
            border: `1.5px solid rgba(59,130,246,0.4)`,
            backgroundColor: 'rgba(59,130,246,0.08)',
          }}>
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 600 }}>{pill}</span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ================== SCENE C: Chat (420-560) ==================
const SceneC = ({ frame, fps }: { frame: number; fps: number }) => {
  const localFrame = frame - 420;
  const fadeIn = interpolate(localFrame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Chat messages appear sequentially
  const msg1Op = interpolate(localFrame, [20, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const typingOp = interpolate(localFrame, [50, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const msg2Op = interpolate(localFrame, [75, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const typingVisible = localFrame > 50 && localFrame < 75;

  const dotPhase = (localFrame % 18) / 18;
  const footerOp = interpolate(localFrame, [100, 125], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const phoneSpring = spring({ frame: localFrame - 0, fps, config: { damping: 160 } });

  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, opacity: fadeIn, gap: 32 }}>
      <div style={{ fontSize: 14, letterSpacing: '0.2em', color: ACCENT, fontWeight: 700, textTransform: 'uppercase' }}>Live Chat Simulation</div>

      {/* Phone mockup */}
      <div style={{
        width: 540, borderRadius: 24,
        border: `2px solid rgba(59,130,246,0.3)`,
        backgroundColor: 'rgba(255,255,255,0.03)',
        overflow: 'hidden',
        opacity: phoneSpring, transform: `translateY(${interpolate(phoneSpring, [0, 1], [40, 0])}px)`
      }}>
        {/* Chat header */}
        <div style={{ padding: '16px 24px', backgroundColor: 'rgba(59,130,246,0.12)', borderBottom: '1px solid rgba(59,130,246,0.2)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#FFF', fontSize: 14, fontWeight: 800 }}>AI</span>
          </div>
          <div>
            <div style={{ color: '#FFF', fontSize: 15, fontWeight: 700 }}>Private Assistant</div>
            <div style={{ color: '#22c55e', fontSize: 12, fontWeight: 500 }}>● Online</div>
          </div>
        </div>

        {/* Messages */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 16, minHeight: 220 }}>
          {/* User message */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', opacity: msg1Op }}>
            <div style={{ backgroundColor: ACCENT, borderRadius: '16px 16px 4px 16px', padding: '12px 18px', maxWidth: '70%' }}>
              <span style={{ color: '#FFF', fontSize: 15, fontWeight: 500 }}>What's on my calendar today?</span>
            </div>
          </div>

          {/* Typing indicator */}
          {typingVisible && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', opacity: typingOp }}>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px 16px 16px 4px', padding: '12px 18px', display: 'flex', gap: 6, alignItems: 'center' }}>
                {[0, 1, 2].map((di) => (
                  <div key={di} style={{
                    width: 8, height: 8, borderRadius: '50%', backgroundColor: ACCENT,
                    opacity: Math.abs(Math.sin((dotPhase + di * 0.33) * Math.PI)),
                    transform: `translateY(${Math.sin((dotPhase + di * 0.33) * Math.PI) * -4}px)`
                  }} />
                ))}
              </div>
            </div>
          )}

          {/* AI message */}
          <div style={{ display: 'flex', justifyContent: 'flex-start', opacity: msg2Op }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '16px 16px 16px 4px', padding: '12px 18px', maxWidth: '80%' }}>
              <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15, lineHeight: 1.5 }}>
                You have 3 meetings: 9am standup, 2pm client call, 4pm review. Want me to prep briefs?
              </span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ opacity: footerOp, color: 'rgba(255,255,255,0.45)', fontSize: 15, letterSpacing: '0.04em', textAlign: 'center' }}>
        Remembers context. Learns your preferences.
      </div>
    </AbsoluteFill>
  );
};

export const PrivateAssistant = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const globalFadeOut = interpolate(frame, [570, 600], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ opacity: globalFadeOut }}>
      <Background frame={frame} />
      <Sequence from={0} durationInFrames={90}><Intro frame={frame} fps={fps} /></Sequence>
      <Sequence from={90} durationInFrames={180}><SceneA frame={frame} fps={fps} /></Sequence>
      <Sequence from={270} durationInFrames={150}><SceneB frame={frame} fps={fps} /></Sequence>
      <Sequence from={420} durationInFrames={140}><SceneC frame={frame} fps={fps} /></Sequence>
      <Brand frame={frame} />
    </AbsoluteFill>
  );
};
