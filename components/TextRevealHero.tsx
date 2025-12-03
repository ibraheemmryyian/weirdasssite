import { useRef, useState } from 'react';

interface TextRevealHeroProps {
  text: string;
  revealImage: string;
  className?: string;
}

export function TextRevealHero({ text, revealImage, className = '' }: TextRevealHeroProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!textRef.current) return;
    const rect = textRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={textRef}
      className={`relative inline-block cursor-none select-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
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
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          clipPath: isHovering
            ? `circle(120px at ${mousePosition.x}px ${mousePosition.y}px)`
            : 'circle(0px at 50% 50%)',
          transition: 'clip-path 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
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

      {isHovering && (
        <div
          className="absolute w-[240px] h-[240px] pointer-events-none z-10 mix-blend-difference"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="absolute inset-0 rounded-full border border-white/50 animate-ping"></div>
          <div className="absolute inset-8 rounded-full border-2 border-white"></div>
        </div>
      )}
    </div>
  );
}
