import { ReactNode } from 'react';

interface Button3DProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  onClick?: () => void;
  className?: string;
}

export function Button3D({ children, variant = 'primary', onClick, className = '' }: Button3DProps) {
  const variantStyles = {
    primary: 'bg-gray-900 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-[0_0_30px_rgba(168,85,247,0.5)]',
    ghost: 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 hover:border-gray-400'
  };

  return (
    <button
      onClick={onClick}
      className={`
        relative px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl font-semibold
        transform transition-all duration-200 ease-out
        hover:scale-105 hover:-translate-y-1
        active:scale-95 active:translate-y-0
        focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:ring-offset-2
        touch-manipulation overflow-hidden
        ${variantStyles[variant]}
        before:absolute before:inset-0 before:rounded-xl
        before:bg-gradient-to-t before:from-black/20 before:to-transparent
        before:opacity-0 before:transition-opacity before:duration-300
        hover:before:opacity-100
        after:absolute after:inset-0 after:rounded-xl
        after:shadow-inner after:opacity-0
        hover:after:opacity-100 after:transition-opacity after:duration-300
        ${className}
      `}
    >
      {/* Ripple effect */}
      <span className="absolute inset-0 rounded-xl bg-white/20 scale-0 opacity-0 transition-all duration-500 ease-out group-active:scale-100 group-active:opacity-30"></span>

      <span className="relative z-10 flex items-center justify-center gap-2 text-sm sm:text-base">
        {children}
      </span>
    </button>
  );
}
