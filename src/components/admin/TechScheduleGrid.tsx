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

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px] grid" style={{ gridTemplateColumns: `repeat(${technicians.length}, minmax(180px, 1fr))` }}>
        {/* Tech headers */}
        {technicians.map((tech) => (
          <div
            key={tech.id}
            className="bg-dark text-white p-4 text-center font-semibold text-sm first:rounded-tl-xl last:rounded-tr-xl"
          >
            {tech.name}
          </div>
        ))}

        {/* Appointments per tech */}
        {technicians.map((tech) => {
          const techAppts = dayAppointments.filter(
            (a) => a.technician?.id === tech.id
          );

          return (
            <div key={`col-${tech.id}`} className="border-r border-gray-100 last:border-r-0 min-h-[400px] p-2 bg-white">
              {techAppts.length === 0 ? (
                <div className="text-center text-gray-300 text-sm py-8">No appointments</div>
              ) : (
                <div className="space-y-2">
                  {techAppts
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
          );
        })}
      </div>
    </div>
  );
}
