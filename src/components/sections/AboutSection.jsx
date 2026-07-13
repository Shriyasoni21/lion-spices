import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { imageAssets } from '../../config/imageAssets';
import ImageWithFallback from '../common/ImageWithFallback';

const categoryProducts = [
  { name: 'Chilli Powder', image: imageAssets.products.redChilliPowder },
  { name: 'Turmeric Powder', image: imageAssets.products.turmericPowder },
  { name: 'Coriander Powder', image: imageAssets.products.corianderPowder },
  { name: 'Rai Powder', image: imageAssets.products.raiPowder },
  { name: 'Rai Dal', image: imageAssets.products.raiDal },
  { name: 'Achar Mirchi', image: imageAssets.products.aacharMirchi },
];

const stats = [
  { title: '4.9 Rating', subtitle: 'Premium trust score' },
  { title: '10,000+ Customers', subtitle: 'Loved by kitchens' },
  { title: '30+ Years', subtitle: 'Spice heritage' },
  { title: '100% Pure Veg', subtitle: 'Clean, safe ingredients' },
];

export default function AboutSection() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleScrollToAbout = () => {
    navigate('/about');
  };

  return (
    <section id="about" className="relative overflow-hidden bg-cream py-20 sm:py-24 lg:py-28">
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white to-cream-light opacity-80" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:gap-8 lg:grid-cols-[0.6fr_0.4fr] lg:items-center lg:gap-16">
          <div className="mx-auto w-full max-w-[550px] text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-primary-red">Our Story</p>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Authentic spices, <span className="text-primary-red">premium presentation</span>
            </h2>
            <p className="mt-6 text-[16px] leading-7 text-gray-700 md:text-[18px] md:leading-8">
              Lion Spices delivers premium Indian masalas with a taste of tradition, purity, and modern quality standards. Every packet is crafted to keep the flavor true, the ingredients clean, and the experience luxurious.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/products"
                className="inline-flex w-full items-center justify-center rounded-full bg-primary-red px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-red-700 sm:w-auto"
              >
                Explore Products
              </Link>
              <button
                type="button"
                onClick={handleScrollToAbout}
                className="inline-flex w-full items-center justify-center rounded-full border border-gray-200 bg-white px-7 py-3.5 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:border-primary-red hover:text-primary-red sm:w-auto"
              >
                Our Story
              </button>
            </div>
          </div>

          <motion.div
            className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-gray-100 sm:p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-120px' }}
          >
            <div className="relative mx-auto h-[420px] max-w-[520px] overflow-hidden rounded-[32px] bg-gradient-to-br from-white via-cream-light to-cream p-6 sm:h-[480px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(249,208,108,0.18),_transparent_50%)]" />

              <div className="relative h-full w-full">
                <motion.div
                  className="absolute left-1/2 top-1/2 h-64 w-40 -translate-x-1/2 -translate-y-1/2"
                  whileHover={{ scale: 1.05, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative h-full w-full rounded-[28px] bg-white p-3 shadow-2xl">
                    <ImageWithFallback
                      src={categoryProducts[1].image}
                      alt={categoryProducts[1].name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="absolute left-14 top-10 h-48 w-32 rounded-[26px] bg-white p-3 shadow-lg"
                  whileHover={{ scale: 1.05, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <ImageWithFallback
                    src={categoryProducts[0].image}
                    alt={categoryProducts[0].name}
                    className="h-full w-full object-contain"
                  />
                </motion.div>

                <motion.div
                  className="absolute right-14 top-12 h-48 w-32 rounded-[26px] bg-white p-3 shadow-lg"
                  whileHover={{ scale: 1.05, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <ImageWithFallback
                    src={categoryProducts[2].image}
                    alt={categoryProducts[2].name}
                    className="h-full w-full object-contain"
                  />
                </motion.div>

                <motion.div
                  className="absolute left-8 bottom-12 h-44 w-28 rounded-[26px] bg-white p-3 shadow-lg"
                  whileHover={{ scale: 1.05, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <ImageWithFallback
                    src={categoryProducts[3].image}
                    alt={categoryProducts[3].name}
                    className="h-full w-full object-contain"
                  />
                </motion.div>

                <motion.div
                  className="absolute right-8 bottom-16 h-44 w-28 rounded-[26px] bg-white p-3 shadow-lg"
                  whileHover={{ scale: 1.05, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <ImageWithFallback
                    src={categoryProducts[4].image}
                    alt={categoryProducts[4].name}
                    className="h-full w-full object-contain"
                  />
                </motion.div>

                <motion.div
                  className="absolute left-1/2 top-0 h-44 w-28 -translate-x-1/2 rounded-[26px] bg-white p-3 shadow-lg"
                  whileHover={{ scale: 1.05, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <ImageWithFallback
                    src={categoryProducts[5].image}
                    alt={categoryProducts[5].name}
                    className="h-full w-full object-contain"
                  />
                </motion.div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <motion.div
                  key={stat.title}
                  className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  whileHover={{ y: -4 }}
                >
                  <p className="text-xl font-semibold text-gray-900">{stat.title}</p>
                  <p className="mt-2 text-sm text-gray-500">{stat.subtitle}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
