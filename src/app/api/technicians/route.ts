import { NextRequest, NextResponse } from 'next/server';
import { getTechnicians, saveTechnicians } from '@/data/store';
import { Technician } from '@/types';
import { generateId } from '@/lib/utils';

export async function GET() {
  const technicians = await getTechnicians();
  return NextResponse.json(technicians);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const technicians = await getTechnicians();

  const newTech: Technician = {
    id: generateId(),
    name: body.name,
    specialties: body.specialties || [],
    active: true,
  };

  technicians.push(newTech);
  await saveTechnicians(technicians);
  return NextResponse.json(newTech, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const technicians = await getTechnicians();
  const index = technicians.findIndex((t) => t.id === body.id);

  if (index === -1) {
    return NextResponse.json({ error: 'Technician not found' }, { status: 404 });
  }

  technicians[index] = { ...technicians[index], ...body };
  await saveTechnicians(technicians);
  return NextResponse.json(technicians[index]);
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID required' }, { status: 400 });
  }

  const technicians = await getTechnicians();
  const filtered = technicians.filter((t) => t.id !== id);

  if (filtered.length === technicians.length) {
    return NextResponse.json({ error: 'Technician not found' }, { status: 404 });
  }

  await saveTechnicians(filtered);
  return NextResponse.json({ success: true });
}
