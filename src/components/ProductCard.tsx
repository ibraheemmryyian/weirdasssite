import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useState } from 'react';

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  category: string;
  onProductClick?: (product: { name: string; price: number; image: string; category: string }) => void;
}

export function ProductCard({ name, price, image, category, onProductClick }: ProductCardProps) {
  const { addToCart, addToWishlist, isInWishlist, isInCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [imageLoaded, setImageLoaded] = useState(false);
  const productData = { name, price, image, category };

  // Product descriptions based on name
  const getProductDescription = (productName: string) => {
    const descriptions: Record<string, string> = {
      'Signature Hoodie': 'Premium cotton blend with perfect weight for year-round comfort. Features reinforced stitching and a relaxed fit.',
      'Trench Coat': 'Classic trench design with modern tailoring. Water-resistant fabric with a sophisticated drape.',
      'Tailored Trousers': 'Italian wool blend with a slim fit. Perfect crease retention and luxurious hand feel.',
      'Cotton Tee': 'Organic cotton with a soft, lived-in feel. Pre-shrunk and treated for ultimate comfort.',
      'Bomber Jacket': 'Nylon shell with ribbed cuffs. Lightweight and versatile for any occasion.',
      'Cashmere Sweater': 'Ultra-soft cashmere blend with a relaxed silhouette. Perfect for layering.',
      'Wool Coat': 'Pure wool construction with a tailored fit. Warm yet breathable for winter styling.',
      'Silk Blouse': 'Smooth silk fabric with a fluid drape. Elegant and sophisticated.',
      'Denim Jacket': 'Classic denim with the perfect amount of stretch. Timeless and versatile.',
      'Leather Boots': 'Premium leather with Goodyear welt construction. Handcrafted for durability.'
    };
    return descriptions[productName] || 'Premium quality garment crafted with attention to detail.';
  };

  return (
    <div className="group relative cursor-pointer">
      <div
        onClick={() => onProductClick?.(productData)}
        className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 transition-all duration-700
                   hover:border-gray-300 hover:shadow-2xl
                   transform hover:scale-[1.05] hover:-translate-y-4
                   focus-within:border-gray-300 focus-within:shadow-2xl
                   hover:rotate-1"
      >
        {/* Product Image */}
        <div className="aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-gray-200 relative">
          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse">
              <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400"></div>
            </div>
          )}

          <img
            src={`https://picsum.photos/400/600?random=${image}`}
            alt={name}
            className={`w-full h-full object-cover transform transition-all duration-700 ease-out group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />

          {/* Hover Overlay - Description */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 via-black/40 to-transparent
                         opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out flex items-center">
            <div className="p-6 text-white max-w-[60%]">
              <p className="text-sm leading-relaxed font-light">
                {getProductDescription(name)}
              </p>
            </div>
          </div>
        </div>

        {/* Wishlist Button */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToWishlist(productData);
            }}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full backdrop-blur-sm
                         flex items-center justify-center border transition-all duration-300
                         hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-900/20 ${
              isInWishlist(name)
                ? 'bg-red-50 text-red-500 border-red-200'
                : 'bg-white/90 text-gray-600 border-gray-200 group-hover:bg-red-50 group-hover:text-red-500'
            }`}
          >
            <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isInWishlist(name) ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-gray-800 text-white text-xs font-bold
                         backdrop-blur-sm tracking-wide transition-all duration-300 group-hover:bg-gray-700">
            {category}
          </span>
        </div>

        {/* Product Info - Default State */}
        <div className="p-4 sm:p-6 transition-opacity duration-500 group-hover:opacity-0">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 tracking-wide leading-tight">
            {name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">
              ${price}
            </span>
          </div>
        </div>

        {/* Hover State - Size and Add to Cart */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6
                       opacity-0 group-hover:opacity-100 transition-all duration-500
                       transform translate-y-2 group-hover:translate-y-0">
          {/* Size Selection */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-700 mb-2">SIZE</label>
            <div className="flex gap-2">
              {['S', 'M', 'L', 'XL'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 rounded-lg border-2 text-sm font-medium
                           transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-gray-900/20
                           transform hover:scale-105 active:scale-95 ${
                    selectedSize === size
                      ? 'border-gray-900 bg-gray-900 text-white shadow-lg'
                      : 'border-gray-300 text-gray-700 hover:border-gray-900 hover:bg-gray-900 hover:text-white hover:shadow-md'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(productData, selectedSize);
              }}
              className="flex-1 px-3 py-2.5 rounded-lg bg-gray-900 text-white font-semibold flex items-center justify-center gap-2
                         transform transition-all duration-300 hover:scale-105 hover:shadow-lg
                         active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-900/20 touch-manipulation"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="text-xs font-medium">ADD TO CART</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToWishlist(productData);
              }}
              className={`p-2.5 rounded-lg border-2 transition-all duration-300 ${
                isInWishlist(name)
                  ? 'border-red-500 bg-red-50 text-red-500'
                  : 'border-gray-300 text-gray-700 hover:border-red-500 hover:bg-red-50 hover:text-red-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${isInWishlist(name) ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
