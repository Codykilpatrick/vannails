export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  price: number;
  duration: number; // minutes
}

export type ServiceCategory =
  | 'Manicure'
  | 'Pedicure'
  | 'Acrylic'
  | 'Dip Powder'
  | 'Gel'
  | 'Additional Services';

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  'Manicure',
  'Pedicure',
  'Acrylic',
  'Dip Powder',
  'Gel',
  'Additional Services',
];

export interface Technician {
  id: string;
  name: string;
  specialties: string[];
  active: boolean;
}

export interface TimeSlot {
  time: string; // "9:00 AM"
  available: boolean;
}

export interface BookingState {
  step: number;
  guestCount: number;
  selectedServices: Service[];
  selectedTechnician: Technician | null;
  selectedDate: string | null;
  selectedTime: string | null;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
}

export type BookingAction =
  | { type: 'SET_STEP'; step: number }
  | { type: 'SET_GUEST_COUNT'; count: number }
  | { type: 'TOGGLE_SERVICE'; service: Service }
  | { type: 'SET_TECHNICIAN'; technician: Technician | null }
  | { type: 'SET_DATE'; date: string }
  | { type: 'SET_TIME'; time: string }
  | { type: 'SET_CUSTOMER_NAME'; name: string }
  | { type: 'SET_CUSTOMER_PHONE'; phone: string }
  | { type: 'SET_CUSTOMER_EMAIL'; email: string }
  | { type: 'RESET' };

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  services: Service[];
  technician: Technician | null;
  date: string;
  time: string;
  guestCount: number;
  totalPrice: number;
  status: AppointmentStatus;
  createdAt: string;
}
