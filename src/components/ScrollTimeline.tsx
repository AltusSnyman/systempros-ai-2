import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform, useInView, type MotionValue } from 'framer-motion';

export type TimelineStep = {
  number: string;
  title: string;
  desc: string;
  detail: string;
  icon: ReactNode;
};

type Props = {
  steps: TimelineStep[];
};

// ── Step card ─────────────────────────────────────────────────────────────────

function StepCard({ step, align }: { step: TimelineStep; align: 'left' | 'right' }) {
  return (
    <div
      className={`
        group relative rounded-2xl border border-white/10 bg-white/[0.03] p-7
        hover:bg-white/[0.05] hover:border-accent/30 hover:-translate-y-1
        transition-all duration-300 overflow-hidden
        ${align === 'right' ? 'text-right' : 'text-left'}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className={`relative z-10 ${align === 'right' ? 'flex flex-col items-end' : ''}`}>
        <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
          {step.icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
        <p className="text-[#9CA3AF] text-sm leading-relaxed mb-4">{step.desc}</p>
        <div className={`inline-flex items-center gap-2 text-xs text-accent font-semibold ${align === 'right' ? 'flex-row-reverse' : ''}`}>
          <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
          {step.detail}
        </div>
      </div>
    </div>
  );
}

// ── Step row ──────────────────────────────────────────────────────────────────

function StepRow({ step, index }: { step: TimelineStep; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });
  const isLeft = index % 2 === 0;

  const cardVariants = {
    hidden: { opacity: 0, x: isLeft ? -48 : 48 },
    visible: {
      opacity: 1, x: 0,
      transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number], delay: 0.15 },
    },
  };

  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1, opacity: 1,
      transition: { type: 'spring' as const, stiffness: 280, damping: 22, delay: 0.05 },
    },
  };

  return (
    <div ref={ref} className="relative">
      {/* ── Desktop: alternating ── */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_80px_1fr] items-center gap-0">
        {isLeft ? (
          <motion.div className="pr-10" variants={cardVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
            <StepCard step={step} align="right" />
          </motion.div>
        ) : <div />}

        <div className="flex justify-center">
          <motion.div variants={nodeVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="relative z-10">
            <div className="w-14 h-14 rounded-full bg-[#0A0A0A] border-2 border-accent flex items-center justify-center shadow-[0_0_28px_rgba(59,130,246,0.45)]">
              <span className="text-accent font-black text-base">{step.number}</span>
            </div>
          </motion.div>
        </div>

        {!isLeft ? (
          <motion.div className="pl-10" variants={cardVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
            <StepCard step={step} align="left" />
          </motion.div>
        ) : <div />}
      </div>

      {/* ── Mobile: left-line ── */}
      <div className="flex gap-5 lg:hidden">
        <motion.div variants={nodeVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="shrink-0 relative z-10 mt-1">
          <div className="w-11 h-11 rounded-full bg-[#0A0A0A] border-2 border-accent flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)]">
            <span className="text-accent font-black text-sm">{step.number}</span>
          </div>
        </motion.div>
        <motion.div
          variants={{ hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number], delay: 0.15 } } }}
          initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          className="flex-1 pb-4"
        >
          <StepCard step={step} align="left" />
        </motion.div>
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export function ScrollTimeline({ steps }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 20%'],
  });

  const lineScaleY: MotionValue<number> = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative max-w-4xl mx-auto">
      {/* Desktop centered line */}
      <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-7 bottom-7 w-px bg-white/8">
        <motion.div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-accent via-accent/70 to-accent/20 origin-top"
          style={{ scaleY: lineScaleY, height: '100%' }}
        />
      </div>
      {/* Mobile left line */}
      <div className="lg:hidden absolute left-[22px] top-4 bottom-4 w-px bg-white/8">
        <motion.div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-accent via-accent/70 to-accent/20 origin-top"
          style={{ scaleY: lineScaleY, height: '100%' }}
        />
      </div>

      <div className="flex flex-col gap-16 lg:gap-20">
        {steps.map((step, i) => (
          <StepRow key={i} step={step} index={i} />
        ))}
      </div>
    </div>
  );
}

export default ScrollTimeline;
