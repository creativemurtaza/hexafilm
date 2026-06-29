import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Logo } from './components/Logo';
import { ProgressBar } from './components/ProgressBar';
import { FunnelStep } from './components/FunnelStep';
import { ChoiceOption } from './components/ChoiceOption';
import { TextInput } from './components/TextInput';
import { PhoneInput } from './components/PhoneInput';
import { NavigationButtons } from './components/NavigationButtons';
import { BookingStep } from './components/BookingStep';
import { steps } from './config/funnelConfig';
import { useFunnelState } from './hooks/useFunnelState';

export default function App() {
  const {
    currentStep,
    answers,
    errors,
    phase,
    setPhase,
    setAnswer,
    validate,
    goToStep,
    resetFunnel,
    isLastStep,
    canGoPrev,
    totalSteps,
  } = useFunnelState();

  const [direction, setDirection] = useState(1);
  const reducedMotion = useReducedMotion();
  const step = steps[currentStep];

  const handleNext = useCallback(() => {
    if (!validate()) return;

    if (isLastStep) {
      fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answers),
      }).catch(() => {});

      setPhase('qualifying');
      setTimeout(() => setPhase('booking'), 2200);
    } else {
      setDirection(1);
      goToStep(currentStep + 1);
    }
  }, [validate, isLastStep, answers, setPhase, goToStep, currentStep]);

  const handlePrev = useCallback(() => {
    if (canGoPrev) {
      setDirection(-1);
      goToStep(currentStep - 1);
    }
  }, [canGoPrev, goToStep, currentStep]);

  useEffect(() => {
    if (phase !== 'funnel') return;

    function handleKeyDown(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      const inInput = tag === 'INPUT' || tag === 'TEXTAREA';

      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleNext();
        return;
      }

      if (inInput) return;

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleNext();
      }

      if (step.type === 'choice' && step.choices && step.answerKey) {
        const idx = e.key.toUpperCase().charCodeAt(0) - 65;
        if (idx >= 0 && idx < step.choices.length) {
          setAnswer(step.answerKey, step.choices[idx].value);
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, step, handleNext, handlePrev, setAnswer]);

  // --- Qualifying transition ---
  if (phase === 'qualifying') {
    return (
      <div className="min-h-screen bg-obsidian font-display flex items-center justify-center">
        <motion.div
          initial={reducedMotion ? {} : { scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.5, ease: 'easeOut' }}
          className="text-center px-6"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-ember/15 flex items-center justify-center">
            <motion.svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              initial={reducedMotion ? {} : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.2 }}
            >
              <motion.path
                d="M8 18l7 7 13-13"
                stroke="#F5933D"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={reducedMotion ? {} : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.2 }}
              />
            </motion.svg>
          </div>
          <h2 className="text-cloud text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
            Great &mdash; you qualify
          </h2>
          <p className="text-fog text-lg">Preparing your booking&hellip;</p>
        </motion.div>
      </div>
    );
  }

  // --- Booking phase ---
  if (phase === 'booking') {
    return <BookingStep answers={answers} onReset={resetFunnel} />;
  }

  // --- Funnel phase ---
  return (
    <div className="min-h-screen bg-obsidian font-display bg-[radial-gradient(900px_500px_at_80%_-5%,rgba(245,147,61,0.08),transparent_60%),radial-gradient(800px_600px_at_-5%_8%,rgba(47,211,192,0.05),transparent_55%)]">
      {/* Sticky header */}
      <header className="sticky top-0 z-50 backdrop-blur-[14px] bg-obsidian/70 border-b border-steel">
        <nav className="max-w-[1200px] mx-auto h-[66px] px-6 flex items-center">
          <Logo />
        </nav>
      </header>

      {/* Main */}
      <main className="flex flex-col items-center px-4 sm:px-6 pt-8 sm:pt-14 pb-20">
        {/* Headline */}
        <div className="text-center mb-8 sm:mb-12 max-w-lg">
          <h1 className="text-cloud text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-snug">
            Thanks for your interest.{' '}
            <span className="inline-block">
              Let&apos;s{' '}
              <span className="underline-accent">book your call</span>.
            </span>
          </h1>
        </div>

        {/* Card */}
        <div className="w-full max-w-[640px] bg-graphite border border-steel rounded-card p-6 sm:p-8 md:p-10 shadow-2xl">
          <ProgressBar current={currentStep} total={totalSteps} />

          <AnimatePresence mode="wait" custom={direction}>
            <FunnelStep
              key={step.id}
              stepNumber={step.number}
              question={step.question}
              direction={direction}
            >
              {/* Text inputs */}
              {step.type === 'text' &&
                step.fields?.map((field, i) =>
                  field.isPhone ? (
                    <PhoneInput
                      key={field.key}
                      phoneValue={answers.phone ?? ''}
                      codeValue={answers.phoneCode ?? 'US'}
                      error={errors[field.key]}
                      autoFocus={i === 0}
                      onPhoneChange={setAnswer}
                      onCodeChange={setAnswer}
                      onEnter={handleNext}
                    />
                  ) : (
                    <TextInput
                      key={field.key}
                      fieldKey={field.key}
                      label={field.label}
                      placeholder={field.placeholder}
                      type={field.type}
                      value={answers[field.key] ?? ''}
                      error={errors[field.key]}
                      autoFocus={i === 0}
                      onChange={setAnswer}
                      onEnter={handleNext}
                    />
                  ),
                )}

              {/* Choice options */}
              {step.type === 'choice' && (
                <div className="flex flex-col gap-3" role="radiogroup" aria-label={step.question}>
                  {step.choices?.map((choice) => (
                    <ChoiceOption
                      key={choice.value}
                      letter={choice.letter}
                      label={choice.label}
                      selected={answers[step.answerKey!] === choice.value}
                      onClick={() => setAnswer(step.answerKey!, choice.value)}
                    />
                  ))}
                  {step.answerKey && errors[step.answerKey] && (
                    <p className="text-sm text-red-400 mt-1" role="alert">
                      {errors[step.answerKey]}
                    </p>
                  )}
                </div>
              )}

              <NavigationButtons
                onPrev={handlePrev}
                onNext={handleNext}
                canPrev={canGoPrev}
                submitLabel={step.submitLabel}
              />
            </FunnelStep>
          </AnimatePresence>
        </div>

        {/* Tagline */}
        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-muted/60">
          Cinema at AI speed
        </p>
      </main>
    </div>
  );
}
