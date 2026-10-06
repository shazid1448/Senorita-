import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { useLanguage } from '../../context/LanguageContext';
import GlassCard from '../common/GlassCard';
import EmptyState from '../common/EmptyState';
import { motion } from 'framer-motion';
import { Compass, CheckCircle2, CircleDashed, Sparkles, MapPin } from 'lucide-react';

export default function FuturePlansSection() {
  const { content } = useContent();
  const { t, isBn, getField } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const plans = content.futurePlans || [];

  // Extract unique categories
  const categories = ['ALL', ...new Set(plans.map((p) => p.category).filter(Boolean))];

  const filteredPlans = selectedCategory === 'ALL'
    ? plans
    : plans.filter((p) => p.category === selectedCategory);

  return (
    <section id="plans" className="py-20 md:py-28 px-4 relative max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <span className="text-xs uppercase tracking-widest text-romantic-rose font-medium flex items-center justify-center gap-1.5">
          <Compass className="w-3.5 h-3.5" />
          <span>{isBn ? 'ভবিষ্যতের স্বপ্ন' : 'Our Next Chapters'}</span>
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-white dark:text-white">
          {t.plans.sectionTitle}
        </h2>
        <p className="text-sm sm:text-base text-romantic-rose-muted">
          {t.plans.sectionSubtitle}
        </p>
      </div>

      {/* Category Filter Pills */}
      {categories.length > 2 && (
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all min-h-[38px] ${
                selectedCategory === cat
                  ? 'bg-romantic-rose text-romantic-burgundy-dark shadow-glow-rose font-bold'
                  : 'bg-romantic-burgundy-dark/50 border border-romantic-rose/20 text-romantic-rose-muted hover:text-white hover:border-romantic-rose/40'
              }`}
            >
              {cat === 'ALL' ? (isBn ? 'সবগুলো' : 'All Dreams') : cat}
            </button>
          ))}
        </div>
      )}

      {filteredPlans.length === 0 ? (
        <EmptyState
          title={isBn ? "কোনো স্বপ্ন যোগ করা হয়নি" : "No dreams listed yet"}
          description={isBn ? "অ্যাডমিন প্যানেল থেকে তোমাদের ভবিষ্যৎ পরিকল্পনার বাকেট লিস্ট সাজিয়ে নাও।" : "Add items to your shared bucket list from the Admin Studio."}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredPlans.map((item, index) => {
            const title = getField(item, 'title') || item.title;
            const category = getField(item, 'category') || item.category;

            return (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <GlassCard className="h-full flex flex-col justify-between p-6 sm:p-7 group hover:border-romantic-rose/50">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-romantic-burgundy/60 border border-romantic-rose/25 text-romantic-rose">
                        <MapPin className="w-3 h-3 text-romantic-gold" />
                        {category}
                      </span>

                      {item.completed ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{t.plans.completedBadge}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-romantic-rose-muted">
                          <CircleDashed className="w-4 h-4 animate-spin-slow text-romantic-rose" />
                          <span>{t.plans.dreamBadge}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-2xl font-semibold text-white dark:text-white group-hover:text-glow-rose transition-all">
                      {title}
                    </h3>

                    {item.notes && (
                      <p className="text-sm text-romantic-rose-muted leading-relaxed">
                        {item.notes}
                      </p>
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
