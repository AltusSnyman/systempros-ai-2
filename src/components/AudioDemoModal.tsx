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
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] bg-transparent border border-ink text-ink hover:text-green hover:border-green font-semibold text-sm transition-colors duration-300 cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
        </svg>
        Watch Voice AI Demo
      </button>

      {/* Modal — only mounts when open */}
      {open && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-ink/60 p-4"
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}
        >
          <div className="relative w-full max-w-2xl bg-paper rounded-[2px] border border-line overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-line">
              <div>
                <div className="font-mono text-[11px] tracking-[0.04em] uppercase text-copper mb-1">Voice AI Demo</div>
                <div className="text-ink font-bold text-lg">{industryName} AI Agent</div>
              </div>
              <button
                onClick={close}
                className="text-muted hover:text-ink transition-colors p-2 cursor-pointer"
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
                className="w-full rounded-[2px] border border-line"
                style={{ maxHeight: '60vh' }}
              />
            </div>

            {/* Footer */}
            <div className="px-6 pb-5 text-center">
              <p className="font-mono text-[11px] tracking-[0.04em] uppercase text-muted">This is a real AI voice agent — not a human recording.</p>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
