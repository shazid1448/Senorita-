import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Calendar, Heart } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function LightboxModal({ images, currentIndex, onClose, onNavigate }) {
  const { getField } = useLanguage();
  const [scale, setScale] = useState(1);
  const touchStartXRef = useRef(null);

  const activePhoto = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % images.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, images.length, onClose, onNavigate]);

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    // Minimum swipe threshold 50px
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left -> Next
        onNavigate((currentIndex + 1) % images.length);
      } else {
        // Swipe right -> Prev
        onNavigate((currentIndex - 1 + images.length) % images.length);
      }
    }
    touchStartXRef.current = null;
  };

  const toggleZoom = () => {
    setScale((prev) => (prev === 1 ? 1.75 : 1));
  };

  if (!activePhoto) return null;

  const captionText = getField(activePhoto, 'caption') || activePhoto.caption;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 safe-pb safe-pt"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={onClose}
      >
        {/* Controls Header */}
        <div className="absolute top-4 right-4 z-50 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={toggleZoom}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white min-w-[44px] min-h-[44px] flex items-center justify-center transition-all"
            aria-label="Toggle zoom"
          >
            {scale > 1 ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
          </button>
          <button
            onClick={onClose}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white min-w-[44px] min-h-[44px] flex items-center justify-center transition-all"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Previous Button */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((currentIndex - 1 + images.length) % images.length);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white min-w-[44px] min-h-[44px] flex items-center justify-center transition-all z-40"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((currentIndex + 1) % images.length);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white min-w-[44px] min-h-[44px] flex items-center justify-center transition-all z-40"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Modal Center Image */}
        <div
          className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden rounded-2xl shadow-2xl flex items-center justify-center"
          >
            <img
              src={activePhoto.image}
              alt={captionText || "Memory photo"}
              className="max-h-[65vh] max-w-[90vw] md:max-w-3xl object-contain rounded-2xl select-none"
              draggable="false"
            />
          </motion.div>

          {/* Caption & Date Footer */}
          <div className="mt-4 text-center max-w-xl px-4 space-y-1.5">
            {captionText && (
              <p className="font-handwriting text-2xl sm:text-3xl text-romantic-rose-soft">
                {captionText}
              </p>
            )}
            {activePhoto.date && (
              <div className="flex items-center justify-center gap-1.5 text-xs uppercase tracking-widest text-romantic-gold">
                <Calendar className="w-3.5 h-3.5" />
                <span>{activePhoto.date}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
