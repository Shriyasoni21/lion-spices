import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AnnouncementBar from './components/common/AnnouncementBar';
import Navbar from './components/common/Navbar';
import CartDrawer from './components/common/CartDrawer';
import HomePage from './pages/Home';
import Footer from './components/common/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import ScrollToTopButton from './components/common/ScrollToTopButton';
import LoadingScreen from './components/common/LoadingScreen';
import ProductsPage from './pages/Products';
import ProductDetailsPage from './pages/ProductDetails';
import RecipesPage from './pages/Recipes';
import RecipeDetailsPage from './pages/RecipeDetails';
import CartPage from './pages/Cart';
import CheckoutPage from './pages/Checkout';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';
import PrivacyPage from './pages/Privacy';
import TermsPage from './pages/Terms';
import OrderSuccessPage from './pages/OrderSuccess';
import MyOrdersPage from './pages/MyOrders';
import NotFoundPage from './pages/NotFound';
import { Toaster } from 'react-hot-toast';
import { useCart } from './context/CartContext';

function App() {
  const { cartItems, cartCount, addToCart, removeFromCart, clearCart, updateQuantity } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 700);
    return () => window.clearTimeout(timer);
  }, []);

  const toggleCartOpen = () => setIsCartOpen((prev) => !prev);

  return (
    <div className="min-h-screen bg-cream overflow-x-hidden">
      <CartDrawer
        open={isCartOpen}
        items={cartItems}
        onClose={() => setIsCartOpen(false)}
        onRemove={removeFromCart}
        onClear={clearCart}
        onUpdateQuantity={updateQuantity}
      />
      <AnnouncementBar />
      <Navbar cartCount={cartCount} onCartClick={toggleCartOpen} />
      <ScrollToTop />
      <Toaster position="top-right" gutter={12} toastOptions={{ duration: 3000 }} />

      {isLoading && <LoadingScreen />}

      {/* Main content with top padding to account for fixed navbar */}
      <div className="pt-12 sm:pt-20">
        <Routes>
          <Route path="/" element={<HomePage onAddToCart={(product, selectedVariant) => { addToCart(product, selectedVariant, 1); setIsCartOpen(true); }} />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/products/:slug" element={<ProductDetailsPage />} />
          <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

export default App;
