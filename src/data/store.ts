import { Appointment, Service, Technician } from '@/types';
import { services as defaultServices } from './services';
import { technicians as defaultTechnicians } from './technicians';

const KEYS = {
  appointments: 'van-nails:appointments',
  services: 'van-nails:services',
  technicians: 'van-nails:technicians',
};

// Check if Vercel KV is configured
function isKvConfigured(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

// In-memory fallback for local development without KV
const memoryStore: Record<string, unknown> = {};

async function kvGet<T>(key: string): Promise<T | null> {
  if (!isKvConfigured()) {
    return (memoryStore[key] as T) ?? null;
  }
  const { kv } = await import('@vercel/kv');
  return kv.get<T>(key);
}

async function kvSet(key: string, value: unknown): Promise<void> {
  if (!isKvConfigured()) {
    memoryStore[key] = value;
    return;
  }
  const { kv } = await import('@vercel/kv');
  await kv.set(key, value);
}

// Appointments
export async function getAppointments(): Promise<Appointment[]> {
  const data = await kvGet<Appointment[]>(KEYS.appointments);
  return data ?? [];
}

export async function saveAppointments(appointments: Appointment[]): Promise<void> {
  await kvSet(KEYS.appointments, appointments);
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
  const data = await kvGet<Service[]>(KEYS.services);
  return data ?? defaultServices;
}

export async function saveServices(services: Service[]): Promise<void> {
  await kvSet(KEYS.services, services);
}

// Technicians
export async function getTechnicians(): Promise<Technician[]> {
  const data = await kvGet<Technician[]>(KEYS.technicians);
  return data ?? defaultTechnicians;
}

export async function saveTechnicians(technicians: Technician[]): Promise<void> {
  await kvSet(KEYS.technicians, technicians);
}
