import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface CartPageProps {
  onCheckout?: () => void;
  onContinueShopping?: () => void;
}

export function CartPage({ onCheckout, onContinueShopping }: CartPageProps) {
  const { state, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const shipping = 9.99;
  const tax = (getCartTotal() * 0.08);
  const total = getCartTotal() + shipping + tax;

  if (state.items.length === 0) {
    return (
      <section className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              SHOPPING CART
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Your cart is currently empty. Start shopping to add items.
            </p>
          </div>

          {/* Empty Cart State */}
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Your cart is empty</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added anything to your cart yet. Browse our collection to find your perfect pieces.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onContinueShopping}
                className="px-8 py-4 rounded-xl bg-gray-900 text-white font-semibold
                           hover:bg-gray-800 transform transition-all duration-300
                           hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20"
              >
                CONTINUE SHOPPING
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById('collections');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 rounded-xl bg-white border border-gray-300 text-gray-700 font-semibold
                           hover:bg-gray-50 transform transition-all duration-300
                           hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20"
              >
                VIEW PRODUCTS
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            SHOPPING CART
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {state.items.length} item{state.items.length !== 1 ? 's' : ''} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {state.items.map((item, index) => (
                <div
                  key={`${item.name}-${item.size}-${index}`}
                  className="bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 ease-out hover:shadow-lg hover:border-gray-300 animate-[fadeIn_0.5s_ease-out_both]"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-600">Size: {item.size}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.name, item.size)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.name, item.size, item.quantity - 1)}
                            className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center
                                     hover:border-gray-400 hover:bg-gray-50 transition-all duration-200
                                     transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium text-gray-900 transition-all duration-200">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.name, item.size, item.quantity + 1)}
                            className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center
                                     hover:border-gray-400 hover:bg-gray-50 transition-all duration-200
                                     transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900">${item.price * item.quantity}</p>
                          <p className="text-sm text-gray-500">${item.price} each</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-8">
              <button
                onClick={onContinueShopping}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                ← Continue Shopping
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({state.items.length} items)</span>
                  <span className="text-gray-900 font-medium">${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900 font-medium">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900 font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="w-full px-6 py-4 bg-gray-900 text-white font-semibold rounded-xl
                         hover:bg-gray-800 transform transition-all duration-300 hover:scale-105
                         focus:outline-none focus:ring-2 focus:ring-gray-900/20 touch-manipulation
                         flex items-center justify-center gap-2"
              >
                <span>PROCEED TO CHECKOUT</span>
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Secure checkout powered by SSL encryption
              </p>
            </div>

            {/* Promo Code */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <h4 className="font-medium text-gray-900 mb-3">Promo Code</h4>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900"
                />
                <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
