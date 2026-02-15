'use client';

import { technicians } from '@/data/technicians';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { AnimatedStagger, AnimatedItem } from '@/components/ui/AnimatedSection';
import Badge from '@/components/ui/Badge';

export default function TeamGrid() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            title="Meet Our Team"
            subtitle="Our talented technicians are dedicated to making you look and feel your best."
          />
        </AnimatedSection>

        <AnimatedStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {technicians.map((tech) => (
            <AnimatedItem key={tech.id}>
              <div className="bg-light rounded-2xl p-8 text-center group hover:shadow-lg transition-shadow duration-300">
                {/* Avatar placeholder */}
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl text-white font-bold">
                    {tech.name.split(' ').map((n) => n[0]).join('')}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-dark mb-2">{tech.name}</h3>

                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {tech.specialties.map((specialty) => (
                    <Badge key={specialty} variant="primary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedStagger>
      </div>
    </section>
  );
}
