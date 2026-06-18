import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiStar } from 'react-icons/fi';
import { trustBadges } from '../../data/productData';
import { imageAssets } from '../../config/imageAssets';

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
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(252,211,77,0.12),_transparent_22%),radial-gradient(circle_at_top_right,_rgba(239,68,68,0.06),_transparent_20%),linear-gradient(180deg,#fffdf8_0%,#fff3e8_100%)] pt-[30px] pb-[30px] lg:min-h-[85vh]">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#fde8d9] via-transparent to-transparent opacity-60 pointer-events-none" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8%] top-16 h-64 w-64 rounded-full bg-[#fef3c7]/30 blur-3xl" />
        <div className="absolute right-[-10%] top-24 h-80 w-80 rounded-full bg-[#fee2e2]/20 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fff7ed]/40 blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid min-h-[85vh] grid-cols-1 gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
          {/* Left Content */}
          <motion.div
            className="space-y-6 lg:max-w-2xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              className="inline-flex items-center gap-2 rounded-full bg-primary-red/10 text-primary-red px-4 py-2 text-sm font-semibold"
              variants={itemVariants}
            >
              <span className="w-2 h-2 rounded-full bg-primary-red animate-pulse"></span>
              Lion Spices • Premium Quality
            </motion.span>

            <motion.h1
              className="text-4xl font-extrabold text-gray-900 leading-tight sm:text-5xl lg:text-[3.75rem] lg:leading-[1.05]"
              variants={itemVariants}
            >
              Pure Indian spices, delivered with <span className="text-primary-red">premium care</span>
            </motion.h1>

            <motion.p
              className="text-gray-600 max-w-lg text-base leading-relaxed sm:text-lg"
              variants={itemVariants}
            >
              Lion Spices brings you authentic masalas and spice blends crafted from the finest Indian farms, packed hygienically for modern kitchens.
            </motion.p>

            <motion.div
              className="flex flex-col gap-4 sm:flex-row sm:flex-wrap"
              variants={itemVariants}
            >
              <Link to="/products" className="btn-primary w-full sm:w-auto justify-center">
                Shop Best Sellers
                <FiArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/#about" className="btn-outline w-full sm:w-auto justify-center">
                Discover More
              </Link>
            </motion.div>

            <motion.div
              className="rounded-[32px] border border-gray-200 bg-white px-6 py-5 shadow-[0_24px_80px_-50px_rgba(15,23,42,0.18)]"
              variants={itemVariants}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl text-turmeric">★★★★★</span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Customer Rating</p>
                    <p className="mt-1 text-lg font-semibold text-gray-900">4.9/5</p>
                  </div>
                </div>
                <div className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary-red">
                  Premium Quality
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3 text-sm text-gray-700 sm:flex-row sm:flex-wrap sm:items-center">
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

          {/* Right - Image Section */}
          <motion.div
            className="relative overflow-hidden rounded-[40px] border border-gray-100 bg-white shadow-[0_32px_70px_-30px_rgba(15,23,42,0.18)] self-start"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.2 }}
          >
            <div className="px-3 py-3 sm:px-5 lg:px-6 lg:py-4">
              <div className="relative mx-auto flex h-[300px] w-full max-w-[280px] items-center justify-center overflow-hidden rounded-[32px] border border-gray-200 bg-gradient-to-br from-red-50 via-white to-yellow-50 shadow-inner lg:h-[380px] lg:max-w-[460px]">
                <motion.img
                  src={imageAssets.hero.background}
                  alt="Lion Spices Red Chilli Powder packet"
                  loading="lazy"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="h-[92%] w-auto max-w-full object-contain object-center lg:h-[95%]"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
