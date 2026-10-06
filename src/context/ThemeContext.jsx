import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('romantic_theme_v2');
      if (saved) return saved;
    } catch {}
    return 'dark'; // Dark romantic theme is default
  });

  useEffect(() => {
    const root = document.documentElement;
    const themeColor = theme === 'light' ? '#FAF3F6' : '#0B0710';
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
      root.style.backgroundColor = '#FAF3F6';
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
      root.style.backgroundColor = '#0B0710';
    }
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', themeColor);
    }
    try {
      localStorage.setItem('romantic_theme_v2', theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
