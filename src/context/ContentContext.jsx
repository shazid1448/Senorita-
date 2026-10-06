import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_CONTENT } from '../config/defaultContent';

const ContentContext = createContext();

export function ContentProvider({ children }) {
  const [content, setContent] = useState(() => {
    try {
      const saved = localStorage.getItem('romantic_content_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_CONTENT,
          ...parsed,
          couplePhoto: parsed.couplePhoto && parsed.couplePhoto !== "/assets/images/couple-hero.svg"
            ? parsed.couplePhoto
            : DEFAULT_CONTENT.couplePhoto
        };
      }
    } catch (e) {
      console.error('Error reading localStorage content:', e);
    }
    return DEFAULT_CONTENT;
  });

  const [isLoading, setIsLoading] = useState(false);

  // Sync to localStorage whenever content changes
  const updateContent = (updater) => {
    setContent(prev => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      try {
        localStorage.setItem('romantic_content_v2', JSON.stringify(next));
      } catch (err) {
        console.error('Error saving content to localStorage:', err);
      }
      return next;
    });
  };

  // Export content.json without plaintext passwords
  const exportContent = () => {
    const cleanContent = JSON.parse(JSON.stringify(content));
    // Never export plaintext password
    delete cleanContent.password;

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cleanContent, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `content_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import content.json backup
  const importContent = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed.startDate || !parsed.timeline) {
        throw new Error('Invalid content format: missing required fields');
      }
      delete parsed.password; // Safeguard
      updateContent(parsed);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Reset to default
  const resetToDefault = () => {
    try {
      localStorage.removeItem('romantic_content_v2');
    } catch {}
    setContent(DEFAULT_CONTENT);
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        updateContent,
        exportContent,
        importContent,
        resetToDefault,
        isLoading
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useContent must be used within ContentProvider');
  return context;
}
