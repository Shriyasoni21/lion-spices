import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiClock, FiPackage, FiShield, FiShoppingBag, FiStar, FiTruck } from 'react-icons/fi';
import { imageAssets } from '../config/imageAssets';
import ImageWithFallback from '../components/common/ImageWithFallback';

const productPackets = [
  { name: 'Red Chilli Powder', subtitle: 'Premium Spice Blend', src: imageAssets.products.redChilliPowder },
  { name: 'Turmeric Powder', subtitle: 'Farm Fresh Turmeric', src: imageAssets.products.turmericPowder },
  { name: 'Coriander Powder', subtitle: 'Rich Natural Aroma', src: imageAssets.products.corianderPowder },
  { name: 'Aachar Mirchi', subtitle: 'Traditional Pickle Masala', src: imageAssets.products.aacharMirchi },
  { name: 'Rai Powder', subtitle: 'Authentic Mustard Blend', src: imageAssets.products.raiPowder },
  { name: 'Rai Dal', subtitle: 'Premium Split Mustard Seeds', src: imageAssets.products.raiDal },
];

const trustBadges = [
  { label: '100% Pure Veg', icon: FiCheckCircle },
  { label: 'FSSAI Certified', icon: FiShield },
  { label: 'Hygienically Packed', icon: FiPackage },
  { label: 'Fast Delivery', icon: FiTruck },
];

const journeySteps = [
  { title: 'Started', description: 'From the first batch of spices sourced directly from trusted farms.', icon: FiClock },
  { title: 'Expanded', description: 'Growing our range to six authentic spice packets for every kitchen.', icon: FiShoppingBag },
  { title: 'Modern Packaging', description: 'Premium, hygienic packs that preserve aroma and quality.', icon: FiPackage },
  { title: 'Online Store', description: 'Bringing Lion Spices to homes with convenient delivery.', icon: FiTruck },
];

const reasons = [
  { title: '100% Pure', description: 'No additives, no artificial colours — just authentic spice goodness in every packet.', icon: FiCheckCircle },
  { title: 'Traditional Recipes', description: 'Crafted to support classic Indian dishes with deep flavour and balanced aroma.', icon: FiStar },
  { title: 'Modern Hygienic Packing', description: 'State-of-the-art packing keeps spices fresh, safe, and ready to use.', icon: FiShield },
  { title: 'Authentic Taste', description: 'Every blend is prepared to reflect the true taste of Indian kitchens.', icon: FiPackage },
];

export default function AboutPage() {
  return (
    <main className="page-shell">
      <section className="container-custom py-4 sm:py-6 lg:py-3">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-5">
          <div className="space-y-5 lg:space-y-3">
            <p className="chip text-primary-red">About Lion Spices</p>
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              30+ years of authentic Indian spice craft.
            </h1>
            <p className="max-w-3xl text-base leading-8 text-gray-600 sm:text-lg">
              For over 30 years, Lion Spices has delivered authentic Indian flavours crafted from carefully sourced ingredients. Every packet reflects our commitment to purity, tradition, and premium quality for kitchens across generations.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/products" className="btn-solid">Shop Products</Link>
              <Link to="/about" className="btn-soft">Our Story</Link>
            </div>
          </div>

          <div className="rounded-[24px] border border-gray-200 bg-white p-4 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.28)] sm:p-5">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {productPackets.map((packet) => (
                <div key={packet.name} className="group rounded-[20px] border border-gray-100 bg-[#fff8f0] p-3 transition-all duration-300 hover:border-primary-red/40 hover:shadow-[0_8px_20px_rgba(236,72,45,0.1)]">
                  <div className="product-image-container rounded-[16px] bg-white p-2 h-auto overflow-hidden">
                      <ImageWithFallback src={packet.src} alt={packet.name} className="product-image transform transition-transform duration-300 group-hover:scale-105" style={{maxHeight: '140px', objectFit: 'contain'}} />
                    </div>
                  <p className="mt-2.5 text-center text-sm font-semibold text-gray-900">{packet.name}</p>
                  <p className="text-center text-xs text-gray-500">{packet.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-custom py-8 lg:py-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
          {trustBadges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div key={badge.label} className="rounded-[20px] border border-gray-200 bg-white p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-red/10 text-primary-red">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="mt-4 text-sm font-semibold text-gray-900">{badge.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container-custom py-8 lg:py-4">
        <div className="mb-6 max-w-2xl lg:mb-3">
          <p className="chip text-primary-red">Our journey</p>
          <h2 className="mt-3 text-3xl font-semibold text-gray-900 sm:text-4xl">A modern spice brand rooted in tradition.</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-4 lg:gap-3">
          {journeySteps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="rounded-[22px] border border-gray-200 bg-white p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-red/10 text-primary-red">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-gray-600">{step.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container-custom py-8 lg:py-4">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 lg:gap-3">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div key={reason.title} className="rounded-[22px] border border-gray-200 bg-white p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-red/10 text-primary-red">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{reason.title}</h3>
                <p className="mt-2 text-sm leading-7 text-gray-600">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="container-custom py-10 sm:py-12 lg:py-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
          <div className="rounded-[22px] border border-stone-200/80 bg-white p-6 shadow-sm text-center">
            <h3 className="text-3xl sm:text-4xl font-semibold text-primary-red">30+</h3>
            <p className="mt-2 text-sm text-gray-600 font-medium">Years of Trust</p>
          </div>
          <div className="rounded-[22px] border border-stone-200/80 bg-white p-6 shadow-sm text-center">
            <h3 className="text-3xl sm:text-4xl font-semibold text-primary-red">10,000+</h3>
            <p className="mt-2 text-sm text-gray-600 font-medium">Happy Customers</p>
          </div>
          <div className="rounded-[22px] border border-stone-200/80 bg-white p-6 shadow-sm text-center">
            <h3 className="text-3xl sm:text-4xl font-semibold text-primary-red">100%</h3>
            <p className="mt-2 text-sm text-gray-600 font-medium">Premium Quality</p>
          </div>
          <div className="rounded-[22px] border border-stone-200/80 bg-white p-6 shadow-sm text-center">
            <h3 className="text-3xl sm:text-4xl font-semibold text-primary-red">6</h3>
            <p className="mt-2 text-sm text-gray-600 font-medium">Signature Products</p>
          </div>
        </div>
      </section>
    </main>
  );
}
