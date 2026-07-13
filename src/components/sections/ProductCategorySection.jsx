import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { imageAssets } from '../../config/imageAssets';

const featuredCategories = [
  {
    name: 'Chilli Powders',
    description: 'Premium red chilli powder and achar mirchi.',
    image: imageAssets.products.redChilliPowder,
  },
  {
    name: 'Pure Veg Masalas',
    description: 'Turmeric, coriander, rai powder and rai dal.',
    image: imageAssets.products.turmericPowder,
  },
];

const ProductCategorySection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="subheading text-primary-red mb-4">Our Collections</p>
          <h2 className="section-heading mb-4">
            Explore Our <span className="text-primary-red">Premium Categories</span>
          </h2>
          <p className="section-copy mx-auto max-w-2xl">
            Discover our carefully curated selection of authentic Indian spices organized by type.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {featuredCategories.map((category, idx) => (
            <motion.div
              key={category.name}
              variants={itemVariants}
              className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-gray-100 bg-cream p-5 shadow-[0_12px_35px_-20px_rgba(15,23,42,0.12)] transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_24px_80px_-35px_rgba(15,23,42,0.18)]"
            >
              <div className="flex h-[18rem] items-center justify-center rounded-[24px] bg-white p-6 shadow-sm md:h-[20rem]">
                <img
                  src={category.image}
                  alt={category.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="mt-6 flex flex-1 flex-col items-start justify-center gap-4 text-left">
                <h3 className="text-2xl font-semibold text-gray-900">{category.name}</h3>
                <p className="text-[15px] leading-7 text-gray-600">{category.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-8 flex justify-center">
          <Link
            to="/products"
            className="inline-flex items-center justify-center rounded-full bg-primary-red px-8 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_-20px_rgba(220,38,38,0.8)] transition duration-300 hover:bg-red-700"
          >
            Explore →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductCategorySection;
