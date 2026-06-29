import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Logo } from './Logo';
import { TrustBadge } from './TrustBadge';
import { BookingCalendar } from './BookingCalendar';
import { TimeSlots } from './TimeSlots';

interface BookingStepProps {
  answers: Record<string, string>;
  onReset: () => void;
}

type BookingPhase = 'date' | 'time' | 'confirm' | 'done';

const badges = [
  { icon: '\u{1F3C6}', label: 'Growth Champion 2026' },
  { icon: '\u{1F6E1}\u{FE0F}', label: 'ISO 9001 Certified' },
  { icon: '⭐', label: '5.0 Rated' },
];

export function BookingStep({ answers, onReset }: BookingStepProps) {
  const reducedMotion = useReducedMotion();
  const name = `${answers.firstName ?? ''} ${answers.lastName ?? ''}`.trim();
  const email = answers.email ?? '';

  const [phase, setPhase] = useState<BookingPhase>('date');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  function handleDateSelect(date: Date) {
    setSelectedDate(date);
    setSelectedTime(null);
    setPhase('time');
  }

  function handleTimeSelect(time: string) {
    setSelectedTime(time);
    setPhase('confirm');
  }

  function handleConfirm() {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    fetch('/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        date: selectedDate?.toISOString().split('T')[0],
        time: selectedTime,
        timezone: tz,
        answers,
      }),
    }).catch(() => {});
    setPhase('done');
  }

  const dateLabel = selectedDate?.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

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

          {/* Right column — Booking widget */}
          <div className="bg-white rounded-card overflow-hidden shadow-2xl">
            <div className="p-6 sm:p-8">
              {/* Phase: Pick a date */}
              {phase === 'date' && (
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">Select a date</h3>
                  <p className="text-xs text-gray-400 mb-5">Pick a day for your strategy call</p>
                  <BookingCalendar selected={selectedDate} onSelect={handleDateSelect} />
                </div>
              )}

              {/* Phase: Pick a time */}
              {phase === 'time' && selectedDate && (
                <div className="min-h-[360px] flex flex-col">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">Select a time</h3>
                  <p className="text-xs text-gray-400 mb-4">30-minute strategy call</p>
                  <TimeSlots
                    date={selectedDate}
                    selected={selectedTime}
                    onSelect={handleTimeSelect}
                    onBack={() => setPhase('date')}
                  />
                </div>
              )}

              {/* Phase: Confirm */}
              {phase === 'confirm' && selectedDate && selectedTime && (
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">Confirm your booking</h3>
                  <p className="text-xs text-gray-400 mb-6">Review and confirm your strategy call</p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-[#F5933D] mt-0.5 flex-shrink-0" aria-hidden="true">
                        <rect x="2" y="3" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M2 7h14M6 1v4M12 1v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{dateLabel}</p>
                        <p className="text-sm text-gray-500">{selectedTime} &middot; 30 min</p>
                        <p className="text-xs text-gray-400 mt-0.5">{Intl.DateTimeFormat().resolvedOptions().timeZone}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-[#F5933D] mt-0.5 flex-shrink-0" aria-hidden="true">
                        <circle cx="9" cy="6" r="3.5" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M2 16c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{name}</p>
                        <p className="text-sm text-gray-500">{email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setPhase('time')}
                      className="px-4 py-2.5 rounded-[12px] text-sm font-medium text-gray-500 border border-gray-200 hover:border-gray-300 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirm}
                      className="flex-1 py-2.5 rounded-[12px] text-sm font-semibold text-white bg-[#F5933D] hover:bg-[#E0762A] shadow-sm transition-colors"
                    >
                      Confirm booking
                    </button>
                  </div>
                </div>
              )}

              {/* Phase: Done */}
              {phase === 'done' && (
                <div className="text-center py-8">
                  <motion.div
                    initial={reducedMotion ? {} : { scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={reducedMotion ? { duration: 0 } : { duration: 0.4, ease: 'easeOut' }}
                    className="w-16 h-16 mx-auto mb-5 rounded-full bg-orange-50 flex items-center justify-center"
                  >
                    <motion.svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                    >
                      <motion.path
                        d="M6 14l6 6 10-10"
                        stroke="#F5933D"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={reducedMotion ? {} : { pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={reducedMotion ? { duration: 0 } : { duration: 0.5, delay: 0.2 }}
                      />
                    </motion.svg>
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">You&apos;re booked!</h3>
                  <p className="text-sm text-gray-500 max-w-xs mx-auto">
                    A calendar invite has been sent to <span className="font-medium text-gray-700">{email}</span>.
                  </p>
                  <div className="mt-6 p-3 rounded-lg bg-gray-50 text-left inline-block">
                    <p className="text-sm font-medium text-gray-900">{dateLabel}</p>
                    <p className="text-sm text-gray-500">{selectedTime} &middot; 30 min</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
