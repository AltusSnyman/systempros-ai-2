import { useState, useEffect } from 'react';
import { Play, Pause, Mic } from 'lucide-react';

const SAMPLES = [
    { id: 'roofing', label: 'Roofing', desc: 'Pre-qualification for hail damage inspection.' },
    { id: 'dental', label: 'Dental', desc: 'Appointment rescheduling and hygiene reminders.' },
    { id: 'realestate', label: 'Real Estate', desc: 'Inbound lead qualification for luxury listings.' },
    { id: 'medical', label: 'Medical', desc: 'Patient intake form and insurance verification.' },
];

export default function AudioShowcase() {
    const [activeTab, setActiveTab] = useState(SAMPLES[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [visualizerBars, setVisualizerBars] = useState([]);

    useEffect(() => {
        setVisualizerBars(Array(20).fill(10));
    }, []);

    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setVisualizerBars(Array(20).fill(0).map(() => Math.random() * 80 + 10)); // Random height 10-90%
            }, 100);
        } else {
            setVisualizerBars(Array(20).fill(10)); // Reset
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    const handlePlayToggle = () => {
        setIsPlaying(!isPlaying);
    };

    const handleTabChange = (sample) => {
        setActiveTab(sample);
        setIsPlaying(false);
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-paper border border-line rounded-[2px] overflow-hidden">

            {/* Header / Tabs */}
            <div className="flex border-b border-line overflow-x-auto scrollbar-hide">
                {SAMPLES.map((sample) => (
                    <button
                        key={sample.id}
                        onClick={() => handleTabChange(sample)}
                        className={`flex-1 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap cursor-pointer
              ${activeTab.id === sample.id
                                ? 'bg-green-faint text-green border-b-2 border-green'
                                : 'text-muted hover:text-ink hover:bg-green-faint'
                            }`}
                    >
                        {sample.label}
                    </button>
                ))}
            </div>

            {/* Main Area */}
            <div className="p-8 md:p-12 flex flex-col items-center justify-center relative min-h-[300px]">

                {/* Live tint while playing */}
                <div className={`absolute inset-0 bg-green-faint transition-opacity duration-1000 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}></div>

                <div className="relative z-10 text-center space-y-8 w-full">

                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-ink"><span className="text-green">{activeTab.label}</span> Assistant</h3>
                        <p className="text-muted">{activeTab.desc}</p>
                    </div>

                    {/* Visualizer */}
                    <div className="flex items-end justify-center gap-1 h-24 w-full max-w-md mx-auto">
                        {visualizerBars.map((height, i) => (
                            <div
                                key={i}
                                className="w-2 bg-green rounded-t-[2px] transition-all duration-100 ease-linear"
                                style={{ height: `${height}%`, opacity: isPlaying ? 1 : 0.3 }}
                            ></div>
                        ))}
                    </div>

                    {/* Controls */}
                    <button
                        onClick={handlePlayToggle}
                        className="mx-auto w-16 h-16 rounded-full bg-green text-paper-lit flex items-center justify-center hover:bg-green-hover transition-colors cursor-pointer"
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                        {isPlaying ? <Pause /> : <Play className="ml-1" />}
                    </button>

                    <p className="text-xs text-muted font-mono uppercase tracking-[0.04em]">
                        {isPlaying ? 'Playing... (Simulation)' : 'Click to Listen'}
                    </p>

                </div>
            </div>
        </div>
    );
}
