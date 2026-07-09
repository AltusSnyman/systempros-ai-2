import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const SAMPLES = [
    { id: 'counseling', label: 'Counseling', desc: 'Relationship coaching & emotional support intake.', video: '/assets/industry-videos/counseling.mp4', poster: '/assets/industry-videos/counseling.webp' },
    { id: 'ndis', label: 'NDIS', desc: 'Independent living & disability services booking.', video: '/assets/industry-videos/ndis.mp4', poster: '/assets/industry-videos/ndis.webp' },
    { id: 'roofing', label: 'Roofing', desc: 'Pre-qualification for hail damage inspection.', video: '/assets/industry-videos/roofing.mp4', poster: '/assets/industry-videos/roofing.webp' },
    { id: 'dental', label: 'Dental', desc: 'Appointment scheduling and hygiene reminders.', video: '/assets/industry-videos/dental.mp4', poster: '/assets/industry-videos/dental.webp' },
    { id: 'chiro', label: 'Chiropractor', desc: 'New patient intake and adjustment scheduling.', video: '/assets/industry-videos/chiro.mp4', poster: '/assets/industry-videos/chiro.webp' },
    { id: 'detailing', label: 'Auto Detailing', desc: 'Service quotes and booking for vehicle care.', video: '/assets/industry-videos/detailing.mp4', poster: '/assets/industry-videos/detailing.webp' },
    { id: 'landscaping', label: 'Landscaping', desc: 'Lawn care estimates and seasonal scheduling.', video: '/assets/industry-videos/landscaping.mp4', poster: '/assets/industry-videos/landscaping.webp' },
];

export default function VideoShowcase() {
    const [activeTab, setActiveTab] = useState(SAMPLES[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef(null);

    const handleTabChange = (sample) => {
        setActiveTab(sample);
        setIsPlaying(false);
        setIsMuted(true);
    };

    const handlePlayToggle = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleMuteToggle = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleVideoEnd = () => {
        setIsPlaying(false);
    };

    return (
        <div className="w-full max-w-5xl mx-auto bg-paper border border-line rounded-[2px] overflow-hidden">

            {/* Header / Tabs - Scrollable */}
            <div className="flex border-b border-line overflow-x-auto scrollbar-hide">
                {SAMPLES.map((sample) => (
                    <button
                        key={sample.id}
                        onClick={() => handleTabChange(sample)}
                        className={`flex-shrink-0 px-4 md:px-6 py-4 text-xs md:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer
              ${activeTab.id === sample.id
                                ? 'bg-green-faint text-green border-b-2 border-green'
                                : 'text-muted hover:text-ink hover:bg-green-faint'
                            }`}
                    >
                        {sample.label}
                    </button>
                ))}
            </div>

            {/* Main Area - Video + Info */}
            <div className="p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center justify-center">

                {/* Video Container - 9:16 Aspect Ratio */}
                <div className="relative w-48 md:w-56 flex-shrink-0">
                    <div className="relative aspect-[9/16] rounded-[2px] overflow-hidden bg-ink border border-line">

                        {/* Video Element */}
                        <video
                            ref={videoRef}
                            key={activeTab.id}
                            src={activeTab.video}
                            poster={activeTab.poster}
                            muted={isMuted}
                            playsInline
                            preload="none"
                            onEnded={handleVideoEnd}
                            className="absolute inset-0 w-full h-full object-cover"
                        />

                        {/* Play/Pause Overlay */}
                        {!isPlaying && (
                            <div
                                className="absolute inset-0 flex items-center justify-center bg-ink/30 cursor-pointer transition-colors hover:bg-ink/20"
                                onClick={handlePlayToggle}
                            >
                                <div className="w-16 h-16 bg-paper rounded-full flex items-center justify-center border border-line hover:bg-green-faint transition-colors">
                                    <Play className="text-green w-6 h-6 ml-1" fill="currentColor" />
                                </div>
                            </div>
                        )}

                        {/* Controls Bar */}
                        {isPlaying && (
                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-ink/60 flex justify-between items-center">
                                <button
                                    onClick={handlePlayToggle}
                                    className="w-8 h-8 bg-paper rounded-full flex items-center justify-center hover:bg-green-faint transition-colors cursor-pointer"
                                    aria-label="Pause"
                                >
                                    <Pause className="text-ink w-4 h-4" />
                                </button>
                                <button
                                    onClick={handleMuteToggle}
                                    className="w-8 h-8 bg-paper rounded-full flex items-center justify-center hover:bg-green-faint transition-colors cursor-pointer"
                                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                                >
                                    {isMuted ? (
                                        <VolumeX className="text-ink w-4 h-4" />
                                    ) : (
                                        <Volume2 className="text-ink w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Info Side */}
                <div className="flex-1 text-center md:text-left space-y-4">
                    <h3 className="text-2xl md:text-3xl font-bold">
                        <span className="text-green">{activeTab.label}</span>
                        <span className="text-ink"> AI Assistant</span>
                    </h3>
                    <p className="text-muted text-lg">{activeTab.desc}</p>
                    <p className="text-sm text-muted font-mono uppercase tracking-[0.04em]">
                        {isPlaying ? '▶ Playing demo...' : 'Tap video to play'}
                    </p>

                    {/* Industry Tags */}
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-2">
                        <span className="px-3 py-1 font-mono text-[11px] uppercase tracking-[0.02em] bg-green-faint text-green rounded-[2px] border border-line">24/7 Availability</span>
                        <span className="px-3 py-1 font-mono text-[11px] uppercase tracking-[0.02em] bg-paper text-muted rounded-[2px] border border-line">Instant Response</span>
                        <span className="px-3 py-1 font-mono text-[11px] uppercase tracking-[0.02em] bg-paper text-muted rounded-[2px] border border-line">Custom Trained</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
