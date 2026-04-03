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
const ORANGE = '#F97316';
const YELLOW = '#EAB308';
const GREEN = '#22C55E';
const FONT = "'Inter', system-ui, -apple-system, sans-serif";
const W = 1080;

export const LeadReactorSpeed = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const fadeOut = interpolate(frame, [565, 600], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const globalOpacity = Math.min(fadeIn, fadeOut);

  // ── INTRO (0-90) ────────────────────────────────────────────────────────────
  const introOp = interpolate(frame, [70, 100], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const catOp = interpolate(frame, [10, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleSp = spring({ frame: frame - 20, fps, config: { damping: 200 } });
  const lineW = interpolate(frame, [35, 90], [0, 200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOp = interpolate(frame, [75, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bgPulse = Math.sin(frame / 45) * 0.03 + 0.14;

  // ── SCENE A: DEATH ZONE TIMELINE (90-290) ───────────────────────────────────
  const sceneAOp = interpolate(frame, [85, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sceneBOp = interpolate(frame, [285, 315], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sceneAExit = interpolate(frame, [280, 310], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Death zone bar segments appear
  const barW = 840; // total bar width
  const barX = (W - barW) / 2;
  const barY = 420;
  const barH = 60;

  // Zones: 0-10s, 10s-5min, 5-30min, 30min+
  // Widths proportional (visual, not actual time)
  const zones = [
    { label: '< 10s', sublabel: 'SYSTEMSPROS', pct: 0.08, color: ACCENT },
    { label: '10s – 5min', sublabel: 'DANGER ZONE', pct: 0.22, color: YELLOW },
    { label: '5 – 30min', sublabel: 'CRITICAL', pct: 0.32, color: ORANGE },
    { label: '30min+', sublabel: 'DEAD ZONE', pct: 0.38, color: RED },
  ];

  const barReveal = interpolate(frame, [110, 200], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });

  // Conversion rate bars
  const convRates = [100, 35, 8, 2];
  const convBarMaxH = 200;
  const convBarW = 80;

  const convBarsReveal = zones.map((_, i) =>
    interpolate(frame, [180 + i * 20, 220 + i * 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) })
  );

  // "400% drop" label
  const dropLabelOp = interpolate(frame, [240, 270], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // ── SCENE B: SPEED COMPARISON (290-480) ────────────────────────────────────
  const competitorBarH = interpolate(frame, [310, 400], [0, 260], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const systemProsBarH = interpolate(frame, [310, 340], [0, 260], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });

  const compLabelOp = spring({ frame: frame - 395, fps, config: { damping: 200 } });
  const spLabelOp = spring({ frame: frame - 340, fps, config: { damping: 200 } });
  const sceneBExit = interpolate(frame, [470, 500], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Pulsing glow on SystemPros bar
  const glowPulse = Math.sin(frame / 15) * 0.2 + 0.5;

  // ── SCENE C: THE 10-SECOND SEQUENCE (480-560) ──────────────────────────────
  const sceneCOp = interpolate(frame, [475, 505], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const seqSteps = [
    { label: 'AD CLICKED', sublabel: 'T + 0s', color: ACCENT },
    { label: 'AI CALLS', sublabel: 'T + 3s', color: '#8B5CF6' },
    { label: 'QUALIFIED', sublabel: 'T + 8s', color: YELLOW },
    { label: 'BOOKED', sublabel: 'T + 10s', color: GREEN },
  ];
  const seqAnims = seqSteps.map((_, i) =>
    spring({ frame: frame - (490 + i * 18), fps, config: { damping: 200 } })
  );

  const connectorAnims = seqSteps.slice(0, -1).map((_, i) =>
    interpolate(frame, [496 + i * 18, 510 + i * 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );

  const brandOp = interpolate(frame, [548, 570], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0A0A0A', opacity: globalOpacity, fontFamily: FONT }}>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 20%, rgba(239,68,68,${bgPulse * 0.6}) 0%, rgba(59,130,246,${bgPulse * 0.4}) 40%, transparent 70%)` }} />
      {Array.from({ length: 7 }, (_, i) => (
        <div key={i} style={{ position: 'absolute', top: `${(i + 1) * (100 / 8)}%`, left: 0, right: 0, height: 1, backgroundColor: 'rgba(255,255,255,0.03)' }} />
      ))}

      {/* ── INTRO ──────────────────────────────────────────────────────────────── */}
      <AbsoluteFill style={{ opacity: introOp, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, opacity: catOp }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: RED }} />
          <span style={{ color: RED, fontSize: 13, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' as const }}>Speed to Lead</span>
        </div>
        <div style={{ transform: `translateY(${interpolate(titleSp, [0, 1], [50, 0])}px)`, opacity: titleSp, marginBottom: 18 }}>
          <div style={{ color: '#fff', fontSize: 80, fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.03em' }}>THE 5-MINUTE</div>
          <div style={{ color: RED, fontSize: 80, fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.03em' }}>DEATH ZONE</div>
        </div>
        <div style={{ width: lineW, height: 4, backgroundColor: RED, borderRadius: 2, marginBottom: 24 }} />
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 22, fontWeight: 400, lineHeight: 1.5, margin: 0, opacity: subOp, maxWidth: 680 }}>
          If you don't contact a Meta lead in under 5 minutes, your conversion probability drops by 400%.
        </p>
      </AbsoluteFill>

      {/* ── SCENE A: DEATH ZONE TIMELINE ───────────────────────────────────────── */}
      <AbsoluteFill style={{ opacity: Math.min(sceneAOp, sceneAExit) }}>

        {/* Section label */}
        <div style={{ position: 'absolute', top: 60, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: sceneAOp }}>
          <div style={{ padding: '8px 24px', borderRadius: 100, border: '1px solid rgba(239,68,68,0.3)', backgroundColor: 'rgba(239,68,68,0.06)' }}>
            <span style={{ color: RED, fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' as const }}>Response Time vs Conversion Rate</span>
          </div>
        </div>

        <svg width={W} height={1080} style={{ position: 'absolute', inset: 0 }}>

          {/* ── Colored zone bar ── */}
          {(() => {
            let xOffset = 0;
            return zones.map((zone, i) => {
              const zoneW = zone.pct * barW * barReveal;
              const fullZoneW = zone.pct * barW;
              const el = (
                <g key={i}>
                  <rect x={barX + xOffset} y={barY} width={zoneW} height={barH} fill={zone.color} opacity={0.85} rx={i === 0 ? 8 : 0} />
                  {barReveal > 0.95 && (
                    <>
                      <text x={barX + xOffset + fullZoneW / 2} y={barY - 16} textAnchor="middle" fill={zone.color} fontSize={13} fontWeight={700} fontFamily={FONT}>{zone.label}</text>
                      <text x={barX + xOffset + fullZoneW / 2} y={barY + barH + 22} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={11} fontFamily={FONT}>{zone.sublabel}</text>
                    </>
                  )}
                </g>
              );
              xOffset += fullZoneW;
              return el;
            });
          })()}

          {/* SystemPros marker */}
          {barReveal > 0.9 && (
            <g>
              <line x1={barX + zones[0].pct * barW} y1={barY - 40} x2={barX + zones[0].pct * barW} y2={barY + barH + 40} stroke={ACCENT} strokeWidth={2} strokeDasharray="5 3" opacity={0.8} />
              <circle cx={barX + zones[0].pct * barW} cy={barY - 50} r={8} fill={ACCENT} />
              <text x={barX + zones[0].pct * barW + 12} y={barY - 46} fill={ACCENT} fontSize={11} fontWeight={700} fontFamily={FONT}>SYSTEMSPROS RESPONSE</text>
            </g>
          )}

          {/* ── Conversion rate bars ── */}
          {zones.map((zone, i) => {
            const cx = barX + (zones.slice(0, i).reduce((a, z) => a + z.pct, 0) + zone.pct / 2) * barW;
            const convH = (convRates[i] / 100) * convBarMaxH * convBarsReveal[i];
            const convBarY = 740;
            return (
              <g key={`conv-${i}`}>
                <rect x={cx - convBarW / 2} y={convBarY - convH} width={convBarW} height={convH} fill={zone.color} opacity={0.75} rx={4} />
                <text x={cx} y={convBarY + 20} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize={12} fontFamily={FONT}>{convRates[i]}%</text>
              </g>
            );
          })}

          {/* Y-axis label */}
          {convBarsReveal[0] > 0.5 && (
            <text x={barX - 20} y={650} textAnchor="end" fill="rgba(255,255,255,0.4)" fontSize={11} fontFamily={FONT} transform={`rotate(-90, ${barX - 20}, 650)`}>Conversion Rate</text>
          )}

          {/* 400% drop label */}
          <g opacity={dropLabelOp}>
            <text x={W / 2} y={850} textAnchor="middle" fill="rgba(239,68,68,0.9)" fontSize={22} fontWeight={800} fontFamily={FONT}>↓ 400% conversion drop after 5 minutes</text>
          </g>
        </svg>
      </AbsoluteFill>

      {/* ── SCENE B: SPEED COMPARISON ───────────────────────────────────────────── */}
      <AbsoluteFill style={{ opacity: Math.min(sceneBOp, sceneBExit) }}>
        <div style={{ position: 'absolute', top: 60, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
          <div style={{ padding: '8px 24px', borderRadius: 100, border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.04)' }}>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' as const }}>Response Time Comparison</span>
          </div>
        </div>

        <svg width={W} height={1080} style={{ position: 'absolute', inset: 0 }}>
          {/* Competitor bar */}
          <g>
            <rect x={200} y={700 - competitorBarH} width={200} height={competitorBarH} fill="#374151" rx={6} />
            <g opacity={interpolate(compLabelOp, [0, 1], [0, 1])}>
              <text x={300} y={700 - competitorBarH - 20} textAnchor="middle" fill="#9CA3AF" fontSize={28} fontWeight={900} fontFamily={FONT}>4+ HOURS</text>
              <text x={300} y={740} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize={14} fontFamily={FONT}>COMPETITOR</text>
              <text x={300} y={760} textAnchor="middle" fill="rgba(239,68,68,0.7)" fontSize={11} fontFamily={FONT}>"When we get to it"</text>
            </g>
          </g>

          {/* SystemPros bar */}
          <g>
            <rect x={680} y={700 - systemProsBarH} width={200} height={systemProsBarH} fill={ACCENT} rx={6}
              style={{ filter: `drop-shadow(0 0 ${30 * glowPulse}px rgba(59,130,246,0.6))` }} />
            <g opacity={interpolate(spLabelOp, [0, 1], [0, 1])}>
              <text x={780} y={700 - systemProsBarH - 20} textAnchor="middle" fill={ACCENT} fontSize={28} fontWeight={900} fontFamily={FONT}>{'< 10 SEC'}</text>
              <text x={780} y={740} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize={14} fontFamily={FONT}>SYSTEMSPROS</text>
              <text x={780} y={760} textAnchor="middle" fill="rgba(59,130,246,0.8)" fontSize={11} fontFamily={FONT}>Instant automated response</text>
            </g>
          </g>

          {/* Center "vs" */}
          {Math.min(compLabelOp, spLabelOp) > 0.5 && (
            <text x={W / 2} y={590} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize={48} fontWeight={900} fontFamily={FONT}>VS</text>
          )}

          {/* Baseline */}
          <line x1={160} y1={700} x2={920} y2={700} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />

          {/* Win badge */}
          <g opacity={interpolate(spLabelOp, [0, 1], [0, 1])}>
            <rect x={680} y={700 - systemProsBarH - 80} width={200} height={32} rx={16} fill={GREEN} opacity={0.9} />
            <text x={780} y={700 - systemProsBarH - 58} textAnchor="middle" fill="white" fontSize={12} fontWeight={700} fontFamily={FONT}>✓ 1ST CONTACT WINS</text>
          </g>
        </svg>
      </AbsoluteFill>

      {/* ── SCENE C: 10-SECOND SEQUENCE ─────────────────────────────────────────── */}
      <AbsoluteFill style={{
        opacity: sceneCOp,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 80,
      }}>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' as const, marginBottom: 16 }}>
          What happens in 10 seconds
        </div>
        <div style={{ color: '#fff', fontSize: 48, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 12, textAlign: 'center' as const }}>
          If You Aren't First,<br />
          <span style={{ color: RED }}>You're Last.</span>
        </div>
        <div style={{ width: 160, height: 4, backgroundColor: ACCENT, borderRadius: 2, marginBottom: 64 }} />

        {/* Step sequence */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          {seqSteps.map((step, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              {/* Step node */}
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                opacity: interpolate(seqAnims[i], [0, 1], [0, 1]),
                transform: `scale(${interpolate(seqAnims[i], [0, 1], [0.6, 1])})`,
              }}>
                <div style={{
                  width: 72, height: 72, borderRadius: '50%',
                  backgroundColor: `${step.color}20`,
                  border: `2px solid ${step.color}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 0 24px ${step.color}40`,
                }}>
                  <span style={{ color: step.color, fontSize: 22, fontWeight: 900 }}>{i + 1}</span>
                </div>
                <div style={{ textAlign: 'center' as const }}>
                  <div style={{ color: '#fff', fontSize: 14, fontWeight: 700 }}>{step.label}</div>
                  <div style={{ color: step.color, fontSize: 12, fontWeight: 600, marginTop: 2 }}>{step.sublabel}</div>
                </div>
              </div>

              {/* Connector arrow */}
              {i < seqSteps.length - 1 && (
                <div style={{
                  width: 60, height: 2, backgroundColor: ACCENT,
                  opacity: connectorAnims[i] * 0.6,
                  margin: '0 4px',
                  position: 'relative', top: -16,
                }}>
                  <div style={{ position: 'absolute', right: -6, top: -4, color: ACCENT, fontSize: 14, opacity: connectorAnims[i] }}>›</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 60, color: 'rgba(255,255,255,0.45)', fontSize: 16, textAlign: 'center' as const }}>
          First contact = <span style={{ color: GREEN, fontWeight: 700 }}>50% close rate</span> &nbsp;·&nbsp; 2nd contact = <span style={{ color: ORANGE, fontWeight: 700 }}>25%</span> &nbsp;·&nbsp; 3rd+ = <span style={{ color: RED, fontWeight: 700 }}>{'< 5%'}</span>
        </div>
      </AbsoluteFill>

      {/* Brand */}
      <div style={{ position: 'absolute', bottom: 38, right: 58, display: 'flex', alignItems: 'center', gap: 8, opacity: brandOp }}>
        <div style={{ width: 16, height: 16, borderRadius: 3, backgroundColor: ACCENT }} />
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, fontWeight: 600, letterSpacing: '0.14em' }}>SYSTEMPROS.AI</span>
      </div>
    </AbsoluteFill>
  );
};
