'use client';

import { Service } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { motion } from 'motion/react';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 flex items-center justify-between gap-4"
    >
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-dark truncate">{service.name}</h3>
        <p className="text-sm text-dark/50 mt-1">{service.duration} min</p>
      </div>
      <div className="text-right shrink-0">
        <span className="text-xl font-bold text-primary">{formatCurrency(service.price)}</span>
      </div>
    </motion.div>
  );
}
