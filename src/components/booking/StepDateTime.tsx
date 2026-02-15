'use client';

import { useMemo } from 'react';
import { BookingState, BookingAction } from '@/types';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

interface StepDateTimeProps {
  state: BookingState;
  dispatch: React.Dispatch<BookingAction>;
  onNext: () => void;
  onBack: () => void;
}

function getNext14Days(): { dateStr: string; dayName: string; dayNum: number; monthStr: string }[] {
  const days: { dateStr: string; dayName: string; dayNum: number; monthStr: string }[] = [];
  const today = new Date();

  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push({
      dateStr: date.toISOString().split('T')[0],
      dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNum: date.getDate(),
      monthStr: date.toLocaleDateString('en-US', { month: 'short' }),
    });
  }

  return days;
}

function getTimeSlots(): { time: string; available: boolean }[] {
  const slots: { time: string; available: boolean }[] = [];
  for (let hour = 9; hour < 19; hour++) {
    for (let min = 0; min < 60; min += 30) {
      const h = hour > 12 ? hour - 12 : hour;
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const time = `${h}:${min.toString().padStart(2, '0')} ${ampm}`;
      // Mock availability: randomly make some slots unavailable
      const available = (hour + min) % 7 !== 0;
      slots.push({ time, available });
    }
  }
  return slots;
}

export default function StepDateTime({ state, dispatch, onNext, onBack }: StepDateTimeProps) {
  const days = useMemo(getNext14Days, []);
  const timeSlots = useMemo(getTimeSlots, []);

  return (
    <div>
      {/* Date Selection */}
      <div className="mb-8">
        <h3 className="font-semibold text-dark mb-4">Select a Date</h3>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
          {days.map((day) => (
            <motion.button
              key={day.dateStr}
              whileTap={{ scale: 0.95 }}
              onClick={() => dispatch({ type: 'SET_DATE', date: day.dateStr })}
              className={cn(
                'flex flex-col items-center min-w-[72px] px-3 py-3 rounded-xl border-2 transition-all shrink-0',
                state.selectedDate === day.dateStr
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 bg-white hover:border-primary/50'
              )}
            >
              <span className="text-xs text-dark/50 font-medium">{day.dayName}</span>
              <span className="text-xl font-bold text-dark mt-1">{day.dayNum}</span>
              <span className="text-xs text-dark/50">{day.monthStr}</span>
            </motion.button>
          ))}
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
