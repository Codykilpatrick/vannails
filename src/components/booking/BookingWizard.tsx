'use client';

import { useReducer } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BookingState, BookingAction } from '@/types';
import BookingProgressBar from './BookingProgressBar';
import StepServiceSelect from './StepServiceSelect';
import StepTechnicianSelect from './StepTechnicianSelect';
import StepDateTime from './StepDateTime';
import StepConfirmation from './StepConfirmation';

const initialState: BookingState = {
  step: 0,
  guestCount: 1,
  selectedServices: [],
  selectedTechnician: null,
  selectedDate: null,
  selectedTime: null,
  customerName: '',
  customerPhone: '',
  customerEmail: '',
};

function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.step };
    case 'SET_GUEST_COUNT':
      return { ...state, guestCount: action.count };
    case 'TOGGLE_SERVICE': {
      const exists = state.selectedServices.some((s) => s.id === action.service.id);
      return {
        ...state,
        selectedServices: exists
          ? state.selectedServices.filter((s) => s.id !== action.service.id)
          : [...state.selectedServices, action.service],
      };
    }
    case 'SET_TECHNICIAN':
      return { ...state, selectedTechnician: action.technician };
    case 'SET_DATE':
      return { ...state, selectedDate: action.date, selectedTime: null };
    case 'SET_TIME':
      return { ...state, selectedTime: action.time };
    case 'SET_CUSTOMER_NAME':
      return { ...state, customerName: action.name };
    case 'SET_CUSTOMER_PHONE':
      return { ...state, customerPhone: action.phone };
    case 'SET_CUSTOMER_EMAIL':
      return { ...state, customerEmail: action.email };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export default function BookingWizard() {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  const goTo = (step: number) => {
    dispatch({ type: 'SET_STEP', step });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const direction = 1; // always forward for animation purposes

  return (
    <div>
      <BookingProgressBar currentStep={state.step} />

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={state.step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {state.step === 0 && (
              <StepServiceSelect
                state={state}
                dispatch={dispatch}
                onNext={() => goTo(1)}
              />
            )}
            {state.step === 1 && (
              <StepTechnicianSelect
                state={state}
                dispatch={dispatch}
                onNext={() => goTo(2)}
                onBack={() => goTo(0)}
              />
            )}
            {state.step === 2 && (
              <StepDateTime
                state={state}
                dispatch={dispatch}
                onNext={() => goTo(3)}
                onBack={() => goTo(1)}
              />
            )}
            {state.step === 3 && (
              <StepConfirmation
                state={state}
                dispatch={dispatch}
                onBack={() => goTo(2)}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
