'use client';

import Card from '@/components/ui/Card';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { AnimatedStagger, AnimatedItem } from '@/components/ui/AnimatedSection';
import { formatCurrency } from '@/lib/utils';

const featuredServices = [
  {
    name: 'Gel Manicure',
    price: 35,
    description: 'Long-lasting color with a high-gloss finish that stays chip-free for weeks.',
  },
  {
    name: 'Deluxe Pedicure',
    price: 45,
    description: 'Full spa pedicure with exfoliation, massage, and your choice of polish.',
  },
  {
    name: 'Dip Powder Full Set',
    price: 45,
    description: 'Lightweight, durable nails with vibrant color that lasts 3-4 weeks.',
  },
  {
    name: 'Acrylic Full Set',
    price: 45,
    description: 'Classic acrylic extensions sculpted to your desired shape and length.',
  },
  {
    name: 'Gel Ombre',
    price: 60,
    description: 'Beautiful gradient effect blending two colors for a stunning, trendy look.',
  },
  {
    name: 'Volcano Spa Pedicure',
    price: 60,
    description: 'Our signature luxury pedicure with fizzing volcano soak and hot stone massage.',
  },
];

export default function FeaturedServices() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            title="Our Popular Services"
            subtitle="Discover our most loved treatments, delivered with care and precision by our expert technicians."
          />
        </AnimatedSection>

        <AnimatedStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredServices.map((service) => (
            <AnimatedItem key={service.name}>
              <Card className="p-8 h-full group">
                <div className="w-10 h-1 bg-primary rounded-full mb-4 group-hover:w-16 transition-all duration-300" />
                <h3 className="text-xl font-bold text-dark mb-2">{service.name}</h3>
                <p className="text-dark/60 text-sm mb-4 leading-relaxed">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    {formatCurrency(service.price)}
                  </span>
                  <a
                    href="/booking"
                    className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                  >
                    Book Now &rarr;
                  </a>
                </div>
              </Card>
            </AnimatedItem>
          ))}
        </AnimatedStagger>
      </div>
    </section>
  );
}
