'use client';

import { useState, useEffect, useCallback } from 'react';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ServiceTable from '@/components/admin/ServiceTable';
import { Service } from '@/types';

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);

  const fetchServices = useCallback(async () => {
    const res = await fetch('/api/services');
    setServices(await res.json());
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleUpdate = async (service: Service) => {
    await fetch('/api/services', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(service),
    });
    fetchServices();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/services?id=${id}`, { method: 'DELETE' });
    fetchServices();
  };

  const handleAdd = async (service: Omit<Service, 'id'>) => {
    await fetch('/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(service),
    });
    fetchServices();
  };

  return (
    <AdminAuthGuard>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />

        <div className="flex-1 p-8 overflow-auto">
          <h1 className="text-2xl font-bold text-dark mb-8">Services Management</h1>

          <ServiceTable
            services={services}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onAdd={handleAdd}
          />
        </div>
      </div>
    </AdminAuthGuard>
  );
}
