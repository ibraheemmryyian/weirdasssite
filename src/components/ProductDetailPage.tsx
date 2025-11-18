import { useState } from 'react';
import { ShoppingCart, Heart, ArrowLeft, Star } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface ProductDetailPageProps {
  product: {
    name: string;
    price: number;
    image: string;
    category: string;
  };
  onBack?: () => void;
}

export function ProductDetailPage({ product, onBack }: ProductDetailPageProps) {
  const { addToCart, addToWishlist, isInWishlist } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedImage, setSelectedImage] = useState(0);

  // Product descriptions and details
  const getProductDetails = (productName: string) => {
    const details: Record<string, {
      description: string;
      features: string[];
      care: string[];
      material: string;
      fit: string;
    }> = {
      'Signature Hoodie': {
        description: 'Our signature hoodie combines premium comfort with timeless style. Crafted from a luxurious cotton blend that feels soft against the skin while maintaining structure and durability.',
        features: ['Premium cotton blend', 'Reinforced stitching', 'Kangaroo pocket', 'Ribbed cuffs and hem', 'Screen-printed logo'],
        care: ['Machine wash cold', 'Tumble dry low', 'Do not bleach', 'Iron on reverse'],
        material: '80% Cotton, 20% Polyester',
        fit: 'Relaxed fit with room for layering'
      },
      'Trench Coat': {
        description: 'A modern take on the classic trench coat. This versatile piece features water-resistant fabric and impeccable tailoring, perfect for transitional weather.',
        features: ['Water-resistant fabric', 'Epaulette shoulders', 'Storm flap', 'Belt with buckle', 'Multiple pockets'],
        care: ['Dry clean only', 'Hang to dry', 'Avoid direct heat', 'Store on wide hanger'],
        material: '100% Polyester with water-resistant coating',
        fit: 'Tailored fit with comfortable mobility'
      },
      'Tailored Trousers': {
        description: 'Italian craftsmanship meets modern design in these tailored trousers. The perfect balance of comfort and sophistication for any occasion.',
        features: ['Italian wool blend', 'Flat front design', 'Slanted pockets', 'Crease-resistant', 'Half-lined'],
        care: ['Dry clean recommended', 'Hang to dry', 'Low heat iron', 'Store folded'],
        material: '55% Wool, 45% Polyester',
        fit: 'Slim fit with tapered leg'
      },
      'Cotton Tee': {
        description: 'The foundation of any wardrobe. This organic cotton tee offers unparalleled comfort and a lived-in feel that gets better with every wear.',
        features: ['Organic cotton', 'Pre-shrunk fabric', 'Crew neck', 'Short sleeves', 'Reinforced seams'],
        care: ['Machine wash cold', 'Tumble dry low', 'Do not bleach', 'Iron low heat'],
        material: '100% Organic Cotton',
        fit: 'Regular fit with comfortable stretch'
      },
      'Bomber Jacket': {
        description: 'A versatile bomber jacket that bridges seasons. Lightweight yet warm, with a sleek design that complements any style.',
        features: ['Nylon shell', 'Ribbed cuffs and hem', 'Full-zip front', 'Multiple pockets', 'Lightweight insulation'],
        care: ['Machine wash cold', 'Hang to dry', 'No bleach', 'Low iron if needed'],
        material: '100% Nylon with polyester lining',
        fit: 'Regular fit with athletic cut'
      },
      'Cashmere Sweater': {
        description: 'Luxury redefined. This cashmere sweater offers unparalleled softness and warmth, making it the perfect investment piece for your wardrobe.',
        features: ['Cashmere blend', 'Crew neck', 'Long sleeves', 'Ribbed details', 'Ultra-soft finish'],
        care: ['Hand wash cold', 'Lay flat to dry', 'Do not bleach', 'Store folded'],
        material: '70% Cashmere, 30% Wool',
        fit: 'Relaxed fit for ultimate comfort'
      }
    };

    return details[productName] || {
      description: 'Premium quality garment crafted with attention to detail and designed for lasting comfort.',
      features: ['High-quality materials', 'Careful craftsmanship', 'Timeless design'],
      care: ['Follow care label', 'Professional cleaning recommended'],
      material: 'Premium fabrics',
      fit: 'Designed for comfort and style'
    };
  };

  const details = getProductDetails(product.name);
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  // Generate additional product images (variations)
  const productImages = [
    `https://picsum.photos/600/800?random=${product.image}`,
    `https://picsum.photos/600/800?random=${product.image}1`,
    `https://picsum.photos/600/800?random=${product.image}2`,
    `https://picsum.photos/600/800?random=${product.image}3`
  ];

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to products</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100 group cursor-zoom-in">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-all duration-300 ease-out
                           transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-900/20 ${
                    selectedImage === index
                      ? 'border-gray-900 shadow-lg ring-2 ring-gray-900/20'
                      : 'border-gray-200 hover:border-gray-400 hover:shadow-md'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover transition-all duration-300 ease-out hover:scale-110"
                  />
                  {selectedImage === index && (
                    <div className="absolute inset-0 bg-gray-900/10 rounded-lg"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-gray-800 text-white text-xs font-bold">
                  {product.category}
                </span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">(4.8)</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <p className="text-2xl font-bold text-gray-900 mb-6">
                ${product.price}
              </p>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {details.description}
              </p>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Material</h4>
                <p className="text-gray-600 text-sm">{details.material}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Fit</h4>
                <p className="text-gray-600 text-sm">{details.fit}</p>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
              <ul className="space-y-2">
                {details.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Size</h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-4 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                      selectedSize === size
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <button
                onClick={() => addToCart(product, selectedSize)}
                className="w-full py-4 px-6 rounded-xl bg-gray-900 text-white font-semibold text-lg
                         flex items-center justify-center gap-3 transform transition-all duration-300
                         hover:scale-105 hover:shadow-lg active:scale-95
                         focus:outline-none focus:ring-2 focus:ring-gray-900/20 touch-manipulation"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>ADD TO CART - ${product.price}</span>
              </button>

              <button
                onClick={() => addToWishlist(product)}
                className={`w-full py-3 px-6 rounded-xl border-2 font-semibold
                         flex items-center justify-center gap-3 transform transition-all duration-300
                         focus:outline-none focus:ring-2 focus:ring-gray-900/20 touch-manipulation ${
                  isInWishlist(product.name)
                    ? 'border-red-500 bg-red-50 text-red-700 hover:bg-red-100'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                }`}
              >
                <Heart className={`w-5 h-5 ${isInWishlist(product.name) ? 'fill-current' : ''}`} />
                <span>{isInWishlist(product.name) ? 'IN WISHLIST' : 'ADD TO WISHLIST'}</span>
              </button>
            </div>

            {/* Care Instructions */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Care Instructions</h3>
              <ul className="space-y-2">
                {details.care.map((instruction, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    <span className="text-sm">{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
