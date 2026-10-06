import React from 'react';
import { useContent } from '../../../context/ContentContext';
import { Plus, Trash2 } from 'lucide-react';

export default function TabLetter() {
  const { content, updateContent } = useContent();
  const letter = content.letter || {};

  const handleFieldChange = (field, val) => {
    updateContent(prev => ({
      ...prev,
      letter: {
        ...prev.letter,
        [field]: val
      }
    }));
  };

  const handleParagraphChange = (langKey, index, val) => {
    const list = [...(letter[langKey] || [])];
    list[index] = val;
    handleFieldChange(langKey, list);
  };

  const handleAddParagraph = (langKey) => {
    const list = [...(letter[langKey] || [])];
    list.push("New paragraph from your heart...");
    handleFieldChange(langKey, list);
  };

  const handleDeleteParagraph = (langKey, index) => {
    const list = (letter[langKey] || []).filter((_, i) => i !== index);
    handleFieldChange(langKey, list);
  };

  return (
    <div className="space-y-6 text-sm">
      <div className="pb-3 border-b border-romantic-rose/15">
        <h4 className="font-serif text-lg text-romantic-rose font-medium">Love Letter & Wax Seal</h4>
        <p className="text-xs text-romantic-rose-muted">Personalize the heartfelt words in the royal wax-sealed envelope</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-romantic-rose mb-1">Salutation (বাংলা)</label>
          <input
            type="text"
            value={letter.salutation || ''}
            onChange={(e) => handleFieldChange('salutation', e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl bg-romantic-burgundy-dark/60 border border-romantic-rose/25 text-white outline-none focus:border-romantic-rose"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-romantic-rose mb-1">Salutation (English)</label>
          <input
            type="text"
            value={letter.salutationEn || ''}
            onChange={(e) => handleFieldChange('salutationEn', e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl bg-romantic-burgundy-dark/60 border border-romantic-rose/25 text-white outline-none focus:border-romantic-rose"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-romantic-rose mb-1">Wax Seal Initials</label>
          <input
            type="text"
            value={letter.sealText || 'S & N'}
            onChange={(e) => handleFieldChange('sealText', e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl bg-romantic-burgundy-dark/60 border border-romantic-rose/25 text-white outline-none focus:border-romantic-rose"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-romantic-rose mb-1">Author Signature</label>
          <input
            type="text"
            value={letter.author || ''}
            onChange={(e) => handleFieldChange('author', e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl bg-romantic-burgundy-dark/60 border border-romantic-rose/25 text-white outline-none focus:border-romantic-rose"
          />
        </div>
      </div>

      {/* Bangla Paragraphs */}
      <div className="space-y-3 pt-4 border-t border-romantic-rose/15">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold text-romantic-gold uppercase tracking-wider">
            চিঠির অনুচ্ছেদসমূহ (বাংলা)
          </label>
          <button
            onClick={() => handleAddParagraph('paragraphs')}
            className="text-xs text-romantic-rose hover:text-white flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>অনুচ্ছেদ যোগ করুন</span>
          </button>
        </div>

        {(letter.paragraphs || []).map((p, idx) => (
          <div key={idx} className="flex gap-2 items-start">
            <textarea
              rows="3"
              value={p}
              onChange={(e) => handleParagraphChange('paragraphs', idx, e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl bg-romantic-burgundy-dark/60 border border-romantic-rose/20 text-white text-xs outline-none focus:border-romantic-rose"
            />
            <button
              onClick={() => handleDeleteParagraph('paragraphs', idx)}
              className="p-2 text-rose-400 hover:text-rose-300"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* English Paragraphs */}
      <div className="space-y-3 pt-4 border-t border-romantic-rose/15">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold text-romantic-gold uppercase tracking-wider">
            Letter Paragraphs (English)
          </label>
          <button
            onClick={() => handleAddParagraph('paragraphsEn')}
            className="text-xs text-romantic-rose hover:text-white flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Paragraph</span>
          </button>
        </div>

        {(letter.paragraphsEn || []).map((p, idx) => (
          <div key={idx} className="flex gap-2 items-start">
            <textarea
              rows="3"
              value={p}
              onChange={(e) => handleParagraphChange('paragraphsEn', idx, e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl bg-romantic-burgundy-dark/60 border border-romantic-rose/20 text-white text-xs outline-none focus:border-romantic-rose"
            />
            <button
              onClick={() => handleDeleteParagraph('paragraphsEn', idx)}
              className="p-2 text-rose-400 hover:text-rose-300"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
