import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import ImageWithFallback from './common/ImageWithFallback';
import WeightSelector from './WeightSelector';

export default function ProductCard({ product, onAddToCart }) {
  const initialVariant = product.variants?.[0] || { weight: product.weight || '500g', price: product.price ?? 0 };
  const [selectedVariant, setSelectedVariant] = useState(initialVariant);

  useEffect(() => {
    if (!product.variants?.length) {
      setSelectedVariant({ weight: product.weight || '500g', price: product.price ?? 0 });
      return;
    }

    const nextVariant = product.variants.find((variant) => variant.weight === selectedVariant?.weight) || product.variants[0];
    setSelectedVariant(nextVariant);
  }, [product.id]);

  const price = selectedVariant?.price ?? product.price ?? 0;

  const handleSelectVariant = (weight) => {
    const nextVariant = product.variants?.find((variant) => variant.weight === weight);
    if (nextVariant) {
      setSelectedVariant(nextVariant);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -8, scale: 1.01 }}
      className="group flex h-full flex-col rounded-[24px] border border-gray-100 bg-white shadow-[0_18px_40px_-24px_rgba(0,0,0,0.20)] transition-all duration-300 hover:shadow-[0_22px_56px_-24px_rgba(0,0,0,0.30)]"
    >
      <div className="relative overflow-hidden rounded-[20px] border border-gray-100 bg-white p-3 shadow-sm sm:p-4">
        <div className="relative aspect-[4/4.2] w-full overflow-hidden rounded-[16px] bg-white p-3 sm:p-4">
          <ImageWithFallback
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain"
            loading="lazy"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-primary-red sm:text-xs">{product.category}</p>
            <h3 className="mt-1 text-lg font-semibold text-gray-900 sm:text-xl">{product.title}</h3>
          </div>
          <div className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 sm:px-3 sm:text-sm">★ {product.rating}</div>
        </div>

        <p className="mt-3 flex-grow text-sm text-gray-600">{product.description}</p>

        <div className="mt-3 flex flex-wrap gap-2 text-sm text-amber-500">
          <FiStar className="fill-current" />
          <span className="font-semibold text-gray-800">{product.rating}</span>
          <span className="text-gray-500">Premium Quality</span>
        </div>

        {product.variants?.length ? (
          <div className="mt-3">
            <WeightSelector
              options={product.variants.map((variant) => variant.weight)}
              selectedWeight={selectedVariant?.weight}
              onSelect={handleSelectVariant}
            />
          </div>
        ) : null}

        <div className="mt-4 flex flex-col gap-2 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-gray-400 sm:text-xs">Selected variant</p>
            <p className="text-lg font-bold text-primary-red sm:text-xl">₹{price}</p>
            <p className="text-sm text-gray-500">{selectedVariant?.weight || product.weight}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to={{ pathname: `/product/${product.id}`, state: { selectedVariant } }}
              className="btn-standard btn-standard-outline"
            >
              View Details
            </Link>
            <button
              onClick={() => onAddToCart?.(product, selectedVariant, 1)}
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
