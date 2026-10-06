import React from 'react';
import { useContent } from '../../../context/ContentContext';

export default function TabGeneral() {
  const { content, updateContent } = useContent();

  const handleChange = (field, val) => {
    updateContent({ [field]: val });
  };

  const handleHeroChange = (field, val) => {
    updateContent(prev => ({
      ...prev,
      hero: {
        ...prev.hero,
        [field]: val
      }
    }));
  };

  return (
    <div className="space-y-6 text-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-romantic-rose mb-1.5 uppercase tracking-wider">
            Groom Name (English)
          </label>
          <input
            type="text"
            value={content.groomName || ''}
            onChange={(e) => handleChange('groomName', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-romantic-burgundy-dark/60 border border-romantic-rose/25 text-white outline-none focus:border-romantic-rose"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-romantic-rose mb-1.5 uppercase tracking-wider">
            Groom Name (বাংলা)
          </label>
          <input
            type="text"
            value={content.groomNameBn || ''}
            onChange={(e) => handleChange('groomNameBn', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-romantic-burgundy-dark/60 border border-romantic-rose/25 text-white outline-none focus:border-romantic-rose"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-romantic-rose mb-1.5 uppercase tracking-wider">
            Bride Name (English)
          </label>
          <input
            type="text"
            value={content.brideName || ''}
            onChange={(e) => handleChange('brideName', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-romantic-burgundy-dark/60 border border-romantic-rose/25 text-white outline-none focus:border-romantic-rose"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-romantic-rose mb-1.5 uppercase tracking-wider">
            Bride Name (বাংলা)
          </label>
          <input
            type="text"
            value={content.brideNameBn || ''}
            onChange={(e) => handleChange('brideNameBn', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-romantic-burgundy-dark/60 border border-romantic-rose/25 text-white outline-none focus:border-romantic-rose"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-romantic-rose mb-1.5 uppercase tracking-wider">
            Couple Title (English)
          </label>
          <input
            type="text"
            value={content.coupleTitle || ''}
            onChange={(e) => handleChange('coupleTitle', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-romantic-burgundy-dark/60 border border-romantic-rose/25 text-white outline-none focus:border-romantic-rose"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-romantic-rose mb-1.5 uppercase tracking-wider">
            Monogram Initials
          </label>
          <input
            type="text"
            value={content.monogram || 'S & N'}
            onChange={(e) => handleChange('monogram', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-romantic-burgundy-dark/60 border border-romantic-rose/25 text-white outline-none focus:border-romantic-rose"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-romantic-rose/15">
        <label className="block text-xs font-semibold text-romantic-gold mb-1.5 uppercase tracking-wider">
          Relationship Start Date & Time
        </label>
        <input
          type="datetime-local"
          value={content.startDate ? content.startDate.slice(0, 16) : ''}
          onChange={(e) => handleChange('startDate', e.target.value ? `${e.target.value}:00` : '')}
          className="w-full px-4 py-2.5 rounded-xl bg-romantic-burgundy-dark/60 border border-romantic-rose/25 text-white outline-none focus:border-romantic-rose"
        />
        <p className="text-xs text-romantic-rose-muted mt-1">
          Used by the live clock to calculate exact days, hours, minutes, and seconds together.
        </p>
      </div>

      <div className="pt-4 border-t border-romantic-rose/15 space-y-4">
        <h4 className="font-serif text-lg text-romantic-rose font-medium">Hero Display Headlines</h4>

        <div>
          <label className="block text-xs font-semibold text-romantic-rose mb-1">Headline (English)</label>
          <input
            type="text"
            value={content.hero?.headline || ''}
            onChange={(e) => handleHeroChange('headline', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-romantic-burgundy-dark/60 border border-romantic-rose/25 text-white outline-none focus:border-romantic-rose"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-romantic-rose mb-1">Headline (বাংলা)</label>
          <input
            type="text"
            value={content.hero?.headlineBn || ''}
            onChange={(e) => handleHeroChange('headlineBn', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-romantic-burgundy-dark/60 border border-romantic-rose/25 text-white outline-none focus:border-romantic-rose"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-romantic-rose mb-1">Subtitle</label>
          <textarea
            rows="2"
            value={content.hero?.subtitle || ''}
            onChange={(e) => handleHeroChange('subtitle', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-romantic-burgundy-dark/60 border border-romantic-rose/25 text-white outline-none focus:border-romantic-rose"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-romantic-rose mb-1">Romantic Quote</label>
            <textarea
              rows="2"
              value={content.hero?.quote || ''}
              onChange={(e) => handleHeroChange('quote', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-romantic-burgundy-dark/60 border border-romantic-rose/25 text-white outline-none focus:border-romantic-rose"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-romantic-rose mb-1">Quote Author</label>
            <input
              type="text"
              value={content.hero?.quoteAuthor || ''}
              onChange={(e) => handleHeroChange('quoteAuthor', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-romantic-burgundy-dark/60 border border-romantic-rose/25 text-white outline-none focus:border-romantic-rose"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
