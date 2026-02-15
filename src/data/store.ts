import { kv } from '@vercel/kv';
import { Appointment, Service, Technician } from '@/types';
import { services as defaultServices } from './services';
import { technicians as defaultTechnicians } from './technicians';

const KEYS = {
  appointments: 'van-nails:appointments',
  services: 'van-nails:services',
  technicians: 'van-nails:technicians',
};

// Appointments
export async function getAppointments(): Promise<Appointment[]> {
  const data = await kv.get<Appointment[]>(KEYS.appointments);
  return data ?? [];
}

export async function saveAppointments(appointments: Appointment[]): Promise<void> {
  await kv.set(KEYS.appointments, appointments);
}

export async function addAppointment(appointment: Appointment): Promise<Appointment> {
  const appointments = await getAppointments();
  appointments.push(appointment);
  await saveAppointments(appointments);
  return appointment;
}

export async function updateAppointment(id: string, updates: Partial<Appointment>): Promise<Appointment | null> {
  const appointments = await getAppointments();
  const index = appointments.findIndex((a) => a.id === id);
  if (index === -1) return null;
  appointments[index] = { ...appointments[index], ...updates };
  await saveAppointments(appointments);
  return appointments[index];
}

export async function deleteAppointment(id: string): Promise<boolean> {
  const appointments = await getAppointments();
  const filtered = appointments.filter((a) => a.id !== id);
  if (filtered.length === appointments.length) return false;
  await saveAppointments(filtered);
  return true;
}

// Services
export async function getServices(): Promise<Service[]> {
  const data = await kv.get<Service[]>(KEYS.services);
  return data ?? defaultServices;
}

export async function saveServices(services: Service[]): Promise<void> {
  await kv.set(KEYS.services, services);
}

// Technicians
export async function getTechnicians(): Promise<Technician[]> {
  const data = await kv.get<Technician[]>(KEYS.technicians);
  return data ?? defaultTechnicians;
}

export async function saveTechnicians(technicians: Technician[]): Promise<void> {
  await kv.set(KEYS.technicians, technicians);
}
