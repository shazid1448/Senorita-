import React, { useMemo } from 'react';

export default function FloatingPetals() {
  // Generate random stable particles
  const particles = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${(i * 5.5 + Math.random() * 5) % 100}%`,
      duration: `${14 + Math.random() * 12}s`,
      delay: `${Math.random() * 8}s`,
      size: Math.floor(Math.random() * 14) + 12,
      opacity: 0.15 + Math.random() * 0.25,
      type: i % 4 === 0 ? '🌸' : i % 4 === 1 ? '✨' : i % 4 === 2 ? '💖' : '💫',
      rotate: `${Math.random() * 360}deg`
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Soft animated gradient ambient glow orbs */}
      <div className="absolute top-1/4 left-1/5 w-72 md:w-96 h-72 md:h-96 rounded-full bg-romantic-burgundy/30 blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-1/3 right-1/4 w-80 md:w-[28rem] h-80 md:h-[28rem] rounded-full bg-romantic-rose/15 blur-[120px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-2/3 left-1/3 w-64 md:w-80 h-64 md:h-80 rounded-full bg-romantic-gold/10 blur-[90px] animate-pulse-glow" style={{ animationDelay: '4s' }} />

      {/* Floating drifting romantic petals & stars */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute select-none transition-transform"
          style={{
            left: p.left,
            top: '-5%',
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animation: `driftDown ${p.duration} linear infinite`,
            animationDelay: p.delay,
            transform: `rotate(${p.rotate})`
          }}
        >
          {p.type}
        </span>
      ))}

      <style>{`
        @keyframes driftDown {
          0% {
            transform: translateY(0) rotate(0deg) translateX(0);
          }
          50% {
            transform: translateY(55vh) rotate(180deg) translateX(25px);
          }
          100% {
            transform: translateY(110vh) rotate(360deg) translateX(-20px);
          }
        }
      `}</style>
    </div>
  );
}
