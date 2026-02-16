'use client';

import { Appointment, AppointmentStatus } from '@/types';
import AppointmentCard from './AppointmentCard';

interface AppointmentListProps {
  appointments: Appointment[];
  selectedDate: string | null;
  technicianFilter: string;
  statusFilter: string;
  onStatusChange: (id: string, status: AppointmentStatus) => void;
}

export default function AppointmentList({
  appointments,
  selectedDate,
  technicianFilter,
  statusFilter,
  onStatusChange,
}: AppointmentListProps) {
  let filtered = appointments;

  if (selectedDate) {
    filtered = filtered.filter((a) => a.date === selectedDate);
  }
  if (technicianFilter) {
    filtered = filtered.filter((a) =>
      technicianFilter === 'unassigned' ? !a.technician : a.technician?.id === technicianFilter
    );
  }
  if (statusFilter) {
    filtered = filtered.filter((a) => a.status === statusFilter);
  }

  // Sort by time
  filtered = [...filtered].sort((a, b) => a.time.localeCompare(b.time));

  if (filtered.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="font-medium">No appointments found</p>
        <p className="text-sm mt-1">
          {selectedDate ? `No appointments on ${selectedDate}` : 'Try adjusting your filters'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        {filtered.length} appointment{filtered.length !== 1 ? 's' : ''}
        {selectedDate && ` on ${selectedDate}`}
      </p>
      {filtered.map((appointment) => (
        <AppointmentCard
          key={appointment.id}
          appointment={appointment}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}
