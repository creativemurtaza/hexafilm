import { motion, useReducedMotion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const reducedMotion = useReducedMotion();
  const pct = Math.round(((current + 1) / total) * 100);

  return (
    <div className="mb-8" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Funnel progress">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          Step {current + 1} of {total}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ember">
          {pct}%
        </span>
      </div>
      <div className="h-1 w-full rounded-full bg-steel/50 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-ember to-ember-dark"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </div>
  );
}
