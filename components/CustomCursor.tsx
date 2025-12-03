import { useEffect, useState, useCallback } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let animationFrame: number;
    let trailPosition = { x: 0, y: 0 };

    const updatePosition = (e: MouseEvent) => {
      // Cancel previous animation frame
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      const newX = e.clientX;
      const newY = e.clientY;

      // Schedule position update
      animationFrame = requestAnimationFrame(() => {
        setPosition({ x: newX, y: newY });
      });

      // Smooth trail effect for outer ring
      const trailAnimation = () => {
        const dx = newX - trailPosition.x;
        const dy = newY - trailPosition.y;

        trailPosition.x += dx * 0.15; // Slower trail
        trailPosition.y += dy * 0.15;

        // Update CSS custom properties for trail effect
        document.documentElement.style.setProperty('--cursor-trail-x', `${trailPosition.x}px`);
        document.documentElement.style.setProperty('--cursor-trail-y', `${trailPosition.y}px`);

        if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
          requestAnimationFrame(trailAnimation);
        }
      };

      requestAnimationFrame(trailAnimation);

      const target = e.target as HTMLElement;
      const computedStyle = window.getComputedStyle(target);
      const isClickable = computedStyle.cursor === 'pointer' ||
                         target.tagName === 'BUTTON' ||
                         target.tagName === 'A' ||
                         target.hasAttribute('role') && target.getAttribute('role') === 'button';

      setIsPointer(isClickable);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', updatePosition, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <>
      {isVisible && (
        <>
          <div
            className="fixed w-4 h-4 rounded-full bg-gray-800 pointer-events-none z-[9999]
                       transition-transform duration-100 ease-out"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
              transform: `translate(-50%, -50%) scale(${isPointer ? 1.5 : 1})`,
            }}
          />
          <div
            className="fixed w-8 h-8 rounded-full border-2 border-gray-400 pointer-events-none z-[9999]
                       transition-all duration-300 ease-out"
            style={{
              left: 'var(--cursor-trail-x, 0px)',
              top: 'var(--cursor-trail-y, 0px)',
              transform: `translate(-50%, -50%) scale(${isPointer ? 1.5 : 1})`,
            }}
          />
        </>
      )}
    </>
  );
}
