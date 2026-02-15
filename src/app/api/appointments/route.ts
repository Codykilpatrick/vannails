import { NextRequest, NextResponse } from 'next/server';
import { getAppointments, addAppointment } from '@/data/store';
import { Appointment } from '@/types';
import { generateId } from '@/lib/utils';

export async function GET() {
  try {
    const appointments = await getAppointments();
    return NextResponse.json(appointments);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const appointment: Appointment = {
    id: generateId(),
    customerName: body.customerName,
    customerPhone: body.customerPhone,
    customerEmail: body.customerEmail,
    services: body.services,
    technician: body.technician,
    date: body.date,
    time: body.time,
    guestCount: body.guestCount,
    totalPrice: body.totalPrice,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  await addAppointment(appointment);
  return NextResponse.json(appointment, { status: 201 });
}
