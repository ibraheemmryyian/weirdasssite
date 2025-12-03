import { useRef, useEffect, CSSProperties } from 'react';

interface InteractiveRevealProps {
  baseImage: string;
  revealImage: string;
  className?: string;
}

export function InteractiveReveal({ baseImage, revealImage, className = '' }: InteractiveRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      container.style.setProperty('--mouse-x', `${x}%`);
      container.style.setProperty('--mouse-y', `${y}%`);
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden group ${className}`}
      style={{
        '--mouse-x': '50%',
        '--mouse-y': '50%',
      } as CSSProperties}
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
        className="absolute inset-0 will-change-[clip-path] transition-[clip-path] duration-300 ease-out group-hover:duration-0"
        style={{
          clipPath: 'circle(180px at var(--mouse-x) var(--mouse-y))',
          opacity: 0,
        }}
      >
        <style>{`
          .group:hover .absolute.will-change-\\[clip-path\\] {
            opacity: 1 !important;
          }
        `}</style>
        <img
          src={revealImage}
          alt="Reveal"
          className="w-full h-full object-cover select-none"
          draggable="false"
        />
      </div>

      <div
        className="absolute pointer-events-none z-10 will-change-transform opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          left: 'var(--mouse-x)',
          top: 'var(--mouse-y)',
          transform: 'translate(-50%, -50%)',
          width: '360px',
          height: '360px',
        }}
      >
        <div className="absolute inset-0 rounded-full border-2 border-white/30" />
        <div className="absolute inset-8 rounded-full border border-white/20" />
      </div>
    </div>
  );
}
