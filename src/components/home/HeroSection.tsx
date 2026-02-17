'use client';

import { motion } from 'motion/react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Clean white/cream background */}
      <div className="absolute inset-0 bg-white" />

      {/* Subtle gold decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-primary" />
            <span className="text-primary font-medium text-sm tracking-[0.25em] uppercase">
              Welcome to Vivid Nails
            </span>
            <div className="w-12 h-px bg-primary" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-dark leading-tight mb-6"
        >
          Where Beauty{' '}
          <span className="text-primary italic">Meets</span>{' '}
          Perfection
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-dark/50 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Experience premium nail care in a relaxing, modern environment. From classic manicures to stunning nail art — your perfect look awaits.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="/booking"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full bg-primary text-white hover:bg-primary-dark transition-colors"
          >
            Book Your Appointment
          </a>
          <a
            href="/services"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full border-2 border-dark/15 text-dark hover:border-primary hover:text-primary transition-colors"
          >
            View Services
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="grid grid-cols-3 gap-8 mt-20 max-w-lg mx-auto"
        >
          {[
            { number: '48+', label: 'Services' },
            { number: '6', label: 'Expert Techs' },
            { number: '5.0', label: 'Star Rated' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-primary">{stat.number}</div>
              <div className="text-sm text-dark/40 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-dark/15 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1 h-1 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
