import { useEffect, useRef, useState } from 'react';

interface FloatingProduct3DProps {
  productImage: string;
  productName: string;
  productPrice: number;
  className?: string;
}

export function FloatingProduct3D({
  productImage,
  productName,
  productPrice,
  className = ''
}: FloatingProduct3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!isHovering) return;

    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * 25;
      const rotateX = ((centerY - y) / centerY) * 25;

      setRotation({ x: rotateX, y: rotateY });
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, [isHovering]);

  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1500px' }}
    >
      <div
        className="relative transition-all duration-300 ease-out"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateZ(${isHovering ? '50px' : '0px'})`,
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white">
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
            style={{
              opacity: isHovering ? 0.2 : 0,
              background: `radial-gradient(circle at ${((rotation.y + 25) / 50) * 100}% ${((25 - rotation.x) / 50) * 100}%, rgba(255,255,255,0.8), transparent 50%)`,
            }}
          />

          <img
            src={productImage}
            alt={productName}
            className="w-full h-full object-cover"
          />

          <div
            className="absolute inset-0 flex items-end p-8"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)',
              transform: 'translateZ(30px)',
            }}
          >
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-2">{productName}</h3>
              <p className="text-3xl font-black">${productPrice}</p>
            </div>
          </div>
        </div>

        <div
          className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-gray-200 to-gray-300 -z-10 blur-xl opacity-50"
          style={{
            transform: 'translateZ(-50px)',
          }}
        />
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translateZ(100px)`,
          opacity: isHovering ? 1 : 0,
          transition: 'opacity 0.3s ease-out',
        }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full animate-ping" />
      </div>
    </div>
  );
}
