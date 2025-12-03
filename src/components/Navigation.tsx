import { Menu, ShoppingBag, User, Search, X, Heart } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../contexts/CartContext';

interface NavigationProps {
  onNavigate?: (page: 'home' | 'about' | 'products' | 'contact' | 'cart') => void;
  currentPage?: string;
}

export function Navigation({ onNavigate, currentPage = 'home' }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { getCartItemCount, getWishlistCount, toggleCart } = useCart();

  const handleLogoClick = () => {
    if (currentPage !== 'home') {
      onNavigate?.('home');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl px-4 sm:px-6 py-3
                      shadow-lg">
          <div className="flex items-center justify-between">
            <button
              onClick={handleLogoClick}
              className="text-xl sm:text-2xl font-bold text-gray-900 tracking-wider hover:text-gray-700 transition-colors duration-300 cursor-pointer"
            >
              ESCAPISM
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => onNavigate?.('products')}
                className={`transition-all duration-300 hover:scale-105 font-medium tracking-wide relative
                         after:absolute after:bottom-0 after:left-0 after:h-0.5
                         after:bg-gray-900 after:transition-all after:duration-300 ${currentPage === 'products' || currentPage === 'product-detail'
                    ? 'text-gray-900 after:w-full'
                    : 'text-gray-600 hover:text-gray-900 hover:after:w-full'
                  }`}
              >
                NEW
              </button>
              <button
                onClick={() => onNavigate?.('products')}
                className={`transition-all duration-300 hover:scale-105 font-medium tracking-wide relative
                         after:absolute after:bottom-0 after:left-0 after:h-0.5
                         after:bg-gray-900 after:transition-all after:duration-300 ${currentPage === 'products' || currentPage === 'product-detail'
                    ? 'text-gray-900 after:w-full'
                    : 'text-gray-600 hover:text-gray-900 hover:after:w-full'
                  }`}
              >
                COLLECTIONS
              </button>
              <button
                onClick={() => onNavigate?.('about')}
                className={`transition-all duration-300 hover:scale-105 font-medium tracking-wide relative
                         after:absolute after:bottom-0 after:left-0 after:h-0.5
                         after:bg-gray-900 after:transition-all after:duration-300 ${currentPage === 'about'
                    ? 'text-gray-900 after:w-full'
                    : 'text-gray-600 hover:text-gray-900 hover:after:w-full'
                  }`}
              >
                ABOUT
              </button>
              <button
                onClick={() => onNavigate?.('contact')}
                className={`transition-all duration-300 hover:scale-105 font-medium tracking-wide relative
                         after:absolute after:bottom-0 after:left-0 after:h-0.5
                         after:bg-gray-900 after:transition-all after:duration-300 ${currentPage === 'contact'
                    ? 'text-gray-900 after:w-full'
                    : 'text-gray-600 hover:text-gray-900 hover:after:w-full'
                  }`}
              >
                CONTACT
              </button>
            </div>

            {/* Desktop Icons */}
            <div className="hidden md:flex items-center gap-4">
              <button
                className="p-2 text-gray-600 hover:text-gray-900 transition-all duration-300
                               hover:scale-110 hover:rotate-12"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                className="p-2 text-gray-600 hover:text-gray-900 transition-all duration-300
                               hover:scale-110"
                aria-label="User Account"
              >
                <User className="w-5 h-5" />
              </button>
              <button
                onClick={() => onNavigate?.('cart')}
                className="p-2 text-gray-600 hover:text-gray-900 transition-all duration-300
                         hover:scale-110 relative"
                aria-label={`Shopping Cart (${getCartItemCount()} items)`}
              >
                <ShoppingBag className="w-5 h-5" />
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gray-900
                                 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center
                                 animate-pulse min-w-[20px]">
                    {getCartItemCount()}
                  </span>
                )}
              </button>
              <button
                onClick={() => onNavigate?.('products')}
                className="p-2 text-gray-600 hover:text-red-500 transition-all duration-300
                         hover:scale-110 relative"
                aria-label={`Wishlist (${getWishlistCount()} items)`}
              >
                <Heart className="w-5 h-5" />
                {getWishlistCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500
                                 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center
                                 min-w-[20px]">
                    {getWishlistCount()}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-all duration-300"
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => {
                    onNavigate?.('products');
                    setIsOpen(false);
                  }}
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-300
                           font-medium tracking-wide px-2 py-1 rounded-lg hover:bg-gray-50 text-left"
                >
                  NEW
                </button>
                <button
                  onClick={() => {
                    onNavigate?.('products');
                    setIsOpen(false);
                  }}
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-300
                           font-medium tracking-wide px-2 py-1 rounded-lg hover:bg-gray-50 text-left"
                >
                  COLLECTIONS
                </button>
                <button
                  onClick={() => {
                    onNavigate?.('about');
                    setIsOpen(false);
                  }}
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-300
                           font-medium tracking-wide px-2 py-1 rounded-lg hover:bg-gray-50 text-left"
                >
                  ABOUT
                </button>
                <button
                  onClick={() => {
                    onNavigate?.('contact');
                    setIsOpen(false);
                  }}
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-300
                           font-medium tracking-wide px-2 py-1 rounded-lg hover:bg-gray-50 text-left"
                >
                  CONTACT
                </button>

                <div className="flex items-center justify-center gap-6 pt-4 border-t border-gray-200">
                  <button className="p-3 text-gray-600 hover:text-gray-900 transition-all duration-300
                                   hover:scale-110 hover:rotate-12 rounded-full hover:bg-gray-50">
                    <Search className="w-5 h-5" />
                  </button>
                  <button className="p-3 text-gray-600 hover:text-gray-900 transition-all duration-300
                                   hover:scale-110 rounded-full hover:bg-gray-50">
                    <User className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      onNavigate?.('cart');
                      setIsOpen(false);
                    }}
                    className="p-3 text-gray-600 hover:text-gray-900 transition-all duration-300
                             hover:scale-110 relative rounded-full hover:bg-gray-50"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    {getCartItemCount() > 0 && (
                      <span className="absolute -top-1 -right-1 bg-gray-900
                                     text-white text-xs w-5 h-5 rounded-full flex items-center justify-center min-w-[20px]">
                        {getCartItemCount()}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      onNavigate?.('products');
                      setIsOpen(false);
                    }}
                    className="p-3 text-gray-600 hover:text-red-500 transition-all duration-300
                             hover:scale-110 relative rounded-full hover:bg-red-50"
                  >
                    <Heart className="w-5 h-5" />
                    {getWishlistCount() > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500
                                     text-white text-xs w-5 h-5 rounded-full flex items-center justify-center min-w-[20px]">
                        {getWishlistCount()}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
