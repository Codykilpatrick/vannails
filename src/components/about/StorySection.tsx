'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';

export default function StorySection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image placeholder */}
          <AnimatedSection>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-light-dark flex items-center justify-center">
                <svg className="w-20 h-20 text-primary/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                </svg>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-2xl -z-10" />
            </div>
          </AnimatedSection>

          {/* Story */}
          <AnimatedSection delay={0.2}>
            <span className="text-accent font-semibold text-sm tracking-widest uppercase">
              Our Story
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark mt-3 mb-6">
              A Passion for Beauty Since 2015
            </h2>
            <div className="space-y-4 text-dark/70 leading-relaxed">
              <p>
                Vivid Nails was born from a simple dream: to create a space where beauty and
                relaxation come together. What started as a small salon has grown into a
                beloved destination for nail care in the Culpeper community.
              </p>
              <p>
                Our team of six skilled technicians brings years of experience and a genuine
                passion for nail artistry. We stay current with the latest trends and
                techniques while never compromising on the classics our clients love.
              </p>
              <p>
                Whether you&apos;re here for a quick manicure or a full spa day with friends,
                we treat every visit as an opportunity to make you feel beautiful and pampered.
                Your satisfaction is our greatest reward.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
