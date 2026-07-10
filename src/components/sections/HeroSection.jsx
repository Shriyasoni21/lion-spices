import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiStar } from 'react-icons/fi';
import { imageAssets } from '../../config/imageAssets';
import ImageWithFallback from '../common/ImageWithFallback';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#fffaf5] pb-8 pt-20 sm:pb-10 sm:pt-24 lg:pb-12 lg:pt-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(220,38,38,0.08),_transparent_24%),radial-gradient(circle_at_top_right,_rgba(234,179,8,0.08),_transparent_28%)]" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:px-8">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-red/10 px-3 py-1.5 text-xs font-semibold text-primary-red sm:px-4 sm:py-2 sm:text-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary-red" />
            Lion Spices • Premium Quality
          </span>

          <h1 className="mt-4 text-3xl font-extrabold leading-[1.12] text-gray-900 sm:text-4xl lg:text-5xl">
            Pure Indian spices, delivered with <span className="text-primary-red">premium care</span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
            Discover authentic masalas and spice blends crafted from the finest Indian farms, packed hygienically for modern kitchens.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link to="/products" className="inline-flex items-center justify-center rounded-full bg-primary-red px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700">
              Explore Products
              <FiArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link to="/about" className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-primary-red hover:text-primary-red">
              Discover More
            </Link>
          </div>

          <div className="mt-6 rounded-[24px] border border-gray-100 bg-white p-4 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.2)] sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5 text-amber-500">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FiStar key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-gray-500">Customer Rating</p>
                  <p className="text-sm font-semibold text-gray-900">4.9/5</p>
                </div>
              </div>
              <div className="rounded-full bg-primary-red/10 px-3 py-1 text-xs font-semibold text-primary-red">Trusted by kitchens</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          <div className="w-full max-w-[340px] rounded-[32px] border border-gray-100 bg-white p-3 shadow-[0_25px_60px_-25px_rgba(15,23,42,0.25)] sm:max-w-[420px] sm:p-5 lg:p-6">
            <div className="flex items-center justify-center rounded-[24px] bg-white p-3 sm:p-6">
              <ImageWithFallback
                src={imageAssets.products.redChilliPowder}
                alt="Lion Spices Red Chilli Powder packet"
                loading="eager"
                className="h-[250px] w-full max-w-[280px] object-contain object-center drop-shadow-[0_18px_36px_rgba(15,23,42,0.16)] transition duration-500 hover:-translate-y-1 hover:scale-[1.02] sm:h-[320px] sm:max-w-[320px] lg:h-[380px] lg:max-w-[320px]"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
