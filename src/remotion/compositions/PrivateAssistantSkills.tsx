import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';

const ACCENT = '#3B82F6';
const GREEN = '#22C55E';
const PURPLE = '#8B5CF6';
const ORANGE = '#F97316';
const YELLOW = '#EAB308';
const BG = '#0A0A0A';
const FONT = "'Inter', system-ui, -apple-system, sans-serif";
const W = 1080;

const Background = ({ frame }: { frame: number }) => {
  const glow = interpolate(Math.sin(frame / 40), [-1, 1], [0.08, 0.18]);
  return (
    <>
      <AbsoluteFill style={{ backgroundColor: BG }} />
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 10%, rgba(139,92,246,${glow}) 0%, transparent 55%)` }} />
      <div style={{ position: 'absolute', top: 44, right: 44, width: 50, height: 50, borderTop: `2px solid rgba(139,92,246,0.3)`, borderRight: `2px solid rgba(139,92,246,0.3)` }} />
      <div style={{ position: 'absolute', bottom: 44, left: 44, width: 50, height: 50, borderBottom: `2px solid rgba(59,130,246,0.3)`, borderLeft: `2px solid rgba(59,130,246,0.3)` }} />
    </>
  );
};

const SKILL_PACKS = [
  {
    name: 'Executive Pack',
    color: ACCENT,
    icon: '💼',
    skills: ['Summarize Zoom calls', 'Draft emails', 'Schedule meetings'],
  },
  {
    name: 'Knowledge Pack',
    color: PURPLE,
    icon: '🧠',
    skills: ['Query your Obsidian notes', 'Search Notion databases', 'Answer from YOUR data'],
  },
  {
    name: 'Research Pack',
    color: GREEN,
    icon: '🔍',
    skills: ['Real-time web search', 'Competitor analysis', 'Pricing intelligence'],
  },
  {
    name: 'Creative Pack',
    color: ORANGE,
    icon: '🎨',
    skills: ['Rewrite in your voice', 'LinkedIn posts', 'Video concept briefs'],
  },
];

// ── INTRO (0-90) ──────────────────────────────────────────────────────────────
const Intro = ({ frame, fps }: { frame: number; fps: number }) => {
  const catOp = interpolate(frame, [5, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleSp = spring({ frame: frame - 15, fps, config: { damping: 180 } });
  const titleY = interpolate(titleSp, [0, 1], [60, 0]);

  // Counter animation
  const counterVal = Math.floor(interpolate(frame, [25, 80], [0, 3000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const lineW = interpolate(frame, [35, 80], [0, 200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOp = interpolate(frame, [60, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 80, fontFamily: FONT }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, opacity: catOp }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: PURPLE }} />
        <span style={{ color: PURPLE, fontSize: 13, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' }}>ClawHub Marketplace</span>
      </div>
      <div style={{ transform: `translateY(${titleY}px)`, opacity: titleSp, marginBottom: 20 }}>
        <div style={{ color: PURPLE, fontSize: 100, fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.04em' }}>{counterVal.toLocaleString()}+</div>
        <div style={{ color: '#FFF', fontSize: 72, fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.03em' }}>SKILLS</div>
      </div>
      <div style={{ width: lineW, height: 4, backgroundColor: PURPLE, borderRadius: 2, marginBottom: 24 }} />
      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 22, fontWeight: 400, lineHeight: 1.5, margin: 0, opacity: subOp }}>
        Hand-picked and installed for your workflow
      </p>
    </AbsoluteFill>
  );
};

// ── SCENE A: Skill Pack Grid (90-300) ─────────────────────────────────────────
const SceneA = ({ frame, fps }: { frame: number; fps: number }) => {
  const localFrame = frame - 90;
  const fadeIn = interpolate(localFrame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const GRID_COLS = 2;
  const CARD_W = 390;
  const CARD_H = 200;
  const GAP = 28;
  const startX = (W - (GRID_COLS * CARD_W + (GRID_COLS - 1) * GAP)) / 2;
  const startY = 160;

  return (
    <AbsoluteFill style={{ fontFamily: FONT, opacity: fadeIn }}>
      {/* Header */}
      <div style={{ position: 'absolute', top: 65, left: 0, right: 0, textAlign: 'center' }}>
        <div style={{ color: PURPLE, fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 6 }}>The Power Packs</div>
        <div style={{ color: '#FFF', fontSize: 38, fontWeight: 900, letterSpacing: '-0.02em' }}>
          What People <span style={{ color: PURPLE }}>Actually Want</span>
        </div>
      </div>

      {/* Cards grid */}
      {SKILL_PACKS.map((pack, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = startX + col * (CARD_W + GAP);
        const y = startY + row * (CARD_H + GAP);
        const cardSp = spring({ frame: localFrame - (20 + i * 18), fps, config: { damping: 160 } });
        const cardY = interpolate(cardSp, [0, 1], [40, 0]);

        return (
          <div
            key={pack.name}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: CARD_W,
              height: CARD_H,
              opacity: cardSp,
              transform: `translateY(${cardY}px)`,
              padding: '24px 26px',
              borderRadius: 16,
              border: `1.5px solid ${pack.color}30`,
              backgroundColor: `${pack.color}0A`,
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 22 }}>{pack.icon}</span>
              <div style={{ color: pack.color, fontSize: 15, fontWeight: 800, letterSpacing: '0.02em' }}>{pack.name}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {pack.skills.map((skill) => (
                <div key={skill} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: pack.color, flexShrink: 0 }} />
                  <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, fontWeight: 400 }}>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Bottom tag */}
      <div style={{
        position: 'absolute', bottom: 72, left: 0, right: 0, textAlign: 'center',
        opacity: interpolate(localFrame, [110, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
      }}>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, fontWeight: 500 }}>
          + 2,950 more skills on ClawHub
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ── SCENE B: Chat Demo — Knowledge Pack (300-470) ─────────────────────────────
const SceneB = ({ frame, fps }: { frame: number; fps: number }) => {
  const localFrame = frame - 300;
  const fadeIn = interpolate(localFrame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const msg1Op = interpolate(localFrame, [20, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const typingOp = interpolate(localFrame, [50, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const msg2Op = interpolate(localFrame, [80, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const typingVisible = localFrame > 50 && localFrame < 80;
  const dotPhase = (localFrame % 18) / 18;

  const msg3Op = interpolate(localFrame, [110, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const msg4Op = interpolate(localFrame, [140, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const footerOp = interpolate(localFrame, [130, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const chatSp = spring({ frame: localFrame, fps, config: { damping: 160 } });

  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, opacity: fadeIn, gap: 28 }}>
      <div style={{ color: PURPLE, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700 }}>Knowledge Pack — Live Demo</div>
      <div style={{ color: '#FFF', fontSize: 28, fontWeight: 800, textAlign: 'center' }}>
        Your AI Knows <span style={{ color: PURPLE }}>Your Own Notes</span>
      </div>

      {/* Chat window */}
      <div style={{
        width: 580,
        borderRadius: 20,
        border: `1.5px solid rgba(139,92,246,0.3)`,
        backgroundColor: 'rgba(255,255,255,0.02)',
        overflow: 'hidden',
        opacity: chatSp,
        transform: `translateY(${interpolate(chatSp, [0, 1], [30, 0])}px)`,
      }}>
        {/* Header */}
        <div style={{ padding: '14px 22px', backgroundColor: 'rgba(139,92,246,0.12)', borderBottom: '1px solid rgba(139,92,246,0.2)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', backgroundColor: PURPLE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#FFF', fontSize: 13, fontWeight: 800 }}>AI</span>
          </div>
          <div>
            <div style={{ color: '#FFF', fontSize: 14, fontWeight: 700 }}>Private Assistant</div>
            <div style={{ color: GREEN, fontSize: 11, fontWeight: 500 }}>● Connected to Obsidian</div>
          </div>
        </div>

        {/* Messages */}
        <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 14, minHeight: 240 }}>
          {/* User */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', opacity: msg1Op }}>
            <div style={{ backgroundColor: PURPLE, borderRadius: '14px 14px 4px 14px', padding: '10px 16px', maxWidth: '78%' }}>
              <span style={{ color: '#FFF', fontSize: 14 }}>What did I decide about the marketing budget last October?</span>
            </div>
          </div>

          {/* Typing */}
          {typingVisible && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', opacity: typingOp }}>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '14px 14px 14px 4px', padding: '10px 16px', display: 'flex', gap: 5, alignItems: 'center' }}>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, marginRight: 4 }}>Searching Obsidian...</span>
                {[0, 1, 2].map((di) => (
                  <div key={di} style={{
                    width: 7, height: 7, borderRadius: '50%', backgroundColor: PURPLE,
                    opacity: Math.abs(Math.sin((dotPhase + di * 0.33) * Math.PI)),
                  }} />
                ))}
              </div>
            </div>
          )}

          {/* AI response */}
          <div style={{ display: 'flex', justifyContent: 'flex-start', opacity: msg2Op }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: '14px 14px 14px 4px', padding: '10px 16px', maxWidth: '82%' }}>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, lineHeight: 1.55 }}>
                📓 From your Oct 14 meeting note: You approved $8,500/mo for Meta ads and paused Google. Next review was set for Dec 1.
              </span>
            </div>
          </div>

          {/* User follow-up */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', opacity: msg3Op }}>
            <div style={{ backgroundColor: PURPLE, borderRadius: '14px 14px 4px 14px', padding: '10px 16px', maxWidth: '70%' }}>
              <span style={{ color: '#FFF', fontSize: 14 }}>Great. Draft a summary email for my team.</span>
            </div>
          </div>

          {/* AI typing again */}
          <div style={{ display: 'flex', justifyContent: 'flex-start', opacity: msg4Op }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: '14px 14px 14px 4px', padding: '10px 16px' }}>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>✅ Draft ready. Want me to send it now?</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, opacity: footerOp }}>
        Answers from YOUR notes. Your data never leaves your device.
      </div>
    </AbsoluteFill>
  );
};

// ── SCENE C: CRM Whisperer (470-590) ──────────────────────────────────────────
const SceneC = ({ frame, fps }: { frame: number; fps: number }) => {
  const localFrame = frame - 470;
  const fadeIn = interpolate(localFrame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const msgOp = interpolate(localFrame, [20, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowOp = interpolate(localFrame, [55, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowW = interpolate(localFrame, [55, 85], [0, 320], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const crmOp = interpolate(localFrame, [90, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const checkOp = interpolate(localFrame, [110, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const footerOp = interpolate(localFrame, [120, 145], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const cardSp = spring({ frame: localFrame, fps, config: { damping: 160 } });

  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, opacity: fadeIn, gap: 24 }}>
      <div style={{ color: GREEN, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700 }}>CRM Whisperer Skill</div>
      <div style={{ color: '#FFF', fontSize: 34, fontWeight: 900, textAlign: 'center', letterSpacing: '-0.02em' }}>
        Text Your AI. <span style={{ color: GREEN }}>CRM Updates Itself.</span>
      </div>

      {/* Flow diagram */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginTop: 12, opacity: cardSp, transform: `translateY(${interpolate(cardSp, [0, 1], [30, 0])}px)` }}>
        {/* WhatsApp bubble */}
        <div style={{
          padding: '18px 22px',
          borderRadius: 16,
          border: `1.5px solid #25D36640`,
          backgroundColor: '#25D3660A',
          maxWidth: 320,
          opacity: msgOp,
        }}>
          <div style={{ color: '#25D366', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>WhatsApp → Your AI</div>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, lineHeight: 1.6 }}>
            "Met Altus today, interested in $10k package, follow up next Monday"
          </div>
        </div>

        {/* Arrow */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 100, gap: 4, opacity: arrowOp }}>
          <div style={{ width: arrowW, height: 2, backgroundColor: GREEN, maxWidth: 80 }} />
          <div style={{ color: GREEN, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em' }}>AUTO</div>
        </div>

        {/* CRM card */}
        <div style={{
          padding: '18px 22px',
          borderRadius: 16,
          border: `1.5px solid ${ACCENT}40`,
          backgroundColor: `${ACCENT}0A`,
          maxWidth: 320,
          opacity: crmOp,
        }}>
          <div style={{ color: ACCENT, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10 }}>CRM Updated</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { label: 'Contact', val: 'Altus' },
              { label: 'Deal Value', val: '$10,000' },
              { label: 'Follow-up', val: 'Monday' },
              { label: 'Status', val: '🟢 Interested' },
            ].map((row) => (
              <div key={row.label} style={{ display: 'flex', gap: 8 }}>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, width: 72 }}>{row.label}:</span>
                <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: 600 }}>{row.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Checkmark */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, opacity: checkOp,
        padding: '12px 24px', borderRadius: 100, border: `1px solid ${GREEN}35`, backgroundColor: `${GREEN}0A`,
      }}>
        <div style={{ width: 18, height: 18, borderRadius: '50%', backgroundColor: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontSize: 11, fontWeight: 900 }}>✓</span>
        </div>
        <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: 600 }}>Zero manual data entry. Ever.</span>
      </div>

      <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, opacity: footerOp }}>
        Speed-to-lead logic embedded in every interaction
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
export const PrivateAssistantSkills = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const globalFadeOut = interpolate(frame, [580, 600], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const introOp = interpolate(frame, [78, 100], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sceneAOp = interpolate(frame, [85, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sceneAExit = interpolate(frame, [290, 315], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sceneBOp = interpolate(frame, [295, 320], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sceneBExit = interpolate(frame, [458, 482], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sceneCOp = interpolate(frame, [462, 485], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

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

export default PrivateAssistantSkills;
