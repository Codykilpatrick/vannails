'use client';

import { cn } from '@/lib/utils';
import { ServiceCategory, SERVICE_CATEGORIES } from '@/types';
import { motion } from 'motion/react';

interface ServiceCategoryTabsProps {
  activeCategory: ServiceCategory;
  onSelect: (category: ServiceCategory) => void;
}

export default function ServiceCategoryTabs({
  activeCategory,
  onSelect,
}: ServiceCategoryTabsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {SERVICE_CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={cn(
            'relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-200',
            activeCategory === category
              ? 'text-white'
              : 'text-dark/60 hover:text-dark bg-white shadow-sm'
          )}
        >
          {activeCategory === category && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-primary rounded-full"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{category}</span>
        </button>
      ))}
    </div>
  );
}
