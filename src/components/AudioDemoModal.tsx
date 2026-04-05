import { useState } from 'react';

type Props = {
  videoSrc: string;
  industryName: string;
};

export default function AudioDemoModal({ videoSrc, industryName }: Props) {
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 text-white font-semibold text-sm transition-all duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
        </svg>
        Watch Voice AI Demo
      </button>

      {/* Modal — only mounts when open */}
      {open && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}
        >
          <div className="relative w-full max-w-2xl bg-[#111] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/8">
              <div>
                <div className="text-xs font-mono tracking-widest uppercase text-accent mb-1">Voice AI Demo</div>
                <div className="text-white font-bold text-lg">{industryName} AI Agent</div>
              </div>
              <button
                onClick={close}
                className="text-white/40 hover:text-white transition-colors p-2"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Video player — mounts fresh each open */}
            <div className="p-4">
              <video
                src={videoSrc}
                controls
                autoPlay
                className="w-full rounded-lg"
                style={{ maxHeight: '60vh' }}
              />
            </div>

            {/* Footer */}
            <div className="px-6 pb-5 text-center">
              <p className="text-secondary text-xs">This is a real AI voice agent — not a human recording.</p>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
