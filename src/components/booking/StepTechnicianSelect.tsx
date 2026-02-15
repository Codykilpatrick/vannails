'use client';

import { technicians } from '@/data/technicians';
import { BookingState, BookingAction, Technician } from '@/types';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import Badge from '@/components/ui/Badge';

interface StepTechnicianSelectProps {
  state: BookingState;
  dispatch: React.Dispatch<BookingAction>;
  onNext: () => void;
  onBack: () => void;
}

export default function StepTechnicianSelect({
  state,
  dispatch,
  onNext,
  onBack,
}: StepTechnicianSelectProps) {
  const handleSelect = (tech: Technician | null) => {
    dispatch({ type: 'SET_TECHNICIAN', technician: tech });
  };

  return (
    <div>
      <p className="text-dark/60 mb-8">
        Choose your preferred technician or select &ldquo;No Preference&rdquo; and we&apos;ll assign the best available.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {/* No Preference */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect(null)}
          className={cn(
            'text-center p-6 rounded-xl border-2 transition-all',
            state.selectedTechnician === null
              ? 'border-primary bg-primary/5'
              : 'border-gray-200 bg-white hover:border-primary/50'
          )}
        >
          <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-3">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div className="font-semibold text-dark">No Preference</div>
          <div className="text-xs text-dark/50 mt-1">We&apos;ll choose the best available</div>
        </motion.button>

        {/* Technicians */}
        {technicians.filter((t) => t.active).map((tech) => (
          <motion.button
            key={tech.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(tech)}
            className={cn(
              'text-center p-6 rounded-xl border-2 transition-all',
              state.selectedTechnician?.id === tech.id
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 bg-white hover:border-primary/50'
            )}
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-3">
              <span className="text-xl text-white font-bold">
                {tech.name.split(' ').map((n) => n[0]).join('')}
              </span>
            </div>
            <div className="font-semibold text-dark">{tech.name}</div>
            <div className="flex flex-wrap justify-center gap-1 mt-3">
              {tech.specialties.slice(0, 2).map((s) => (
                <Badge key={s} variant="primary">{s}</Badge>
              ))}
            </div>
          </motion.button>
        ))}
      </div>

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
          className="px-8 py-3 rounded-full font-semibold bg-primary text-white hover:bg-primary-dark transition-colors"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}
