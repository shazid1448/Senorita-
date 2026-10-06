import React, { useEffect, useState } from 'react';

export default function HeartCursor() {
  const [trails, setTrails] = useState([]);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    // Disable on touch devices or coarse pointers
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }
    setIsTouch(false);

    let throttle = false;
    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });

      if (throttle) return;
      throttle = true;
      setTimeout(() => { throttle = false; }, 40);

      const id = Date.now() + Math.random();
      const newHeart = {
        id,
        x: e.clientX,
        y: e.clientY,
        size: Math.floor(Math.random() * 8) + 10,
        opacity: 0.85
      };

      setTrails((prev) => [...prev.slice(-12), newHeart]);

      setTimeout(() => {
        setTrails((prev) => prev.filter((h) => h.id !== id));
      }, 700);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isTouch) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Main cursor heart */}
      <div
        className="fixed -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out select-none"
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      >
        <span className="text-xl filter drop-shadow-[0_0_8px_rgba(255,111,165,0.7)] animate-heartbeat">
          💖
        </span>
      </div>

      {/* Trailing fading sparkles */}
      {trails.map((heart) => (
        <span
          key={heart.id}
          className="fixed -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out select-none pointer-events-none animate-ping text-xs"
          style={{
            left: `${heart.x}px`,
            top: `${heart.y}px`,
            opacity: heart.opacity,
            transform: `translate(-50%, -50%) scale(${heart.size / 14})`
          }}
        >
          ✨
        </span>
      ))}
    </div>
  );
}
