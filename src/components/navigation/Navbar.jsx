import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAudio } from '../../context/AudioContext';
import { useContent } from '../../context/ContentContext';
import ThemeToggle from '../common/ThemeToggle';
import LangToggle from '../common/LangToggle';
import { Heart, Music, Pause, Lock } from 'lucide-react';

export default function Navbar({ onOpenAdmin }) {
  const { t } = useLanguage();
  const { content } = useContent();
  const { isPlaying, togglePlay } = useAudio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let prevScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 30);

      if (currentScrollY < 40) {
        setIsVisible(true);
      } else if (currentScrollY > prevScrollY + 8) {
        // Scrolling down -> hide navbar smoothly
        setIsVisible(false);
      } else if (currentScrollY < prevScrollY - 8) {
        // Scrolling up -> show navbar
        setIsVisible(true);
      }
      prevScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#story', label: t.nav.story },
    { href: '#gallery', label: t.nav.gallery },
    { href: '#letter', label: t.nav.letter },
    { href: '#music', label: t.nav.music },
    { href: '#dates', label: t.nav.dates },
    { href: '#plans', label: t.nav.plans },
    { href: '#vault', label: t.nav.vault }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 safe-pt px-2 sm:px-6 md:px-8 ${
        isScrolled ? 'py-2' : 'py-3 sm:py-5'
      } ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`glass-panel rounded-full px-3 sm:px-6 py-2 flex items-center justify-between transition-all duration-300 ${
            isScrolled
              ? 'shadow-glow-burgundy/20 bg-romantic-burgundy-dark/75 dark:bg-romantic-burgundy-dark/85 backdrop-blur-xl'
              : 'bg-romantic-burgundy-dark/40 dark:bg-romantic-burgundy-dark/50 backdrop-blur-md'
          }`}
        >
          {/* Monogram Brand */}
          <a
            href="#hero"
            className="flex items-center gap-2 group text-romantic-text no-underline min-h-[44px] py-1"
            aria-label="Home"
          >
            <div className="w-8 h-8 rounded-full bg-romantic-burgundy/60 border border-romantic-rose/40 flex items-center justify-center text-romantic-rose group-hover:scale-110 group-hover:border-romantic-rose transition-all duration-300">
              <Heart className="w-4 h-4 fill-romantic-rose/40 text-romantic-rose animate-heartbeat" />
            </div>
            <span className="font-serif text-base sm:text-xl font-semibold tracking-wider text-white whitespace-nowrap group-hover:text-glow-rose transition-all">
              {content.monogram || 'S & N'}
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-full text-xs font-medium tracking-wide text-romantic-text/80 hover:text-white hover:bg-romantic-rose/15 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Controls Cluster */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Audio Quick Play Button */}
            <button
              onClick={togglePlay}
              type="button"
              className={`p-2 rounded-full border transition-all duration-300 flex items-center justify-center min-w-[42px] min-h-[42px] ${
                isPlaying
                  ? 'border-romantic-rose/60 bg-romantic-rose/25 text-romantic-rose shadow-glow-rose animate-pulse'
                  : 'border-romantic-rose/20 bg-romantic-burgundy-dark/40 text-romantic-rose-muted hover:text-white'
              }`}
              title={isPlaying ? "Pause Music" : "Play Romantic Music"}
              aria-label={isPlaying ? "Pause Music" : "Play Romantic Music"}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-romantic-rose-bright" />
              ) : (
                <Music className="w-4 h-4" />
              )}
            </button>

            {/* Language Switcher */}
            <LangToggle />

            {/* Theme Switcher */}
            <ThemeToggle />

            {/* Secret Admin Button */}
            <button
              onClick={onOpenAdmin}
              type="button"
              className="p-2 rounded-full border border-romantic-gold/30 bg-romantic-burgundy-dark/40 hover:bg-romantic-burgundy text-romantic-gold hover:text-romantic-gold-light transition-all duration-300 min-w-[42px] min-h-[42px] flex items-center justify-center shadow-sm"
              title={t.nav.admin}
              aria-label="Open Admin Settings"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
