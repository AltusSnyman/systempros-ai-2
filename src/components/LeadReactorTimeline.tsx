import { ScrollTimeline } from './ScrollTimeline';

const STEPS = [
  {
    number: '01',
    title: 'The Creative Lab',
    desc: "We don't just 'post ads.' We engineer high-converting Meta creatives and set up your entire ad account, wired directly into your CRM. Every dollar of spend is tracked from click to close.",
    detail: 'Ad creative, copywriting & full account setup included',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'The Lead Reactor Deployment',
    desc: 'The moment a lead clicks, the "Chain Reaction" starts. Instant Voice AI calls, WhatsApp sequences, and iMessage nudges fire simultaneously — in under 10 seconds. No one gets left behind.',
    detail: 'Live and responding within 10 seconds of every form fill',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'The Human Handoff',
    desc: "You don't chase 'maybe's.' You only talk to pre-qualified prospects who have already seen your value and picked a time on your calendar. We hand you the bat. You swing.",
    detail: 'Only qualified, pre-booked meetings reach your calendar',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /><path d="M9 16l2 2 4-4" />
      </svg>
    ),
  },
];

export function LeadReactorTimeline() {
  return <ScrollTimeline steps={STEPS} />;
}

export default LeadReactorTimeline;
