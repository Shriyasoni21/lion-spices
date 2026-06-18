import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

export default function ProductCard({ product, onAddToCart }) {
  const price = product.variantPrices?.['500g'] ?? product.price ?? 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -8, scale: 1.01 }}
      className="group h-full flex flex-col rounded-[28px] border border-gray-100 bg-white shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)] transition-all duration-300 hover:shadow-[0_22px_56px_-24px_rgba(0,0,0,0.45)]"
    >
      <div className="relative overflow-hidden rounded-[24px] bg-cream p-4">
        <img
          src={product.image}
          alt={product.title}
          className="h-48 w-full rounded-[20px] object-contain transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {product.bestSeller && (
          <span className="absolute left-4 top-4 rounded-full bg-primary-red px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-lg">
            Best Seller
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-primary-red">{product.category}</p>
            <h3 className="mt-1 text-xl font-semibold text-gray-900">{product.title}</h3>
          </div>
          <div className="rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">★ {product.rating}</div>
        </div>

        <p className="mt-4 text-sm text-gray-600 flex-grow">{product.description}</p>

        <div className="mt-4 flex flex-wrap gap-2 text-sm text-amber-500">
          <FiStar className="fill-current" />
          <span className="font-semibold text-gray-800">{product.rating}</span>
          <span className="text-gray-500">({product.reviews} reviews)</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-sm text-gray-700">
          {product.weightOptions?.map((weight) => (
            <span key={weight} className="rounded-full bg-gray-100 px-3 py-1 font-semibold">{weight}</span>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-gray-400">Starting at</p>
            <p className="text-2xl font-bold text-primary-red">₹{price}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to={`/product/${product.id}`}
              className="btn-standard btn-standard-outline"
            >
              View Details
            </Link>
            <button
              onClick={() => onAddToCart(product, '500g', 1)}
              className="btn-standard btn-standard-primary"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
