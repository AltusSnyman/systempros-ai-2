import React, { useState, useEffect } from 'react';

const industries = [
    {
        id: 'counseling',
        category: 'Medical',
        title: 'The Empathy Engine',
        stat: 'HIPAA-Compliant Triage & Intake.',
        image: '/assets/industry-videos/counseling.webp',
        video: '/assets/industry-videos/counseling.mp4',
        link: '/solutions/counselling'
    },
    {
        id: 'independent-living',
        category: 'Medical',
        title: 'The Community Concierge',
        stat: 'Captures 100% of After-Hours Inquiries.',
        image: '/assets/industry-videos/ndis.webp',
        video: '/assets/industry-videos/ndis.mp4',
        link: '/solutions/independent-living'
    },
    {
        id: 'roofing',
        category: 'Home Services',
        title: 'The Storm-Chaser',
        stat: 'Zero Missed Leads During Peak Season.',
        image: '/assets/industry-videos/roofing.webp',
        video: '/assets/industry-videos/roofing.mp4',
        link: '/solutions/roofing'
    },
    {
        id: 'dental',
        category: 'Medical',
        title: 'The Practice Filler',
        stat: 'Reduces Front Desk Admin by 70%.',
        image: '/assets/industry-videos/dental.webp',
        video: '/assets/industry-videos/dental.mp4',
        link: '/solutions/dental'
    },
    {
        id: 'chiropractic',
        category: 'Medical',
        title: 'The Patient Intake',
        stat: 'Verifies Insurance & Books Plans of Care.',
        image: '/assets/industry-videos/chiro.webp',
        video: '/assets/industry-videos/chiro.mp4',
        link: '/solutions/chiropractors'
    },
    {
        id: 'auto-detailing',
        category: 'Trades',
        title: 'The Ceramic Closer',
        stat: 'Automated Deposit Collection.',
        image: '/assets/industry-videos/detailing.webp',
        video: '/assets/industry-videos/detailing.mp4',
        link: '/solutions/auto-detailing'
    },
    {
        id: 'landscaping',
        category: 'Home Services',
        title: 'The Spring Scheduler',
        stat: 'Routes Crews & Books Estimates.',
        image: '/assets/industry-videos/landscaping.webp',
        video: '/assets/industry-videos/landscaping.mp4',
        link: '/solutions/landscaping'
    }
];

const categories = ['All', 'Home Services', 'Medical', 'Trades'];

// Simple Play Icon Component for inline use
const PlayIcon = ({ size, fill }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
        <path d="M8 5v14l11-7z" />
    </svg>
);

// Close Icon
const CloseIcon = ({ size, fill }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const VideoModal = ({ videoSrc, onClose }) => {
    // Close on escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // Close on click outside
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-40 flex items-center justify-center bg-ink/60 p-4 transition-opacity duration-300"
            onClick={handleBackdropClick}
        >
            <div className="relative w-full max-w-4xl bg-paper rounded-[2px] overflow-hidden border border-line">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-paper hover:bg-green-faint rounded-full text-ink transition-colors border border-line cursor-pointer"
                    aria-label="Close video"
                >
                    <CloseIcon size={24} fill="currentColor" />
                </button>
                <div className="relative aspect-video w-full bg-ink">
                    <video
                        src={videoSrc}
                        className="w-full h-full"
                        controls
                        autoPlay
                        playsInline
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
    );
};

export default function IndustriesVault() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeVideo, setActiveVideo] = useState(null);

    const filteredIndustries = activeCategory === 'All'
        ? industries
        : industries.filter(ind => ind.category === activeCategory);

    const openVideo = (videoPath) => {
        setActiveVideo(videoPath);
    };

    const closeVideo = () => {
        setActiveVideo(null);
    };

    return (
        <div className="w-full max-w-7xl mx-auto">
            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2 rounded-[2px] text-sm font-medium transition-colors duration-300 border cursor-pointer ${activeCategory === cat
                            ? 'bg-green border-green text-paper-lit'
                            : 'bg-paper border-line text-muted hover:text-ink hover:border-ink'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 content-center place-items-stretch">
                {filteredIndustries.map((item, index) => {
                    let gridClass = "";
                    if (filteredIndustries.length === 7 && index === 6) {
                        gridClass = "md:col-span-2 md:max-w-[50%] md:mx-auto md:w-full lg:col-span-1 lg:max-w-none lg:mx-0 lg:col-start-2";
                    }

                    return (
                        <div
                            key={item.id}
                            className={`group relative overflow-hidden rounded-[2px] bg-paper border border-line hover:border-green transition-colors duration-300 flex flex-col ${gridClass}`}
                        >
                            {/* Top Half - Demo still (real screen content) */}
                            <div className="relative aspect-video w-full overflow-hidden bg-ink border-b border-line">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    loading="lazy"
                                    className="h-full w-full object-cover"
                                />

                                {/* Play Button Overlay on Image */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-ink/25">
                                    <button
                                        onClick={() => openVideo(item.video)}
                                        className="h-16 w-16 flex items-center justify-center rounded-full bg-paper text-green border border-line hover:bg-green-faint transition-colors cursor-pointer"
                                        aria-label={`Play ${item.title} demo`}
                                    >
                                        <PlayIcon size={32} fill="currentColor" />
                                    </button>
                                </div>
                            </div>

                            {/* Bottom Half - Content */}
                            <div className="p-6 relative z-10 flex flex-col flex-1">
                                <h3 className="text-xl font-bold text-ink mb-2">{item.title}</h3>
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="inline-block w-2 h-2 rounded-full bg-copper"></span>
                                    <p className="font-mono text-[12px] text-muted">{item.stat}</p>
                                </div>

                                <div className="mt-auto flex items-center justify-between gap-4">
                                    <button
                                        onClick={() => openVideo(item.video)}
                                        className="flex h-10 w-10 min-w-[40px] items-center justify-center rounded-full bg-green text-paper-lit hover:bg-green-hover transition-colors cursor-pointer"
                                        aria-label="Play video demo"
                                    >
                                        <PlayIcon size={18} fill="currentColor" />
                                    </button>

                                    <a href={item.link} className="flex-1 block">
                                        <button className="w-full rounded-[2px] border border-ink bg-paper py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.04em] text-ink hover:text-green hover:border-green transition-colors cursor-pointer">
                                            View Blueprint
                                        </button>
                                    </a>
                                </div>
                            </div>

                        </div>
                    );
                })}
            </div>

            {/* Video Modal */}
            {activeVideo && (
                <VideoModal videoSrc={activeVideo} onClose={closeVideo} />
            )}
        </div>
    );
}
