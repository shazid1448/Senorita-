import React, { useState, useEffect } from 'react';
import { calculateLoveTime, toBengaliNumber } from '../../utils/timeAgo';
import { useLanguage } from '../../context/LanguageContext';
import { Clock, Sparkles, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoveClock({ startDate }) {
  const { t, isBn } = useLanguage();
  const [time, setTime] = useState(() => calculateLoveTime(startDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateLoveTime(startDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [startDate]);

  const num = (val) => (isBn ? toBengaliNumber(val) : val);

  const units = [
    { label: t.hero.daysTogether, value: num(time.days), key: 'days' },
    { label: t.hero.hours, value: num(time.hours), key: 'hours' },
    { label: t.hero.minutes, value: num(time.minutes), key: 'minutes' },
    { label: t.hero.seconds, value: num(time.seconds), key: 'seconds' }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto my-5 sm:my-8 px-1 sm:px-2">
      {/* 4 Counter Cards - Optimized for iPhone, Android, and Desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5 mb-4 sm:mb-6">
        {units.map((unit, index) => (
          <motion.div
            key={unit.key}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="glass-panel rounded-2xl sm:rounded-3xl p-3 sm:p-5 md:p-6 text-center relative group border border-romantic-rose/25 hover:border-romantic-rose/60 shadow-glass"
          >
            <div className="hidden sm:block absolute top-2 right-2 opacity-25 group-hover:opacity-80 transition-opacity">
              <Sparkles className="w-3.5 h-3.5 text-romantic-gold" />
            </div>

            <span className="block font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white dark:text-white drop-shadow-[0_2px_10px_rgba(255,111,165,0.45)]">
              {unit.value}
            </span>

            <span className="block mt-0.5 sm:mt-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-romantic-rose-bright/90 dark:text-romantic-rose/85">
              {unit.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Milestone Sub-Badges */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 text-[11px] sm:text-xs text-romantic-rose-muted"
      >
        <span className="px-3 py-1 rounded-full bg-romantic-burgundy-dark/60 border border-romantic-rose/25 backdrop-blur-md flex items-center gap-1.5 shadow-sm">
          <Heart className="w-3 h-3 text-romantic-rose fill-romantic-rose/40 animate-heartbeat" />
          <span>{num(time.yearsTogether)} {t.hero.yearsCount}</span>
        </span>

        <span className="px-3 py-1 rounded-full bg-romantic-burgundy-dark/60 border border-romantic-rose/25 backdrop-blur-md flex items-center gap-1.5 shadow-sm">
          <Clock className="w-3 h-3 text-romantic-gold" />
          <span>{num(time.daysUntilAnniversary)} {t.hero.daysToAnniversary}</span>
        </span>

        <span className="px-3 py-1 rounded-full bg-romantic-burgundy-dark/60 border border-romantic-rose/25 backdrop-blur-md flex items-center gap-1.5 shadow-sm">
          <Sparkles className="w-3 h-3 text-romantic-rose-bright" />
          <span>{num(time.daysUntilMilestone)} {t.hero.daysToMilestone}</span>
        </span>
      </motion.div>
    </div>
  );
}
