import { ProductCard } from './ProductCard';

interface ProductsPageProps {
  onProductClick?: (product: { name: string; price: number; image: string; category: string }) => void;
}

import heroImage from '../assets/images/hero.png';
import revealImage from '../assets/images/reveal.png';
import detailImage from '../assets/images/detail.png';

export function ProductsPage({ onProductClick }: ProductsPageProps) {
  const allProducts = [
    { name: 'Signature Hoodie', price: 299, image: heroImage, category: 'NEW' },
    { name: 'Trench Coat', price: 499, image: revealImage, category: 'TRENDING' },
    { name: 'Tailored Trousers', price: 249, image: detailImage, category: 'NEW' },
    { name: 'Cotton Tee', price: 149, image: 'https://picsum.photos/400/600?random=04', category: 'CLASSIC' },
    { name: 'Bomber Jacket', price: 399, image: 'https://picsum.photos/400/600?random=05', category: 'LIMITED' },
    { name: 'Cashmere Sweater', price: 279, image: 'https://picsum.photos/400/600?random=06', category: 'NEW' },
    { name: 'Wool Coat', price: 599, image: 'https://picsum.photos/400/600?random=07', category: 'PREMIUM' },
    { name: 'Silk Blouse', price: 189, image: 'https://picsum.photos/400/600?random=08', category: 'NEW' },
    { name: 'Denim Jacket', price: 329, image: 'https://picsum.photos/400/600?random=09', category: 'CLASSIC' },
    { name: 'Leather Boots', price: 449, image: 'https://picsum.photos/400/600?random=10', category: 'LIMITED' },
  ];

  return (
    <section className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            ALL PRODUCTS
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Explore our complete collection of contemporary fashion essentials.
          </p>
        </div>

        {/* Filter/Sort (placeholder) */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <select className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900/20">
            <option>All Categories</option>
            <option>New Arrivals</option>
            <option>Classics</option>
            <option>Limited</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900/20">
            <option>Sort by Price</option>
            <option>Low to High</option>
            <option>High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mb-16">
          {allProducts.map((product, index) => (
            <ProductCard key={index} {...product} onProductClick={onProductClick} />
          ))}
        </div>

        {/* Pagination (placeholder) */}
        <div className="flex justify-center items-center gap-2 mb-16">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
            Previous
          </button>
          <span className="px-4 py-2 text-gray-700 font-medium">Page 1 of 3</span>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
            Next
          </button>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-8 py-4 rounded-xl bg-gray-900 text-white font-semibold
                       hover:bg-gray-800 transform transition-all duration-300
                       hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20"
          >
            BACK TO HOME
          </button>
        </div>
      </div>
    </section>
  );
}
