import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AnnouncementBar from './components/common/AnnouncementBar';
import Navbar from './components/common/Navbar';
import CartDrawer from './components/common/CartDrawer';
import HomePage from './pages/Home';
import Footer from './components/common/Footer';
import ScrollToTopButton from './components/common/ScrollToTopButton';
import FloatingWhatsApp from './components/common/FloatingWhatsApp';
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
import { useCart } from './context/CartContext';

function App() {
  const { cartItems, cartCount, addToCart, removeFromCart, clearCart, updateQuantity } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.getElementById(location.hash.replace('#', ''));
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
      return;
    }

    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

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

      <Routes>
        <Route path="/" element={<HomePage onAddToCart={(product) => { addToCart(product, '500g', 1); setIsCartOpen(true); }} />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>

      <Footer />
      <ScrollToTopButton />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
