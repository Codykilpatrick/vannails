'use client';

import { services } from '@/data/services';
import { BookingState, BookingAction, ServiceCategory, SERVICE_CATEGORIES, Service } from '@/types';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/utils';
import { motion } from 'motion/react';

interface StepServiceSelectProps {
  state: BookingState;
  dispatch: React.Dispatch<BookingAction>;
  onNext: () => void;
}

export default function StepServiceSelect({ state, dispatch, onNext }: StepServiceSelectProps) {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('Manicure');
  const filteredServices = services.filter((s) => s.category === activeCategory);

  const totalPrice = state.selectedServices.reduce((sum, s) => sum + s.price, 0);
  const isSelected = (service: Service) =>
    state.selectedServices.some((s) => s.id === service.id);

  return (
    <div>
      {/* Guest Count */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-dark mb-3">
          Number of Guests
        </label>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((count) => (
            <button
              key={count}
              onClick={() => dispatch({ type: 'SET_GUEST_COUNT', count })}
              className={cn(
                'w-11 h-11 rounded-full text-sm font-semibold transition-all',
                state.guestCount === count
                  ? 'bg-primary text-white'
                  : 'bg-white text-dark border border-gray-200 hover:border-primary'
              )}
            >
              {count}
            </button>
          ))}
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {SERVICE_CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all',
              activeCategory === category
                ? 'bg-primary text-white'
                : 'bg-white text-dark/60 border border-gray-200 hover:border-primary'
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {filteredServices.map((service) => (
          <motion.button
            key={service.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => dispatch({ type: 'TOGGLE_SERVICE', service })}
            className={cn(
              'text-left p-4 rounded-xl border-2 transition-all',
              isSelected(service)
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 bg-white hover:border-primary/50'
            )}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <div className="font-medium text-dark text-sm">{service.name}</div>
                <div className="text-xs text-dark/50 mt-1">{service.duration} min</div>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-3">
                <span className="text-primary font-bold">{formatCurrency(service.price)}</span>
                {isSelected(service) && (
                  <span className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                )}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Running Total + Next */}
      <div className="sticky bottom-0 bg-light/90 backdrop-blur-sm border-t border-gray-200 pt-4 -mx-4 px-4 pb-4 sm:-mx-0 sm:px-0">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-dark/60">
              {state.selectedServices.length} service{state.selectedServices.length !== 1 ? 's' : ''} selected
            </div>
            <div className="text-2xl font-bold text-primary">{formatCurrency(totalPrice)}</div>
          </div>
          <button
            onClick={onNext}
            disabled={state.selectedServices.length === 0}
            className={cn(
              'px-8 py-3 rounded-full font-semibold text-white transition-all',
              state.selectedServices.length > 0
                ? 'bg-primary hover:bg-primary-dark'
                : 'bg-gray-300 cursor-not-allowed'
            )}
          >
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
}
