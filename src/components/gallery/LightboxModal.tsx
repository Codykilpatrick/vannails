'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface GalleryItem {
  id: number;
  title: string;
  color: string;
}

interface LightboxModalProps {
  items: GalleryItem[];
  selectedIndex: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function LightboxModal({
  items,
  selectedIndex,
  onClose,
  onNext,
  onPrev,
}: LightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, onClose, onNext, onPrev]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedIndex]);

  const item = selectedIndex !== null ? items[selectedIndex] : null;

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-dark/90 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl z-10"
            onClick={onClose}
          >
            &times;
          </button>

          {/* Prev */}
          <button
            className="absolute left-4 md:left-8 text-white/70 hover:text-white text-4xl z-10"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
          >
            &#8249;
          </button>

          {/* Image/Content */}
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={`w-full max-w-3xl aspect-[4/3] bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto mb-4 text-dark/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
              </svg>
              <span className="text-2xl font-bold text-dark/60">{item.title}</span>
            </div>
          </motion.div>

          {/* Next */}
          <button
            className="absolute right-4 md:right-8 text-white/70 hover:text-white text-4xl z-10"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
          >
            &#8250;
          </button>

          {/* Counter */}
          <div className="absolute bottom-6 text-white/50 text-sm">
            {selectedIndex! + 1} / {items.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
