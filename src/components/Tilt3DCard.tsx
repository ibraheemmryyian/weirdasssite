import { useRef, ReactNode } from 'react';

interface Tilt3DCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export function Tilt3DCard({ children, className = '', intensity = 15 }: Tilt3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glareRef.current) return;

    const card = cardRef.current;
    const glare = glareRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Cancel previous frame
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    // Use RAF for smooth animation
    rafRef.current = requestAnimationFrame(() => {
      const rotateX = ((y - centerY) / centerY) * intensity;
      const rotateY = ((centerX - x) / centerX) * intensity;
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3), transparent 50%)`;
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !glareRef.current) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    glareRef.current.style.background = 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0), transparent 50%)';
  };

  return (
    <div
      ref={cardRef}
      className={`relative transition-transform duration-200 ease-out ${className}`}
      style={{
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={glareRef}
        className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-200"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0), transparent 50%)',
        }}
      />
      {children}
    </div>
  );
}
