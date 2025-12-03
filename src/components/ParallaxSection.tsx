import { useEffect, useRef, ReactNode, CSSProperties } from 'react';

interface ParallaxLayer {
  speed: number;
  children: ReactNode;
  className?: string;
}

export function ParallaxLayer({ speed, children, className = '' }: ParallaxLayer) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (layerRef.current) {
        const offset = window.scrollY * speed;
        layerRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      ref={layerRef}
      className={`absolute inset-0 ${className}`}
      style={{
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}

interface Parallax3DSectionProps {
  className?: string;
  children: ReactNode;
}

export function Parallax3DSection({ className = '', children }: Parallax3DSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!contentRef.current) return;

      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;

      contentRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ perspective: '1000px' }}
    >
      <div
        ref={contentRef}
        style={{
          transition: 'transform 0.3s ease-out',
        } as CSSProperties}
      >
        {children}
      </div>
    </div>
  );
}
