'use client';

import { useState, useEffect } from 'react';
import { Service, Technician, ServiceCategory, SERVICE_CATEGORIES } from '@/types';
import { formatCurrency, cn } from '@/lib/utils';

interface AddAppointmentFormProps {
  onAdd: (data: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    services: Service[];
    technician: Technician | null;
    date: string;
    time: string;
    guestCount: number;
    totalPrice: number;
  }) => void;
  onCancel: () => void;
}

const TIME_SLOTS = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
  '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM',
];

export default function AddAppointmentForm({ onAdd, onCancel }: AddAppointmentFormProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('Manicure');

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [selectedTechnician, setSelectedTechnician] = useState<Technician | null>(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guestCount, setGuestCount] = useState(1);

  useEffect(() => {
    fetch('/api/services').then((r) => r.json()).then(setServices);
    fetch('/api/technicians').then((r) => r.json()).then(setTechnicians);
  }, []);

  const toggleService = (service: Service) => {
    setSelectedServices((prev) =>
      prev.find((s) => s.id === service.id)
        ? prev.filter((s) => s.id !== service.id)
        : [...prev, service]
    );
  };

  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const filteredServices = services.filter((s) => s.category === activeCategory);

  const isValid =
    customerName.trim() &&
    customerPhone.trim() &&
    selectedServices.length > 0 &&
    date &&
    time;

  const handleSubmit = () => {
    if (!isValid) return;
    onAdd({
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail.trim(),
      services: selectedServices,
      technician: selectedTechnician,
      date,
      time,
      guestCount,
      totalPrice,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
      <h2 className="text-lg font-bold text-dark mb-6">New Appointment</h2>

      {/* Customer Info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
            Name *
          </label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Customer name"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
            Phone *
          </label>
          <input
            type="tel"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            placeholder="(555) 123-4567"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
            Email
          </label>
          <input
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            placeholder="email@example.com"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Date, Time, Guests, Technician */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
            Date *
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
            Time *
          </label>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary"
          >
            <option value="">Select time</option>
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
            Guests
          </label>
          <select
            value={guestCount}
            onChange={(e) => setGuestCount(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary"
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
            Technician
          </label>
          <select
            value={selectedTechnician?.id ?? ''}
            onChange={(e) => {
              const tech = technicians.find((t) => t.id === e.target.value) ?? null;
              setSelectedTechnician(tech);
            }}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary"
          >
            <option value="">No Preference</option>
            {technicians
              .filter((t) => t.active)
              .map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
          </select>
        </div>
      </div>

      {/* Services Selection */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
          Services *
        </label>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-3">
          {SERVICE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
                activeCategory === cat
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-dark/60 hover:text-dark'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Service chips */}
        <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
          {filteredServices.map((service) => {
            const isSelected = selectedServices.some((s) => s.id === service.id);
            return (
              <button
                key={service.id}
                onClick={() => toggleService(service)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors',
                  isSelected
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-dark/70 border-gray-200 hover:border-primary'
                )}
              >
                {service.name} — {formatCurrency(service.price)}
              </button>
            );
          })}
        </div>

        {/* Selected services summary */}
        {selectedServices.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex flex-wrap gap-1 mb-2">
              {selectedServices.map((s) => (
                <span
                  key={s.id}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                >
                  {s.name}
                  <button
                    onClick={() => toggleService(s)}
                    className="hover:text-primary-dark font-bold"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <p className="text-sm font-bold text-primary">
              Total: {formatCurrency(totalPrice)}
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className={cn(
            'px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors',
            isValid
              ? 'bg-primary text-white hover:bg-primary-dark'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          )}
        >
          Create Appointment
        </button>
        <button
          onClick={onCancel}
          className="px-6 py-2.5 text-dark/60 hover:text-dark text-sm font-medium"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
