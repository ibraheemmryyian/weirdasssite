import { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollReveal3DProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollReveal3D({ children, className = '', delay = 0 }: ScrollReveal3DProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
            // Stop observing once visible to save resources
            if (elementRef.current) {
              observer.unobserve(elementRef.current);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px', // Reduced margin to trigger slightly earlier
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [delay]);

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-1000 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? 'perspective(1000px) translateZ(0) rotateX(0) translateY(0)'
          : 'perspective(1000px) translateZ(-100px) rotateX(15deg) translateY(50px)',
      }}
    >
      {children}
    </div>
  );
}
