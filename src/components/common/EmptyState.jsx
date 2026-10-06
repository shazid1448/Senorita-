import React from 'react';
import { HeartHandshake } from 'lucide-react';

export default function EmptyState({ title, description, actionText, onAction }) {
  return (
    <div className="py-12 px-6 text-center max-w-md mx-auto flex flex-col items-center justify-center">
      <div className="w-16 h-16 rounded-full bg-romantic-burgundy/40 border border-romantic-rose/30 flex items-center justify-center mb-4 text-romantic-rose shadow-glow-rose">
        <HeartHandshake className="w-8 h-8 animate-pulse-glow" />
      </div>
      <h3 className="font-serif text-2xl font-medium mb-2 text-romantic-text dark:text-romantic-text">
        {title}
      </h3>
      <p className="text-romantic-rose-muted text-sm leading-relaxed mb-6">
        {description}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="btn-romantic-gradient px-6 py-2.5 rounded-full text-sm font-medium tracking-wide shadow-glow-rose"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
