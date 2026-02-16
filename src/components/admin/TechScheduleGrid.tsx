'use client';

import { Appointment, Technician } from '@/types';
import { cn } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import { AppointmentStatus } from '@/types';

interface TechScheduleGridProps {
  appointments: Appointment[];
  technicians: Technician[];
  selectedDate: string;
}

const statusColors: Record<AppointmentStatus, string> = {
  pending: 'bg-yellow-50 border-yellow-200',
  confirmed: 'bg-blue-50 border-blue-200',
  completed: 'bg-green-50 border-green-200',
  cancelled: 'bg-red-50 border-red-200',
};

const statusBadge: Record<AppointmentStatus, 'warning' | 'primary' | 'success' | 'danger'> = {
  pending: 'warning',
  confirmed: 'primary',
  completed: 'success',
  cancelled: 'danger',
};

export default function TechScheduleGrid({
  appointments,
  technicians,
  selectedDate,
}: TechScheduleGridProps) {
  const dayAppointments = appointments.filter((a) => a.date === selectedDate);

  const columns = [
    ...technicians.map((tech) => ({
      id: tech.id,
      label: tech.name,
      appointments: dayAppointments.filter((a) => a.technician?.id === tech.id),
    })),
    {
      id: 'unassigned',
      label: 'Unassigned',
      appointments: dayAppointments.filter((a) => !a.technician),
    },
  ];

  return (
    <div>
      <div className="grid" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>
        {/* Headers */}
        {columns.map((col, i) => (
          <div
            key={col.id}
            className={cn(
              'p-4 text-center font-semibold text-sm',
              i === 0 && 'rounded-tl-xl',
              i === columns.length - 1 && 'rounded-tr-xl',
              col.id === 'unassigned' ? 'bg-amber-600 text-white' : 'bg-dark text-white'
            )}
          >
            {col.label}
          </div>
        ))}

        {/* Appointments per column */}
        {columns.map((col) => (
          <div key={`col-${col.id}`} className="border-r border-gray-100 last:border-r-0 min-h-[400px] p-2 bg-white">
            {col.appointments.length === 0 ? (
              <div className="text-center text-gray-300 text-sm py-8">No appointments</div>
            ) : (
              <div className="space-y-2">
                {col.appointments
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((appt) => (
                    <div
                      key={appt.id}
                      className={cn(
                        'p-3 rounded-lg border text-xs',
                        statusColors[appt.status]
                      )}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-dark">{appt.time}</span>
                        <Badge variant={statusBadge[appt.status]}>
                          {appt.status}
                        </Badge>
                      </div>
                      <p className="font-medium text-dark/80">{appt.customerName}</p>
                      <p className="text-dark/50 mt-1">
                        {appt.services.map((s) => s.name).join(', ')}
                      </p>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
