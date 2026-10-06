import React, { useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { compressImage } from '../../../utils/imageCompressor';
import { Upload, Sparkles, Image as ImageIcon, Heart, RotateCcw } from 'lucide-react';

export default function TabGeneral() {
  const { content, updateContent } = useContent();
  const [isCompressing, setIsCompressing] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

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

  const handleCouplePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);
    setUploadStatus('Compressing couple photo...');

    try {
      const result = await compressImage(file, 800, 800, 0.85);
      updateContent({
        couplePhoto: result.dataUrl
      });
      setUploadStatus(`Couple photo updated (${result.sizeKB} KB)!`);
      setTimeout(() => setUploadStatus(''), 4000);
    } catch (err) {
      alert(`Upload failed: ${err.message}`);
    } finally {
      setIsCompressing(false);
      e.target.value = '';
    }
  };

  const couplePhoto = content.couplePhoto || content.hero?.couplePhoto || "/assets/images/couple-hero.svg";

  return (
    <div className="space-y-6 text-sm">
      {/* Couple Hero Portrait Section */}
      <div className="p-4 sm:p-5 rounded-2xl bg-romantic-burgundy-dark/50 border border-romantic-rose/25 space-y-4">
        <div>
          <h4 className="font-serif text-lg text-romantic-rose font-medium flex items-center gap-2">
            <Heart className="w-4 h-4 text-romantic-rose-bright" />
            <span>Couple Hero Portrait Photo</span>
          </h4>
          <p className="text-xs text-romantic-rose-muted mt-0.5">
            This photo is displayed in the center of the Hero section between "Eternally Bound Together" and your names.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-5">
          {/* Circular Preview */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-romantic-rose via-romantic-gold to-romantic-burgundy shadow-glow-rose shrink-0">
            <img
              src={couplePhoto}
              alt="Couple Preview"
              className="w-full h-full object-cover rounded-full bg-black/50"
            />
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-romantic-burgundy border border-romantic-gold flex items-center justify-center text-romantic-rose text-xs">
              ❤️
            </div>
          </div>

          {/* Upload and URL controls */}
          <div className="flex-1 w-full space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <label className="btn-romantic-gradient px-4 py-2 rounded-full text-xs font-semibold cursor-pointer flex items-center gap-2 shadow-sm min-h-[40px]">
                <Upload className="w-3.5 h-3.5" />
                <span>{isCompressing ? 'Compressing...' : 'Upload Picture of You Both'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCouplePhotoUpload}
                  disabled={isCompressing}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={() => updateContent({ couplePhoto: "/assets/images/couple-hero.svg" })}
                className="px-3 py-2 rounded-full border border-romantic-rose/20 text-romantic-rose-muted hover:text-white text-xs flex items-center gap-1.5 transition-all min-h-[40px]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Illustration</span>
              </button>
            </div>

            {uploadStatus && (
              <p className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{uploadStatus}</span>
              </p>
            )}

            <div>
              <label className="block text-[11px] text-romantic-rose-muted mb-1">
                Or paste direct image URL
              </label>
              <input
                type="text"
                value={content.couplePhoto || ''}
                onChange={(e) => handleChange('couplePhoto', e.target.value)}
                placeholder="/assets/images/couple-hero.svg"
                className="w-full px-3 py-2 rounded-xl bg-romantic-burgundy-deep border border-romantic-rose/20 text-white text-xs outline-none focus:border-romantic-rose font-mono"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Names & Profile */}
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

      {/* Start Date */}
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

      {/* Headlines */}
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
