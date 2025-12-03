import { useState } from 'react';
import { CartProvider } from './contexts/CartContext';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { ProductShowcase } from './components/ProductShowcase';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { AboutPage } from './components/AboutPage';
import { ProductsPage } from './components/ProductsPage';
import { CartPage } from './components/CartPage';
import { ContactPage } from './components/ContactPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { LookbookModal } from './components/LookbookModal';
import { Interactive3DShowcase } from './components/Interactive3DShowcase';
import { FeatureSection } from './components/FeatureSection';
import { CheckoutPage } from './components/CheckoutPage';
import { PaymentPage } from './components/PaymentPage';

type Page = 'home' | 'about' | 'products' | 'contact' | 'cart' | 'product-detail' | 'checkout' | 'payment';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    navigateTo('product-detail');
  };

  const handleBackFromProduct = () => {
    navigateTo('products');
    setSelectedProduct(null);
  };

  const handleExploreCollection = () => {
    const element = document.getElementById('collections');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleWatchLookbook = () => {
    setIsLookbookOpen(true);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <HeroSection
              onExploreCollection={handleExploreCollection}
              onWatchLookbook={handleWatchLookbook}
            />
            <Interactive3DShowcase />
            <ProductShowcase
              onViewAllProducts={() => navigateTo('products')}
              onProductClick={handleProductClick}
            />
          </>
        );
      case 'about':
        return <AboutPage />;
      case 'products':
        return <ProductsPage onProductClick={handleProductClick} />;
      case 'contact':
        return <ContactPage />;
      case 'cart':
        return <CartPage onCheckout={() => navigateTo('checkout')} onContinueShopping={() => navigateTo('products')} />;
      case 'product-detail':
        return selectedProduct ? (
          <ProductDetailPage product={selectedProduct} onBack={handleBackFromProduct} />
        ) : null;
      case 'checkout':
        return <CheckoutPage onPayment={() => navigateTo('payment')} onBack={() => navigateTo('cart')} />;
      case 'payment':
        return <PaymentPage onBack={() => navigateTo('checkout')} onComplete={() => navigateTo('home')} />;
      default:
        return (
          <>
            <HeroSection />
            <ProductShowcase onViewAllProducts={() => navigateTo('products')} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <CustomCursor />
      <Navigation onNavigate={navigateTo} currentPage={currentPage} />
      {renderPage()}
      <Footer />
      <LookbookModal isOpen={isLookbookOpen} onClose={() => setIsLookbookOpen(false)} />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
