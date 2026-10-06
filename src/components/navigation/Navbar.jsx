import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAudio } from '../../context/AudioContext';
import { useContent } from '../../context/ContentContext';
import ThemeToggle from '../common/ThemeToggle';
import LangToggle from '../common/LangToggle';
import { Heart, Music, Pause, Play, Lock, Menu, X, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenAdmin }) {
  const { t, isBn } = useLanguage();
  const { content } = useContent();
  const { isPlaying, togglePlay } = useAudio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
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
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 safe-pt px-4 sm:px-6 md:px-8 ${
          isScrolled ? 'py-2.5' : 'py-4 md:py-6'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div
            className={`glass-panel rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all duration-300 ${
              isScrolled
                ? 'shadow-glow-burgundy/20 bg-romantic-burgundy-dark/70 dark:bg-romantic-burgundy-dark/80 backdrop-blur-xl'
                : 'bg-romantic-burgundy-dark/30 dark:bg-romantic-burgundy-dark/40 backdrop-blur-md'
            }`}
          >
            {/* Monogram Brand */}
            <a
              href="#hero"
              className="flex items-center gap-2 group text-romantic-text no-underline min-h-[44px] min-w-[44px] py-1"
              aria-label="Home"
            >
              <div className="w-8 h-8 rounded-full bg-romantic-burgundy/60 border border-romantic-rose/40 flex items-center justify-center text-romantic-rose group-hover:scale-110 group-hover:border-romantic-rose transition-all duration-300">
                <Heart className="w-4 h-4 fill-romantic-rose/40 text-romantic-rose animate-heartbeat" />
              </div>
              <span className="font-serif text-lg sm:text-xl font-semibold tracking-wider text-romantic-text group-hover:text-glow-rose transition-all">
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
            <div className="flex items-center gap-2">
              {/* Audio Quick Play Button */}
              <button
                onClick={togglePlay}
                type="button"
                className={`p-2 rounded-full border transition-all duration-300 flex items-center justify-center min-w-[44px] min-h-[44px] ${
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
                className="p-2 rounded-full border border-romantic-gold/30 bg-romantic-burgundy-dark/40 hover:bg-romantic-burgundy text-romantic-gold hover:text-romantic-gold-light transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center shadow-sm"
                title={t.nav.admin}
                aria-label="Open Admin Settings"
              >
                <Lock className="w-4 h-4" />
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                type="button"
                className="lg:hidden p-2 rounded-full border border-romantic-rose/20 bg-romantic-burgundy-dark/40 text-romantic-text hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Open navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden bg-black/70 backdrop-blur-md flex flex-col justify-center items-center p-6 animate-fadeIn"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="glass-panel w-full max-w-sm rounded-3xl p-6 text-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-3 border-b border-romantic-rose/15">
              <span className="font-serif text-xl font-semibold text-romantic-rose">
                {content.coupleTitle}
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full text-romantic-rose-muted hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-2 py-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-2xl text-base font-medium tracking-wide text-romantic-text hover:bg-romantic-rose/15 transition-all text-center min-h-[44px] flex items-center justify-center"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-romantic-rose/15 flex justify-center gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="btn-romantic-gradient w-full py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>{t.nav.admin}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
