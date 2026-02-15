'use client';

import { useState } from 'react';
import { services } from '@/data/services';
import { ServiceCategory } from '@/types';
import ServiceCategoryTabs from '@/components/services/ServiceCategoryTabs';
import ServiceCard from '@/components/services/ServiceCard';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { AnimatePresence } from 'motion/react';

export default function ServicesPageContent() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('Manicure');

  const filteredServices = services.filter((s) => s.category === activeCategory);

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            title="Our Services"
            subtitle="From classic manicures to the latest nail trends — we offer a full range of premium nail care services."
          />
        </AnimatedSection>

        <ServiceCategoryTabs activeCategory={activeCategory} onSelect={setActiveCategory} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-12 text-center">
          <a
            href="/booking"
            className="inline-flex items-center justify-center bg-primary text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-dark transition-colors"
          >
            Book a Service
          </a>
        </div>
      </div>
    </div>
  );
}
