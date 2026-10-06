import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Moon, SunMedium } from 'lucide-react';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="relative p-2.5 rounded-full border border-romantic-rose/20 bg-romantic-burgundy-dark/40 hover:bg-romantic-burgundy/60 text-romantic-rose hover:text-white transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-romantic-rose/50 min-w-[44px] min-h-[44px] flex items-center justify-center"
      title={isDark ? "Switch to Dusk Light Palette" : "Switch to Romantic Dark Palette"}
      aria-label="Toggle romantic color theme"
    >
      {isDark ? (
        <SunMedium className="w-4 h-4 text-romantic-gold animate-spin-slow" />
      ) : (
        <Moon className="w-4 h-4 text-romantic-burgundy" />
      )}
    </button>
  );
}
