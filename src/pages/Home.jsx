import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import WhyChooseUsSection from '../components/sections/WhyChooseUsSection';
import FeaturedCategoriesSection from '../components/sections/FeaturedCategoriesSection';
import RecipeSection from '../components/sections/RecipeSection';
import ContactSection from '../components/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCategoriesSection />
      <WhyChooseUsSection />
      <RecipeSection />
      <ContactSection />
    </>
  );
}
