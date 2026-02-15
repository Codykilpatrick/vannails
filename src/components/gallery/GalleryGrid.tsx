'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { AnimatedStagger, AnimatedItem } from '@/components/ui/AnimatedSection';
import LightboxModal from './LightboxModal';

const galleryItems = [
  { id: 1, title: 'Elegant French Tips', color: 'from-amber-50 to-amber-100' },
  { id: 2, title: 'Gel Ombre Design', color: 'from-stone-100 to-amber-100' },
  { id: 3, title: 'Chrome Nail Art', color: 'from-gray-100 to-stone-200' },
  { id: 4, title: 'Floral Nail Design', color: 'from-amber-50 to-stone-100' },
  { id: 5, title: 'Glitter Acrylic Set', color: 'from-amber-100 to-yellow-100' },
  { id: 6, title: 'Marble Effect Nails', color: 'from-stone-50 to-stone-200' },
  { id: 7, title: 'Bridal Nail Set', color: 'from-white to-amber-50' },
  { id: 8, title: 'Neon Summer Nails', color: 'from-amber-100 to-orange-100' },
  { id: 9, title: 'Minimalist Design', color: 'from-stone-50 to-stone-100' },
  { id: 10, title: 'Holiday Nail Art', color: 'from-amber-50 to-stone-150' },
  { id: 11, title: 'Dip Powder Ombre', color: 'from-stone-100 to-amber-50' },
  { id: 12, title: 'Abstract Nail Art', color: 'from-amber-100 to-stone-200' },
];

export default function GalleryGrid() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      <AnimatedStagger className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {galleryItems.map((item, index) => {
          const heights = ['h-64', 'h-72', 'h-56', 'h-80', 'h-64', 'h-72'];
          const height = heights[index % heights.length];

          return (
            <AnimatedItem key={item.id}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`break-inside-avoid ${height} bg-gradient-to-br ${item.color} rounded-2xl cursor-pointer overflow-hidden relative group`}
                onClick={() => setSelectedIndex(index)}
              >
                <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg">
                    {item.title}
                  </span>
                </div>
                {/* Placeholder icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <svg className="w-12 h-12 text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                  </svg>
                </div>
              </motion.div>
            </AnimatedItem>
          );
        })}
      </AnimatedStagger>

      <LightboxModal
        items={galleryItems}
        selectedIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onNext={() =>
          setSelectedIndex((prev) =>
            prev !== null ? (prev + 1) % galleryItems.length : null
          )
        }
        onPrev={() =>
          setSelectedIndex((prev) =>
            prev !== null ? (prev - 1 + galleryItems.length) % galleryItems.length : null
          )
        }
      />
    </>
  );
}
