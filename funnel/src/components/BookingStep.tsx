import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Logo } from './Logo';
import { TrustBadge } from './TrustBadge';
import { CALENDLY_URL } from '../config/brand';

interface BookingStepProps {
  answers: Record<string, string>;
  onReset: () => void;
}

const badges = [
  { icon: '\u{1F3C6}', label: 'Growth Champion 2026' },
  { icon: '\u{1F6E1}\u{FE0F}', label: 'ISO 9001 Certified' },
  { icon: '⭐', label: '5.0 Rated' },
];

export function BookingStep({ answers, onReset }: BookingStepProps) {
  const reducedMotion = useReducedMotion();
  const name = `${answers.firstName ?? ''} ${answers.lastName ?? ''}`.trim();
  const email = answers.email ?? '';

  const calendlyUrl = `${CALENDLY_URL}?hide_gdpr_banner=1&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;

  useEffect(() => {
    const existing = document.querySelector('script[src*="calendly.com"]');
    if (!existing) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-screen bg-obsidian font-display">
      <header className="sticky top-0 z-50 backdrop-blur-[14px] bg-obsidian/70 border-b border-steel">
        <nav className="max-w-[1200px] mx-auto h-[66px] px-6 flex items-center justify-between">
          <Logo />
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-mono uppercase tracking-widest text-muted hover:text-fog transition-colors focus-ember rounded px-2 py-1"
          >
            Start over
          </button>
        </nav>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 py-12 md:py-20">
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.5, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start"
        >
          {/* Left column */}
          <div>
            <span className="inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-iris-teal mb-4">
              Almost there
            </span>
            <h1 className="text-cloud text-3xl md:text-4xl font-extrabold tracking-tight mb-8">
              One step left&hellip;
            </h1>

            {/* Video placeholder */}
            <div className="relative aspect-video rounded-card border border-steel overflow-hidden bg-gradient-to-br from-graphite via-obsidian to-graphite mb-6">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <button
                  type="button"
                  aria-label="Play thank-you video"
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-ember to-ember-dark flex items-center justify-center shadow-[0_8px_30px_rgba(245,147,61,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-transform focus-ember"
                >
                  <span className="block w-0 h-0 border-l-[16px] border-l-obsidian border-y-[10px] border-y-transparent ml-1" />
                </button>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                  Thank-you message
                </span>
              </div>
            </div>

            <h2 className="text-cloud text-xl md:text-2xl font-bold tracking-tight mb-6">
              Book your strategy call now.
            </h2>

            <div className="flex flex-wrap gap-3">
              {badges.map((b) => (
                <TrustBadge key={b.label} icon={b.icon} label={b.label} />
              ))}
            </div>
          </div>

          {/* Right column — Calendly */}
          <div className="bg-white rounded-card overflow-hidden shadow-2xl min-h-[680px]">
            <div
              className="calendly-inline-widget"
              data-url={calendlyUrl}
              style={{ minWidth: '280px', height: '680px' }}
            />
          </div>
        </motion.div>
      </main>
    </div>
  );
}
