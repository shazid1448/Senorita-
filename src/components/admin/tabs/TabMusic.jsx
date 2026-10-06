import React from 'react';
import { useContent } from '../../../context/ContentContext';

export default function TabMusic() {
  const { content, updateContent } = useContent();
  const music = content.music || {};

  const handleUpdate = (field, val) => {
    updateContent(prev => ({
      ...prev,
      music: {
        ...prev.music,
        [field]: val
      }
    }));
  };

  return (
    <div className="space-y-6 text-sm">
      <div className="pb-3 border-b border-romantic-rose/15">
        <h4 className="font-serif text-lg text-romantic-rose font-medium">Romantic Music Settings</h4>
        <p className="text-xs text-romantic-rose-muted">Configure your background track or the ambient piano synthesizer</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-romantic-rose mb-1.5 uppercase tracking-wider">
            Song Title
          </label>
          <input
            type="text"
            value={music.title || ''}
            onChange={(e) => handleUpdate('title', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-romantic-burgundy-dark/60 border border-romantic-rose/25 text-white outline-none focus:border-romantic-rose"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-romantic-rose mb-1.5 uppercase tracking-wider">
            Artist / Performer
          </label>
          <input
            type="text"
            value={music.artist || ''}
            onChange={(e) => handleUpdate('artist', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-romantic-burgundy-dark/60 border border-romantic-rose/25 text-white outline-none focus:border-romantic-rose"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-romantic-rose mb-1.5 uppercase tracking-wider">
            Audio File Path or URL
          </label>
          <input
            type="text"
            value={music.audioFile || ''}
            onChange={(e) => handleUpdate('audioFile', e.target.value)}
            placeholder="/assets/audio/romantic-song.mp3"
            className="w-full px-4 py-2.5 rounded-xl bg-romantic-burgundy-dark/60 border border-romantic-rose/25 text-white outline-none focus:border-romantic-rose"
          />
          <p className="text-xs text-romantic-rose-muted mt-1.5 leading-relaxed">
            Place any MP3 file in your <code className="text-romantic-gold">public/assets/audio/</code> folder (e.g. <code className="text-romantic-gold">/assets/audio/romantic-song.mp3</code>) or paste any online audio URL.
          </p>
        </div>

        <div className="pt-4 border-t border-romantic-rose/15 flex items-center justify-between">
          <div>
            <label className="block text-xs font-semibold text-white">
              Procedural Web Audio Piano Synthesizer Fallback
            </label>
            <p className="text-xs text-romantic-rose-muted mt-0.5">
              If the MP3 file is absent or fails to load, gracefully plays soft acoustic piano arpeggios so the player never breaks.
            </p>
          </div>
          <input
            type="checkbox"
            checked={music.synthesizerEnabled !== false}
            onChange={(e) => handleUpdate('synthesizerEnabled', e.target.checked)}
            className="w-5 h-5 rounded accent-romantic-rose cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
