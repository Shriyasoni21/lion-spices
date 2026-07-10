import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { trustBadges } from '../../data/productData';
import { imageAssets } from '../../config/imageAssets';
import ImageWithFallback from '../common/ImageWithFallback';

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(252,211,77,0.12),_transparent_22%),radial-gradient(circle_at_top_right,_rgba(239,68,68,0.06),_transparent_20%),linear-gradient(180deg,#fffdf8_0%,#fff3e8_100%)] pb-5 pt-[20px] sm:pb-8 sm:pt-[24px] lg:min-h-[82vh] lg:pb-6 lg:pt-[108px]">
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#fde8d9] via-transparent to-transparent opacity-60 pointer-events-none sm:h-24" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8%] top-16 h-64 w-64 rounded-full bg-[#fef3c7]/30 blur-3xl" />
        <div className="absolute right-[-10%] top-24 h-80 w-80 rounded-full bg-[#fee2e2]/20 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fff7ed]/40 blur-2xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <motion.div
            className="space-y-3 sm:space-y-5 lg:space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              className="mb-0 inline-flex items-center gap-2 rounded-full bg-primary-red/10 px-3 py-1.5 text-xs font-semibold text-primary-red sm:px-4 sm:py-2 sm:text-sm"
              variants={itemVariants}
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary-red"></span>
              Lion Spices • Premium Quality
            </motion.span>

            <motion.h1
              className="text-2xl font-extrabold leading-[1.15] text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl"
              variants={itemVariants}
            >
              Pure Indian spices, delivered with
              <span className="block text-primary-red sm:inline"> premium care</span>
            </motion.h1>

            <motion.p
              className="text-[15px] leading-[1.6] text-gray-600 sm:text-lg"
              variants={itemVariants}
            >
              Lion Spices brings you authentic masalas and spice blends crafted from the finest Indian farms, packed hygienically for modern kitchens.
            </motion.p>

            <motion.div className="w-full pt-1 flex flex-col gap-3 sm:flex-row sm:items-center" variants={itemVariants}>
              <Link to="/products" className="btn-primary w-full h-[48px] justify-center rounded-[14px] text-base sm:w-1/2">
                Explore Products
                <FiArrowRight className="h-5 w-5 ml-2" />
              </Link>

              <Link to="/#shop" className="btn-outline w-full h-[48px] justify-center rounded-[14px] text-base sm:w-1/2">
                Discover More
              </Link>
            </motion.div>

            <motion.div
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm sm:rounded-[20px] sm:px-4 sm:py-3 md:rounded-[28px] md:px-5 md:py-4"
              variants={itemVariants}
            >
              <div className="flex flex-col gap-2 sm:gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg text-turmeric sm:text-xl md:text-2xl">★★★★★</span>
                  <div>
                    <p className="text-[0.6rem] uppercase tracking-[0.24em] text-gray-500">Customer Rating</p>
                    <p className="text-sm font-semibold text-gray-900 sm:text-base">4.9/5</p>
                  </div>
                </div>
                <div className="rounded-full bg-red-50 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-primary-red sm:px-3">
                  Premium Quality
                </div>
              </div>

              <div className="mt-2 grid grid-cols-2 gap-1 text-xs text-gray-700 sm:flex sm:flex-wrap sm:gap-2 sm:text-sm">
                {trustBadges.slice(0, 4).map((badge) => (
                  <span
                    key={badge.id}
                    className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-2 py-1 shadow-sm sm:px-3 sm:py-2"
                  >
                    <span className="text-primary-red">✓</span>
                    <span className="hidden sm:inline">{badge.text}</span>
                    <span className="sm:hidden">{badge.text.split(' ').slice(0, 2).join(' ')}</span>
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
