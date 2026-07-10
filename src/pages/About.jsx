import React from 'react';
import { FiAward, FiCheckCircle, FiClock, FiDroplet, FiFeather, FiShield } from 'react-icons/fi';

const trustStats = [
  { title: '30+ Years Experience', description: 'A legacy of trusted spice sourcing and processing.' },
  { title: '10000+ Happy Customers', description: 'Loved by home chefs and food businesses across India.' },
  { title: '5+ Premium Products', description: 'A curated range of masalas and spice powders.' },
  { title: '100% Authentic Spices', description: 'Pure ingredients with rich aroma and natural flavor.' }
];

const qualityCards = [
  { title: '100% Pure', description: 'Handpicked spices with no compromise on authenticity.', icon: FiCheckCircle },
  { title: 'No Artificial Colors', description: 'Naturally rich flavors with no synthetic enhancement.', icon: FiDroplet },
  { title: 'Hygienically Packed', description: 'Processed and sealed under strict cleanliness standards.', icon: FiShield },
  { title: 'Farm Fresh Ingredients', description: 'Sourced for freshness, aroma and bold taste.', icon: FiFeather },
  { title: 'FSSAI Certified', description: 'Manufactured with food safety and hygiene in mind.', icon: FiAward },
  { title: 'AGMARK Quality', description: 'Trusted quality standards for premium spice excellence.', icon: FiClock }
];

const certifications = ['FSSAI', 'AGMARK', 'ISO'];
const manufacturingPoints = ['Hygienic Processing', 'Premium Ingredients', 'Traditional Recipes', 'Modern Packaging'];

export default function AboutPage() {
  return (
    <main className="bg-cream pb-16 pt-24 text-gray-900 sm:pt-28">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-gray-100 bg-white p-6 shadow-[0_18px_45px_-24px_rgba(0,0,0,0.25)] sm:p-8 lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-red">About Lion Spices</p>
          <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">Premium Indian spices, rooted in tradition and crafted for modern kitchens.</h1>
          <p className="mt-4 max-w-3xl text-sm text-gray-600 sm:text-base">Lion Spices brings together heritage spice wisdom, hygienic processing and elegant packaging to deliver rich flavor in every everyday meal.</p>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.2)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-red">Mission</p>
            <h2 className="mt-3 text-2xl font-semibold text-gray-900">Bring authentic spice flavor to every home.</h2>
            <p className="mt-3 text-sm text-gray-600 sm:text-base">We are committed to offering pure, premium spices that preserve aroma, improve taste and support healthier cooking.</p>
          </div>
          <div className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.2)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-red">Vision</p>
            <h2 className="mt-3 text-2xl font-semibold text-gray-900">Set a new standard for premium spice quality.</h2>
            <p className="mt-3 text-sm text-gray-600 sm:text-base">Our vision is to make every spice experience feel refined, trustworthy and unmistakably Indian.</p>
          </div>
        </div>

        <div className="mt-6 rounded-[32px] border border-gray-100 bg-white p-6 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.2)] sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-red">Brand Story</p>
          <p className="mt-3 text-sm text-gray-600 sm:text-base">From carefully sourced ingredients to premium packaging, Lion Spices is designed for homes that value authenticity, consistency and taste. Every jar reflects the care that goes into creating real flavor without compromise.</p>
        </div>

        <div className="mt-6 rounded-[32px] border border-gray-100 bg-white p-6 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.2)] sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-red">Quality Standards</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {['Premium sourcing', 'Strict hygiene controls', 'Rich natural aroma', 'Consistent taste'].map((item) => (
              <div key={item} className="rounded-[20px] border border-gray-100 bg-[#fffaf5] p-4 text-sm font-medium text-gray-700">{item}</div>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-[32px] border border-gray-100 bg-white p-6 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.2)] sm:p-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-red">Why Trust Lion Spices</p>
            <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">Built on heritage, trust and authentic Indian flavours.</h2>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {trustStats.map((stat) => (
              <article key={stat.title} className="rounded-[24px] border border-gray-100 bg-[#fffaf5] p-5">
                <h3 className="text-lg font-semibold text-gray-900">{stat.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{stat.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-[32px] border border-gray-100 bg-white p-6 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.2)] sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-red">Why Choose Lion Spices</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {qualityCards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.title} className="rounded-[24px] border border-gray-100 bg-[#fffaf5] p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-red/10 text-primary-red">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{card.description}</p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[32px] border border-gray-100 bg-white p-6 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.2)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-red">Certifications</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {certifications.map((item) => (
                <span key={item} className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-700">{item}</span>
              ))}
            </div>
          </div>
          <div className="rounded-[32px] border border-gray-100 bg-white p-6 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.2)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-red">Our Manufacturing</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {manufacturingPoints.map((point) => (
                <div key={point} className="rounded-[20px] border border-gray-100 bg-[#fffaf5] p-4 text-sm font-medium text-gray-700">{point}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
