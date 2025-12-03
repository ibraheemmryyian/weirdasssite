import { useRef, useState, ReactNode } from 'react';

interface HoverGlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export function HoverGlowCard({
  children,
  className = '',
  glowColor = 'rgba(0, 0, 0, 0.3)'
}: HoverGlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });
  };

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering && (
        <div
          className="absolute pointer-events-none transition-opacity duration-300"
          style={{
            width: '400px',
            height: '400px',
            left: mousePosition.x,
            top: mousePosition.y,
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            opacity: 0.6,
          }}
        />
      )}
      {children}
    </div>
  );
}
