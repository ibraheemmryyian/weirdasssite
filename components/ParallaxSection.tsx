import { useEffect, useState, ReactNode } from 'react';

interface ParallaxLayer {
  speed: number;
  children: ReactNode;
  className?: string;
}

export function ParallaxLayer({ speed, children, className = '' }: ParallaxLayer) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      className={`absolute inset-0 ${className}`}
      style={{
        transform: `translate3d(0, ${offset}px, 0)`,
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ perspective: '1000px' }}>
      <div
        style={{
          transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
}
