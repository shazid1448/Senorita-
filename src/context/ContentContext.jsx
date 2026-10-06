import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_CONTENT } from '../config/defaultContent';
import { encodeSyncPayload, decodeSyncPayload } from '../utils/syncUtils';

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
          couplePhoto:
            parsed.couplePhoto && parsed.couplePhoto !== '/assets/images/couple-hero.svg'
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
  const [syncToast, setSyncToast] = useState(null);

  // Sync to localStorage whenever content changes
  const updateContent = (updater) => {
    setContent(prev => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      // Increment local edit version timestamp so it tracks updates
      const updatedWithVersion = {
        ...next,
        lastEdited: Date.now()
      };
      try {
        localStorage.setItem('romantic_content_v2', JSON.stringify(updatedWithVersion));
      } catch (err) {
        console.error('Error saving content to localStorage:', err);
      }
      return updatedWithVersion;
    });
  };

  // Check for updates on mount:
  // 1. URL Hash Sync (from another device like phone or laptop)
  // 2. Fresh server content from /content.json
  useEffect(() => {
    // 1. Check if URL hash has #sync=...
    if (window.location.hash && window.location.hash.startsWith('#sync=')) {
      const encoded = window.location.hash.slice(6);
      const decoded = decodeSyncPayload(encoded);
      if (decoded && decoded.startDate) {
        updateContent(decoded);
        setSyncToast('✨ অন্য ডিভাইস থেকে নতুন পরিবর্তন যুক্ত হয়েছে!');
        setTimeout(() => setSyncToast(null), 5000);
        // Clear hash from URL cleanly
        window.history.replaceState(null, '', window.location.pathname);
        return;
      }
    }

    // 2. Fetch fresh content.json from server with cache buster
    fetch(`/content.json?_t=${Date.now()}`)
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then(serverContent => {
        if (!serverContent || !serverContent.startDate) return;

        setContent(prev => {
          const localSaved = localStorage.getItem('romantic_content_v2');
          const localParsed = localSaved ? JSON.parse(localSaved) : null;

          const serverVer = serverContent.version || 0;
          const localVer = localParsed?.version || 0;
          const hasLocalEdits = localParsed?.lastEdited && localParsed.lastEdited > 1728000000000;

          // If server version is newer than local, or if local was using old placeholder
          if (
            serverVer > localVer ||
            !localSaved ||
            localParsed?.couplePhoto === '/assets/images/couple-hero.svg'
          ) {
            const merged = {
              ...DEFAULT_CONTENT,
              ...serverContent,
              // Preserve custom local secret vault if present
              security: {
                ...serverContent.security,
                ...(localParsed?.security || {})
              }
            };
            try {
              localStorage.setItem('romantic_content_v2', JSON.stringify(merged));
            } catch {}
            return merged;
          }

          return prev;
        });
      })
      .catch(() => {
        // Offline or fallback to local
      });
  }, []);

  // Generate shareable cross-device sync link
  const generateSyncLink = () => {
    const encoded = encodeSyncPayload(content);
    if (!encoded) return window.location.origin;
    return `${window.location.origin}/#sync=${encoded}`;
  };

  // Force pull latest from server (wipes local cache with server version)
  const forceRefreshFromServer = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/content.json?_t=${Date.now()}`);
      if (!res.ok) throw new Error('Failed to fetch from server');
      const serverContent = await res.json();
      if (serverContent && serverContent.startDate) {
        localStorage.setItem('romantic_content_v2', JSON.stringify(serverContent));
        setContent(serverContent);
        setSyncToast('✅ সার্ভার থেকে সর্বশেষ ডেটা লোড হয়েছে!');
        setTimeout(() => setSyncToast(null), 4000);
        return true;
      }
    } catch (err) {
      alert(`সার্ভার থেকে লোড করা সম্ভব হয়নি: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
    return false;
  };

  // Export content.json without plaintext passwords
  const exportContent = () => {
    const cleanContent = JSON.parse(JSON.stringify(content));
    delete cleanContent.password;

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(cleanContent, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'content.json');
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
      delete parsed.password;
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
        generateSyncLink,
        forceRefreshFromServer,
        syncToast,
        setSyncToast,
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
