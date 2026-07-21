import React from 'react';
import { Link } from 'react-router-dom';
import { FiAward, FiShield, FiStar, FiTruck } from 'react-icons/fi';
import { imageAssets } from '../../config/imageAssets';
import ImageWithFallback from '../common/ImageWithFallback';

const trustItems = [
  { icon: FiStar, label: '4.9 Customer Rating' },
  { icon: FiShield, label: '100% Pure Veg' },
  { icon: FiTruck, label: 'Fast Delivery' },
  { icon: FiAward, label: '30+ Years Trust' },
];

const heroImages = [imageAssets.products.redChilliPowder, imageAssets.products.turmericPowder, imageAssets.products.corianderPowder];

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#fff7ed_0%,#fffdf9_100%)] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.08),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.1),transparent_35%)]" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <div className="max-w-2xl">
          <p className="chip text-primary-red">Lion Spices • Premium Quality</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Rediscover authentic Indian spices with calm, modern flavor.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-gray-600">
            Handpicked spice blends from trusted farms, packed with care and delivered to modern kitchens that value purity, aroma, and elegance.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link to="/products" className="btn-solid">Shop premium spices</Link>
            <Link to="/about" className="btn-soft">Our story</Link>
          </div>

          <div className="mt-8 grid gap-3 rounded-[24px] border border-gray-200 bg-white p-4 sm:grid-cols-2 sm:p-5">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-3 rounded-2xl bg-[#fff7ef] px-4 py-3 text-sm text-gray-700">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-red/10 text-primary-red">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-semibold">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-[28px] border border-gray-200 bg-white p-3 shadow-[0_12px_35px_-20px_rgba(15,23,42,0.24)] sm:p-4">
          <div className="grid gap-3 md:grid-cols-[1.1fr_0.9fr]">
            <div className="overflow-hidden rounded-[24px] bg-[#fff7ef] p-4">
              <ImageWithFallback src={heroImages[0]} alt="Red Chilli Powder" className="h-full min-h-[260px] w-full object-contain" loading="eager" />
            </div>
            <div className="grid gap-3">
              <div className="overflow-hidden rounded-[24px] bg-[#fff7ef] p-3">
                <ImageWithFallback src={heroImages[1]} alt="Turmeric Powder" className="h-[140px] w-full object-contain" loading="eager" />
              </div>
              <div className="overflow-hidden rounded-[24px] bg-[#fff7ef] p-3">
                <ImageWithFallback src={heroImages[2]} alt="Coriander Powder" className="h-[140px] w-full object-contain" loading="eager" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
