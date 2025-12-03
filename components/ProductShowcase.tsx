import { ProductCard } from './ProductCard';
import { ScrollReveal3D } from './ScrollReveal3D';

interface ProductShowcaseProps {
  onViewAllProducts?: () => void;
  onProductClick?: (product: { name: string; price: number; image: string; category: string }) => void;
}

export function ProductShowcase({ onViewAllProducts, onProductClick }: ProductShowcaseProps) {
  const products = [
    { name: 'Signature Hoodie', price: 299, image: '01', category: 'NEW' },
    { name: 'Trench Coat', price: 499, image: '02', category: 'TRENDING' },
    { name: 'Tailored Trousers', price: 249, image: '03', category: 'NEW' },
    { name: 'Cotton Tee', price: 149, image: '04', category: 'CLASSIC' },
    { name: 'Bomber Jacket', price: 399, image: '05', category: 'LIMITED' },
    { name: 'Cashmere Sweater', price: 279, image: '06', category: 'NEW' },
  ];

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 overflow-hidden bg-gray-50" id="collections">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-gray-900 tracking-tight">
            FEATURED COLLECTION
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed px-4 sm:px-0">
            Discover our curated collection of contemporary essentials
          </p>
        </div>

        {/* Products Grid - Better mobile layout with stagger */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((product, index) => (
            <ScrollReveal3D key={index} delay={index * 100}>
              <ProductCard {...product} onProductClick={onProductClick} />
            </ScrollReveal3D>
          ))}
        </div>

        {/* CTA Button - Mobile optimized */}
        <div className="text-center mt-12 sm:mt-16">
          <button
            onClick={onViewAllProducts}
            className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-white border border-gray-300 text-gray-700 font-semibold
                       hover:bg-gray-50 hover:border-gray-400
                       transform transition-all duration-300
                       hover:scale-105 hover:shadow-lg
                       focus:outline-none focus:ring-2 focus:ring-gray-900/20
                       touch-manipulation
                       tracking-wide text-sm sm:text-base min-w-[200px]"
          >
            VIEW ALL PRODUCTS
          </button>
        </div>
      </div>
    </section>
  );
}
