import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { imageAssets } from '../../config/imageAssets';
import ImageWithFallback from '../common/ImageWithFallback';

const storyImage = imageAssets.about.hero;

export default function AboutSection() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleScrollToAbout = () => {
    navigate('/about');
  };

  return (
    <section id="about" className="relative overflow-hidden bg-cream py-12 sm:py-14 lg:py-16">
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-white to-cream-light opacity-80" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:gap-8 lg:grid-cols-[0.55fr_0.45fr] lg:items-center lg:gap-12">
          <div className="mx-auto w-full max-w-[520px] text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-primary-red">Our Story</p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Authentic spices, <span className="text-primary-red">premium presentation</span>
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-700 md:text-[17px] md:leading-8">
              Lion Spices delivers premium Indian masalas infused with tradition, purity, and modern standards. Every packet is made to keep the flavor true and the experience luxurious.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/products"
                className="inline-flex w-full items-center justify-center rounded-full bg-primary-red px-7 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-red-700 sm:w-auto"
              >
                Explore Products
              </Link>
              <button
                type="button"
                onClick={handleScrollToAbout}
                className="inline-flex w-full items-center justify-center rounded-full border border-gray-200 bg-white px-7 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:border-primary-red hover:text-primary-red sm:w-auto"
              >
                Our Story
              </button>
            </div>
          </div>

          <motion.div
            className="rounded-3xl bg-white p-4 shadow-xl ring-1 ring-gray-100 sm:p-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-120px' }}
          >
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-white via-cream-light to-cream p-4">
              <img
                src={storyImage}
                alt="Our story spice visual"
                className="h-full w-full rounded-[28px] object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
