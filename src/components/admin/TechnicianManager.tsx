'use client';

import { useState } from 'react';
import { Technician } from '@/types';
import { cn } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

interface TechnicianManagerProps {
  technicians: Technician[];
  onUpdate: (technician: Technician) => void;
  onDelete: (id: string) => void;
  onAdd: (tech: { name: string; specialties: string[] }) => void;
}

export default function TechnicianManager({
  technicians,
  onUpdate,
  onDelete,
  onAdd,
}: TechnicianManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editSpecialties, setEditSpecialties] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newSpecialties, setNewSpecialties] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const startEdit = (tech: Technician) => {
    setEditingId(tech.id);
    setEditName(tech.name);
    setEditSpecialties(tech.specialties.join(', '));
  };

  return (
    <div>
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors"
        >
          + Add Technician
        </button>
      </div>

      {showAdd && (
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-dark mb-4">Add New Technician</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary"
            />
            <input
              type="text"
              placeholder="Specialties (comma separated)"
              value={newSpecialties}
              onChange={(e) => setNewSpecialties(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary"
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => {
                if (newName) {
                  onAdd({
                    name: newName,
                    specialties: newSpecialties
                      .split(',')
                      .map((s) => s.trim())
                      .filter(Boolean),
                  });
                  setNewName('');
                  setNewSpecialties('');
                  setShowAdd(false);
                }
              }}
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-dark"
            >
              Save
            </button>
            <button
              onClick={() => setShowAdd(false)}
              className="px-4 py-2 text-dark/60 hover:text-dark text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {technicians.map((tech) => (
          <div
            key={tech.id}
            className={cn(
              'bg-white rounded-xl p-6 shadow-sm border transition-all',
              tech.active ? 'border-gray-100' : 'border-red-100 opacity-60'
            )}
          >
            {editingId === tech.id ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary"
                />
                <input
                  type="text"
                  value={editSpecialties}
                  onChange={(e) => setEditSpecialties(e.target.value)}
                  placeholder="Specialties (comma separated)"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      onUpdate({
                        ...tech,
                        name: editName,
                        specialties: editSpecialties
                          .split(',')
                          .map((s) => s.trim())
                          .filter(Boolean),
                      });
                      setEditingId(null);
                    }}
                    className="text-xs px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-primary-dark"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="text-xs px-3 py-1.5 text-dark/60 hover:text-dark"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <span className="text-lg text-white font-bold">
                      {tech.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-dark">{tech.name}</h3>
                    <span
                      className={cn(
                        'text-xs font-medium',
                        tech.active ? 'text-green-600' : 'text-red-500'
                      )}
                    >
                      {tech.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {tech.specialties.map((s) => (
                    <Badge key={s} variant="primary">
                      {s}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => startEdit(tech)}
                    className="text-xs px-3 py-1.5 text-primary hover:text-primary-dark font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onUpdate({ ...tech, active: !tech.active })}
                    className={cn(
                      'text-xs px-3 py-1.5 font-medium',
                      tech.active
                        ? 'text-yellow-600 hover:text-yellow-700'
                        : 'text-green-600 hover:text-green-700'
                    )}
                  >
                    {tech.active ? 'Deactivate' : 'Activate'}
                  </button>
                  {deleteConfirm === tech.id ? (
                    <div className="flex gap-1 ml-auto">
                      <button
                        onClick={() => {
                          onDelete(tech.id);
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
                      onClick={() => setDeleteConfirm(tech.id)}
                      className="text-xs px-3 py-1.5 text-red-500 hover:text-red-700 font-medium ml-auto"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
