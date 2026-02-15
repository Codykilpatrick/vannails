import type { Metadata } from 'next';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedSection from '@/components/ui/AnimatedSection';

export const metadata: Metadata = {
  title: 'Gallery | Van Nails',
  description: 'Browse our nail art gallery showcasing our latest designs and trends.',
};

export default function GalleryPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            title="Our Gallery"
            subtitle="Browse our latest nail art designs and get inspired for your next visit."
          />
        </AnimatedSection>

        <GalleryGrid />
      </div>
    </div>
  );
}
