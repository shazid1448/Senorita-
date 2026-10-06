import React from 'react';
import { useContent } from '../../context/ContentContext';
import { useLanguage } from '../../context/LanguageContext';
import LoveClock from './LoveClock';
import { Heart, Sparkles, ArrowDown, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const { content } = useContent();
  const { isBn, getField } = useLanguage();

  const coupleTitle = isBn && content.coupleTitleBn ? content.coupleTitleBn : content.coupleTitle;
  const headline = getField(content.hero, 'headline') || content.hero.headline;
  const subtitle = getField(content.hero, 'subtitle') || content.hero.subtitle;
  const quote = getField(content.hero, 'quote') || content.hero.quote;
  const badge = getField(content.hero, 'badge') || content.hero.badge;

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-center items-center text-center px-4 pt-28 pb-16 overflow-hidden"
    >
      {/* Cinematic Ambient Parallax Background Rings */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10">
        <div className="w-[32rem] sm:w-[48rem] h-[32rem] sm:h-[48rem] rounded-full border border-romantic-rose/10 animate-spin-slow" />
        <div className="w-[24rem] sm:w-[36rem] h-[24rem] sm:h-[36rem] rounded-full border border-romantic-burgundy/20 animate-spin-slow [animation-direction:reverse]" />
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Floating Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-romantic-burgundy/50 border border-romantic-rose/30 shadow-glow-rose backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-romantic-gold animate-pulse" />
          <span className="text-xs sm:text-sm font-medium tracking-widest uppercase text-romantic-rose">
            {badge}
          </span>
          <Heart className="w-3 h-3 text-romantic-rose-bright fill-romantic-rose-bright/50" />
        </motion.div>

        {/* Grand Couple Monogram & Names */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="space-y-3"
        >
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-white dark:text-white leading-tight">
            <span className="block italic text-glow-rose">{coupleTitle}</span>
          </h1>

          <p className="font-serif text-xl sm:text-2xl md:text-3xl text-romantic-rose-bright/90 font-light tracking-wide max-w-2xl mx-auto">
            {headline}
          </p>
        </motion.div>

        {/* Live Love Clock */}
        <LoveClock startDate={content.startDate} />

        {/* Romantic Subtitle & Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto space-y-4"
        >
          <p className="text-sm sm:text-base text-romantic-rose-muted leading-relaxed px-4">
            {subtitle}
          </p>

          {quote && (
            <div className="pt-2 px-6">
              <blockquote className="font-serif italic text-base sm:text-lg text-romantic-gold/90 max-w-xl mx-auto">
                {quote}
              </blockquote>
              {content.hero?.quoteAuthor && (
                <cite className="block text-xs uppercase tracking-widest text-romantic-gold/60 mt-1 not-italic">
                  — {content.hero.quoteAuthor}
                </cite>
              )}
            </div>
          )}
        </motion.div>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="pt-4 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#story"
            className="btn-romantic-gradient px-8 py-3.5 rounded-full text-sm font-semibold tracking-wider flex items-center gap-2 shadow-glow-rose group"
          >
            <span>{isBn ? 'আমাদের গল্প পড়ুন' : 'Read Our Story'}</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </a>

          <a
            href="#letter"
            className="px-7 py-3 rounded-full text-sm font-medium tracking-wide border border-romantic-rose/30 bg-romantic-burgundy-dark/50 hover:bg-romantic-burgundy/60 text-romantic-text hover:text-white transition-all flex items-center gap-2 backdrop-blur-md"
          >
            <Mail className="w-4 h-4 text-romantic-rose" />
            <span>{isBn ? 'ভালোবাসার চিঠি' : 'Open Love Letter'}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
