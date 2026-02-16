'use client';

import { useState, useEffect, useCallback } from 'react';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import AdminSidebar from '@/components/admin/AdminSidebar';
import TechScheduleGrid from '@/components/admin/TechScheduleGrid';
import { Appointment, Technician } from '@/types';

export default function SchedulePage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [techList, setTechList] = useState<Technician[]>([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const fetchData = useCallback(async () => {
    const [apptRes, techRes] = await Promise.all([
      fetch('/api/appointments'),
      fetch('/api/technicians'),
    ]);
    setAppointments(await apptRes.json());
    setTechList((await techRes.json()).filter((t: Technician) => t.active));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const changeDate = (offset: number) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + offset);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const dateLabel = new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <AdminAuthGuard>
      <div className="flex min-h-screen bg-gray-50 pt-14 md:pt-0">
        <AdminSidebar />

        <div className="flex-1 p-8 overflow-auto">
          <h1 className="text-2xl font-bold text-dark mb-8">Technician Schedule</h1>

          {/* Date nav */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => changeDate(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h2 className="text-lg font-semibold">{dateLabel}</h2>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="text-sm text-primary cursor-pointer border-none outline-none bg-transparent"
              />
            </div>
            <button
              onClick={() => changeDate(1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {techList.length > 0 ? (
            <TechScheduleGrid
              appointments={appointments}
              technicians={techList}
              selectedDate={selectedDate}
            />
          ) : (
            <p className="text-gray-400">Loading technicians...</p>
          )}
        </div>
      </div>
    </AdminAuthGuard>
  );
}
