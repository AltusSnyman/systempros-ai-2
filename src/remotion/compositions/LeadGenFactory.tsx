import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from 'remotion';

const ACCENT = '#3B82F6';
const RED = '#EF4444';
const GREEN = '#22C55E';
const FONT = "'Inter', system-ui, -apple-system, sans-serif";
const W = 1080;
const H = 1080;
const CX = W / 2;
const CY = H / 2;

// Hexagon polygon points
const hexPoints = (cx: number, cy: number, r: number) => {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 180) * (60 * i - 30);
    pts.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`);
  }
  return pts.join(' ');
};

// Animated flowing dot along a line
const FlowDot = ({
  x1, y1, x2, y2, phase, frame, opacity,
}: {
  x1: number; y1: number; x2: number; y2: number;
  phase: number; frame: number; opacity: number;
}) => {
  const t = ((frame / 60 + phase) % 1);
  const x = x1 + (x2 - x1) * t;
  const y = y1 + (y2 - y1) * t;
  return <circle cx={x} cy={y} r={6} fill={ACCENT} opacity={opacity * 0.9} />;
};

export const LeadGenFactory = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Global fade
  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const fadeOut = interpolate(frame, [570, 600], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const globalOpacity = Math.min(fadeIn, fadeOut);

  // BG pulse
  const bgPulse = Math.sin(frame / 50) * 0.04 + 0.14;

  // ── INTRO (0-90) ────────────────────────────────────────────────────────────
  const catOpacity = interpolate(frame, [10, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleSpring = spring({ frame: frame - 20, fps, config: { damping: 200 } });
  const titleY = interpolate(titleSpring, [0, 1], [50, 0]);
  const lineW = interpolate(frame, [35, 85], [0, 200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subtitleOp = interpolate(frame, [80, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // ── SCENE A: FACTORY SYSTEM (90-300) ───────────────────────────────────────
  // Three input nodes: top-left, left, bottom-left
  // Hub: center-right
  // Output: far right

  // Node positions (within 1080x1080 canvas)
  const HUB = { x: CX + 60, y: CY };
  const NODE_VISITOR = { x: 160, y: 320 };
  const NODE_VOICE = { x: 160, y: 540 };
  const NODE_FORM = { x: 160, y: 760 };
  const NODE_OUTPUT = { x: 920, y: CY };

  const visitorSpring = spring({ frame: frame - 90, fps, config: { damping: 200 } });
  const voiceSpring = spring({ frame: frame - 120, fps, config: { damping: 200 } });
  const formSpring = spring({ frame: frame - 150, fps, config: { damping: 200 } });
  const hubSpring = spring({ frame: frame - 195, fps, config: { damping: 200 } });

  // Lines draw from input nodes to hub
  const lineVisitorProgress = interpolate(frame, [220, 280], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const lineVoiceProgress = interpolate(frame, [230, 290], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const lineFormProgress = interpolate(frame, [240, 300], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });

  // Dots flow after lines drawn
  const dotsActive = frame > 290;

  // ── SCENE B: OUTPUT (300-490) ───────────────────────────────────────────────
  const outputSpring = spring({ frame: frame - 310, fps, config: { damping: 200 } });
  const outputLineProgress = interpolate(frame, [330, 390], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const outputDotsActive = frame > 385;

  // Hub spin (subtle)
  const hubRotation = interpolate(frame, [195, 600], [0, 360], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Stats
  const stat1Op = spring({ frame: frame - 390, fps, config: { damping: 200 } });
  const stat2Op = spring({ frame: frame - 420, fps, config: { damping: 200 } });
  const stat3Op = spring({ frame: frame - 450, fps, config: { damping: 200 } });

  // ── SCENE C: BEFORE/AFTER (490-560) ────────────────────────────────────────
  const sceneC = interpolate(frame, [490, 530], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const oldBarH = interpolate(frame, [500, 550], [0, 55], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const newBarH = interpolate(frame, [510, 560], [0, 220], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const brandOp = interpolate(frame, [545, 575], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Intro visibility: fade out at scene A start
  const introOp = interpolate(frame, [75, 110], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sceneAOp = interpolate(frame, [80, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const renderInputNode = (
    node: { x: number; y: number },
    sp: number,
    label: string,
    sublabel: string,
    iconPath: string,
    color: string,
  ) => {
    const scale = interpolate(sp, [0, 1], [0.5, 1]);
    const op = interpolate(sp, [0, 1], [0, 1]);
    return (
      <g transform={`translate(${node.x}, ${node.y})`} opacity={op}>
        <g transform={`scale(${scale})`}>
          {/* Node circle */}
          <circle r={60} fill={`${color}18`} stroke={color} strokeWidth={2} />
          {/* Icon */}
          <svg x={-16} y={-24} width={32} height={32} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d={iconPath} />
          </svg>
          {/* Label */}
          <text x={0} y={36} textAnchor="middle" fill="white" fontSize={13} fontWeight={700} fontFamily={FONT}>{label}</text>
          <text x={0} y={52} textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize={11} fontFamily={FONT}>{sublabel}</text>
        </g>
      </g>
    );
  };

  const renderAnimatedLine = (
    x1: number, y1: number, x2: number, y2: number, progress: number, color: string
  ) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    return (
      <line
        x1={x1} y1={y1}
        x2={x1 + dx * progress}
        y2={y1 + dy * progress}
        stroke={color}
        strokeWidth={2}
        strokeDasharray="6 4"
        opacity={0.6}
      />
    );
  };

  return (
    <AbsoluteFill style={{ backgroundColor: '#0A0A0A', opacity: globalOpacity, fontFamily: FONT }}>

      {/* Radial glow */}
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 50%, rgba(59,130,246,${bgPulse}) 0%, transparent 65%)` }} />

      {/* Grid lines */}
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: `${(i + 1) * (100 / 9)}%`,
          left: 0, right: 0, height: 1,
          backgroundColor: 'rgba(255,255,255,0.03)',
        }} />
      ))}

      {/* ── INTRO ──────────────────────────────────────────────────────────────── */}
      <AbsoluteFill style={{ opacity: introOp, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, opacity: catOpacity }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: ACCENT }} />
          <span style={{ color: ACCENT, fontSize: 13, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' as const }}>Website Conversion</span>
        </div>
        <div style={{ transform: `translateY(${titleY}px)`, opacity: titleSpring, marginBottom: 18 }}>
          <div style={{ color: '#fff', fontSize: 88, fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.03em' }}>THE HIDDEN</div>
          <div style={{ color: '#fff', fontSize: 88, fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.03em' }}>FACTORY</div>
        </div>
        <div style={{ width: lineW, height: 4, backgroundColor: ACCENT, borderRadius: 2, marginBottom: 24 }} />
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 22, fontWeight: 400, lineHeight: 1.5, margin: 0, opacity: subtitleOp, maxWidth: 680 }}>
          Your 24/7 automated lead processing system — invisible to visitors, unstoppable for your pipeline.
        </p>
      </AbsoluteFill>

      {/* ── SCENE A + B: FACTORY DIAGRAM ───────────────────────────────────────── */}
      <AbsoluteFill style={{ opacity: sceneAOp }}>
        <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>

          {/* ── Connecting lines: inputs → hub ── */}
          {renderAnimatedLine(NODE_VISITOR.x + 60, NODE_VISITOR.y, HUB.x - 75, HUB.y - 80, lineVisitorProgress, ACCENT)}
          {renderAnimatedLine(NODE_VOICE.x + 60, NODE_VOICE.y, HUB.x - 80, HUB.y, lineVoiceProgress, '#8B5CF6')}
          {renderAnimatedLine(NODE_FORM.x + 60, NODE_FORM.y, HUB.x - 75, HUB.y + 80, lineFormProgress, '#10B981')}

          {/* ── Flowing dots: inputs → hub ── */}
          {dotsActive && [0, 0.35, 0.7].map((ph, i) => (
            <FlowDot key={`v${i}`} x1={NODE_VISITOR.x + 60} y1={NODE_VISITOR.y} x2={HUB.x - 75} y2={HUB.y - 80} phase={ph} frame={frame} opacity={lineVisitorProgress} />
          ))}
          {dotsActive && [0.15, 0.5, 0.85].map((ph, i) => (
            <FlowDot key={`vo${i}`} x1={NODE_VOICE.x + 60} y1={NODE_VOICE.y} x2={HUB.x - 80} y2={HUB.y} phase={ph} frame={frame} opacity={lineVoiceProgress} />
          ))}
          {dotsActive && [0.25, 0.6, 0.95].map((ph, i) => (
            <FlowDot key={`f${i}`} x1={NODE_FORM.x + 60} y1={NODE_FORM.y} x2={HUB.x - 75} y2={HUB.y + 80} phase={ph} frame={frame} opacity={lineFormProgress} />
          ))}

          {/* ── Hub → Output line ── */}
          {renderAnimatedLine(HUB.x + 75, HUB.y, NODE_OUTPUT.x - 60, NODE_OUTPUT.y, outputLineProgress, ACCENT)}

          {/* Output flowing dots */}
          {outputDotsActive && [0, 0.4, 0.8].map((ph, i) => (
            <FlowDot key={`out${i}`} x1={HUB.x + 75} y1={HUB.y} x2={NODE_OUTPUT.x - 60} y2={NODE_OUTPUT.y} phase={ph} frame={frame} opacity={outputLineProgress} />
          ))}

          {/* ── Input Nodes ── */}
          {renderInputNode(NODE_VISITOR, visitorSpring, 'VISITOR', 'Website Traffic',
            'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M12 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', '#60A5FA')}
          {renderInputNode(NODE_VOICE, voiceSpring, 'VOICE AI', 'Click-to-Talk Widget',
            'M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2', '#A78BFA')}
          {renderInputNode(NODE_FORM, formSpring, 'SMART FORM', 'Multi-Step Qualify',
            'M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11', '#34D399')}

          {/* ── Central Hub Hexagon ── */}
          <g transform={`translate(${HUB.x}, ${HUB.y})`} opacity={interpolate(hubSpring, [0, 1], [0, 1])}>
            <g transform={`scale(${interpolate(hubSpring, [0, 1], [0.5, 1])})`}>
              {/* Outer glow ring */}
              <circle r={92} fill="none" stroke={`rgba(59,130,246,0.2)`} strokeWidth={1} />
              {/* Hexagon */}
              <polygon
                points={hexPoints(0, 0, 78)}
                fill="rgba(59,130,246,0.12)"
                stroke={ACCENT}
                strokeWidth={2.5}
              />
              {/* Spinning inner hex */}
              <g transform={`rotate(${hubRotation})`}>
                <polygon
                  points={hexPoints(0, 0, 52)}
                  fill="none"
                  stroke="rgba(59,130,246,0.35)"
                  strokeWidth={1.5}
                  strokeDasharray="8 4"
                />
              </g>
              {/* Gear icon center */}
              <svg x={-20} y={-32} width={40} height={40} viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <circle cx={12} cy={12} r={3} />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              <text y={30} textAnchor="middle" fill={ACCENT} fontSize={12} fontWeight={800} fontFamily={FONT} letterSpacing="0.12em">LEAD MACHINE</text>
            </g>
          </g>

          {/* ── Output Node: BOOKED MEETING ── */}
          <g transform={`translate(${NODE_OUTPUT.x}, ${NODE_OUTPUT.y})`} opacity={interpolate(outputSpring, [0, 1], [0, 1])}>
            <g transform={`scale(${interpolate(outputSpring, [0, 1], [0.5, 1])})`}>
              <circle r={62} fill="rgba(34,197,94,0.12)" stroke={GREEN} strokeWidth={2.5} />
              {/* Calendar icon */}
              <svg x={-18} y={-28} width={36} height={36} viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <rect x={3} y={4} width={18} height={18} rx={2} ry={2} />
                <line x1={16} y1={2} x2={16} y2={6} />
                <line x1={8} y1={2} x2={8} y2={6} />
                <line x1={3} y1={10} x2={21} y2={10} />
                <path d="M8 14l3 3 5-5" />
              </svg>
              <text y={30} textAnchor="middle" fill={GREEN} fontSize={12} fontWeight={800} fontFamily={FONT}>BOOKED</text>
              <text y={46} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize={10} fontFamily={FONT}>Meeting Confirmed</text>
            </g>
          </g>

        </svg>

        {/* ── Stats below diagram ── */}
        <div style={{
          position: 'absolute',
          bottom: 130,
          left: 0, right: 0,
          display: 'flex',
          justifyContent: 'center',
          gap: 48,
        }}>
          {[
            { label: 'Response Time', value: '< 2s', op: stat1Op },
            { label: 'Availability', value: '24/7', op: stat2Op },
            { label: 'Lead Handling', value: '100% Auto', op: stat3Op },
          ].map(({ label, value, op }) => (
            <div key={label} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              opacity: interpolate(op, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(op, [0, 1], [16, 0])}px)`,
            }}>
              <span style={{ color: ACCENT, fontSize: 28, fontWeight: 900, letterSpacing: '-0.02em' }}>{value}</span>
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>{label}</span>
            </div>
          ))}
        </div>

        {/* ── Section label ── */}
        <div style={{
          position: 'absolute',
          top: 54,
          left: 0, right: 0,
          display: 'flex',
          justifyContent: 'center',
          opacity: interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '8px 20px',
            borderRadius: 100,
            border: `1px solid rgba(59,130,246,0.3)`,
            backgroundColor: 'rgba(59,130,246,0.06)',
          }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: ACCENT }} />
            <span style={{ color: ACCENT, fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' as const }}>
              The Hidden Factory — Automated Lead Flow
            </span>
          </div>
        </div>
      </AbsoluteFill>

      {/* ── SCENE C: BEFORE/AFTER BARS ──────────────────────────────────────────── */}
      <AbsoluteFill style={{
        opacity: sceneC,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 100,
      }}>
        <div style={{ color: '#fff', fontSize: 40, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 12, textAlign: 'center' }}>
          Monthly Leads: Before vs After
        </div>
        <div style={{ width: 180, height: 4, backgroundColor: ACCENT, borderRadius: 2, marginBottom: 60 }} />

        {/* Bar chart */}
        <div style={{ display: 'flex', gap: 100, alignItems: 'flex-end', height: 260 }}>
          {/* Before */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#6B7280' }}>3</div>
            <div style={{ width: 100, height: oldBarH, backgroundColor: '#374151', borderRadius: '6px 6px 0 0' }} />
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, fontWeight: 600, textAlign: 'center' as const }}>
              BEFORE<br />(Brochure Site)
            </div>
          </div>
          {/* After */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: ACCENT }}>47</div>
            <div style={{ width: 100, height: newBarH, background: `linear-gradient(to top, ${ACCENT}, rgba(59,130,246,0.5))`, borderRadius: '6px 6px 0 0', boxShadow: `0 0 30px rgba(59,130,246,0.4)` }} />
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: 600, textAlign: 'center' as const }}>
              AFTER<br />(Lead Machine)
            </div>
          </div>
        </div>

        <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', gap: 12, opacity: interpolate(frame, [545, 565], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: GREEN }} />
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, fontWeight: 500 }}>+1,467% more booked meetings per month</span>
        </div>
      </AbsoluteFill>

      {/* ── BRAND WATERMARK ─────────────────────────────────────────────────────── */}
      <div style={{
        position: 'absolute',
        bottom: 38, right: 58,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        opacity: brandOp,
      }}>
        <div style={{ width: 16, height: 16, borderRadius: 3, backgroundColor: ACCENT }} />
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, fontWeight: 600, letterSpacing: '0.14em' }}>SYSTEMPROS.AI</span>
      </div>

    </AbsoluteFill>
  );
};
