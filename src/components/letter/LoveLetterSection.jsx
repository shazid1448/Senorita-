import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { useLanguage } from '../../context/LanguageContext';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Sparkles, Heart, Feather, RefreshCw } from 'lucide-react';

export default function LoveLetterSection() {
  const { content } = useContent();
  const { t, isBn } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const letter = content.letter || {};
  const salutation = isBn ? letter.salutation : (letter.salutationEn || letter.salutation);
  const paragraphs = isBn ? letter.paragraphs : (letter.paragraphsEn || letter.paragraphs || []);
  const closing = isBn ? letter.closing : (letter.closingEn || letter.closing);
  const author = isBn ? letter.author : (letter.authorEn || letter.author);
  const sealText = letter.sealText || 'S & N';

  const handleOpen = () => {
    if (!isOpen) {
      // Fire romantic confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF6FA5', '#E8A6C1', '#D4AF8C', '#9E2454']
        });
      } catch {}
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <section id="letter" className="py-20 md:py-28 px-4 relative max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <span className="text-xs uppercase tracking-widest text-romantic-rose font-medium flex items-center justify-center gap-1.5">
          <Feather className="w-3.5 h-3.5" />
          <span>{isBn ? 'হৃদয়ের অনুভূতি' : 'Unspoken Words'}</span>
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-white dark:text-white">
          {t.letter.sectionTitle}
        </h2>
        <p className="text-sm sm:text-base text-romantic-rose-muted">
          {t.letter.sectionSubtitle}
        </p>
      </div>

      <div className="relative flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Closed Royal Envelope */
            <motion.div
              key="closed-envelope"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              onClick={handleOpen}
              className="cursor-pointer group relative w-full max-w-lg aspect-[1.5/1] rounded-3xl bg-gradient-to-br from-[#3D0C20] via-[#240814] to-[#14040B] p-6 shadow-glow-burgundy border border-romantic-rose/30 flex flex-col items-center justify-center transition-all duration-300 hover:border-romantic-rose/70 hover:scale-[1.02]"
            >
              {/* Envelope Flap Lines */}
              <div className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden opacity-30">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                  <polygon points="0,0 50,48 100,0" fill="none" stroke="#E8A6C1" strokeWidth="0.8" />
                  <line x1="0" y1="100" x2="42" y2="48" stroke="#E8A6C1" strokeWidth="0.8" />
                  <line x1="100" y1="100" x2="58" y2="48" stroke="#E8A6C1" strokeWidth="0.8" />
                </svg>
              </div>

              {/* 3D Wax Seal Button */}
              <div className="relative z-10 wax-seal w-20 h-20 sm:w-24 sm:h-24 rounded-full flex flex-col items-center justify-center border-2 border-romantic-gold/60 text-romantic-gold shadow-2xl group-hover:scale-110 group-hover:shadow-glow-rose transition-all duration-300">
                <Heart className="w-4 h-4 fill-romantic-gold/40 text-romantic-gold mb-0.5 animate-pulse" />
                <span className="font-serif text-sm sm:text-base font-bold tracking-widest uppercase">
                  {sealText}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-romantic-gold-light/80">
                  Seal
                </span>
              </div>

              {/* Tap to Open Prompt */}
              <div className="relative z-10 mt-6 text-center space-y-1">
                <p className="font-serif text-lg sm:text-xl text-white font-medium group-hover:text-glow-rose transition-all">
                  {t.letter.tapToOpen}
                </p>
                <p className="text-xs text-romantic-rose-muted uppercase tracking-wider">
                  {content.coupleTitle}
                </p>
              </div>
            </motion.div>
          ) : (
            /* Unfolded Parchment Love Letter */
            <motion.div
              key="open-letter"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-2xl bg-[#FFFDF9] dark:bg-[#1A0F17] rounded-3xl p-8 sm:p-12 shadow-2xl border border-romantic-rose/30 text-romantic-text-dark dark:text-romantic-text"
            >
              {/* Decorative Corner Ornaments */}
              <div className="absolute top-4 left-4 text-romantic-gold/40">✦</div>
              <div className="absolute top-4 right-4 text-romantic-gold/40">✦</div>
              <div className="absolute bottom-4 left-4 text-romantic-gold/40">✦</div>
              <div className="absolute bottom-4 right-4 text-romantic-gold/40">✦</div>

              {/* Salutation */}
              <h3 className="font-serif text-2xl sm:text-3xl text-romantic-burgundy dark:text-romantic-rose font-semibold mb-6">
                {salutation}
              </h3>

              {/* Letter Paragraphs */}
              <div className="space-y-4 font-serif text-base sm:text-lg leading-relaxed text-stone-800 dark:text-stone-200">
                {paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Closing & Author Signature */}
              <div className="mt-8 pt-6 border-t border-romantic-rose/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-romantic-rose-deep font-sans">
                    {closing}
                  </p>
                  <p className="font-handwriting text-3xl sm:text-4xl text-romantic-burgundy dark:text-romantic-rose mt-1">
                    {author}
                  </p>
                </div>

                {/* Fold Letter Back Button */}
                <button
                  onClick={handleClose}
                  className="px-5 py-2 rounded-full border border-romantic-rose/30 bg-romantic-rose/10 hover:bg-romantic-rose/25 text-romantic-burgundy dark:text-romantic-rose text-xs font-semibold tracking-wider flex items-center gap-1.5 transition-all min-h-[44px]"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{t.letter.foldLetter}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
