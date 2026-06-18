import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

export default function CategoryCard({ category, index }) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-lg cursor-pointer group h-64 sm:h-72"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Background Image */}
      <img
        src={category.image}
        alt={category.title}
        className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 group-hover:from-black/40 group-hover:via-black/50 group-hover:to-black/90 transition-all duration-500" />

      {/* Content */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-end p-6 text-white"
        initial={{ y: 20, opacity: 0 }}
        whileHover={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-2">
          {category.title}
        </h3>
        <p className="text-sm text-gray-200 mb-4">{category.count} Products</p>
        <motion.button
          className="inline-flex items-center gap-2 text-gold font-semibold hover:text-white transition-colors w-fit"
          whileHover={{ x: 5 }}
        >
          Explore <FiArrowRight className="w-4 h-4" />
        </motion.button>
      </motion.div>

      {/* Hover Effect - Top Overlay */}
      <motion.div
        className="absolute top-0 right-0 w-32 h-32 bg-gold/20 rounded-full blur-3xl"
        initial={{ opacity: 0, scale: 0 }}
        whileHover={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
}
