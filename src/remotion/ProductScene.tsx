import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';

export type ProductSceneProps = {
  category: string;
  titleLine1: string;
  titleLine2?: string;
  tagline: string;
  features: string[];
  ctaText: string;
};

const ACCENT = '#3B82F6';
const FONT = "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif";

export const ProductScene = ({
  category,
  titleLine1,
  titleLine2,
  tagline,
  features,
  ctaText,
}: ProductSceneProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Global fade in/out
  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(frame, [555, 600], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const globalOpacity = Math.min(fadeIn, fadeOut);

  // Category label (frame 10-40)
  const catOpacity = interpolate(frame, [10, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Title springs in from frame 20
  const titleSpring = spring({ frame: frame - 20, fps, config: { damping: 200 } });
  const titleY = interpolate(titleSpring, [0, 1], [60, 0]);

  // Accent line grows (frame 30-85)
  const lineWidth = interpolate(frame, [30, 85], [0, 180], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Tagline fade (frame 75-115)
  const taglineOpacity = interpolate(frame, [75, 115], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Features: stagger from frame 115, 50 frames apart
  const featureAnims = features.map((_, i) => {
    const start = 115 + i * 50;
    const progress = spring({ frame: frame - start, fps, config: { damping: 200 } });
    return {
      opacity: interpolate(progress, [0, 1], [0, 1]),
      x: interpolate(progress, [0, 1], [-50, 0]),
    };
  });

  // CTA springs in from frame 320
  const ctaProgress = spring({ frame: frame - 320, fps, config: { damping: 200 } });
  const ctaOpacity = interpolate(ctaProgress, [0, 1], [0, 1]);
  const ctaY = interpolate(ctaProgress, [0, 1], [20, 0]);

  // Branding (frame 350-385)
  const brandOpacity = interpolate(frame, [350, 385], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Pulsing background glow
  const bgPulseProgress = Math.sin(frame / 45);
  const bgGlowOpacity = interpolate(bgPulseProgress, [-1, 1], [0.12, 0.20]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0A0A0A',
        opacity: globalOpacity,
        fontFamily: FONT,
      }}
    >
      {/* Animated radial glow */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 0%, rgba(59,130,246,${bgGlowOpacity}) 0%, transparent 62%)`,
        }}
      />

      {/* Background dot grid */}
      {Array.from({ length: 9 }, (_, row) =>
        Array.from({ length: 9 }, (_, col) => {
          const dotIn = interpolate(frame, [col * 4, col * 4 + 25], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <div
              key={`dot-${row}-${col}`}
              style={{
                position: 'absolute',
                left: (col + 1) * (1080 / 10),
                top: (row + 1) * (1080 / 10),
                width: 3,
                height: 3,
                borderRadius: '50%',
                backgroundColor: ACCENT,
                opacity: dotIn * 0.1,
              }}
            />
          );
        })
      )}

      {/* Horizontal grid lines sweeping in */}
      {Array.from({ length: 7 }, (_, i) => {
        const lineOpacity = interpolate(frame, [i * 7, i * 7 + 28], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        return (
          <div
            key={`hline-${i}`}
            style={{
              position: 'absolute',
              top: `${(i + 1) * (100 / 8)}%`,
              left: 0,
              right: 0,
              height: 1,
              backgroundColor: 'rgba(255,255,255,1)',
              opacity: lineOpacity * 0.04,
            }}
          />
        );
      })}

      {/* Corner accent — top right */}
      <div
        style={{
          position: 'absolute',
          top: 44,
          right: 44,
          width: 55,
          height: 55,
          borderTop: `3px solid rgba(59,130,246,0.45)`,
          borderRight: `3px solid rgba(59,130,246,0.45)`,
          opacity: catOpacity,
        }}
      />

      {/* Corner accent — bottom left */}
      <div
        style={{
          position: 'absolute',
          bottom: 44,
          left: 44,
          width: 55,
          height: 55,
          borderBottom: `3px solid rgba(59,130,246,0.45)`,
          borderLeft: `3px solid rgba(59,130,246,0.45)`,
          opacity: catOpacity,
        }}
      />

      {/* Main content column */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        {/* Category label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 20,
            opacity: catOpacity,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: ACCENT,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              color: ACCENT,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase' as const,
            }}
          >
            {category}
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            transform: `translateY(${titleY}px)`,
            opacity: titleSpring,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              color: '#FFFFFF',
              fontSize: 82,
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
            }}
          >
            {titleLine1}
          </div>
          {titleLine2 && (
            <div
              style={{
                color: '#FFFFFF',
                fontSize: 82,
                fontWeight: 900,
                lineHeight: 1.0,
                letterSpacing: '-0.03em',
              }}
            >
              {titleLine2}
            </div>
          )}
        </div>

        {/* Growing accent line */}
        <div
          style={{
            width: lineWidth,
            height: 4,
            backgroundColor: ACCENT,
            borderRadius: 2,
            marginBottom: 22,
          }}
        />

        {/* Tagline */}
        <p
          style={{
            color: 'rgba(255,255,255,0.62)',
            fontSize: 21,
            fontWeight: 400,
            lineHeight: 1.5,
            margin: 0,
            marginBottom: 32,
            maxWidth: 660,
            opacity: taglineOpacity,
          }}
        >
          {tagline}
        </p>

        {/* Feature list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
          {features.map((feat, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                opacity: featureAnims[i]?.opacity ?? 0,
                transform: `translateX(${featureAnims[i]?.x ?? -50}px)`,
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  border: `2px solid ${ACCENT}`,
                  backgroundColor: 'rgba(59,130,246,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    color: ACCENT,
                    fontSize: 11,
                    fontWeight: 800,
                    lineHeight: 1,
                  }}
                >
                  ✓
                </span>
              </div>
              <span
                style={{
                  color: 'rgba(255,255,255,0.82)',
                  fontSize: 19,
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                }}
              >
                {feat}
              </span>
            </div>
          ))}
        </div>

        {/* CTA button */}
        <div
          style={{
            marginTop: 36,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            backgroundColor: ACCENT,
            borderRadius: 100,
            padding: '14px 30px',
            alignSelf: 'flex-start',
            opacity: ctaOpacity,
            transform: `translateY(${ctaY}px)`,
          }}
        >
          <span
            style={{
              color: '#FFFFFF',
              fontSize: 17,
              fontWeight: 700,
              letterSpacing: '0.01em',
            }}
          >
            {ctaText}
          </span>
          <span style={{ color: '#FFFFFF', fontSize: 18 }}>→</span>
        </div>
      </AbsoluteFill>

      {/* Brand watermark */}
      <div
        style={{
          position: 'absolute',
          bottom: 38,
          right: 58,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          opacity: brandOpacity,
        }}
      >
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: 3,
            backgroundColor: ACCENT,
          }}
        />
        <span
          style={{
            color: 'rgba(255,255,255,0.32)',
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.14em',
          }}
        >
          SYSTEMPROS.AI
        </span>
      </div>
    </AbsoluteFill>
  );
};
