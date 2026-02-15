'use client';

import { useState } from 'react';
import { BookingState, BookingAction } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface StepConfirmationProps {
  state: BookingState;
  dispatch: React.Dispatch<BookingAction>;
  onBack: () => void;
}

export default function StepConfirmation({ state, dispatch, onBack }: StepConfirmationProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const totalPrice = state.selectedServices.reduce((sum, s) => sum + s.price, 0);

  const handleSubmit = async () => {
    if (!state.customerName || !state.customerPhone || !state.customerEmail) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: state.customerName,
          customerPhone: state.customerPhone,
          customerEmail: state.customerEmail,
          services: state.selectedServices,
          technician: state.selectedTechnician,
          date: state.selectedDate,
          time: state.selectedTime,
          guestCount: state.guestCount,
          totalPrice,
        }),
      });

      if (!res.ok) throw new Error('Booking failed');
      setIsSuccess(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-dark mb-4">Booking Confirmed!</h2>
        <p className="text-dark/60 mb-2">
          Thank you, {state.customerName}! Your appointment has been booked.
        </p>
        <p className="text-dark/60 mb-8">
          {state.selectedDate} at {state.selectedTime}
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors"
        >
          Back to Home
        </a>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Booking Summary */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
        <h3 className="font-bold text-dark text-lg mb-4">Booking Summary</h3>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-dark/60">Guests</span>
            <span className="font-medium">{state.guestCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-dark/60">Technician</span>
            <span className="font-medium">
              {state.selectedTechnician?.name || 'No Preference'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-dark/60">Date</span>
            <span className="font-medium">{state.selectedDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-dark/60">Time</span>
            <span className="font-medium">{state.selectedTime}</span>
          </div>

          <hr className="my-3" />

          <div className="space-y-2">
            {state.selectedServices.map((s) => (
              <div key={s.id} className="flex justify-between">
                <span className="text-dark/80">{s.name}</span>
                <span className="font-medium">{formatCurrency(s.price)}</span>
              </div>
            ))}
          </div>

          <hr className="my-3" />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-primary">{formatCurrency(totalPrice)}</span>
          </div>
        </div>
      </div>

      {/* Customer Info */}
      <div className="space-y-4 mb-8">
        <h3 className="font-bold text-dark text-lg">Your Information</h3>

        <div>
          <label htmlFor="customerName" className="block text-sm font-medium text-dark mb-1">
            Name *
          </label>
          <input
            type="text"
            id="customerName"
            value={state.customerName}
            onChange={(e) => dispatch({ type: 'SET_CUSTOMER_NAME', name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label htmlFor="customerPhone" className="block text-sm font-medium text-dark mb-1">
            Phone *
          </label>
          <input
            type="tel"
            id="customerPhone"
            value={state.customerPhone}
            onChange={(e) => dispatch({ type: 'SET_CUSTOMER_PHONE', phone: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <label htmlFor="customerEmail" className="block text-sm font-medium text-dark mb-1">
            Email *
          </label>
          <input
            type="email"
            id="customerEmail"
            value={state.customerEmail}
            onChange={(e) => dispatch({ type: 'SET_CUSTOMER_EMAIL', email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            placeholder="your@email.com"
          />
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm">{error}</div>
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
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={cn(
            'px-8 py-3 rounded-full font-semibold text-white transition-all',
            isSubmitting ? 'bg-gray-400 cursor-wait' : 'bg-primary hover:bg-primary-dark'
          )}
        >
          {isSubmitting ? 'Booking...' : 'Confirm Booking'}
        </button>
      </div>
    </div>
  );
}
