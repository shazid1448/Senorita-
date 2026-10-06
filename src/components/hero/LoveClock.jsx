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
    <div className="w-full max-w-4xl mx-auto my-6 sm:my-8 px-2">
      {/* 4 Counter Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5 mb-5 sm:mb-6">
        {units.map((unit, index) => (
          <motion.div
            key={unit.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center relative group border border-romantic-rose/20 hover:border-romantic-rose/50 shadow-glass"
          >
            <div className="absolute top-2 right-2 opacity-20 group-hover:opacity-70 transition-opacity">
              <Sparkles className="w-3.5 h-3.5 text-romantic-gold" />
            </div>

            <span className="block font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white dark:text-white drop-shadow-[0_2px_12px_rgba(255,111,165,0.4)]">
              {unit.value}
            </span>

            <span className="block mt-1 sm:mt-2 text-xs sm:text-sm font-medium uppercase tracking-wider text-romantic-rose/90 dark:text-romantic-rose/80">
              {unit.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Milestone Sub-Badges */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-romantic-rose-muted"
      >
        <span className="px-3.5 py-1.5 rounded-full bg-romantic-burgundy-dark/60 border border-romantic-rose/20 backdrop-blur-md flex items-center gap-1.5 shadow-sm">
          <Heart className="w-3.5 h-3.5 text-romantic-rose fill-romantic-rose/40 animate-heartbeat" />
          <span>{num(time.yearsTogether)} {t.hero.yearsCount}</span>
        </span>

        <span className="px-3.5 py-1.5 rounded-full bg-romantic-burgundy-dark/60 border border-romantic-rose/20 backdrop-blur-md flex items-center gap-1.5 shadow-sm">
          <Clock className="w-3.5 h-3.5 text-romantic-gold" />
          <span>{num(time.daysUntilAnniversary)} {t.hero.daysToAnniversary}</span>
        </span>

        <span className="px-3.5 py-1.5 rounded-full bg-romantic-burgundy-dark/60 border border-romantic-rose/20 backdrop-blur-md flex items-center gap-1.5 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-romantic-rose-bright" />
          <span>{num(time.daysUntilMilestone)} {t.hero.daysToMilestone}</span>
        </span>
      </motion.div>
    </div>
  );
}
