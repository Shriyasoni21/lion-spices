import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCalendar } from 'react-icons/fi';

export default function BlogCard({ blog, index }) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-[2.5rem] group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Editorial Image */}
      <div className="relative overflow-hidden rounded-[2.5rem] shadow-luxury-lg bg-black">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md border border-white/10 text-white px-4 py-2 rounded-full text-xs uppercase tracking-wide">
          {blog.category}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-b-[2.5rem] p-8 shadow-luxury-lg -mt-16 relative z-10">
        <div className="flex items-center justify-between mb-4 gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 uppercase tracking-[0.25em]">
            <FiCalendar className="w-4 h-4" />
            <span>{blog.date}</span>
          </div>
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-saffron text-charcoal text-xs font-semibold uppercase tracking-wide">
            {blog.tag || 'Editorial'}
          </span>
        </div>

        <h3 className="text-2xl font-luxury font-bold text-charcoal mb-4 leading-snug">
          {blog.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          {blog.excerpt}
        </p>

        <motion.button
          className="inline-flex items-center gap-2 text-saffron font-semibold hover:text-gold transition-colors"
          whileHover={{ x: 4 }}
        >
          Read Story <FiArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}
