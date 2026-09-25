import { useRef, useState } from 'react';

// Native, brand-styled ROI calculator for the Andrea / Google Maps journey page.
// Maths follows docs/andrea-page-copy.md §9 exactly: no rounding until display.
//   extraPerMonth = perWeek × 52/12 × pct/100
//   revenuePerMonth = extraPerMonth × value
//   revenuePerYear = revenuePerMonth × 12
//   if invest > 0: roi = (revenuePerMonth − invest) / invest × 100
//                  customersToCoverInvest = ceil(invest / value)
// Astro pre-renders this component's initial state to static HTML, so the
// default results above are present without any client JS running.

declare global {
	interface Window {
		gtag?: (...args: unknown[]) => void;
	}
}

const DEFAULT_PER_WEEK = 5;
const DEFAULT_VALUE = 400;
const DEFAULT_INCREASE = 20;

function toNumber(v: number | ''): number {
	return typeof v === 'number' && Number.isFinite(v) ? v : 0;
}

export default function GBPCalculator() {
	const [perWeek, setPerWeek] = useState<number | ''>(DEFAULT_PER_WEEK);
	const [value, setValue] = useState<number | ''>(DEFAULT_VALUE);
	const [increase, setIncrease] = useState<number>(DEFAULT_INCREASE);
	const [invest, setInvest] = useState<number | ''>('');

	const fired = useRef(false);
	const trackUsed = () => {
		if (fired.current) return;
		fired.current = true;
		if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
			window.gtag('event', 'calculator_used', { page_path: window.location.pathname });
		}
	};

	const perWeekNum = toNumber(perWeek);
	const valueNum = toNumber(value);
	const investNum = toNumber(invest);

	const extraPerMonth = perWeekNum * (52 / 12) * (increase / 100);
	const revenuePerMonth = extraPerMonth * valueNum;
	const revenuePerYear = revenuePerMonth * 12;
	const hasInvest = investNum > 0;
	const roi = hasInvest ? ((revenuePerMonth - investNum) / investNum) * 100 : 0;
	const customersToCoverInvest = hasInvest && valueNum > 0 ? Math.ceil(investNum / valueNum) : 0;

	const dollars = (n: number) => Math.round(n).toLocaleString('en-NZ');

	const fieldClass =
		'w-full border border-line px-3.5 py-2.5 text-ink bg-paper rounded-[2px] focus-visible:outline-2 focus-visible:outline-green focus-visible:outline-offset-2';
	const labelClass = 'face-data text-muted block mb-2';

	return (
		<div className="border border-line bg-paper">
			<div className="grid md:grid-cols-2 md:divide-x md:divide-line">
				{/* Inputs */}
				<div className="p-6 md:p-8 space-y-6">
					<div>
						<label htmlFor="calc-per-week" className={labelClass}>
							New customers you get from Google each week
						</label>
						<input
							id="calc-per-week"
							name="calc-per-week"
							type="number"
							inputMode="numeric"
							min={0}
							step={1}
							value={perWeek}
							onChange={(e) => {
								trackUsed();
								const v = e.target.value;
								setPerWeek(v === '' ? '' : Number(v));
							}}
							className={fieldClass}
						/>
					</div>

					<div>
						<label htmlFor="calc-value" className={labelClass}>
							Average value of a new customer ($)
						</label>
						<input
							id="calc-value"
							name="calc-value"
							type="number"
							inputMode="numeric"
							min={0}
							step={10}
							value={value}
							onChange={(e) => {
								trackUsed();
								const v = e.target.value;
								setValue(v === '' ? '' : Number(v));
							}}
							className={fieldClass}
						/>
					</div>

					<div>
						<label htmlFor="calc-increase" className={labelClass}>
							Increase you'd expect from better Maps visibility
							<span className="text-ink font-bold text-[15px] ml-2">{increase}%</span>
						</label>
						<input
							id="calc-increase"
							name="calc-increase"
							type="range"
							min={5}
							max={50}
							step={1}
							value={increase}
							onChange={(e) => {
								trackUsed();
								setIncrease(Number(e.target.value));
							}}
							className="w-full accent-green h-2 bg-green-faint rounded-[2px] appearance-none cursor-pointer"
							aria-valuetext={`${increase}%`}
						/>
						<div className="flex justify-between face-data text-muted text-[11px] mt-1">
							<span>5%</span>
							<span>50%</span>
						</div>
					</div>

					<div>
						<label htmlFor="calc-invest" className={labelClass}>
							Optional: what you'd invest in marketing each month ($)
						</label>
						<input
							id="calc-invest"
							name="calc-invest"
							type="number"
							inputMode="numeric"
							min={0}
							step={50}
							placeholder="e.g. 1200"
							value={invest}
							onChange={(e) => {
								trackUsed();
								const v = e.target.value;
								setInvest(v === '' ? '' : Number(v));
							}}
							className={fieldClass}
						/>
					</div>
				</div>

				{/* Results */}
				<div className="p-6 md:p-8 bg-green-faint flex flex-col justify-center">
					<div aria-live="polite" className="space-y-4">
						<p className="text-[16px] text-ink leading-relaxed">
							About{' '}
							<span className="face-data text-copper text-[19px] font-bold">
								{extraPerMonth.toFixed(1)}
							</span>{' '}
							extra customers a month
						</p>
						<p className="text-[16px] text-ink leading-relaxed">
							worth about <span className="font-bold text-ink">${dollars(revenuePerMonth)}</span> a
							month, <span className="font-bold text-ink">${dollars(revenuePerYear)}</span> a year.
						</p>
						{hasInvest && (
							<p className="text-[16px] text-ink leading-relaxed pt-4 border-t border-line">
								At ${dollars(investNum)} a month, you'd need{' '}
								<span className="font-bold text-ink">{customersToCoverInvest}</span> extra
								customers to cover it. Estimated return:{' '}
								<span className="font-bold text-ink">{Math.round(roi)}%</span>.
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
