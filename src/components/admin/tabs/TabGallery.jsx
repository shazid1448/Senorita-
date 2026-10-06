import React, { useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { compressImage } from '../../../utils/imageCompressor';
import { Upload, Trash2, Image as ImageIcon, Sparkles } from 'lucide-react';

export default function TabGallery() {
  const { content, updateContent } = useContent();
  const photos = content.gallery || [];
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressStatus, setCompressStatus] = useState('');

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);
    setCompressStatus('Compressing image on canvas...');

    try {
      const result = await compressImage(file, 1280, 1280, 0.82);
      const newPhoto = {
        id: `gal-${Date.now()}`,
        image: result.dataUrl,
        caption: "A sweet memory with you ❤️",
        captionBn: "তোমার সাথে কাটানো মিষ্টি স্মৃতি ❤️",
        date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        rotation: (Math.random() * 4 - 2).toFixed(1)
      };

      updateContent({ gallery: [newPhoto, ...photos] });
      setCompressStatus(`Successfully compressed to ${result.sizeKB} KB!`);
      setTimeout(() => setCompressStatus(''), 4000);
    } catch (err) {
      alert(`Image processing failed: ${err.message}`);
    } finally {
      setIsCompressing(false);
      e.target.value = '';
    }
  };

  const handleUpdate = (index, field, value) => {
    const updated = [...photos];
    updated[index] = { ...updated[index], [field]: value };
    updateContent({ gallery: updated });
  };

  const handleDelete = (index) => {
    const updated = photos.filter((_, i) => i !== index);
    updateContent({ gallery: updated });
  };

  return (
    <div className="space-y-6 text-sm">
      <div className="pb-4 border-b border-romantic-rose/15 space-y-3">
        <h4 className="font-serif text-lg text-romantic-rose font-medium">Polaroid Memory Gallery</h4>
        <p className="text-xs text-romantic-rose-muted">
          Upload real photos of you both. Photos are automatically compressed on client canvas to prevent storage overflow.
        </p>

        {/* Upload Zone */}
        <label className="border-2 border-dashed border-romantic-rose/30 hover:border-romantic-rose/70 rounded-2xl p-6 text-center flex flex-col items-center justify-center cursor-pointer bg-romantic-burgundy-dark/30 hover:bg-romantic-burgundy-dark/50 transition-all">
          <Upload className="w-8 h-8 text-romantic-rose mb-2 animate-bounce" />
          <span className="text-sm font-semibold text-white">
            {isCompressing ? 'Compressing photo...' : 'Click to Upload & Compress Photo'}
          </span>
          <span className="text-xs text-romantic-rose-muted mt-1">
            Supports PNG, JPEG, WebP. Resized & compressed automatically.
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={isCompressing}
            className="hidden"
          />
        </label>

        {compressStatus && (
          <p className="text-xs text-emerald-400 font-medium flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{compressStatus}</span>
          </p>
        )}
      </div>

      {/* Photo List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {photos.map((photo, index) => (
          <div
            key={photo.id || index}
            className="p-4 rounded-2xl bg-romantic-burgundy-dark/50 border border-romantic-rose/20 space-y-3 flex flex-col justify-between"
          >
            <div className="flex items-center gap-3">
              <img
                src={photo.image}
                alt="Thumbnail"
                className="w-16 h-16 rounded-xl object-cover bg-black/40 border border-romantic-rose/20"
              />
              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold text-romantic-gold uppercase tracking-wider block">
                  Photo #{index + 1}
                </span>
                <span className="text-xs text-romantic-rose-muted truncate block">
                  Rotation: {photo.rotation}°
                </span>
              </div>
              <button
                onClick={() => handleDelete(index)}
                className="p-2 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-950/30"
                title="Delete Photo"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <div>
                <label className="block text-[11px] text-romantic-rose-muted">Caption (English)</label>
                <input
                  type="text"
                  value={photo.caption || ''}
                  onChange={(e) => handleUpdate(index, 'caption', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-romantic-burgundy-deep border border-romantic-rose/20 text-white text-xs outline-none focus:border-romantic-rose"
                />
              </div>

              <div>
                <label className="block text-[11px] text-romantic-rose-muted">Caption (বাংলা)</label>
                <input
                  type="text"
                  value={photo.captionBn || ''}
                  onChange={(e) => handleUpdate(index, 'captionBn', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-romantic-burgundy-deep border border-romantic-rose/20 text-white text-xs outline-none focus:border-romantic-rose"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-romantic-rose-muted">Date Tag</label>
                  <input
                    type="text"
                    value={photo.date || ''}
                    onChange={(e) => handleUpdate(index, 'date', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-romantic-burgundy-deep border border-romantic-rose/20 text-white text-xs outline-none focus:border-romantic-rose"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-romantic-rose-muted">Tilt Angle (°)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={photo.rotation || 0}
                    onChange={(e) => handleUpdate(index, 'rotation', parseFloat(e.target.value))}
                    className="w-full px-3 py-1.5 rounded-lg bg-romantic-burgundy-deep border border-romantic-rose/20 text-white text-xs outline-none focus:border-romantic-rose"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
