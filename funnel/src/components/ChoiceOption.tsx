import { motion, useReducedMotion } from 'framer-motion';

interface ChoiceOptionProps {
  letter: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}

export function ChoiceOption({ letter, label, selected, onClick }: ChoiceOptionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={reducedMotion ? {} : { y: -2 }}
      whileTap={reducedMotion ? {} : { scale: 0.98 }}
      className={`
        w-full flex items-center gap-4 px-5 py-4 rounded-btn border text-left
        transition-colors duration-150 focus-ember
        ${
          selected
            ? 'border-ember bg-ember/10 text-cloud'
            : 'border-steel bg-graphite/50 text-fog hover:border-ember/50 hover:bg-ember/5'
        }
      `}
      aria-pressed={selected}
    >
      <span
        className={`
          flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
          font-mono text-sm font-semibold uppercase tracking-wider
          transition-colors duration-150
          ${selected ? 'bg-ember text-obsidian' : 'bg-steel/60 text-fog'}
        `}
      >
        {letter}
      </span>
      <span className="text-[15px] font-medium">{label}</span>
    </motion.button>
  );
}
