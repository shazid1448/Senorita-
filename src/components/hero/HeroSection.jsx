import React from 'react';
import { useContent } from '../../context/ContentContext';
import { useLanguage } from '../../context/LanguageContext';
import LoveClock from './LoveClock';
import { Heart, Sparkles, ArrowDown, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const { content } = useContent();
  const { isBn, getField } = useLanguage();

  const coupleTitle = isBn && content?.coupleTitleBn ? content.coupleTitleBn : (content?.coupleTitle || 'Shazid & Nithia');
  const headline = getField(content?.hero, 'headline') || content?.hero?.headline || 'Two Souls, One Heart';
  const subtitle = getField(content?.hero, 'subtitle') || content?.hero?.subtitle || '';
  const quote = getField(content?.hero, 'quote') || content?.hero?.quote || '';
  const badge = getField(content?.hero, 'badge') || content?.hero?.badge || 'Eternally Bound Together ✨';
  const couplePhoto = content?.couplePhoto || content?.hero?.couplePhoto || "/assets/images/couple-hero.svg";

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-center items-center text-center px-3 sm:px-6 pt-24 sm:pt-28 pb-16 overflow-hidden"
    >
      {/* Cinematic Ambient Parallax Background Rings */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10 overflow-hidden">
        <div className="w-[26rem] sm:w-[42rem] md:w-[48rem] h-[26rem] sm:h-[42rem] md:h-[48rem] rounded-full border border-romantic-rose/10 animate-spin-slow" />
        <div className="w-[20rem] sm:w-[32rem] md:w-[36rem] h-[20rem] sm:h-[32rem] md:h-[36rem] rounded-full border border-romantic-burgundy/20 animate-spin-slow [animation-direction:reverse]" />
      </div>

      <div className="w-full max-w-4xl mx-auto space-y-4 sm:space-y-5">
        {/* Top Floating Badge: Eternally Bound Together */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-romantic-burgundy/50 border border-romantic-rose/30 shadow-glow-rose backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-romantic-gold animate-pulse" />
          <span className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-romantic-rose">
            {badge}
          </span>
          <Heart className="w-3 h-3 text-romantic-rose-bright fill-romantic-rose-bright/50" />
        </motion.div>

        {/* Romantic Couple Picture - Strictly Centered, Square, and Bigger */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="w-full flex justify-center items-center my-3 sm:my-5"
        >
          <div className="relative group">
            {/* Ambient Glowing Halo */}
            <div className="absolute -inset-2.5 sm:-inset-3.5 rounded-3xl bg-gradient-to-tr from-romantic-rose via-romantic-gold to-romantic-burgundy opacity-75 blur-lg group-hover:opacity-100 group-hover:blur-2xl transition-all duration-500 animate-pulse-glow" />

            {/* Square Photo Frame with rounded-3xl corners */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-3xl p-1.5 sm:p-2 bg-gradient-to-tr from-romantic-rose via-romantic-gold to-romantic-burgundy shadow-2xl overflow-hidden border-2 border-white/30">
              <img
                src={couplePhoto}
                alt={coupleTitle}
                className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500 select-none bg-romantic-burgundy-dark"
              />
            </div>

            {/* Floating Heart Accent Badge */}
            <div className="absolute -bottom-2 -right-2 sm:-bottom-2.5 sm:-right-2.5 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-romantic-burgundy border-2 border-romantic-gold/80 flex items-center justify-center text-romantic-rose shadow-xl group-hover:scale-110 transition-transform">
              <Heart className="w-5 h-5 fill-romantic-rose-bright text-romantic-rose-bright animate-heartbeat" />
            </div>
          </div>
        </motion.div>

        {/* Grand Couple Monogram & Names */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="space-y-2 sm:space-y-3 px-2"
        >
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-white dark:text-white leading-tight break-words">
            <span className="block italic text-glow-rose">{coupleTitle}</span>
          </h1>

          <p className="font-serif text-lg sm:text-2xl md:text-3xl text-romantic-rose-bright/90 font-light tracking-wide max-w-2xl mx-auto leading-snug">
            {headline}
          </p>
        </motion.div>

        {/* Live Love Clock */}
        <LoveClock startDate={content.startDate} />

        {/* Romantic Subtitle & Quote */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto space-y-3 px-2"
        >
          <p className="text-xs sm:text-base text-romantic-rose-muted leading-relaxed">
            {subtitle}
          </p>

          {quote && (
            <div className="pt-2 px-4 sm:px-6">
              <blockquote className="font-serif italic text-sm sm:text-lg text-romantic-gold/90 max-w-xl mx-auto leading-relaxed">
                {quote}
              </blockquote>
              {content.hero?.quoteAuthor && (
                <cite className="block text-[11px] sm:text-xs uppercase tracking-widest text-romantic-gold/60 mt-1 not-italic font-sans">
                  — {content.hero.quoteAuthor}
                </cite>
              )}
            </div>
          )}
        </motion.div>

        {/* Action CTAs - Responsive Full Width on Phone */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-xs sm:max-w-none mx-auto w-full"
        >
          <a
            href="#story"
            className="btn-romantic-gradient w-full sm:w-auto px-7 py-3.5 rounded-full text-sm font-semibold tracking-wider flex items-center justify-center gap-2 shadow-glow-rose group min-h-[46px]"
          >
            <span>{isBn ? 'আমাদের গল্প পড়ুন' : 'Read Our Story'}</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </a>

          <a
            href="#letter"
            className="w-full sm:w-auto px-6 py-3 rounded-full text-sm font-medium tracking-wide border border-romantic-rose/30 bg-romantic-burgundy-dark/50 hover:bg-romantic-burgundy/60 text-romantic-text hover:text-white transition-all flex items-center justify-center gap-2 backdrop-blur-md min-h-[46px]"
          >
            <Mail className="w-4 h-4 text-romantic-rose" />
            <span>{isBn ? 'ভালোবাসার চিঠি' : 'Open Love Letter'}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
