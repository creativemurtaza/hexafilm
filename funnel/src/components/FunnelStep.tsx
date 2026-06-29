import { type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface FunnelStepProps {
  stepNumber: number;
  question: string;
  direction: number;
  children: ReactNode;
}

const variants = {
  enter: (direction: number) => ({
    y: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    y: direction > 0 ? -40 : 40,
    opacity: 0,
  }),
};

export function FunnelStep({ stepNumber, question, direction, children }: FunnelStepProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      custom={direction}
      variants={reducedMotion ? undefined : variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={
        reducedMotion
          ? { duration: 0 }
          : { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
      }
    >
      <div className="flex items-center gap-3 mb-5">
        <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-ember/15 flex items-center justify-center font-mono text-xs font-semibold text-ember">
          {stepNumber}
        </span>
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none" className="text-muted" aria-hidden="true">
          <path d="M1 5h12M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <h2 className="text-cloud text-2xl md:text-3xl font-bold tracking-tight mb-6">
        {question}
      </h2>

      {children}
    </motion.div>
  );
}
