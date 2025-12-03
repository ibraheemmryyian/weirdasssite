import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, CreditCard, Lock, Shield } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface PaymentPageProps {
  onBack: () => void;
  onComplete: () => void;
}

export function PaymentPage({ onBack, onComplete }: PaymentPageProps) {
  const { getCartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const shipping = 9.99;
  const tax = (getCartTotal() * 0.08);
  const total = getCartTotal() + shipping + tax;

  const handlePayment = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    setIsProcessing(false);
    setIsComplete(true);
    clearCart();

    // Auto redirect after success
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. Your order has been confirmed and you will receive a confirmation email shortly.
          </p>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Order Total</p>
              <p className="text-xl font-bold text-gray-900">${total.toFixed(2)}</p>
            </div>
            <p className="text-xs text-gray-500">
              Redirecting to home page...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            disabled={isProcessing}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Payment</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="w-6 h-6 text-gray-600" />
              <h2 className="text-xl font-semibold text-gray-900">Payment Details</h2>
            </div>

            <div className="space-y-6">
              {/* Payment Method Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
                <div className="space-y-3">
                  <div className="border border-gray-300 rounded-lg p-4 cursor-pointer hover:border-gray-900 transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        defaultChecked
                        className="w-4 h-4 text-gray-900 border-gray-300 focus:ring-gray-900"
                      />
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-gray-600" />
                        <span className="font-medium text-gray-900">Credit/Debit Card</span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-300 rounded-lg p-4 cursor-pointer hover:border-gray-900 transition-colors opacity-50 cursor-not-allowed">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        disabled
                        className="w-4 h-4 text-gray-900 border-gray-300 focus:ring-gray-900"
                      />
                      <span className="font-medium text-gray-900">PayPal (Coming Soon)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Secure Payment</p>
                    <p className="text-xs text-blue-600">Your payment information is protected with 256-bit SSL encryption</p>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900 mt-0.5"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{' '}
                  <a href="#" className="text-gray-900 underline hover:no-underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-gray-900 underline hover:no-underline">Privacy Policy</a>
                </label>
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full px-6 py-4 bg-gray-900 text-white font-semibold rounded-xl
                         hover:bg-gray-800 transform transition-all duration-300 hover:scale-105
                         focus:outline-none focus:ring-2 focus:ring-gray-900/20 touch-manipulation
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                         flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Pay ${total.toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Order Items Preview */}
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600 mb-3">
                  {getCartTotal() === 0 ? 'No items in cart' : `${getCartTotal() === 0 ? 0 : 1} item${getCartTotal() === 0 ? '' : 's'} in your order`}
                </p>
              </div>
            </div>

            {/* Security Badges */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Lock className="w-4 h-4 text-green-600" />
                </div>
                <p className="text-xs text-gray-600">SSL Secured</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-xs text-gray-600">All Cards</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-4 h-4 text-purple-600" />
                </div>
                <p className="text-xs text-gray-600">Protected</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
