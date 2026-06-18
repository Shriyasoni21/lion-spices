import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import WhyChooseUsSection from '../components/sections/WhyChooseUsSection';
import ProductCategorySection from '../components/sections/ProductCategorySection';
import RecipeSection from '../components/sections/RecipeSection';
import AboutSection from '../components/sections/AboutSection';
import ContactSection from '../components/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyChooseUsSection />
      <ProductCategorySection />
      <RecipeSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
