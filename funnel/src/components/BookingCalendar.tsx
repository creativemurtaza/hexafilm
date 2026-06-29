import { useState, useMemo } from 'react';

interface BookingCalendarProps {
  selected: Date | null;
  onSelect: (date: Date) => void;
}

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function BookingCalendar({ selected, onSelect }: BookingCalendarProps) {
  const today = startOfDay(new Date());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const days = useMemo(() => {
    const first = new Date(viewYear, viewMonth, 1);
    const lastDate = new Date(viewYear, viewMonth + 1, 0).getDate();
    // Monday = 0 offset
    let startDay = first.getDay() - 1;
    if (startDay < 0) startDay = 6;

    const cells: (Date | null)[] = [];
    for (let i = 0; i < startDay; i++) cells.push(null);
    for (let d = 1; d <= lastDate; d++) cells.push(new Date(viewYear, viewMonth, d));
    return cells;
  }, [viewYear, viewMonth]);

  const monthLabel = new Date(viewYear, viewMonth).toLocaleString('en-US', { month: 'long', year: 'numeric' });

  function prev() {
    if (viewMonth === 0) { setViewYear((y) => y - 1); setViewMonth(11); }
    else setViewMonth((m) => m - 1);
  }

  function next() {
    if (viewMonth === 11) { setViewYear((y) => y + 1); setViewMonth(0); }
    else setViewMonth((m) => m + 1);
  }

  const canGoPrev = viewYear > today.getFullYear() || (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  return (
    <div>
      {/* Month nav */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={prev}
          disabled={!canGoPrev}
          aria-label="Previous month"
          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="text-sm font-semibold text-gray-900">{monthLabel}</span>
        <button
          type="button"
          onClick={next}
          aria-label="Next month"
          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-0 mb-1">
        {DAY_LABELS.map((d) => (
          <div key={d} className="text-center text-[11px] font-medium text-gray-400 uppercase tracking-wider py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-0.5" role="grid" aria-label="Calendar">
        {days.map((date, i) => {
          if (!date) return <div key={`empty-${i}`} />;

          const isPast = date < today;
          const isToday = isSameDay(date, today);
          const isSelected = selected && isSameDay(date, selected);

          return (
            <button
              key={date.toISOString()}
              type="button"
              disabled={isPast}
              onClick={() => onSelect(date)}
              aria-label={date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              aria-pressed={!!isSelected}
              className={`
                relative w-full aspect-square flex items-center justify-center rounded-lg text-sm font-medium
                transition-colors duration-150
                ${isPast ? 'text-gray-300 cursor-not-allowed' : ''}
                ${!isPast && !isSelected ? 'text-gray-700 hover:bg-orange-50 hover:text-orange-600' : ''}
                ${isSelected ? 'bg-[#F5933D] text-white shadow-sm' : ''}
              `}
            >
              {date.getDate()}
              {isToday && !isSelected && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#F5933D]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
