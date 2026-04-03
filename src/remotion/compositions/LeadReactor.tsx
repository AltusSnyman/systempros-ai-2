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

export type LeadReactorProps = Record<string, never>;

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
        <span style={{ color: ACCENT, fontSize: 13, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' }}>Paid Ads Automation</span>
      </div>
      <div style={{ transform: `translateY(${titleY}px)`, opacity: titleSpring, marginBottom: 22 }}>
        <div style={{ color: '#FFF', fontSize: 80, fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.03em' }}>THE LEAD</div>
        <div style={{ color: '#FFF', fontSize: 80, fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.03em' }}>REACTOR</div>
      </div>
      <div style={{ width: lineWidth, height: 4, backgroundColor: ACCENT, borderRadius: 2, marginBottom: 24 }} />
      <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 22, fontWeight: 400, lineHeight: 1.5, margin: 0, opacity: tagOp }}>Ad click to booked appointment. Automatically.</p>
    </AbsoluteFill>
  );
};

// ================== SCENE A: Trigger Burst (90-240) ==================
const SceneA = ({ frame, fps }: { frame: number; fps: number }) => {
  const localFrame = frame - 90;
  const fadeIn = interpolate(localFrame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const metaSpring = spring({ frame: localFrame - 5, fps, config: { damping: 160 } });
  const burstProgress = interpolate(localFrame, [25, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const channels = [
    { label: 'Voice Call', icon: 'phone' },
    { label: 'SMS', icon: 'sms' },
    { label: 'WhatsApp', icon: 'whatsapp' },
    { label: 'iMessage', icon: 'imessage' },
    { label: 'Messenger', icon: 'messenger' },
  ];

  // Starburst rays
  const numRays = 12;

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, opacity: fadeIn }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 40, width: 960 }}>
        {/* Meta logo + label */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, opacity: metaSpring, transform: `scale(${interpolate(metaSpring, [0, 1], [0.5, 1])})` }}>
          <div style={{ width: 100, height: 100, borderRadius: 20, backgroundColor: '#1877F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <path d="M28 8 C16.95 8 8 16.95 8 28 C8 37.92 14.8 46.2 24 48.4 L24 34 L19 34 L19 28 L24 28 L24 23.6 C24 18.68 26.93 16 31.4 16 C33.54 16 35.6 16.36 35.6 16.36 L35.6 21.2 L33.33 21.2 C31.1 21.2 30.4 22.6 30.4 24.04 L30.4 28 L35.36 28 L34.56 34 L30.4 34 L30.4 48.4 C39.6 46.2 46.4 37.92 46.4 28 C46.4 16.95 37.45 8 26.4 8 Z" fill="white" />
            </svg>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: 700, letterSpacing: '0.1em' }}>AD CLICKED</span>
        </div>

        {/* Burst / explosion */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', height: 200 }}>
          <svg width="200" height="200" viewBox="-100 -100 200 200" style={{ overflow: 'visible' }}>
            {Array.from({ length: numRays }, (_, i) => {
              const angle = (i / numRays) * Math.PI * 2;
              const len = 60 + (i % 3) * 15;
              const rayProgress = interpolate(burstProgress, [i / numRays * 0.5, 0.5 + i / numRays * 0.5], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
              return (
                <line
                  key={i}
                  x1={Math.cos(angle) * 20}
                  y1={Math.sin(angle) * 20}
                  x2={Math.cos(angle) * (20 + len * rayProgress)}
                  y2={Math.sin(angle) * (20 + len * rayProgress)}
                  stroke={ACCENT}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity={0.7 + 0.3 * rayProgress}
                />
              );
            })}
            <circle r={18} fill={ACCENT} opacity={burstProgress} />
            <text textAnchor="middle" y={6} fill="white" fontSize="14" fontWeight="800" fontFamily={FONT} opacity={burstProgress}>⚡</text>
          </svg>
        </div>

        {/* Channel stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {channels.map((ch, i) => {
            const chSpring = spring({ frame: localFrame - (50 + i * 14), fps, config: { damping: 160 } });
            const scale = interpolate(chSpring, [0, 1], [0.5, 1]);
            return (
              <div key={ch.label} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                opacity: chSpring, transform: `translateX(${interpolate(chSpring, [0, 1], [40, 0])}px)`
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  backgroundColor: chSpring > 0.5 ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.05)',
                  border: `1.5px solid ${chSpring > 0.5 ? ACCENT : 'rgba(255,255,255,0.1)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transform: `scale(${scale})`
                }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    {ch.icon === 'phone' && <path d="M4 4C4 3.5 4.5 3 5 3h3l1.5 3.5-2 1.5C8.3 10.7 11.3 13.7 13 14.5l1.5-2 3.5 1.5v3c0 .5-.5 1-1 1C8 18 4 11 4 4Z" stroke={chSpring > 0.5 ? ACCENT : 'rgba(255,255,255,0.4)'} strokeWidth="1.5" fill="none" />}
                    {ch.icon === 'sms' && <><rect x="2" y="4" width="18" height="12" rx="3" stroke={chSpring > 0.5 ? ACCENT : 'rgba(255,255,255,0.4)'} strokeWidth="1.5" fill="none" /><path d="M7 10 H9 M11 10 H13" stroke={chSpring > 0.5 ? ACCENT : 'rgba(255,255,255,0.4)'} strokeWidth="1.5" strokeLinecap="round" /></>}
                    {ch.icon === 'whatsapp' && <><circle cx="11" cy="11" r="9" stroke={chSpring > 0.5 ? ACCENT : 'rgba(255,255,255,0.4)'} strokeWidth="1.5" fill="none" /><path d="M7 14.5 C7 14.5 8.5 16 11 16 C14 16 16 14 16 11 C16 8 14 6 11 6 C8 6 6 8 6 11 C6 12.3 6.5 13.5 7 14.5 L6 16 Z" stroke={chSpring > 0.5 ? ACCENT : 'rgba(255,255,255,0.4)'} strokeWidth="1.2" fill="none" /></>}
                    {ch.icon === 'imessage' && <><rect x="2" y="4" width="18" height="13" rx="4" stroke={chSpring > 0.5 ? ACCENT : 'rgba(255,255,255,0.4)'} strokeWidth="1.5" fill="none" /><path d="M7 17 L9 14" stroke={chSpring > 0.5 ? ACCENT : 'rgba(255,255,255,0.4)'} strokeWidth="1.5" strokeLinecap="round" /></>}
                    {ch.icon === 'messenger' && <><circle cx="11" cy="11" r="9" stroke={chSpring > 0.5 ? ACCENT : 'rgba(255,255,255,0.4)'} strokeWidth="1.5" fill="none" /><path d="M6 14 L8 10 L11 12 L14 8 L16 12 L11 15 Z" stroke={chSpring > 0.5 ? ACCENT : 'rgba(255,255,255,0.4)'} strokeWidth="1.2" fill="none" /></>}
                  </svg>
                </div>
                <span style={{ color: chSpring > 0.5 ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.35)', fontSize: 14, fontWeight: 600 }}>{ch.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ================== SCENE B: Speed (240-380) ==================
const SceneB = ({ frame, fps }: { frame: number; fps: number }) => {
  const localFrame = frame - 240;
  const fadeIn = interpolate(localFrame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Arc progress
  const arcProgress = interpolate(localFrame, [15, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOp = interpolate(localFrame, [55, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Bar widths
  const competitorBar = interpolate(localFrame, [70, 110], [0, 280], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ourBar = interpolate(localFrame, [80, 105], [0, 30], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Arc for circle timer
  const r = 130;
  const circumference = 2 * Math.PI * r;
  const arcLen = circumference * arcProgress * 0.75; // 270 degrees

  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, opacity: fadeIn, gap: 40 }}>
      <div style={{ fontSize: 14, letterSpacing: '0.2em', color: ACCENT, fontWeight: 700, textTransform: 'uppercase' }}>Speed to Lead</div>
      <div style={{ position: 'relative', width: 300, height: 300 }}>
        <svg width="300" height="300" viewBox="0 0 300 300">
          <circle cx="150" cy="150" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="16" />
          <circle
            cx="150" cy="150" r={r}
            fill="none"
            stroke={ACCENT}
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={`${arcLen} ${circumference}`}
            transform="rotate(-225 150 150)"
            style={{ filter: 'drop-shadow(0 0 8px rgba(59,130,246,0.6))' }}
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: ACCENT, fontSize: 36, fontWeight: 900, lineHeight: 1, opacity: labelOp }}>&lt;10</span>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, fontWeight: 600, opacity: labelOp }}>SECONDS</span>
        </div>
      </div>

      {/* Comparison bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 600 }}>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, fontWeight: 600 }}>Industry Average</span>
            <span style={{ color: 'rgba(255,100,100,0.8)', fontSize: 14, fontWeight: 700 }}>4+ hours</span>
          </div>
          <div style={{ height: 16, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 8 }}>
            <div style={{ height: '100%', width: competitorBar, backgroundColor: 'rgba(239,68,68,0.5)', borderRadius: 8, maxWidth: '100%' }} />
          </div>
        </div>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, fontWeight: 600 }}>SystemPros</span>
            <span style={{ color: ACCENT, fontSize: 14, fontWeight: 700 }}>&lt; 10 seconds</span>
          </div>
          <div style={{ height: 16, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 8 }}>
            <div style={{ height: '100%', width: ourBar, backgroundColor: ACCENT, borderRadius: 8, boxShadow: '0 0 12px rgba(59,130,246,0.5)' }} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ================== SCENE C: Pipeline (380-560) ==================
const SceneC = ({ frame, fps }: { frame: number; fps: number }) => {
  const localFrame = frame - 380;
  const fadeIn = interpolate(localFrame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const stages = ['Ad Click', 'AI Detects', 'Multi-Channel', 'Conversation', 'BOOKED'];
  const subtextOp = interpolate(localFrame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, opacity: fadeIn, gap: 50 }}>
      <div style={{ fontSize: 14, letterSpacing: '0.2em', color: ACCENT, fontWeight: 700, textTransform: 'uppercase' }}>The Pipeline</div>
      <div style={{ display: 'flex', alignItems: 'center', width: 940 }}>
        {stages.map((stage, i) => {
          const stageSpring = spring({ frame: localFrame - i * 18, fps, config: { damping: 160 } });
          const isLast = i === stages.length - 1;
          const connDraw = i < stages.length - 1
            ? interpolate(localFrame, [i * 18 + 20, i * 18 + 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
            : 0;

          return (
            <div key={stage} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 110, height: 70, borderRadius: 12,
                  border: `2px solid ${isLast ? '#22c55e' : stageSpring > 0.5 ? ACCENT : 'rgba(255,255,255,0.1)'}`,
                  backgroundColor: isLast ? 'rgba(34,197,94,0.1)' : stageSpring > 0.5 ? 'rgba(59,130,246,0.12)' : 'rgba(255,255,255,0.03)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: stageSpring,
                  transform: `scale(${interpolate(stageSpring, [0, 1], [0.6, 1])})`,
                  boxShadow: isLast && stageSpring > 0.5 ? '0 0 20px rgba(34,197,94,0.3)' : stageSpring > 0.5 ? '0 0 20px rgba(59,130,246,0.2)' : 'none'
                }}>
                  <span style={{ color: isLast ? '#22c55e' : stageSpring > 0.5 ? '#FFF' : 'rgba(255,255,255,0.3)', fontSize: 13, fontWeight: 700, textAlign: 'center', padding: '0 8px' }}>{stage}</span>
                </div>
              </div>
              {!isLast && (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="40" height="20" viewBox="0 0 40 20">
                    <line x1="0" y1="10" x2={40 * connDraw} y2="10" stroke={ACCENT} strokeWidth="2" strokeDasharray="40" strokeDashoffset={40 * (1 - connDraw)} />
                    {connDraw > 0.8 && <path d="M32 5 L40 10 L32 15" stroke={ACCENT} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ opacity: subtextOp, color: 'rgba(255,255,255,0.45)', fontSize: 16, letterSpacing: '0.05em' }}>
        Scales with every dollar you spend
      </div>
    </AbsoluteFill>
  );
};

export const LeadReactor = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const globalFadeOut = interpolate(frame, [570, 600], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ opacity: globalFadeOut }}>
      <Background frame={frame} />
      <Sequence from={0} durationInFrames={90}><Intro frame={frame} fps={fps} /></Sequence>
      <Sequence from={90} durationInFrames={150}><SceneA frame={frame} fps={fps} /></Sequence>
      <Sequence from={240} durationInFrames={140}><SceneB frame={frame} fps={fps} /></Sequence>
      <Sequence from={380} durationInFrames={180}><SceneC frame={frame} fps={fps} /></Sequence>
      <Brand frame={frame} />
    </AbsoluteFill>
  );
};
