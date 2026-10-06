import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { useLanguage } from '../../context/LanguageContext';
import LightboxModal from './LightboxModal';
import EmptyState from '../common/EmptyState';
import { motion } from 'framer-motion';
import { Camera, Calendar, Sparkles } from 'lucide-react';

export default function GallerySection({ onOpenAdmin }) {
  const { content } = useContent();
  const { t, isBn, getField } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const photos = content.gallery || [];

  return (
    <section id="gallery" className="py-16 sm:py-20 md:py-28 px-3 sm:px-6 relative max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2.5 sm:space-y-3">
        <span className="text-[11px] sm:text-xs uppercase tracking-widest text-romantic-rose font-medium flex items-center justify-center gap-1.5">
          <Camera className="w-3.5 h-3.5" />
          <span>{isBn ? 'মধুর স্মৃতিমালা' : 'Captured Moments'}</span>
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-white dark:text-white">
          {t.gallery.sectionTitle}
        </h2>
        <p className="text-xs sm:text-base text-romantic-rose-muted px-2">
          {t.gallery.sectionSubtitle}
        </p>
      </div>

      {photos.length === 0 ? (
        <EmptyState
          title={t.gallery.emptyTitle}
          description={t.gallery.emptyDesc}
          actionText={t.gallery.addPhoto}
          onAction={onOpenAdmin}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {photos.map((item, index) => {
            const rot = item.rotation || (index % 2 === 0 ? -1.5 : 1.5);
            const captionText = getField(item, 'caption') || item.caption;

            return (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => setLightboxIndex(index)}
                className="cursor-pointer group select-none transition-transform"
                style={{
                  // Subtle tilt on larger screens, subtle 0 on mobile for cleaner look
                  transform: typeof window !== 'undefined' && window.innerWidth < 640 ? 'none' : `rotate(${rot}deg)`
                }}
              >
                {/* Polaroid Frame */}
                <div className="relative bg-white/95 dark:bg-[#1E1220] p-3.5 sm:p-4 pb-5 sm:pb-6 rounded-2xl shadow-glass border border-romantic-rose/20 group-hover:border-romantic-rose/60 transition-all duration-300">
                  {/* Washi Tape Pin Accent */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 sm:w-16 h-4 sm:h-5 bg-romantic-rose/40 dark:bg-romantic-rose/30 backdrop-blur-sm -rotate-2 rounded-sm border border-romantic-rose/30 shadow-sm" />

                  {/* Photo Container */}
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-romantic-burgundy-dark/50">
                    <img
                      src={item.image}
                      alt={captionText || "Love story memory"}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-3">
                      <span className="text-[11px] sm:text-xs text-white bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <Sparkles className="w-3 h-3 text-romantic-gold" />
                        <span>{isBn ? 'বড় করে দেখুন' : 'Click to enlarge'}</span>
                      </span>
                    </div>
                  </div>

                  {/* Handwritten Polaroid Caption */}
                  <div className="mt-3 sm:mt-4 px-1 text-center space-y-1">
                    <p className="font-handwriting text-xl sm:text-2xl text-romantic-text-dark dark:text-romantic-rose-soft line-clamp-2 leading-tight">
                      {captionText}
                    </p>
                    {item.date && (
                      <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-sans font-medium uppercase tracking-wider text-romantic-burgundy dark:text-romantic-gold">
                        <Calendar className="w-3 h-3" />
                        {item.date}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <LightboxModal
          images={photos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      )}
    </section>
  );
}
