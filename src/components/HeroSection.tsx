import { ArrowRight, Sparkles } from 'lucide-react';
import { Button3D } from './Button3D';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white px-4 sm:px-6">
      {/* Mobile-optimized content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="text-center">
          {/* Badge */}
          <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full
                        bg-gray-100 backdrop-blur-sm border border-gray-200
                        animate-[fadeIn_1s_ease-out]">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
            <span className="text-gray-700 text-xs sm:text-sm font-medium tracking-wide">
              NEW COLLECTION 2024
            </span>
          </div>

          {/* Main Heading - Better mobile scaling */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-4 sm:mb-6 text-gray-900
                       animate-[fadeIn_1s_ease-out_0.2s_both]
                       tracking-tight leading-tight sm:leading-none">
            <span className="block">ESCAPE</span>
            <span className="block">REALITY</span>
          </h1>

          {/* Subtitle - Better mobile typography */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto
                      animate-[fadeIn_1s_ease-out_0.4s_both] font-light tracking-wide px-4 sm:px-0 leading-relaxed">
            Contemporary fashion that combines timeless elegance with modern sophistication
          </p>

          {/* CTA Buttons - Better mobile layout */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4
                        animate-[fadeIn_1s_ease-out_0.6s_both] px-4 sm:px-0">
            <Button3D variant="primary" className="w-full sm:w-auto min-w-[200px] sm:min-w-0">
              EXPLORE COLLECTION
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button3D>
            <Button3D variant="ghost" className="w-full sm:w-auto min-w-[200px] sm:min-w-0">
              WATCH LOOKBOOK
            </Button3D>
          </div>
        </div>
      </div>

      {/* Scroll indicator - Only show on larger screens */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full p-1">
          <div className="w-1.5 h-3 bg-gray-400 rounded-full mx-auto animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
