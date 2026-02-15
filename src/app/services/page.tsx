import type { Metadata } from 'next';
import ServicesPageContent from '@/components/services/ServicesPageContent';

export const metadata: Metadata = {
  title: 'Services | Van Nails',
  description: 'Browse our full menu of 48+ nail services including manicures, pedicures, acrylics, gel, dip powder, and more.',
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
