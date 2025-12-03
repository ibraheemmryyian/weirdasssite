import { useRef, useEffect, CSSProperties } from 'react';

interface TextRevealHeroProps {
  text: string;
  revealImage: string;
  className?: string;
}

export function TextRevealHero({ text, revealImage, className = '' }: TextRevealHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      container.style.setProperty('--mouse-x', `${x}px`);
      container.style.setProperty('--mouse-y', `${y}px`);
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative inline-block cursor-none select-none group ${className}`}
      style={{
        '--mouse-x': '0px',
        '--mouse-y': '0px',
      } as CSSProperties}
    >
      <h1
        className="text-9xl font-black tracking-tighter relative"
        style={{
          WebkitTextFillColor: 'transparent',
          WebkitTextStroke: '2px currentColor',
          color: 'rgba(0, 0, 0, 0.1)',
        }}
      >
        {text}
      </h1>

      <div
        className="absolute inset-0 overflow-hidden pointer-events-none transition-[clip-path] duration-300 ease-out group-hover:duration-0"
        style={{
          clipPath: 'circle(120px at var(--mouse-x) var(--mouse-y))',
          opacity: 0,
        }}
      >
        <style>{`
          .group:hover .absolute.inset-0 {
            opacity: 1 !important;
          }
        `}</style>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${revealImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
          }}
        >
          <h1
            className="text-9xl font-black tracking-tighter"
            style={{
              WebkitTextFillColor: 'transparent',
              backgroundImage: `url(${revealImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
            }}
          >
            {text}
          </h1>
        </div>
      </div>

      <div
        className="absolute w-[240px] h-[240px] pointer-events-none z-10 mix-blend-difference opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          left: 'var(--mouse-x)',
          top: 'var(--mouse-y)',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="absolute inset-0 rounded-full border border-white/50 animate-ping"></div>
        <div className="absolute inset-8 rounded-full border-2 border-white"></div>
      </div>
    </div>
  );
}
