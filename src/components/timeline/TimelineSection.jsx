import React from 'react';
import { useContent } from '../../context/ContentContext';
import { useLanguage } from '../../context/LanguageContext';
import GlassCard from '../common/GlassCard';
import EmptyState from '../common/EmptyState';
import { motion } from 'framer-motion';
import { Sparkles, Moon, Heart, Flower2, Wine, Crown, Calendar, Tag } from 'lucide-react';

const ICON_MAP = {
  Sparkles,
  Moon,
  Heart,
  Flower2,
  Wine,
  Crown
};

export default function TimelineSection() {
  const { content } = useContent();
  const { t, isBn, getField } = useLanguage();
  const milestones = content.timeline || [];

  return (
    <section id="story" className="py-16 sm:py-20 md:py-28 px-3 sm:px-6 relative max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2.5 sm:space-y-3">
        <span className="text-[11px] sm:text-xs uppercase tracking-widest text-romantic-rose font-medium">
          {isBn ? 'মধুর স্মৃতিমালা' : 'Chronicles of Love'}
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-white dark:text-white">
          {t.timeline.sectionTitle}
        </h2>
        <p className="text-xs sm:text-base text-romantic-rose-muted px-2">
          {t.timeline.sectionSubtitle}
        </p>
      </div>

      {milestones.length === 0 ? (
        <EmptyState
          title={isBn ? "এখনো কোনো মাইলফলক নেই" : "No milestones added yet"}
          description={isBn ? "অ্যাডমিন প্যানেল থেকে তোমাদের সম্পর্কের বিশেষ মুহূর্তগুলো যুক্ত করুন।" : "Add special moments of your love journey from the Admin Studio."}
        />
      ) : (
        <div className="relative">
          {/* Animated Vertical Connecting Line */}
          <div className="absolute left-5 sm:left-6 md:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-romantic-rose/25 via-romantic-rose-bright/60 to-romantic-gold/25" />

          {/* Milestone Items */}
          <div className="space-y-8 sm:space-y-12 md:space-y-16">
            {milestones.map((item, index) => {
              const IconComponent = ICON_MAP[item.icon] || Heart;
              const isEven = index % 2 === 0;
              const dateText = getField(item, 'date') || item.date;
              const titleText = getField(item, 'title') || item.title;
              const descText = getField(item, 'description') || item.description;
              const tagText = getField(item, 'tag') || item.tag;

              return (
                <div
                  key={item.id || index}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Central Node */}
                  <div className="absolute left-5 sm:left-6 md:left-1/2 -translate-x-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-romantic-burgundy-dark border-2 border-romantic-rose flex items-center justify-center text-romantic-rose shadow-glow-rose">
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>

                  {/* Content Card */}
                  <div
                    className={`ml-11 sm:ml-14 md:ml-0 md:w-1/2 ${
                      isEven ? 'md:pl-10' : 'md:pr-10'
                    } w-[calc(100%-2.75rem)] sm:w-[calc(100%-3.5rem)]`}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                    >
                      <GlassCard className="p-4 sm:p-6 md:p-8 hover:border-romantic-rose/40 group">
                        {/* Date and Tag Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold tracking-wider text-romantic-gold uppercase">
                            <Calendar className="w-3.5 h-3.5" />
                            {dateText}
                          </span>

                          {tagText && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-romantic-rose/15 text-romantic-rose border border-romantic-rose/25">
                              <Tag className="w-3 h-3" />
                              {tagText}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-medium text-white dark:text-white mb-2 sm:mb-3 group-hover:text-glow-rose transition-all leading-snug">
                          {titleText}
                        </h3>

                        {/* Optional Milestone Photo */}
                        {item.image && (
                          <div className="my-3 sm:my-4 rounded-xl sm:rounded-2xl overflow-hidden border border-romantic-rose/25 bg-romantic-burgundy-dark/50 shadow-md group-hover:border-romantic-rose/50 transition-all">
                            <img
                              src={item.image}
                              alt={titleText}
                              loading="lazy"
                              className="w-full h-44 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                            />
                          </div>
                        )}

                        {/* Description */}
                        <p className="text-xs sm:text-sm md:text-base text-romantic-rose-muted leading-relaxed">
                          {descText}
                        </p>
                      </GlassCard>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
