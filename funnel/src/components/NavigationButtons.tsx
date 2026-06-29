interface NavigationButtonsProps {
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  submitLabel: string;
}

export function NavigationButtons({ onPrev, onNext, canPrev, submitLabel }: NavigationButtonsProps) {
  const isSubmit = submitLabel === 'Submit';

  return (
    <div className="flex items-center justify-between mt-8">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onNext}
          className="
            inline-flex items-center gap-2 px-6 py-3 rounded-btn font-semibold text-sm
            bg-gradient-to-r from-ember to-ember-dark text-obsidian
            shadow-[0_8px_26px_rgba(245,147,61,0.28)]
            hover:shadow-[0_12px_32px_rgba(245,147,61,0.4)]
            hover:-translate-y-0.5 active:translate-y-0
            transition-all duration-200 focus-ember
          "
        >
          {submitLabel}
          {!isSubmit && <span aria-hidden="true">&#10003;</span>}
        </button>
        <span className="text-muted text-xs font-mono hidden sm:inline">
          press <kbd className="px-1.5 py-0.5 rounded bg-steel/60 text-fog text-[11px]">Enter</kbd>
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={onPrev}
          disabled={!canPrev}
          aria-label="Previous step"
          className="
            w-9 h-9 rounded-lg border border-steel flex items-center justify-center
            text-fog hover:border-fog hover:text-cloud
            disabled:opacity-30 disabled:cursor-not-allowed
            transition-colors duration-150 focus-ember
          "
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M7 11V3M3 7l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label="Next step"
          className="
            w-9 h-9 rounded-lg border border-steel flex items-center justify-center
            text-fog hover:border-fog hover:text-cloud
            transition-colors duration-150 focus-ember
          "
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M7 3v8M3 7l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
