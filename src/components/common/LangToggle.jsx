import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Languages } from 'lucide-react';

export default function LangToggle() {
  const { lang, toggleLang, isBn } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      type="button"
      className="p-2 px-3 rounded-full border border-romantic-rose/20 bg-romantic-burgundy-dark/40 hover:bg-romantic-burgundy/60 text-romantic-rose hover:text-white transition-all duration-300 text-xs font-semibold tracking-wider flex items-center gap-1.5 min-h-[44px] min-w-[44px] justify-center focus:outline-none focus:ring-2 focus:ring-romantic-rose/50"
      title={isBn ? "Switch to English" : "বাংলা ভাষায় দেখুন"}
      aria-label="Toggle language"
    >
      <Languages className="w-3.5 h-3.5" />
      <span>{isBn ? 'বাংলা' : 'EN'}</span>
    </button>
  );
}
