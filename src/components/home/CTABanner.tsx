'use client';

import { motion } from 'motion/react';

export default function CTABanner() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Warm dark background */}
      <div className="absolute inset-0 bg-dark" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-primary" />
            <span className="text-primary font-medium text-sm tracking-[0.25em] uppercase">
              Your Next Visit
            </span>
            <div className="w-12 h-px bg-primary" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready for Beautiful Nails?
          </h2>
          <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto">
            Book your appointment today and let our expert technicians create your perfect look. Walk-ins welcome, but appointments are recommended.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/booking"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full bg-primary text-white hover:bg-primary-dark transition-colors"
            >
              Book Appointment
            </a>
            <a
              href="tel:+15407642843"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full border-2 border-white/20 text-white hover:border-primary hover:text-primary transition-colors"
            >
              Call (540) 764-2843
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
