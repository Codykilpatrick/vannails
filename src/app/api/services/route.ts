import { NextRequest, NextResponse } from 'next/server';
import { getServices, saveServices } from '@/data/store';
import { Service } from '@/types';
import { generateId } from '@/lib/utils';

export async function GET() {
  const services = await getServices();
  return NextResponse.json(services);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const services = await getServices();

  const newService: Service = {
    id: generateId(),
    name: body.name,
    category: body.category,
    price: body.price,
    duration: body.duration,
  };

  services.push(newService);
  await saveServices(services);
  return NextResponse.json(newService, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const services = await getServices();
  const index = services.findIndex((s) => s.id === body.id);

  if (index === -1) {
    return NextResponse.json({ error: 'Service not found' }, { status: 404 });
  }

  services[index] = { ...services[index], ...body };
  await saveServices(services);
  return NextResponse.json(services[index]);
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID required' }, { status: 400 });
  }

  const services = await getServices();
  const filtered = services.filter((s) => s.id !== id);

  if (filtered.length === services.length) {
    return NextResponse.json({ error: 'Service not found' }, { status: 404 });
  }

  await saveServices(filtered);
  return NextResponse.json({ success: true });
}
