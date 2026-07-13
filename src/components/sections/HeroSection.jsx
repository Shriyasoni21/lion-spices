import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiAward, FiShield, FiStar, FiTruck } from 'react-icons/fi';
import { imageAssets } from '../../config/imageAssets';
import ImageWithFallback from '../common/ImageWithFallback';

const trustItems = [
  { icon: FiStar, label: '4.9 Customer Rating' },
  { icon: FiShield, label: '100% Pure Veg' },
  { icon: FiTruck, label: 'Fast Delivery' },
  { icon: FiAward, label: '30+ Years Trust' }
];

const heroPackets = [
  imageAssets.products.redChilliPowder,
  imageAssets.products.turmericPowder,
  imageAssets.products.corianderPowder,
  imageAssets.products.raiPowder
];

const packetStyles = [
  { left: '14%', top: '20%', rotation: '-5deg', visible: 'block' },
  { left: '32%', top: '24%', rotation: '-2deg', visible: 'block' },
  { left: '52%', top: '18%', rotation: '3deg', visible: 'sm:block hidden' },
  { left: '72%', top: '26%', rotation: '5deg', visible: 'lg:block hidden' }
];

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cream via-[#fff4e0] to-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-12 h-52 w-52 rounded-full bg-primary-red/10 blur-3xl" />
        <div className="absolute right-0 top-20 h-48 w-48 rounded-full bg-saffron/10 blur-3xl" />
        <div className="absolute right-10 bottom-10 h-44 w-44 rounded-full bg-primary-red/5 blur-3xl" />
        <div className="absolute left-1/4 bottom-20 h-40 w-40 rounded-full bg-[#fff6ea]/80 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-red/15 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary-red shadow-sm backdrop-blur-sm">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-primary-red" />
            Lion Spices • Premium Quality
          </span>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Rediscover Indian spices with <span className="text-primary-red">luxury kitchen flavor</span>
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
            Handpicked spice blends crafted from authentic farms, packed with care and delivered to modern kitchens that value purity, aroma, and elegance.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link to="/products" className="inline-flex items-center justify-center rounded-full bg-primary-red px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-red/20 transition hover:bg-red-700">
              Shop Premium Spices
              <FiArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link to="/about" className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-primary-red hover:text-primary-red">
              Our Story
            </Link>
          </div>

          <div className="mt-8 grid gap-3 rounded-[28px] bg-white/95 p-4 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.2)] sm:p-5">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-3 rounded-2xl bg-[#fff7ef] px-4 py-3 text-sm text-gray-700 shadow-sm">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-red/10 text-primary-red shadow-sm">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-semibold">{item.label}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-[540px]"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="relative mx-auto h-[320px] w-full max-w-[460px] overflow-visible sm:h-[380px] lg:h-[460px]">
            <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-primary-red/10 via-[#fff4e0] to-transparent" />
            {heroPackets.map((src, idx) => (
              <motion.div
                key={src}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: idx * 0.16 }}
                className={`absolute ${packetStyles[idx].visible} h-52 w-40 rounded-[28px] border border-gray-100 bg-white shadow-[0_22px_50px_-26px_rgba(15,23,42,0.2)] overflow-hidden sm:h-56 sm:w-44 lg:h-64 lg:w-48`}
                style={{
                  left: packetStyles[idx].left,
                  top: packetStyles[idx].top,
                  transform: `translate(-50%, -50%) rotate(${packetStyles[idx].rotation})`
                }}
              >
                <ImageWithFallback
                  src={src}
                  alt="Lion Spices packet"
                  className="h-full w-full object-cover object-top"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
          <div className="absolute inset-x-0 bottom-0 mx-auto mb-4 h-20 w-2/3 rounded-full bg-gradient-to-t from-primary-red/15 to-transparent blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
