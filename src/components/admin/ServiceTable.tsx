'use client';

import { useState } from 'react';
import { Service, ServiceCategory, SERVICE_CATEGORIES } from '@/types';
import { formatCurrency, cn } from '@/lib/utils';

interface ServiceTableProps {
  services: Service[];
  onUpdate: (service: Service) => void;
  onDelete: (id: string) => void;
  onAdd: (service: Omit<Service, 'id'>) => void;
}

export default function ServiceTable({
  services,
  onUpdate,
  onDelete,
  onAdd,
}: ServiceTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<Service>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newService, setNewService] = useState<Omit<Service, 'id'>>({
    name: '',
    category: 'Manicure',
    price: 0,
    duration: 30,
  });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('');

  const startEdit = (service: Service) => {
    setEditingId(service.id);
    setEditValues({ name: service.name, price: service.price, duration: service.duration });
  };

  const saveEdit = (service: Service) => {
    onUpdate({ ...service, ...editValues });
    setEditingId(null);
  };

  const filtered = filterCategory
    ? services.filter((s) => s.category === filterCategory)
    : services;

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary"
        >
          <option value="">All Categories</option>
          {SERVICE_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors"
        >
          + Add Service
        </button>
      </div>

      {/* Add form */}
      {showAddForm && (
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-dark mb-4">Add New Service</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Service name"
              value={newService.name}
              onChange={(e) => setNewService((prev) => ({ ...prev, name: e.target.value }))}
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary"
            />
            <select
              value={newService.category}
              onChange={(e) =>
                setNewService((prev) => ({
                  ...prev,
                  category: e.target.value as ServiceCategory,
                }))
              }
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary"
            >
              {SERVICE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Price"
              value={newService.price || ''}
              onChange={(e) =>
                setNewService((prev) => ({ ...prev, price: Number(e.target.value) }))
              }
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary"
            />
            <input
              type="number"
              placeholder="Duration (min)"
              value={newService.duration || ''}
              onChange={(e) =>
                setNewService((prev) => ({ ...prev, duration: Number(e.target.value) }))
              }
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary"
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => {
                if (newService.name && newService.price > 0) {
                  onAdd(newService);
                  setNewService({ name: '', category: 'Manicure', price: 0, duration: 30 });
                  setShowAddForm(false);
                }
              }}
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-dark/60 hover:text-dark text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Price</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Duration</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((service) => (
              <tr key={service.id} className="hover:bg-gray-50">
                <td className="px-6 py-3">
                  {editingId === service.id ? (
                    <input
                      type="text"
                      value={editValues.name ?? service.name}
                      onChange={(e) =>
                        setEditValues((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className="px-2 py-1 border border-primary rounded text-sm w-full"
                    />
                  ) : (
                    <span
                      className="text-sm font-medium cursor-pointer hover:text-primary"
                      onClick={() => startEdit(service)}
                    >
                      {service.name}
                    </span>
                  )}
                </td>
                <td className="px-6 py-3 text-sm text-dark/60">{service.category}</td>
                <td className="px-6 py-3">
                  {editingId === service.id ? (
                    <input
                      type="number"
                      value={editValues.price ?? service.price}
                      onChange={(e) =>
                        setEditValues((prev) => ({
                          ...prev,
                          price: Number(e.target.value),
                        }))
                      }
                      className="px-2 py-1 border border-primary rounded text-sm w-20"
                    />
                  ) : (
                    <span
                      className="text-sm font-semibold text-primary cursor-pointer"
                      onClick={() => startEdit(service)}
                    >
                      {formatCurrency(service.price)}
                    </span>
                  )}
                </td>
                <td className="px-6 py-3">
                  {editingId === service.id ? (
                    <input
                      type="number"
                      value={editValues.duration ?? service.duration}
                      onChange={(e) =>
                        setEditValues((prev) => ({
                          ...prev,
                          duration: Number(e.target.value),
                        }))
                      }
                      className="px-2 py-1 border border-primary rounded text-sm w-20"
                    />
                  ) : (
                    <span className="text-sm text-dark/60">{service.duration} min</span>
                  )}
                </td>
                <td className="px-6 py-3">
                  {editingId === service.id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => saveEdit(service)}
                        className="text-xs px-3 py-1 bg-primary text-white rounded-lg hover:bg-primary-dark"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-xs px-3 py-1 text-dark/60 hover:text-dark"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(service)}
                        className="text-xs px-3 py-1 text-primary hover:text-primary-dark font-medium"
                      >
                        Edit
                      </button>
                      {deleteConfirm === service.id ? (
                        <div className="flex gap-1">
                          <button
                            onClick={() => {
                              onDelete(service.id);
                              setDeleteConfirm(null);
                            }}
                            className="text-xs px-2 py-1 bg-red-500 text-white rounded"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="text-xs px-2 py-1 text-dark/60"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(service.id)}
                          className="text-xs px-3 py-1 text-red-500 hover:text-red-700 font-medium"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
