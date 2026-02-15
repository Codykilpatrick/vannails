'use client';

import { Appointment } from '@/types';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

interface AppointmentCalendarProps {
  appointments: Appointment[];
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
  currentMonth: Date;
  onChangeMonth: (offset: number) => void;
}

export default function AppointmentCalendar({
  appointments,
  selectedDate,
  onSelectDate,
  currentMonth,
  onChangeMonth,
}: AppointmentCalendarProps) {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const days = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const grid: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) grid.push(null);
    for (let d = 1; d <= daysInMonth; d++) grid.push(d);

    return grid;
  }, [year, month]);

  const appointmentCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    appointments.forEach((a) => {
      counts[a.date] = (counts[a.date] || 0) + 1;
    });
    return counts;
  }, [appointments]);

  const monthLabel = currentMonth.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => onChangeMonth(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3 className="text-lg font-bold">{monthLabel}</h3>
        <button
          onClick={() => onChangeMonth(1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-xs font-medium text-gray-400 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => {
          if (day === null) {
            return <div key={`empty-${i}`} />;
          }

          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const count = appointmentCounts[dateStr] || 0;
          const isToday = dateStr === todayStr;
          const isSelected = dateStr === selectedDate;

          return (
            <button
              key={dateStr}
              onClick={() => onSelectDate(dateStr)}
              className={cn(
                'relative aspect-square flex flex-col items-center justify-center rounded-lg text-sm transition-all',
                isSelected
                  ? 'bg-primary text-white'
                  : isToday
                  ? 'bg-primary/10 text-primary font-bold'
                  : 'hover:bg-gray-50'
              )}
            >
              <span>{day}</span>
              {count > 0 && (
                <span
                  className={cn(
                    'text-[10px] font-bold mt-0.5',
                    isSelected ? 'text-white/80' : 'text-primary'
                  )}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
