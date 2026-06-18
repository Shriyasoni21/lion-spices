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

  const floatingSpices = [
    { id: 1, delay: 0, rotation: -10 },
    { id: 2, delay: 0.5, rotation: 10 },
    { id: 3, delay: 1, rotation: -5 }
  ];

  return (
    <section className="bg-gradient-to-b from-white via-cream to-cream pt-24 pb-12 md:pt-28 md:pb-16 lg:pt-32 lg:pb-24 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingSpices.map((spice) => (
          <motion.div
            key={spice.id}
            className="absolute text-5xl opacity-10 md:text-6xl"
            animate={{ y: [0, -20, 0], rotate: [0, 20, 0] }}
            transition={{ duration: 6, delay: spice.delay, repeat: Infinity }}
            style={{ top: `${18 + spice.id * 18}%`, right: `${6 + spice.id * 12}%` }}
          >
            ✦
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-6"
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
              className="text-4xl font-extrabold text-gray-900 leading-tight sm:text-5xl lg:text-6xl"
              variants={itemVariants}
            >
              Pure Indian spices, delivered with <span className="text-primary-red">premium care</span>
            </motion.h1>

            <motion.p
              className="text-gray-600 max-w-2xl text-base leading-relaxed sm:text-lg"
              variants={itemVariants}
            >
              Lion Spices brings you authentic masalas and spice blends crafted from the finest Indian farms, packed hygienically for modern kitchens.
            </motion.p>

            <motion.div
              className="flex flex-col gap-4 sm:flex-row sm:flex-wrap"
              variants={itemVariants}
            >
              <Link
                to="/products"
                className="btn-primary w-full sm:w-auto justify-center"
              >
                Shop Best Sellers
                <FiArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/#about"
                className="btn-outline w-full sm:w-auto justify-center"
              >
                Discover More
              </Link>
            </motion.div>

            <motion.div
              className="grid gap-3 pt-6 sm:grid-cols-2"
              variants={itemVariants}
            >
              <div className="rounded-3xl border border-gray-200 bg-white px-4 py-4 text-center shadow-sm">
                <div className="text-2xl text-turmeric">★★★★★</div>
                <div className="mt-2 text-sm font-semibold text-gray-900">4.9/5 customer rating</div>
                <div className="text-xs text-gray-500">2,847 reviews</div>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {trustBadges.slice(0, 4).map((badge) => (
                  <div key={badge.id} className="rounded-3xl border border-gray-200 bg-white px-3 py-3 text-center text-xs font-semibold text-gray-700 shadow-sm">
                    <span className="block text-lg" style={{ color: badge.color }}>
                      {badge.icon}
                    </span>
                    {badge.text}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Image Section */}
          <motion.div
            className="relative overflow-hidden rounded-[34px] border border-gray-100 bg-white shadow-[0_28px_60px_-30px_rgba(0,0,0,0.3)]"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.2 }}
          >
            <div className="relative min-h-[360px] sm:min-h-[420px] bg-gradient-to-br from-red-50 via-white to-yellow-50 flex items-center justify-center px-6 py-6">
              <div className="absolute inset-8 rounded-[36px] bg-gradient-radial-saffron/15 blur-3xl" />
              <div className="relative z-10 flex h-full w-full items-center justify-center">
                <img
                  src={imageAssets.hero.background}
                  alt="Lion Spices Red Chilli Powder packet"
                  className="h-full max-h-[88%] w-auto object-contain"
                />
              </div>
            </div>

            <div className="relative bottom-0 mx-auto w-full max-w-3xl px-4 pb-6 sm:px-6">
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { name: 'Red Chilli Powder', img: imageAssets.products.redChilliPowder },
                  { name: 'Turmeric Powder', img: imageAssets.products.turmericPowder }
                ].map((product, idx) => (
                  <motion.div
                    key={idx}
                    className="rounded-[28px] bg-white p-5 shadow-[0_18px_30px_-18px_rgba(0,0,0,0.18)] border border-gray-100 transition-all hover:-translate-y-1 hover:shadow-[0_22px_40px_-20px_rgba(0,0,0,0.22)]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                  >
                    <div className="flex items-center justify-center">
                      <img
                        src={product.img}
                        alt={product.name}
                        className="h-20 object-contain"
                      />
                    </div>
                    <h4 className="mt-4 text-sm font-semibold text-gray-900 text-center">
                      {product.name}
                    </h4>
                    <p className="mt-1 text-xs text-gray-500 text-center">Premium quality</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
