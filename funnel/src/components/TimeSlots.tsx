import { useMemo } from 'react';

interface TimeSlotsProps {
  date: Date;
  selected: string | null;
  onSelect: (time: string) => void;
  onBack: () => void;
}

const START_HOUR = 9;
const END_HOUR = 21;
const SLOT_MINUTES = 30;

function formatTime(hour: number, minute: number): string {
  const period = hour >= 12 ? 'PM' : 'AM';
  const h = hour % 12 || 12;
  const m = minute.toString().padStart(2, '0');
  return `${h}:${m} ${period}`;
}

export function TimeSlots({ date, selected, onSelect, onBack }: TimeSlotsProps) {
  const slots = useMemo(() => {
    const result: string[] = [];
    for (let h = START_HOUR; h < END_HOUR; h++) {
      for (let m = 0; m < 60; m += SLOT_MINUTES) {
        result.push(formatTime(h, m));
      }
    }
    return result;
  }, []);

  const dateLabel = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="mb-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-3"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
        <p className="text-sm font-semibold text-gray-900">{dateLabel}</p>
        <p className="text-xs text-gray-400 mt-0.5">{tz}</p>
      </div>

      {/* Slots */}
      <div className="flex-1 overflow-y-auto -mx-1 px-1">
        <div className="grid grid-cols-2 gap-2">
          {slots.map((time) => {
            const isSelected = selected === time;
            return (
              <button
                key={time}
                type="button"
                onClick={() => onSelect(time)}
                aria-pressed={isSelected}
                className={`
                  py-2.5 px-3 rounded-lg text-sm font-medium text-center
                  transition-colors duration-150 border
                  ${isSelected
                    ? 'bg-[#F5933D] text-white border-[#F5933D] shadow-sm'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-[#F5933D] hover:text-[#F5933D]'
                  }
                `}
              >
                {time}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
