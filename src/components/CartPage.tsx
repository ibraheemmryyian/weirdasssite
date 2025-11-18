export function CartPage() {
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
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Your cart is empty</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Looks like you haven't added anything to your cart yet. Browse our collection to find your perfect pieces.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-8 py-4 rounded-xl bg-gray-900 text-white font-semibold
                         hover:bg-gray-800 transform transition-all duration-300
                         hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20"
            >
              CONTINUE SHOPPING
            </button>
            <button
              onClick={() => {
                // Scroll to products section
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

        {/* Cart Summary Placeholder */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cart Summary</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>$0.00</span>
            </div>
            <div className="border-t border-gray-300 pt-3 mt-3">
              <div className="flex justify-between font-semibold text-gray-900">
                <span>Total</span>
                <span>$0.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
