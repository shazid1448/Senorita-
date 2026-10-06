import React from 'react';
import { useContent } from '../../../context/ContentContext';
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';

export default function TabPlans() {
  const { content, updateContent } = useContent();
  const plans = content.futurePlans || [];

  const handleUpdate = (index, field, val) => {
    const list = [...plans];
    list[index] = { ...list[index], [field]: val };
    updateContent({ futurePlans: list });
  };

  const handleAdd = () => {
    const newPlan = {
      id: `fp-${Date.now()}`,
      title: "New Dream Together ✨",
      titleBn: "একসাথে নতুন স্বপ্ন ✨",
      category: "Travel",
      categoryBn: "ভ্রমণ",
      completed: false,
      notes: "Notes about our dream..."
    };
    updateContent({ futurePlans: [...plans, newPlan] });
  };

  const handleDelete = (index) => {
    const list = plans.filter((_, i) => i !== index);
    updateContent({ futurePlans: list });
  };

  return (
    <div className="space-y-6 text-sm">
      <div className="flex items-center justify-between pb-3 border-b border-romantic-rose/15">
        <div>
          <h4 className="font-serif text-lg text-romantic-rose font-medium">Future Plans & Bucket List</h4>
          <p className="text-xs text-romantic-rose-muted">Track the adventures and dreams you are planning together</p>
        </div>
        <button
          onClick={handleAdd}
          className="btn-romantic-gradient px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Dream</span>
        </button>
      </div>

      <div className="space-y-4">
        {plans.map((item, index) => (
          <div
            key={item.id || index}
            className="p-4 sm:p-5 rounded-2xl bg-romantic-burgundy-dark/50 border border-romantic-rose/20 space-y-3"
          >
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleUpdate(index, 'completed', !item.completed)}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full transition-all ${
                  item.completed
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-romantic-rose/10 text-romantic-rose-muted border border-romantic-rose/20'
                }`}
              >
                {item.completed ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Circle className="w-3.5 h-3.5" />}
                <span>{item.completed ? 'Accomplished ✨' : 'In Progress'}</span>
              </button>

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
                <label className="block text-xs text-romantic-rose-muted mb-1">Category (English)</label>
                <input
                  type="text"
                  value={item.category || ''}
                  onChange={(e) => handleUpdate(index, 'category', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-romantic-burgundy-deep border border-romantic-rose/20 text-white text-xs outline-none focus:border-romantic-rose"
                />
              </div>

              <div>
                <label className="block text-xs text-romantic-rose-muted mb-1">Category (বাংলা)</label>
                <input
                  type="text"
                  value={item.categoryBn || ''}
                  onChange={(e) => handleUpdate(index, 'categoryBn', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-romantic-burgundy-deep border border-romantic-rose/20 text-white text-xs outline-none focus:border-romantic-rose"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-romantic-rose-muted mb-1">Notes & Details</label>
              <textarea
                rows="2"
                value={item.notes || ''}
                onChange={(e) => handleUpdate(index, 'notes', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-romantic-burgundy-deep border border-romantic-rose/20 text-white text-xs outline-none focus:border-romantic-rose"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
