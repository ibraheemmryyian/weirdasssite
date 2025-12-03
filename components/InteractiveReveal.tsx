import { useRef, useState, useCallback } from 'react';

interface InteractiveRevealProps {
  baseImage: string;
  revealImage: string;
  className?: string;
}

export function InteractiveReveal({ baseImage, revealImage, className = '' }: InteractiveRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const rafRef = useRef<number>();

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setMousePosition({ x: 50, y: 50 });
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 bg-gray-900">
        <img
          src={baseImage}
          alt="Base"
          className="w-full h-full object-cover select-none"
          draggable="false"
        />
      </div>

      <div
        className="absolute inset-0 will-change-[clip-path]"
        style={{
          clipPath: isHovering
            ? `circle(180px at ${mousePosition.x}% ${mousePosition.y}%)`
            : 'circle(0px at 50% 50%)',
          transition: isHovering ? 'none' : 'clip-path 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <img
          src={revealImage}
          alt="Reveal"
          className="w-full h-full object-cover select-none"
          draggable="false"
        />
      </div>

      {isHovering && (
        <div
          className="absolute pointer-events-none z-10 will-change-transform"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)',
            width: '360px',
            height: '360px',
          }}
        >
          <div className="absolute inset-0 rounded-full border-2 border-white/30" />
          <div className="absolute inset-8 rounded-full border border-white/20" />
        </div>
      )}
    </div>
  );
}
