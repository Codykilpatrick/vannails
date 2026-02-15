'use client';

import { useState, useEffect, useCallback } from 'react';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import AdminSidebar from '@/components/admin/AdminSidebar';
import TechnicianManager from '@/components/admin/TechnicianManager';
import { Technician } from '@/types';

export default function AdminTechniciansPage() {
  const [technicians, setTechnicians] = useState<Technician[]>([]);

  const fetchTechnicians = useCallback(async () => {
    const res = await fetch('/api/technicians');
    setTechnicians(await res.json());
  }, []);

  useEffect(() => {
    fetchTechnicians();
  }, [fetchTechnicians]);

  const handleUpdate = async (tech: Technician) => {
    await fetch('/api/technicians', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tech),
    });
    fetchTechnicians();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/technicians?id=${id}`, { method: 'DELETE' });
    fetchTechnicians();
  };

  const handleAdd = async (tech: { name: string; specialties: string[] }) => {
    await fetch('/api/technicians', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tech),
    });
    fetchTechnicians();
  };

  return (
    <AdminAuthGuard>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />

        <div className="flex-1 p-8 overflow-auto">
          <h1 className="text-2xl font-bold text-dark mb-8">Technician Management</h1>

          <TechnicianManager
            technicians={technicians}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onAdd={handleAdd}
          />
        </div>
      </div>
    </AdminAuthGuard>
  );
}
