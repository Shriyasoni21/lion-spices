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
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(252,211,77,0.12),_transparent_22%),radial-gradient(circle_at_top_right,_rgba(239,68,68,0.06),_transparent_20%),linear-gradient(180deg,#fffdf8_0%,#fff3e8_100%)] pb-8 pt-[78px] sm:pb-10 sm:pt-[92px] lg:min-h-[82vh] lg:pb-[24px] lg:pt-[108px]">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#fde8d9] via-transparent to-transparent opacity-60 pointer-events-none" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8%] top-16 h-64 w-64 rounded-full bg-[#fef3c7]/30 blur-3xl" />
        <div className="absolute right-[-10%] top-24 h-80 w-80 rounded-full bg-[#fee2e2]/20 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fff7ed]/40 blur-2xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:gap-8 lg:min-h-[85vh] lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
          <motion.div
            className="space-y-4 lg:max-w-2xl lg:space-y-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              className="mb-1 inline-flex items-center gap-2 rounded-full bg-primary-red/10 px-3 py-2 text-sm font-semibold text-primary-red sm:px-4"
              variants={itemVariants}
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary-red"></span>
              Lion Spices • Premium Quality
            </motion.span>

            <motion.h1
              className="text-[1.8rem] font-extrabold leading-[1.05] text-gray-900 sm:text-4xl md:text-5xl lg:text-[3.6rem] lg:leading-[1.05]"
              variants={itemVariants}
            >
              Pure Indian spices, delivered with
              <span className="block text-primary-red sm:inline"> premium care</span>
            </motion.h1>

            <motion.p
              className="max-w-full text-[0.94rem] leading-relaxed text-gray-600 sm:max-w-lg sm:text-lg"
              variants={itemVariants}
            >
              Lion Spices brings you authentic masalas and spice blends crafted from the finest Indian farms, packed hygienically for modern kitchens.
            </motion.p>

            <motion.div className="w-full" variants={itemVariants}>
              <Link to="/products" className="btn-primary w-full min-h-[52px] justify-center sm:w-auto sm:min-h-auto">
                Explore Products
                <FiArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>

            <motion.div
              className="rounded-[20px] border border-gray-200 bg-white px-3 py-3 shadow-[0_24px_80px_-50px_rgba(15,23,42,0.18)] sm:rounded-[28px] sm:px-5 sm:py-4"
              variants={itemVariants}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl text-turmeric sm:text-2xl">★★★★★</span>
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.24em] text-gray-500">Customer Rating</p>
                    <p className="mt-1 text-base font-semibold text-gray-900">4.9/5</p>
                  </div>
                </div>
                <div className="rounded-full bg-red-50 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary-red">
                  Premium Quality
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2 text-sm text-gray-700 sm:flex-row sm:flex-wrap sm:items-center">
                {trustBadges.map((badge) => (
                  <span
                    key={badge.id}
                    className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-2 shadow-sm"
                  >
                    <span className="text-primary-red">✓</span>
                    {badge.text}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative overflow-hidden rounded-[24px] border border-gray-100 bg-white shadow-[0_32px_70px_-30px_rgba(15,23,42,0.18)] self-start sm:rounded-[40px] lg:order-2"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.2 }}
          >
            <div className="px-3 py-3 sm:px-5 lg:px-6 lg:py-4">
              <div className="relative mx-auto flex h-[240px] w-full max-w-[85%] items-center justify-center overflow-hidden rounded-[24px] border border-gray-200 bg-gradient-to-br from-red-50 via-white to-yellow-50 shadow-lg sm:h-[280px] sm:max-w-[320px] lg:h-[380px] lg:max-w-[460px] lg:rounded-[32px]">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ImageWithFallback
                    src={imageAssets.hero.background}
                    alt="Lion Spices Red Chilli Powder packet"
                    loading="eager"
                    fetchPriority="high"
                    className="h-[92%] w-auto max-w-full object-contain object-center lg:h-[95%]"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
