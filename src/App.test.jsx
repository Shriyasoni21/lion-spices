import React, { useState } from 'react';
import AnnouncementBar from './components/common/AnnouncementBar';
import Navbar from './components/common/Navbar';
import CartDrawer from './components/common/CartDrawer';
import HeroSection from './components/sections/HeroSection';
import ProductCategorySection from './components/sections/ProductCategorySection';
import FeaturedCategoriesSection from './components/sections/FeaturedCategoriesSection';
import WhyTrustSection from './components/sections/WhyTrustSection';
import BestSellerProductsSection from './components/sections/BestSellerProductsSection';
import SourceJourneySection from './components/sections/SourceJourneySection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import AboutSection from './components/sections/AboutSection';
import NewsletterSection from './components/sections/NewsletterSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/common/Footer';
import ScrollToTopButton from './components/common/ScrollToTopButton';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleCartOpen = () => setIsCartOpen((prev) => !prev);

  return (
    <div className="min-h-screen bg-cream overflow-x-hidden">
      <CartDrawer
        open={isCartOpen}
        items={cartItems}
        onClose={() => setIsCartOpen(false)}
        onRemove={removeFromCart}
        onClear={clearCart}
      />
      <AnnouncementBar />
      <Navbar cartCount={cartCount} onCartClick={toggleCartOpen} />
      <HeroSection />
      <ProductCategorySection />
      <FeaturedCategoriesSection onAddToCart={addToCart} />
      <WhyTrustSection />
      <BestSellerProductsSection onAddToCart={addToCart} />
      <SourceJourneySection />
      <TestimonialsSection />
      <AboutSection />
      <NewsletterSection />
      <ContactSection />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

export default App;
