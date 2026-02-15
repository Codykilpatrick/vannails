'use client';

import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { AnimatedStagger, AnimatedItem } from '@/components/ui/AnimatedSection';

const testimonials = [
  {
    name: 'Kimberly Cruz',
    text: 'I 100% recommend this place they are so nice and really make sure you are comfortable. You can tell they really take pride in their job. I was nervous at first but I\'m definitely glad I came! My person\'s name is Nancy!',
    rating: 5,
  },
  {
    name: 'Kyra Clowser',
    text: 'Had a great first experience! Was in the area and needed a pedicure. Everybody was very friendly and the shop was very elegant and clean. 10/10 recommend!',
    rating: 5,
  },
  {
    name: 'Sasha Chavez',
    text: 'Kathy was amazing, she did my builder gel and was quick, communicative and made sure I got exactly what I was looking for. Zara threaded my eyebrows and did an amazing job as well. Definitely recommend this place, it\'s clean and they really try to give you the best service.',
    rating: 5,
  },
  {
    name: 'Jessica Cranfield',
    text: 'Gorgeous salon! Cathy was AMAZING! Will definitely be back!',
    rating: 5,
  },
  {
    name: 'Danielle Ferguson',
    text: 'My nail tech\'s name is Thy. She is always excellent and the new salon is beautiful and welcoming. Very great service, I highly recommend!',
    rating: 5,
  },
  {
    name: 'Mariana Hurtado-Bacon',
    text: 'I randomly walked into the salon to try them out, but the service is so great. The salon atmosphere is absolutely clean, very updated and very modern. Definitely coming back!',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            title="What Our Clients Say"
            subtitle="Don't just take our word for it — hear from our happy clients on Google."
          />
        </AnimatedSection>

        <AnimatedStagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <AnimatedItem key={testimonial.name}>
              <div className="bg-white rounded-2xl p-8 shadow-md h-full flex flex-col">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-accent"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-dark/70 text-sm leading-relaxed flex-1 italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="font-semibold text-dark">{testimonial.name}</p>
                  <p className="text-xs text-dark/40">Google Review</p>
                </div>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedStagger>
      </div>
    </section>
  );
}
