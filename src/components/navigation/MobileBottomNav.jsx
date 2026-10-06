import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Heart, Camera, Mail, Disc, Lock } from 'lucide-react';

export default function MobileBottomNav() {
  const { t, isBn } = useLanguage();
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const sections = ['hero', 'story', 'gallery', 'letter', 'music', 'dates', 'plans', 'vault'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'story', label: isBn ? 'গল্প' : 'Story', icon: Heart, href: '#story' },
    { id: 'gallery', label: isBn ? 'গ্যালারি' : 'Gallery', icon: Camera, href: '#gallery' },
    { id: 'letter', label: isBn ? 'চিঠি' : 'Letter', icon: Mail, href: '#letter' },
    { id: 'music', label: isBn ? 'সুর' : 'Music', icon: Disc, href: '#music' },
    { id: 'vault', label: isBn ? 'কুটির' : 'Vault', icon: Lock, href: '#vault' }
  ];

  return (
    <nav
      className="lg:hidden fixed bottom-3 left-3 right-3 z-40 max-w-md mx-auto"
      aria-label="Mobile Navigation Dock"
    >
      <div className="glass-panel rounded-full px-2 py-1.5 flex items-center justify-around bg-black/60 dark:bg-[#150712]/80 backdrop-blur-2xl border border-romantic-rose/30 shadow-[0_8px_32px_rgba(0,0,0,0.5)] safe-pb">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <a
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-full transition-all duration-300 min-h-[46px] min-w-[50px] ${
                isActive
                  ? 'bg-romantic-rose/25 text-romantic-rose-bright shadow-glow-rose font-bold'
                  : 'text-romantic-rose-muted/80 hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 transition-transform ${isActive ? 'scale-115 animate-pulse' : ''}`} />
              <span className="text-[10px] tracking-wider mt-0.5 font-medium">
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
