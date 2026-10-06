import React from 'react';
import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', hoverGlow = true, onClick, ...props }) {
  return (
    <motion.div
      onClick={onClick}
      className={`glass-panel rounded-3xl p-6 md:p-8 relative overflow-hidden transition-all duration-300 ${className}`}
      {...props}
    >
      {/* Subtle iridescent gradient border overlay */}
      <div className="absolute inset-0 rounded-3xl pointer-events-none border border-romantic-rose/15 dark:border-romantic-rose/10" />
      {children}
    </motion.div>
  );
}
