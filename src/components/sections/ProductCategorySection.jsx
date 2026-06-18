import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { categories } from '../../data/productData';

const MotionLink = motion(Link);

const ProductCategorySection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="section-padding-lg bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-turmeric/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-red/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container-custom relative z-10">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="subheading text-primary-red mb-4">Our Collections</p>
          <h2 className="section-heading mb-6">
            Explore Our <span className="text-primary-red">Premium Categories</span>
          </h2>
          <p className="section-copy mx-auto max-w-2xl">
            Discover our carefully curated selection of authentic Indian spices organized by type.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {categories.map((category, idx) => (
            <MotionLink
              key={category.id}
              to={`/products?category=${category.slug}`}
              className="group card-equal overflow-hidden transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_25px_65px_-35px_rgba(15,23,42,0.18)] h-full"
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              <div className="relative card-image-hero overflow-hidden bg-white p-4">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                <div className="absolute top-4 right-4 rounded-full bg-primary-red px-3 py-1 text-xs font-bold text-white shadow-lg">
                  {category.count} Products
                </div>
              </div>

              <div className="flex h-full flex-col justify-between p-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{category.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{category.description}</p>
                </div>
                <div className="mt-6 inline-flex items-center gap-2 text-primary-red font-semibold">
                  Explore Category
                  <FiArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </MotionLink>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductCategorySection;
