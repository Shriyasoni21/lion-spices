import React from 'react';
import { Link } from 'react-router-dom';
import { imageAssets } from '../../config/imageAssets';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.12),transparent_42%),#fff7ed] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.08),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.08),transparent_35%)] opacity-30" />
      <div className="relative z-10 container-custom">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
          <div className="max-w-2xl">
            <p className="chip text-primary-red">Lion Spices • Premium Quality</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Refined Indian spices for elevated cooking and elegant flavour.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
              Crafted from heritage ingredients and curated for modern kitchens that value purity and premium taste.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link to="/products" className="btn-solid">Shop Products</Link>
              <Link to="/about" className="btn-soft">Our Story</Link>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[440px]">
            <div className="rounded-[34px] border border-stone-200/80 bg-white/70 p-3 shadow-[0_20px_45px_rgba(80,45,15,0.08)] sm:p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { name: 'Red Chilli Powder', image: imageAssets.products.redChilliPowder },
                  { name: 'Turmeric Powder', image: imageAssets.products.turmericPowder },
                  { name: 'Coriander Powder', image: imageAssets.products.corianderPowder },
                  { name: 'Rai Powder', image: imageAssets.products.raiPowder },
                ].map((product) => (
                  <div
                    key={product.name}
                    className="group flex min-h-[188px] flex-col items-center justify-center rounded-[26px] border border-stone-200/80 bg-[#f8efe3] p-3 text-center shadow-[0_8px_20px_rgba(80,45,15,0.05)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_16px_30px_rgba(80,45,15,0.12)]"
                  >
                    <div className="flex h-28 w-full max-w-[120px] items-center justify-center rounded-[20px] bg-white/70 p-3">
                      <img src={product.image} alt={product.name} className="h-24 w-24 object-contain sm:h-28 sm:w-28" />
                    </div>
                    <p className="mt-3 text-[13px] font-medium leading-5 tracking-[0.02em] text-stone-800 sm:text-[14px]">
                      {product.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
