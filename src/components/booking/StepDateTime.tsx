'use client';

import { useState, useMemo } from 'react';
import { BookingState, BookingAction } from '@/types';
import { cn } from '@/lib/utils';

interface StepDateTimeProps {
  state: BookingState;
  dispatch: React.Dispatch<BookingAction>;
  onNext: () => void;
  onBack: () => void;
}

function getTimeSlots(): { time: string; available: boolean }[] {
  const slots: { time: string; available: boolean }[] = [];
  for (let hour = 9; hour < 19; hour++) {
    for (let min = 0; min < 60; min += 30) {
      const h = hour > 12 ? hour - 12 : hour;
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const time = `${h}:${min.toString().padStart(2, '0')} ${ampm}`;
      const available = (hour + min) % 7 !== 0;
      slots.push({ time, available });
    }
  }
  return slots;
}

export default function StepDateTime({ state, dispatch, onNext, onBack }: StepDateTimeProps) {
  const today = new Date();
  const [calendarMonth, setCalendarMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const timeSlots = useMemo(getTimeSlots, []);

  const todayStr = today.toISOString().split('T')[0];

  const year = calendarMonth.getFullYear();
  const month = calendarMonth.getMonth();

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const grid: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) grid.push(null);
    for (let d = 1; d <= daysInMonth; d++) grid.push(d);
    return grid;
  }, [year, month]);

  const monthLabel = calendarMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const canGoPrev = !(year === today.getFullYear() && month === today.getMonth());

  const changeMonth = (offset: number) => {
    setCalendarMonth((prev) => {
      const next = new Date(prev);
      next.setMonth(next.getMonth() + offset);
      return next;
    });
  };

  return (
    <div>
      {/* Date Selection — Calendar */}
      <div className="mb-8">
        <h3 className="font-semibold text-dark mb-4">Select a Date</h3>
        <div className="bg-white rounded-xl border border-gray-200 p-4 max-w-sm">
          {/* Month nav */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => canGoPrev && changeMonth(-1)}
              disabled={!canGoPrev}
              className={cn(
                'p-1.5 rounded-lg transition-colors',
                canGoPrev ? 'hover:bg-gray-100' : 'opacity-30 cursor-not-allowed'
              )}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="font-semibold text-sm">{monthLabel}</span>
            <button
              onClick={() => changeMonth(1)}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
              <div key={i} className="text-center text-xs font-medium text-gray-400 py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, i) => {
              if (day === null) return <div key={`empty-${i}`} />;

              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const isPast = dateStr < todayStr;
              const isSelected = state.selectedDate === dateStr;
              const isToday = dateStr === todayStr;

              return (
                <button
                  key={dateStr}
                  onClick={() => !isPast && dispatch({ type: 'SET_DATE', date: dateStr })}
                  disabled={isPast}
                  className={cn(
                    'py-2 rounded-lg text-sm font-medium transition-all',
                    isPast
                      ? 'text-gray-200 cursor-not-allowed'
                      : isSelected
                      ? 'bg-primary text-white'
                      : isToday
                      ? 'bg-primary/10 text-primary font-bold hover:bg-primary/20'
                      : 'hover:bg-gray-100 text-dark'
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Time Selection */}
      {state.selectedDate && (
        <div className="mb-8">
          <h3 className="font-semibold text-dark mb-4">Select a Time</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot.time}
                onClick={() => slot.available && dispatch({ type: 'SET_TIME', time: slot.time })}
                disabled={!slot.available}
                className={cn(
                  'py-3 px-2 rounded-xl text-sm font-medium transition-all',
                  !slot.available
                    ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                    : state.selectedTime === slot.time
                    ? 'bg-primary text-white'
                    : 'bg-white border border-gray-200 text-dark hover:border-primary'
                )}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-full font-semibold text-dark/60 hover:text-dark transition-colors"
        >
          &larr; Back
        </button>
        <button
          onClick={onNext}
          disabled={!state.selectedDate || !state.selectedTime}
          className={cn(
            'px-8 py-3 rounded-full font-semibold text-white transition-all',
            state.selectedDate && state.selectedTime
              ? 'bg-primary hover:bg-primary-dark'
              : 'bg-gray-300 cursor-not-allowed'
          )}
        >
          Next Step
        </button>
      </div>
    </div>
  );
}
