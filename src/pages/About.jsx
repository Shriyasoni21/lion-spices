import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiShield, FiPackage, FiStar, FiTruck, FiClock, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { imageAssets } from '../config/imageAssets';
import ImageWithFallback from '../components/common/ImageWithFallback';

const productPackets = [
  { name: 'Red Chilli Powder', src: imageAssets.products.redChilliPowder },
  { name: 'Turmeric Powder', src: imageAssets.products.turmericPowder },
  { name: 'Coriander Powder', src: imageAssets.products.corianderPowder },
  { name: 'Aachar Mirchi', src: imageAssets.products.aacharMirchi },
  { name: 'Rai Powder', src: imageAssets.products.raiPowder },
  { name: 'Rai Dal', src: imageAssets.products.raiDal },
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
  {
    title: '100% Pure',
    description: 'No additives, no artificial colours — just authentic spice goodness in every packet.',
    icon: FiCheckCircle,
  },
  {
    title: 'Traditional Recipes',
    description: 'Crafted to support classic Indian dishes with deep flavour and balanced aroma.',
    icon: FiStar,
  },
  {
    title: 'Modern Hygienic Packing',
    description: 'State-of-the-art packing keeps spices fresh, safe, and ready to use.',
    icon: FiShield,
  },
  {
    title: 'Authentic Taste',
    description: 'Every blend is prepared to reflect the true taste of Indian kitchens.',
    icon: FiPackage,
  },
];

export default function AboutPage() {
  return (
    <main className="bg-gradient-to-b from-cream via-[#fff7ed] to-white pb-16 pt-[56px] sm:pt-[64px] lg:pt-[66px] text-gray-900">
      <section className="container-custom pt-6 pb-10 sm:pt-8 sm:pb-12 lg:pt-8 lg:pb-12">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-120px' }}
          >
            <div className="inline-flex rounded-full bg-primary-red/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.26em] text-primary-red shadow-sm shadow-primary-red/10">
              About Lion Spices
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              30+ Years of Authentic Indian Spices
            </h1>
            <p className="max-w-3xl text-base leading-8 text-gray-600 sm:text-lg lg:text-xl">
              Lion Spices brings together generations of Indian spice expertise with modern hygiene and premium presentation. Our range delivers consistent aroma, natural purity, and rich flavour for every kitchen.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-full bg-primary-red px-7 py-3.5 text-sm font-semibold text-white shadow-[0_18px_50px_-30px_rgba(220,38,38,0.8)] transition duration-300 hover:bg-red-700"
              >
                Explore Products
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-7 py-3.5 text-sm font-semibold text-gray-700 shadow-sm transition duration-300 hover:border-primary-red hover:text-primary-red"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="relative overflow-hidden rounded-[32px] border border-gray-100 bg-white p-5 shadow-[0_40px_120px_-50px_rgba(15,23,42,0.18)] sm:p-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true, margin: '-120px' }}
          >
            <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-gradient-to-br from-primary-red/5 via-transparent to-transparent" />
            <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {productPackets.map((packet, index) => (
                <motion.div
                  key={packet.name}
                  className="relative overflow-hidden rounded-[28px] border border-gray-100 bg-[#fff8f0] p-4 shadow-[0_20px_60px_-40px_rgba(209,81,7,0.25)]"
                  initial={{ y: index % 2 === 0 ? 20 : -20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.05 * index }}
                  viewport={{ once: true }}
                >
                  <div className="flex h-36 items-center justify-center rounded-[24px] bg-white p-3 shadow-sm">
                    <ImageWithFallback
                      src={packet.src}
                      alt={packet.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <p className="mt-4 text-center text-sm font-semibold text-gray-900">{packet.name}</p>
                </motion.div>
              ))}
            </div>
            <motion.div
              className="absolute -right-10 top-6 h-24 w-24 rounded-full bg-primary-red/10 blur-3xl"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute left-4 bottom-8 h-24 w-24 rounded-full bg-turmeric/10 blur-3xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>
      </section>

      <section className="container-custom mt-10 rounded-[32px] border border-gray-100 bg-white/80 p-6 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.12)] sm:p-8 lg:mt-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustBadges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div key={badge.label} className="flex items-start gap-4 rounded-3xl bg-cream p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-red/10 text-primary-red shadow-sm">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{badge.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container-custom mt-14 py-10 lg:mt-16 lg:py-14">
        <div className="mb-8 text-center sm:mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-red">Our Journey</p>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">A modern spice brand rooted in tradition</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
            From the first batch of spices sourced directly from farms to premium packaging and fast delivery, our journey reflects trust, quality, and authenticity.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-10 h-px w-full bg-primary-red/20" />
          <div className="relative grid gap-6 lg:grid-cols-4 lg:items-start">
            {journeySteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  className="relative rounded-[30px] border border-gray-100 bg-white p-6 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.16)] lg:text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute left-0 top-10 hidden h-3 w-3 -translate-x-1/2 rounded-full bg-primary-red shadow-lg lg:block" />
                  <div className="flex items-center gap-3 lg:justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-primary-red/10 text-primary-red shadow-sm">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="lg:text-center">
                      <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-gray-600">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-custom mt-10 rounded-[32px] border border-gray-100 bg-white/90 p-6 shadow-[0_30px_100px_-55px_rgba(15,23,42,0.18)] sm:p-8 lg:mt-16">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-red">Why Choose Us</p>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">Premium qualities every spice lover can trust</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                className="overflow-hidden rounded-[32px] border border-gray-100 bg-cream p-6 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.12)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_90px_-30px_rgba(15,23,42,0.18)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary-red/10 text-primary-red shadow-sm">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="mt-4 flex h-[calc(100%-6rem)] flex-col justify-center">
                  <h3 className="text-xl font-semibold text-gray-900">{reason.title}</h3>
                  <p className="mt-4 text-[15px] leading-7 text-gray-600">{reason.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
