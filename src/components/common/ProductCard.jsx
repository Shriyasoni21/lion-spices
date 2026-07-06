import React, { memo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiStar } from 'react-icons/fi';
import WeightSelector from '../WeightSelector';

function ProductCard({ product, index = 0, onAddToCart }) {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FiStar
        key={i}
        className={`w-4 h-4 ${
          i < Math.round(rating)
            ? 'text-turmeric fill-turmeric'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const initialVariant = product.variants?.[0] || { weight: product.weight || '500g', price: product.price ?? 0 };
  const [selectedVariant, setSelectedVariant] = useState(initialVariant);

  useEffect(() => {
    const nextVariant = product.variants?.find((variant) => variant.weight === selectedVariant?.weight) || product.variants?.[0] || initialVariant;
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
    <motion.div
      className="bg-white rounded-3xl overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 card-hover-lift h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="relative h-80 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
          <ImageWithFallback
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-500"
            width={360}
            height={320}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300" />
        </div>
      <div className="p-6 flex flex-col flex-1">
        <h4 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-red transition-colors">
          {product.title}
        </h4>

        {product.weight && (
          <p className="text-sm text-gray-500 font-medium mb-3">
            📦 {product.weight}
          </p>
        )}

        <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm font-bold text-gray-900">{product.rating}</span>
          <span className="text-xs text-gray-500">Premium Quality</span>
        </div>

        {product.variants?.length ? (
          <div className="mb-4">
            <WeightSelector
              options={product.variants.map((variant) => variant.weight)}
              selectedWeight={selectedVariant?.weight}
              onSelect={handleSelectVariant}
            />
          </div>
        ) : null}

        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-primary-red">
              ₹{price}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-gray-500">{selectedVariant?.weight || product.weight}</p>
        </div>

        <motion.button
          onClick={() => onAddToCart && onAddToCart(product, selectedVariant)}
          className="w-full bg-gradient-spice hover:shadow-premium text-white py-3 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group/btn mt-auto"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FiShoppingCart className="w-5 h-5" />
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}

export default memo(ProductCard);
