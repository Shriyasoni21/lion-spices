import { Link } from 'react-router-dom';
import HeroSection from '../components/sections/HeroSection';
import ProductCategorySection from '../components/sections/ProductCategorySection';
import SourceJourneySection from '../components/sections/SourceJourneySection';
import TestimonialsSection from '../components/sections/TestimonialsSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductCategorySection />
      <SourceJourneySection />
      <TestimonialsSection />

      <section className="bg-white py-16 sm:py-20">
        <div className="container-custom">
          <div className="grid gap-6 rounded-[32px] border border-gray-100 bg-gradient-to-r from-primary-red/10 via-cream to-white p-6 shadow-[0_24px_80px_-40px_rgba(220,38,38,0.35)] sm:p-8 lg:grid-cols-[1.2fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary-red">Bring premium spices home</p>
              <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">Create rich, authentic meals with Lion Spices.</h2>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/products" className="inline-flex h-12 items-center justify-center rounded-full bg-primary-red px-6 text-sm font-semibold text-white shadow-lg transition hover:bg-red-700">
                Shop Spices
              </Link>
              <Link to="/contact" className="inline-flex h-12 items-center justify-center rounded-full border border-gray-200 bg-white px-6 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-primary-red hover:text-primary-red">
                Talk to our team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
