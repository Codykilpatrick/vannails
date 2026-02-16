'use client';

import { Appointment, AppointmentStatus } from '@/types';
import { formatCurrency, cn } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

interface AppointmentCardProps {
  appointment: Appointment;
  onStatusChange: (id: string, status: AppointmentStatus) => void;
}

const statusVariant: Record<AppointmentStatus, 'warning' | 'primary' | 'success' | 'danger'> = {
  pending: 'warning',
  confirmed: 'primary',
  completed: 'success',
  cancelled: 'danger',
};

export default function AppointmentCard({
  appointment,
  onStatusChange,
}: AppointmentCardProps) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <h4 className="font-bold text-dark">{appointment.customerName}</h4>
          <p className="text-sm text-dark/50">{appointment.date} &middot; {appointment.time}</p>
        </div>
        <Badge variant={statusVariant[appointment.status]}>
          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
        </Badge>
      </div>

      <div className="space-y-1 text-sm text-dark/60 mb-4">
        <p>
          <span className="font-medium text-dark/80">Phone:</span>{' '}
          <a href={`tel:${appointment.customerPhone}`} className="text-primary hover:underline">
            {appointment.customerPhone}
          </a>
        </p>
        <p>
          <span className="font-medium text-dark/80">Email:</span> {appointment.customerEmail}
        </p>
        <p>
          <span className="font-medium text-dark/80">Technician:</span>{' '}
          {appointment.technician?.name || 'No Preference'}
        </p>
        <p>
          <span className="font-medium text-dark/80">Guests:</span> {appointment.guestCount}
        </p>
      </div>

      <div className="text-sm mb-4">
        <span className="font-medium text-dark/80">Services:</span>
        <ul className="mt-1 space-y-0.5">
          {appointment.services.map((s) => (
            <li key={s.id} className="flex justify-between text-dark/60">
              <span>{s.name}</span>
              <span>{formatCurrency(s.price)}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between font-bold text-dark mt-2 pt-2 border-t border-gray-100">
          <span>Total</span>
          <span className="text-primary">{formatCurrency(appointment.totalPrice)}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-xs text-dark/50 font-medium">Status:</label>
        <select
          value={appointment.status}
          onChange={(e) =>
            onStatusChange(appointment.id, e.target.value as AppointmentStatus)
          }
          className={cn(
            'text-sm px-3 py-1.5 rounded-lg border border-gray-200 outline-none focus:border-primary transition-colors',
          )}
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
    </div>
  );
}
