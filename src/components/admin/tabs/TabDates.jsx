import React from 'react';
import { useContent } from '../../../context/ContentContext';
import { Plus, Trash2 } from 'lucide-react';

export default function TabDates() {
  const { content, updateContent } = useContent();
  const dates = content.specialDates || [];

  const handleUpdate = (index, field, val) => {
    const list = [...dates];
    list[index] = { ...list[index], [field]: val };
    updateContent({ specialDates: list });
  };

  const handleAdd = () => {
    const newDate = {
      id: `sd-${Date.now()}`,
      title: "New Special Celebration",
      titleBn: "নতুন স্মরণীয় দিন",
      date: new Date().toISOString().slice(0, 10),
      icon: "Heart",
      description: "A sweet occasion to celebrate together",
      descriptionBn: "একসাথে উদযাপন করার মধুর মুহূর্ত",
      recurring: true
    };
    updateContent({ specialDates: [...dates, newDate] });
  };

  const handleDelete = (index) => {
    const list = dates.filter((_, i) => i !== index);
    updateContent({ specialDates: list });
  };

  return (
    <div className="space-y-6 text-sm">
      <div className="flex items-center justify-between pb-3 border-b border-romantic-rose/15">
        <div>
          <h4 className="font-serif text-lg text-romantic-rose font-medium">Special Dates & Countdowns</h4>
          <p className="text-xs text-romantic-rose-muted">Keep track of upcoming anniversaries, birthdays, and relationship milestones</p>
        </div>
        <button
          onClick={handleAdd}
          className="btn-romantic-gradient px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Date</span>
        </button>
      </div>

      <div className="space-y-4">
        {dates.map((item, index) => (
          <div
            key={item.id || index}
            className="p-4 sm:p-5 rounded-2xl bg-romantic-burgundy-dark/50 border border-romantic-rose/20 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-romantic-gold uppercase tracking-wider">
                Event #{index + 1}
              </span>
              <button
                onClick={() => handleDelete(index)}
                className="p-1 rounded text-rose-400 hover:text-rose-300"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-romantic-rose-muted mb-1">Title (English)</label>
                <input
                  type="text"
                  value={item.title || ''}
                  onChange={(e) => handleUpdate(index, 'title', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-romantic-burgundy-deep border border-romantic-rose/20 text-white text-xs outline-none focus:border-romantic-rose"
                />
              </div>

              <div>
                <label className="block text-xs text-romantic-rose-muted mb-1">Title (বাংলা)</label>
                <input
                  type="text"
                  value={item.titleBn || ''}
                  onChange={(e) => handleUpdate(index, 'titleBn', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-romantic-burgundy-deep border border-romantic-rose/20 text-white text-xs outline-none focus:border-romantic-rose"
                />
              </div>

              <div>
                <label className="block text-xs text-romantic-rose-muted mb-1">Target Date</label>
                <input
                  type="date"
                  value={item.date || ''}
                  onChange={(e) => handleUpdate(index, 'date', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-romantic-burgundy-deep border border-romantic-rose/20 text-white text-xs outline-none focus:border-romantic-rose"
                />
              </div>

              <div>
                <label className="block text-xs text-romantic-rose-muted mb-1">Icon</label>
                <select
                  value={item.icon || 'Heart'}
                  onChange={(e) => handleUpdate(index, 'icon', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-romantic-burgundy-deep border border-romantic-rose/20 text-white text-xs outline-none focus:border-romantic-rose"
                >
                  <option value="Heart">Heart</option>
                  <option value="Sparkles">Sparkles</option>
                  <option value="Flower2">Flower2</option>
                  <option value="Crown">Crown</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-romantic-rose-muted mb-1">Description (English)</label>
              <input
                type="text"
                value={item.description || ''}
                onChange={(e) => handleUpdate(index, 'description', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-romantic-burgundy-deep border border-romantic-rose/20 text-white text-xs outline-none focus:border-romantic-rose"
              />
            </div>

            <div>
              <label className="block text-xs text-romantic-rose-muted mb-1">Description (বাংলা)</label>
              <input
                type="text"
                value={item.descriptionBn || ''}
                onChange={(e) => handleUpdate(index, 'descriptionBn', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-romantic-burgundy-deep border border-romantic-rose/20 text-white text-xs outline-none focus:border-romantic-rose"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id={`recurring-${index}`}
                checked={item.recurring !== false}
                onChange={(e) => handleUpdate(index, 'recurring', e.target.checked)}
                className="w-4 h-4 rounded accent-romantic-rose"
              />
              <label htmlFor={`recurring-${index}`} className="text-xs text-white cursor-pointer">
                Annual Recurring Celebration (recalculates every year)
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
