import type { Metadata } from 'next';
import BookingWizard from '@/components/booking/BookingWizard';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedSection from '@/components/ui/AnimatedSection';

export const metadata: Metadata = {
  title: 'Book Appointment | Vivid Nails',
  description: 'Book your nail appointment online. Choose from 48+ services, pick your technician, and select your preferred time.',
};

export default function BookingPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            title="Book Your Appointment"
            subtitle="Select your services, choose a technician, and pick a time that works for you."
          />
        </AnimatedSection>

        <BookingWizard />
      </div>
    </div>
  );
}
