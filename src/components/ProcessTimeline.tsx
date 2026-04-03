import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  type MotionValue,
} from 'framer-motion';

const STEPS = [
  {
    number: '01',
    title: 'Audit & Architect',
    desc: "We identify the \"leaks\" in your current site and map out the full conversion path. Every touchpoint. Every drop-off. We find the money you're leaving on the table.",
    detail: 'Typically reveals 3–7 critical conversion gaps',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Rip & Replace',
    desc: 'We deploy the SystemPros stack — replacing your dead forms with Smart Widgets and Voice AI. Your old site becomes a revenue-generating machine.',
    detail: 'Deployed live within 2–4 weeks',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" /><polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'The Lead Gathering Launch',
    desc: 'Your site goes live, wired directly into your CRM for 24/7 automated booking and nurturing. You get leads. The machine handles the rest.',
    detail: 'First booked meetings typically within 48 hours',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
];

// ── Single step row ───────────────────────────────────────────────────────────

function StepRow({ step, index }: { step: (typeof STEPS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });
  const isLeft = index % 2 === 0;

  const cardVariants = {
    hidden: { opacity: 0, x: isLeft ? -48 : 48 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 },
    },
  };

  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 280, damping: 22, delay: 0.05 },
    },
  };

  return (
    <div ref={ref} className="relative">

      {/* ── DESKTOP: alternating layout ────────────────────────────────────────── */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_80px_1fr] items-center gap-0">

        {/* Left column */}
        {isLeft ? (
          <motion.div
            className="pr-10"
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <StepCard step={step} align="right" />
          </motion.div>
        ) : (
          <div /> /* spacer */
        )}

        {/* Center node */}
        <div className="flex justify-center">
          <motion.div
            variants={nodeVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="relative z-10 flex flex-col items-center"
          >
            <div className="w-14 h-14 rounded-full bg-[#0A0A0A] border-2 border-accent flex items-center justify-center shadow-[0_0_28px_rgba(59,130,246,0.45)]">
              <span className="text-accent font-black text-base">{step.number}</span>
            </div>
          </motion.div>
        </div>

        {/* Right column */}
        {!isLeft ? (
          <motion.div
            className="pl-10"
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <StepCard step={step} align="left" />
          </motion.div>
        ) : (
          <div /> /* spacer */
        )}
      </div>

      {/* ── MOBILE: left-line layout ───────────────────────────────────────────── */}
      <div className="flex gap-5 lg:hidden">
        <motion.div
          variants={nodeVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="shrink-0 relative z-10 mt-1"
        >
          <div className="w-11 h-11 rounded-full bg-[#0A0A0A] border-2 border-accent flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)]">
            <span className="text-accent font-black text-sm">{step.number}</span>
          </div>
        </motion.div>

        <motion.div
          variants={{ hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 } } }}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex-1 pb-4"
        >
          <StepCard step={step} align="left" />
        </motion.div>
      </div>
    </div>
  );
}

// ── Card ─────────────────────────────────────────────────────────────────────

function StepCard({ step, align }: { step: (typeof STEPS)[0]; align: 'left' | 'right' }) {
  return (
    <div
      className={`
        group relative rounded-2xl border border-white/10 bg-white/[0.03] p-7
        hover:bg-white/[0.05] hover:border-accent/30 hover:-translate-y-1
        transition-all duration-300 overflow-hidden
        ${align === 'right' ? 'text-right' : 'text-left'}
      `}
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className={`relative z-10 ${align === 'right' ? 'flex flex-col items-end' : ''}`}>
        {/* Icon */}
        <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
          {step.icon}
        </div>

        <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
        <p className="text-[#9CA3AF] text-sm leading-relaxed mb-4">{step.desc}</p>

        {/* Detail pill */}
        <div className={`inline-flex items-center gap-2 text-xs text-accent font-semibold ${align === 'right' ? 'flex-row-reverse' : ''}`}>
          <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
          {step.detail}
        </div>
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 20%'],
  });

  // Line grows top→bottom as section scrolls through view
  const lineScaleY: MotionValue<number> = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative max-w-4xl mx-auto">

      {/* ── DESKTOP: centered vertical track ─────────────────────────────────── */}
      <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-7 bottom-7 w-px bg-white/8">
        <motion.div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-accent via-accent/70 to-accent/20 origin-top"
          style={{ scaleY: lineScaleY, height: '100%' }}
        />
      </div>

      {/* ── MOBILE: left vertical track ──────────────────────────────────────── */}
      <div className="lg:hidden absolute left-[22px] top-4 bottom-4 w-px bg-white/8">
        <motion.div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-accent via-accent/70 to-accent/20 origin-top"
          style={{ scaleY: lineScaleY, height: '100%' }}
        />
      </div>

      {/* Steps with spacing */}
      <div className="flex flex-col gap-16 lg:gap-20">
        {STEPS.map((step, i) => (
          <StepRow key={i} step={step} index={i} />
        ))}
      </div>
    </div>
  );
}

export default ProcessTimeline;
