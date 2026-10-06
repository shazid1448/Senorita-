import React, { useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { compressImage } from '../../../utils/imageCompressor';
import { Plus, Trash2, ArrowUp, ArrowDown, Sparkles, Upload, Image as ImageIcon, X } from 'lucide-react';

export default function TabTimeline() {
  const { content, updateContent } = useContent();
  const milestones = content.timeline || [];
  const [compressingIdx, setCompressingIdx] = useState(null);

  const handleUpdate = (index, field, value) => {
    const updated = [...milestones];
    updated[index] = { ...updated[index], [field]: value };
    updateContent({ timeline: updated });
  };

  const handleImageUpload = async (index, file) => {
    if (!file) return;
    setCompressingIdx(index);
    try {
      const result = await compressImage(file, 800, 600, 0.85);
      handleUpdate(index, 'image', result.dataUrl);
    } catch (err) {
      alert(`Image compression failed: ${err.message}`);
    } finally {
      setCompressingIdx(null);
    }
  };

  const handleAdd = () => {
    const newMilestone = {
      id: `tl-${Date.now()}`,
      date: "New Date",
      dateBn: "নতুন দিন",
      title: "New Memory ✨",
      titleBn: "নতুন স্মৃতি ✨",
      description: "Describe this special moment...",
      descriptionBn: "এই মিষ্টি স্মৃতির বর্ণনা লিখুন...",
      icon: "Heart",
      tag: "Milestone",
      tagBn: "স্মৃতি",
      image: ""
    };
    updateContent({ timeline: [...milestones, newMilestone] });
  };

  const handleDelete = (index) => {
    const updated = milestones.filter((_, i) => i !== index);
    updateContent({ timeline: updated });
  };

  const handleMove = (index, dir) => {
    const newIdx = index + dir;
    if (newIdx < 0 || newIdx >= milestones.length) return;
    const updated = [...milestones];
    const temp = updated[index];
    updated[index] = updated[newIdx];
    updated[newIdx] = temp;
    updateContent({ timeline: updated });
  };

  return (
    <div className="space-y-6 text-sm">
      <div className="flex items-center justify-between pb-3 border-b border-romantic-rose/15">
        <div>
          <h4 className="font-serif text-lg text-romantic-rose font-medium">Love Story Milestones</h4>
          <p className="text-xs text-romantic-rose-muted">Organize the steps of your romantic journey</p>
        </div>
        <button
          onClick={handleAdd}
          className="btn-romantic-gradient px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Milestone</span>
        </button>
      </div>

      <div className="space-y-4">
        {milestones.map((item, index) => (
          <div
            key={item.id || index}
            className="p-4 sm:p-5 rounded-2xl bg-romantic-burgundy-dark/50 border border-romantic-rose/20 space-y-3"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-romantic-gold uppercase tracking-wider">
                Milestone #{index + 1}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleMove(index, -1)}
                  disabled={index === 0}
                  className="p-1 rounded text-romantic-rose-muted hover:text-white disabled:opacity-30"
                  title="Move Up"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleMove(index, 1)}
                  disabled={index === milestones.length - 1}
                  className="p-1 rounded text-romantic-rose-muted hover:text-white disabled:opacity-30"
                  title="Move Down"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="p-1 rounded text-rose-400 hover:text-rose-300 ml-2"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-romantic-rose-muted mb-1">Date (English)</label>
                <input
                  type="text"
                  value={item.date || ''}
                  onChange={(e) => handleUpdate(index, 'date', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-romantic-burgundy-deep border border-romantic-rose/20 text-white outline-none focus:border-romantic-rose text-xs"
                />
              </div>
              <div>
                <label className="block text-xs text-romantic-rose-muted mb-1">Date (বাংলা)</label>
                <input
                  type="text"
                  value={item.dateBn || ''}
                  onChange={(e) => handleUpdate(index, 'dateBn', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-romantic-burgundy-deep border border-romantic-rose/20 text-white outline-none focus:border-romantic-rose text-xs"
                />
              </div>

              <div>
                <label className="block text-xs text-romantic-rose-muted mb-1">Title (English)</label>
                <input
                  type="text"
                  value={item.title || ''}
                  onChange={(e) => handleUpdate(index, 'title', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-romantic-burgundy-deep border border-romantic-rose/20 text-white outline-none focus:border-romantic-rose text-xs"
                />
              </div>
              <div>
                <label className="block text-xs text-romantic-rose-muted mb-1">Title (বাংলা)</label>
                <input
                  type="text"
                  value={item.titleBn || ''}
                  onChange={(e) => handleUpdate(index, 'titleBn', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-romantic-burgundy-deep border border-romantic-rose/20 text-white outline-none focus:border-romantic-rose text-xs"
                />
              </div>

              <div>
                <label className="block text-xs text-romantic-rose-muted mb-1">Tag (English)</label>
                <input
                  type="text"
                  value={item.tag || ''}
                  onChange={(e) => handleUpdate(index, 'tag', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-romantic-burgundy-deep border border-romantic-rose/20 text-white outline-none focus:border-romantic-rose text-xs"
                />
              </div>
              <div>
                <label className="block text-xs text-romantic-rose-muted mb-1">Icon (Sparkles, Moon, Heart, Flower2, Wine, Crown)</label>
                <select
                  value={item.icon || 'Heart'}
                  onChange={(e) => handleUpdate(index, 'icon', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-romantic-burgundy-deep border border-romantic-rose/20 text-white outline-none focus:border-romantic-rose text-xs"
                >
                  <option value="Heart">Heart</option>
                  <option value="Sparkles">Sparkles</option>
                  <option value="Moon">Moon</option>
                  <option value="Flower2">Flower2</option>
                  <option value="Wine">Wine</option>
                  <option value="Crown">Crown</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-romantic-rose-muted mb-1">Description (English)</label>
              <textarea
                rows="2"
                value={item.description || ''}
                onChange={(e) => handleUpdate(index, 'description', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-romantic-burgundy-deep border border-romantic-rose/20 text-white outline-none focus:border-romantic-rose text-xs"
              />
            </div>

            <div>
              <label className="block text-xs text-romantic-rose-muted mb-1">Description (বাংলা)</label>
              <textarea
                rows="2"
                value={item.descriptionBn || ''}
                onChange={(e) => handleUpdate(index, 'descriptionBn', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-romantic-burgundy-deep border border-romantic-rose/20 text-white outline-none focus:border-romantic-rose text-xs"
              />
            </div>

            {/* Milestone Photo Section */}
            <div className="p-3 rounded-xl bg-romantic-burgundy-deep/70 border border-romantic-rose/20 space-y-2.5">
              <label className="block text-xs font-medium text-romantic-rose flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-romantic-gold" />
                <span>Milestone Photo (ছবি যুক্ত করুন - JPG / PNG)</span>
              </label>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                {item.image ? (
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-romantic-rose/40 shadow-sm shrink-0">
                    <img
                      src={item.image}
                      alt="Milestone preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleUpdate(index, 'image', '')}
                      className="absolute top-1 right-1 p-0.5 rounded-full bg-black/70 text-rose-300 hover:text-white"
                      title="Remove Photo"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-xl border border-dashed border-romantic-rose/30 flex flex-col items-center justify-center text-romantic-rose-muted/50 shrink-0 text-[10px]">
                    <ImageIcon className="w-5 h-5 mb-0.5 opacity-40" />
                    <span>No Photo</span>
                  </div>
                )}

                <div className="flex-1 w-full space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="btn-romantic-gradient px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer flex items-center gap-1.5 shadow-sm min-h-[36px]">
                      <Upload className="w-3 h-3" />
                      <span>{compressingIdx === index ? 'Compressing...' : 'Upload Photo'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(index, file);
                          e.target.value = '';
                        }}
                        disabled={compressingIdx === index}
                        className="hidden"
                      />
                    </label>

                    {item.image && (
                      <button
                        type="button"
                        onClick={() => handleUpdate(index, 'image', '')}
                        className="px-2.5 py-1.5 rounded-full border border-romantic-rose/20 text-romantic-rose-muted hover:text-white text-xs min-h-[36px]"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <input
                    type="text"
                    value={item.image || ''}
                    onChange={(e) => handleUpdate(index, 'image', e.target.value)}
                    placeholder="Or paste photo URL / path (/assets/images/...jpg)"
                    className="w-full px-3 py-1.5 rounded-lg bg-romantic-burgundy-dark/60 border border-romantic-rose/20 text-white outline-none focus:border-romantic-rose text-xs font-mono"
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
