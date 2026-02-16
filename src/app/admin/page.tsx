'use client';

import { useState, useEffect, useCallback } from 'react';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AppointmentCalendar from '@/components/admin/AppointmentCalendar';
import AppointmentList from '@/components/admin/AppointmentList';
import AddAppointmentForm from '@/components/admin/AddAppointmentForm';
import { Appointment, AppointmentStatus, Service, Technician } from '@/types';
import { technicians } from '@/data/technicians';

export default function AdminPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [technicianFilter, setTechnicianFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchAppointments = useCallback(async () => {
    const res = await fetch('/api/appointments');
    const data = await res.json();
    setAppointments(data);
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleAddAppointment = async (data: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    services: Service[];
    technician: Technician | null;
    date: string;
    time: string;
    guestCount: number;
    totalPrice: number;
  }) => {
    await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setShowAddForm(false);
    fetchAppointments();
  };

  const handleStatusChange = async (id: string, status: AppointmentStatus) => {
    await fetch(`/api/appointments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchAppointments();
  };

  const handleChangeMonth = (offset: number) => {
    setCurrentMonth((prev) => {
      const next = new Date(prev);
      next.setMonth(next.getMonth() + offset);
      return next;
    });
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter((a) => a.date === todayStr);

  return (
    <AdminAuthGuard>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />

        <div className="flex-1 p-8 overflow-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-dark">Appointments</h1>
            {!showAddForm && (
              <button
                onClick={() => setShowAddForm(true)}
                className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors"
              >
                + Add Appointment
              </button>
            )}
          </div>

          {/* Add appointment form */}
          {showAddForm && (
            <AddAppointmentForm
              onAdd={handleAddAppointment}
              onCancel={() => setShowAddForm(false)}
            />
          )}

          {/* Today's summary */}
          {todayAppointments.length > 0 && (
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-8">
              <h2 className="font-semibold text-primary mb-1">
                Today&apos;s Appointments ({todayAppointments.length})
              </h2>
              <p className="text-sm text-dark/60">
                {todayAppointments.filter((a) => a.status === 'confirmed').length} confirmed,{' '}
                {todayAppointments.filter((a) => a.status === 'pending').length} pending
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar */}
            <div className="lg:col-span-1">
              <AppointmentCalendar
                appointments={appointments}
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
                currentMonth={currentMonth}
                onChangeMonth={handleChangeMonth}
              />
            </div>

            {/* Appointment list */}
            <div className="lg:col-span-2">
              {/* Filters */}
              <div className="flex flex-wrap gap-3 mb-6">
                <select
                  value={technicianFilter}
                  onChange={(e) => setTechnicianFilter(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary"
                >
                  <option value="">All Technicians</option>
                  {technicians.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary"
                >
                  <option value="">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                {(selectedDate || technicianFilter || statusFilter) && (
                  <button
                    onClick={() => {
                      setSelectedDate(null);
                      setTechnicianFilter('');
                      setStatusFilter('');
                    }}
                    className="px-3 py-2 text-sm text-primary hover:text-primary-dark font-medium"
                  >
                    Clear Filters
                  </button>
                )}
              </div>

              <AppointmentList
                appointments={appointments}
                selectedDate={selectedDate}
                technicianFilter={technicianFilter}
                statusFilter={statusFilter}
                onStatusChange={handleStatusChange}
              />
            </div>
          </div>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
