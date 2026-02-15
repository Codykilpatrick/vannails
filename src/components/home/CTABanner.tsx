'use client';

import { motion } from 'motion/react';

export default function CTABanner() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready for Beautiful Nails?
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto">
            Book your appointment today and let our expert technicians create your perfect look. Walk-ins welcome, but appointments are recommended.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/booking"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full bg-white text-primary hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              Book Appointment
            </a>
            <a
              href="tel:+15407642843"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full border-2 border-white text-white hover:bg-white hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              Call (540) 764-2843
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
