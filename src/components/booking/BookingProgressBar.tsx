'use client';

import { cn } from '@/lib/utils';

const steps = ['Services', 'Technician', 'Date & Time', 'Confirm'];

interface BookingProgressBarProps {
  currentStep: number;
}

export default function BookingProgressBar({ currentStep }: BookingProgressBarProps) {
  return (
    <div className="flex items-center justify-between max-w-2xl mx-auto mb-12">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center flex-1 last:flex-none">
          {/* Step circle */}
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300',
                index <= currentStep
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-400'
              )}
            >
              {index < currentStep ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            <span
              className={cn(
                'text-xs mt-2 font-medium hidden sm:block',
                index <= currentStep ? 'text-primary' : 'text-gray-400'
              )}
            >
              {step}
            </span>
          </div>

          {/* Connector line */}
          {index < steps.length - 1 && (
            <div className="flex-1 mx-3">
              <div
                className={cn(
                  'h-1 rounded-full transition-all duration-500',
                  index < currentStep ? 'bg-primary' : 'bg-gray-200'
                )}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
