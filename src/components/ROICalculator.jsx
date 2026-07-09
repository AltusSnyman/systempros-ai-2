
import React, { useState, useEffect } from 'react';

const ROICalculator = ({
    jobValueLabel = "Average Job Value",
    missedCallsLabel = "Missed Calls Per Week",
    appointmentsLabel = "Appointments Per Month",
    noShowRateLabel = "Current No-Show Rate",
    defaultJobValue = 10000,
    defaultMissedCalls = 5,
    defaultAppointments = 20,
    defaultNoShowRate = 20,
    jobValueMin = 1000,
    jobValueMax = 50000,
    jobValueStep = 500,
    accentColor = "blue" // accepted for API compatibility; the dossier brand renders one palette
}) => {
    // Inputs
    const [jobValue, setJobValue] = useState(defaultJobValue);
    const [missedCalls, setMissedCalls] = useState(defaultMissedCalls);
    const [appointments, setAppointments] = useState(defaultAppointments);
    const [noShowRate, setNoShowRate] = useState(defaultNoShowRate); // Percentage

    // Package Selection
    const [selectedPackage, setSelectedPackage] = useState('toolkit');

    // Constants
    const PRICES = {
        toolkit: 997,
        architecture: 3500 // Using the "From" price as a baseline
    };

    const LABELS = {
        toolkit: 'The Toolkit ($997/mo)',
        architecture: 'Architecture Build ($3,500 One-Time)'
    };

    // Derived Values
    const [results, setResults] = useState({
        monthlyCaptured: 0,
        monthlyNoShow: 0,
        totalMonthlyGain: 0,
        roi: 0,
        annualProjection: 0
    });

    useEffect(() => {
        // Calculations
        // 1. Captured Calls Revenue
        // Logic: Missed Calls/Week * 4.3 weeks * 20% Conversion Rate * Job Value
        const monthlyMissedCalls = missedCalls * 4.3;
        const conversionRate = 0.20; // Conservative estimate
        const capturedRevenue = Math.round(monthlyMissedCalls * conversionRate * jobValue);

        // 2. No-Show Prevention Revenue
        // Logic: Appointments/Month * No-Show Rate * 40% Recovery Rate * Job Value
        const recoveryRate = 0.40; // Conservative estimate for rescheduling/saving
        const noShowRevenue = Math.round(appointments * (noShowRate / 100) * recoveryRate * jobValue);

        // 3. Total & ROI
        const totalGain = capturedRevenue + noShowRevenue;
        const investment = PRICES[selectedPackage];
        const calculatedRoi = Math.round(((totalGain - investment) / investment) * 100);
        const annual = totalGain * 12;

        setResults({
            monthlyCaptured: capturedRevenue,
            monthlyNoShow: noShowRevenue,
            totalMonthlyGain: totalGain,
            roi: calculatedRoi,
            annualProjection: annual
        });

    }, [jobValue, missedCalls, appointments, noShowRate, selectedPackage]);

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
    };

    const formatNumber = (val) => {
        return new Intl.NumberFormat('en-US').format(val);
    };

    return (
        <div className="w-full max-w-5xl mx-auto">
            <div className="bg-paper rounded-[2px] p-6 md:p-10 border border-line">

                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-ink mb-2">
                        Business ROI Calculator
                    </h2>
                    <p className="text-muted">Calculate your exact return in 60 seconds</p>
                </div>

                {/* INPUTS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 mb-12">

                    {/* Job Value */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <label className="font-mono text-[12px] uppercase tracking-[0.02em] text-muted">{jobValueLabel}</label>
                            <span className="text-2xl font-bold font-mono text-green">{formatCurrency(jobValue)}</span>
                        </div>
                        <input
                            type="range"
                            min={jobValueMin}
                            max={jobValueMax}
                            step={jobValueStep}
                            value={jobValue}
                            onChange={(e) => setJobValue(parseInt(e.target.value))}
                            className="w-full h-2 bg-green-faint rounded-[2px] appearance-none cursor-pointer accent-green"
                        />
                        <div className="flex justify-between font-mono text-[11px] text-muted">
                            <span>{formatCurrency(jobValueMin)}</span>
                            <span>{formatCurrency(jobValueMax)}</span>
                        </div>
                    </div>

                    {/* Missed Calls */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <label className="font-mono text-[12px] uppercase tracking-[0.02em] text-muted">{missedCallsLabel}</label>
                            <span className="text-2xl font-bold font-mono text-green">{missedCalls}</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="100"
                            value={missedCalls}
                            onChange={(e) => setMissedCalls(parseInt(e.target.value))}
                            className="w-full h-2 bg-green-faint rounded-[2px] appearance-none cursor-pointer accent-green"
                        />
                        <div className="flex justify-between font-mono text-[11px] text-muted">
                            <span>1</span>
                            <span>100</span>
                        </div>
                    </div>

                    {/* Appointments */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <label className="font-mono text-[12px] uppercase tracking-[0.02em] text-muted">{appointmentsLabel}</label>
                            <span className="text-2xl font-bold font-mono text-green">{appointments}</span>
                        </div>
                        <input
                            type="range"
                            min="5"
                            max="500"
                            step="5"
                            value={appointments}
                            onChange={(e) => setAppointments(parseInt(e.target.value))}
                            className="w-full h-2 bg-green-faint rounded-[2px] appearance-none cursor-pointer accent-green"
                        />
                        <div className="flex justify-between font-mono text-[11px] text-muted">
                            <span>5</span>
                            <span>500</span>
                        </div>
                    </div>

                    {/* No-Show Rate */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <label className="font-mono text-[12px] uppercase tracking-[0.02em] text-muted">{noShowRateLabel}</label>
                            <span className="text-2xl font-bold font-mono text-green">{noShowRate}%</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="80"
                            step="5"
                            value={noShowRate}
                            onChange={(e) => setNoShowRate(parseInt(e.target.value))}
                            className="w-full h-2 bg-green-faint rounded-[2px] appearance-none cursor-pointer accent-green"
                        />
                        <div className="flex justify-between font-mono text-[11px] text-muted">
                            <span>0%</span>
                            <span>80%</span>
                        </div>
                    </div>

                </div>

                {/* PACKAGE SELECTION */}
                <div className="mb-12">
                    <label className="block font-mono text-[12px] uppercase tracking-[0.02em] text-muted mb-4">Select Investment Model</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                            onClick={() => setSelectedPackage('toolkit')}
                            className={`p-4 rounded-[2px] border transition-colors duration-300 text-center font-bold cursor-pointer ${selectedPackage === 'toolkit' ? 'bg-green border-green text-paper-lit' : 'bg-paper border-line text-muted hover:text-ink hover:border-ink'}`}
                        >
                            The Toolkit ($997/mo)
                        </button>
                        <button
                            onClick={() => setSelectedPackage('architecture')}
                            className={`p-4 rounded-[2px] border transition-colors duration-300 text-center font-bold cursor-pointer ${selectedPackage === 'architecture' ? 'bg-green border-green text-paper-lit' : 'bg-paper border-line text-muted hover:text-ink hover:border-ink'}`}
                        >
                            Architecture Build ($3,500 One-Time)
                        </button>
                    </div>
                </div>

                {/* OUTPUTS DASHBOARD */}
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Captured Revenue */}
                        <div className="bg-green-faint border border-line rounded-[2px] p-6 relative overflow-hidden group hover:border-green transition-colors">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            </div>
                            <div className="text-3xl md:text-4xl font-bold font-mono text-green mb-2">{formatCurrency(results.monthlyCaptured)}</div>
                            <div className="text-sm text-muted">Monthly Revenue from <br /><span className="text-ink font-semibold">Captured Missed Calls</span></div>
                            <div className="font-mono text-[11px] text-muted mt-2">Assumes 20% conversion</div>
                        </div>

                        {/* No-Show Revenue */}
                        <div className="bg-green-faint border border-line rounded-[2px] p-6 relative overflow-hidden group hover:border-green transition-colors">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                            </div>
                            <div className="text-3xl md:text-4xl font-bold font-mono text-green mb-2">{formatCurrency(results.monthlyNoShow)}</div>
                            <div className="text-sm text-muted">Monthly Revenue from <br /><span className="text-ink font-semibold">Recovered Appointments</span></div>
                            <div className="font-mono text-[11px] text-muted mt-2">Assumes 40% recovery</div>
                        </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Total Monthly */}
                        <div className="bg-paper border border-green/40 rounded-[2px] p-6">
                            <div className="text-2xl md:text-3xl font-bold font-mono text-green mb-1">{formatCurrency(results.totalMonthlyGain)}</div>
                            <div className="font-mono text-[11px] uppercase tracking-[0.02em] text-muted">Total Monthly Gain</div>
                        </div>

                        {/* Cost */}
                        <div className="bg-paper border border-line rounded-[2px] p-6">
                            <div className="text-2xl md:text-3xl font-bold font-mono text-ink mb-1">{formatCurrency(PRICES[selectedPackage])}</div>
                            <div className="font-mono text-[11px] uppercase tracking-[0.02em] text-muted">Investment Cost</div>
                        </div>

                        {/* ROI % */}
                        <div className="bg-paper border border-copper/50 rounded-[2px] p-6">
                            <div className="text-2xl md:text-3xl font-bold font-mono text-copper mb-1">{formatNumber(results.roi)}%</div>
                            <div className="font-mono text-[11px] uppercase tracking-[0.02em] text-muted">Return on Investment</div>
                        </div>

                    </div>

                    {/* GRAND TOTAL */}
                    <div className="bg-green-deep rounded-[2px] p-8 text-center relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="text-5xl md:text-7xl font-bold font-mono text-paper-lit mb-2 tracking-tight">
                                {formatCurrency(results.annualProjection)}
                            </div>
                            <div className="text-lg text-paper-dim font-medium">Projected Annual Revenue Increase</div>
                            <div className="font-mono text-[12px] text-paper-dim mt-2 uppercase tracking-[0.04em]">SystemPros AI Integration</div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};
export default ROICalculator;
