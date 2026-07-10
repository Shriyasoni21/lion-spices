import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiAward, FiShield, FiSmile, FiStar } from 'react-icons/fi';
import HeroSection from '../components/sections/HeroSection';
import RecipeSection from '../components/sections/RecipeSection';

const trustStats = [
  {
    title: 'Years Experience',
    value: '30+',
    icon: FiAward,
    description: 'Decades of expertise in premium spice sourcing.'
  },
  {
    title: 'Happy Customers',
    value: '10000+',
    icon: FiSmile,
    description: 'Trusted by spice lovers across India.'
  },
  {
    title: 'Premium Products',
    value: '5+',
    icon: FiStar,
    description: 'Carefully selected authentic spice products.'
  },
  {
    title: 'Authentic Spices',
    value: '100%',
    icon: FiShield,
    description: 'Pure, natural and sourced directly from trusted farms.'
  }
];

const certifications = [
  'FSSAI Certified',
  'AGMARK Quality',
  'Hygienically Packed',
  'Farm Fresh Ingredients',
  'Premium Quality'
];

const testimonials = [
  { quote: 'Best chilli powder we have used.', name: 'Asha Rao' },
  { quote: 'Authentic taste just like homemade.', name: 'Vikram Singh' },
  { quote: 'Excellent quality and hygienic packing.', name: 'Meera Patel' }
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section className="bg-[#fffaf5] py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-red">Why Trust Lion Spices</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">Built on heritage, trust, and authentic Indian flavors.</h2>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {trustStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.article
                  key={stat.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="flex h-full flex-col rounded-[20px] border border-gray-100 bg-gradient-to-br from-[#fff8ef] to-[#fffdf8] p-5 shadow-[0_16px_35px_-24px_rgba(0,0,0,0.2)] sm:p-6"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-red/10 text-primary-red sm:h-11 sm:w-11">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div className="mt-4 text-2xl font-bold text-primary-red sm:text-3xl">{stat.value}</div>
                  <h3 className="mt-2 text-base font-semibold text-gray-900">{stat.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{stat.description}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-red">Certifications</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">Crafted with quality, care and trust.</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((item, index) => (
              <motion.article
                key={item}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className="rounded-[24px] border border-gray-100 bg-[#fffaf5] p-5 shadow-[0_16px_35px_-24px_rgba(0,0,0,0.2)]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-red/10 text-primary-red">
                    <FiStar className="h-4 w-4" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{item}</h3>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <RecipeSection compact />

      <section className="bg-[#fdf7ed] py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-red">Testimonials</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">Loved by home cooks and spice lovers.</h2>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <motion.article
                key={item.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="rounded-[24px] border border-gray-100 bg-white p-6 shadow-[0_16px_35px_-24px_rgba(0,0,0,0.2)]"
              >
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <FiStar key={starIndex} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-base leading-7 text-gray-700">“{item.quote}”</p>
                <p className="mt-4 font-semibold text-gray-900">{item.name}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-primary-red via-red-600 to-red-700 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 rounded-[32px] border border-white/20 bg-white/10 p-8 text-white shadow-[0_20px_45px_-24px_rgba(0,0,0,0.4)] backdrop-blur-sm sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-100">Bring the kitchen to life</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Bring Authentic Indian Flavours To Your Kitchen</h2>
            </div>
            <Link to="/products" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary-red transition hover:bg-gray-100">Shop Now</Link>
          </div>
        </div>
      </section>
    </>
  );
}
