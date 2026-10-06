import React from 'react';
import { useContent } from '../../context/ContentContext';
import { useLanguage } from '../../context/LanguageContext';
import { calculateDaysRemaining, toBengaliNumber } from '../../utils/timeAgo';
import GlassCard from '../common/GlassCard';
import EmptyState from '../common/EmptyState';
import { motion } from 'framer-motion';
import { Calendar, Heart, Sparkles, Flower2, Crown, Bell } from 'lucide-react';

const ICON_MAP = {
  Heart,
  Sparkles,
  Flower2,
  Crown
};

export default function SpecialDatesSection() {
  const { content } = useContent();
  const { t, isBn, getField } = useLanguage();

  const specialDates = content.specialDates || [];

  return (
    <section id="dates" className="py-20 md:py-28 px-4 relative max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span className="text-xs uppercase tracking-widest text-romantic-rose font-medium flex items-center justify-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          <span>{isBn ? 'স্মরণীয় দিন' : 'Special Moments'}</span>
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-white dark:text-white">
          {t.dates.sectionTitle}
        </h2>
        <p className="text-sm sm:text-base text-romantic-rose-muted">
          {t.dates.sectionSubtitle}
        </p>
      </div>

      {specialDates.length === 0 ? (
        <EmptyState
          title={isBn ? "কোনো বিশেষ দিন নেই" : "No special dates added"}
          description={isBn ? "অ্যাডমিন থেকে বার্ষিকী ও বিশেষ দিন যুক্ত করুন।" : "Add upcoming anniversaries and celebrations in the Admin Studio."}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {specialDates.map((item, index) => {
            const Icon = ICON_MAP[item.icon] || Heart;
            const title = getField(item, 'title') || item.title;
            const desc = getField(item, 'description') || item.description;

            // Compute remaining days
            let daysLeft = calculateDaysRemaining(item.date);
            if (item.recurring && daysLeft < 0) {
              const originalDate = new Date(item.date);
              const nextYear = new Date().getFullYear() + 1;
              const nextOccurrence = new Date(nextYear, originalDate.getMonth(), originalDate.getDate());
              daysLeft = calculateDaysRemaining(nextOccurrence.toISOString());
            }

            const isToday = daysLeft === 0;
            const num = (v) => (isBn ? toBengaliNumber(v) : v);

            return (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard className="h-full flex flex-col justify-between p-6 sm:p-8 hover:border-romantic-rose/50 group">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-romantic-burgundy/50 border border-romantic-rose/30 flex items-center justify-center text-romantic-rose group-hover:scale-110 group-hover:border-romantic-rose transition-all shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="text-right">
                      {isToday ? (
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-romantic-rose/25 text-romantic-rose-bright border border-romantic-rose animate-pulse">
                          {t.dates.today}
                        </span>
                      ) : daysLeft > 0 ? (
                        <div className="text-right">
                          <span className="font-serif text-3xl font-bold text-white dark:text-white">
                            {num(daysLeft)}
                          </span>
                          <span className="block text-xs uppercase tracking-wider text-romantic-rose/80">
                            {t.dates.daysLeft}
                          </span>
                        </div>
                      ) : (
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-romantic-gold/15 text-romantic-gold border border-romantic-gold/30">
                          {t.dates.past}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl font-semibold text-white dark:text-white group-hover:text-glow-rose transition-all">
                      {title}
                    </h3>
                    <p className="text-sm text-romantic-rose-muted leading-relaxed">
                      {desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-romantic-rose/15 flex items-center justify-between text-xs text-romantic-gold">
                    <span className="inline-flex items-center gap-1.5 uppercase tracking-wider">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date}
                    </span>
                    {item.recurring && (
                      <span className="px-2 py-0.5 rounded-md bg-romantic-rose/10 text-romantic-rose-muted text-[11px]">
                        {isBn ? 'বার্ষিক' : 'Annual'}
                      </span>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}
