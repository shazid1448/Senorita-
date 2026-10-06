import React from 'react';
import { useContent } from '../../context/ContentContext';
import { useLanguage } from '../../context/LanguageContext';
import { Heart, Sparkles, Lock } from 'lucide-react';

export default function Footer({ onOpenAdmin }) {
  const { content } = useContent();
  const { t, isBn } = useLanguage();

  return (
    <footer className="relative border-t border-romantic-rose/15 bg-black/40 backdrop-blur-md pt-16 pb-12 px-4 safe-pb text-center">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Monogram Seal */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-romantic-burgundy/60 border border-romantic-rose/40 text-romantic-rose shadow-glow-rose">
          <Heart className="w-6 h-6 fill-romantic-rose/40 animate-heartbeat" />
        </div>

        {/* Couple Title */}
        <h3 className="font-serif text-3xl sm:text-4xl text-white dark:text-white">
          {content.coupleTitle}
        </h3>

        {/* Romantic Dedication */}
        <p className="text-sm text-romantic-rose-muted max-w-md mx-auto leading-relaxed">
          {t.footer.madeWith}{' '}
          <span className="text-white font-medium">{content.brideName}</span> &{' '}
          <span className="text-white font-medium">{content.groomName}</span>.
        </p>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-romantic-rose/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-romantic-rose-muted/70">
          <p>© {new Date().getFullYear()} {content.coupleTitle}. {t.footer.forever}.</p>

          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:text-white hover:bg-romantic-rose/10 transition-all min-h-[44px]"
            title={t.footer.adminBtn}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{t.footer.adminBtn}</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
