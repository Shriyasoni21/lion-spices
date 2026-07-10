import React, { memo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiStar } from 'react-icons/fi';
import ImageWithFallback from './ImageWithFallback';
import WeightSelector from '../WeightSelector';
import { useCart } from '../../context/CartContext';

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
  const { cartItems, addToCart, updateQuantity } = useCart();

  const currentCartItem = cartItems.find(
    (it) => it.id === product.id && it.selectedWeight === (selectedVariant?.weight || product.weight)
  );
  const currentQty = currentCartItem?.quantity ?? 0;

  const handleSelectVariant = (weight) => {
    const nextVariant = product.variants?.find((variant) => variant.weight === weight);
    if (nextVariant) {
      setSelectedVariant(nextVariant);
    }
  };
  return (
    <motion.div
      className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden group shadow-sm sm:shadow-lg hover:shadow-md sm:hover:shadow-xl transition-all duration-300 border border-gray-100 card-hover-lift h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:h-72">
        <ImageWithFallback
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
          width={360}
          height={320}
        />
      </div>
      <div className="p-4 sm:p-5 flex flex-col flex-1 gap-4">
        <h4 className="text-base sm:text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-primary-red transition-colors">
          {product.title}
        </h4>

        {product.weight && (
          <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1.5 sm:mb-2">
            📦 {product.weight}
          </p>
        )}

        <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2 flex-grow">
          {product.description}
        </p>

        <div className="flex items-center gap-1.5 mb-2.5 sm:mb-3">
          <div className="flex items-center gap-0.5">
            {renderStars(product.rating)}
          </div>
          <span className="text-xs sm:text-sm font-bold text-gray-900">{product.rating}</span>
          <span className="text-[0.65rem] sm:text-xs text-gray-500">Premium</span>
        </div>

        {product.variants?.length ? (
          <div className="mb-2.5 sm:mb-3 overflow-x-auto">
            <WeightSelector
              options={product.variants.map((variant) => variant.weight)}
              selectedWeight={selectedVariant?.weight}
              onSelect={handleSelectVariant}
            />
          </div>
        ) : null}

        <div className="mb-3 sm:mb-4">
          <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
            <span className="text-2xl sm:text-3xl font-bold text-primary-red">
              ₹{price}
            </span>
            {product.originalPrice && (
              <span className="text-sm sm:text-lg text-gray-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
          <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-gray-500">{selectedVariant?.weight || product.weight}</p>
        </div>

        <div className="mt-auto">
          {currentQty > 0 ? (
            <div className="w-full flex items-center justify-center gap-3 bg-white rounded-[14px] py-2">
              <button
                aria-label="decrease"
                onClick={() => updateQuantity(product.id, selectedVariant?.weight || product.weight, -1)}
                className="h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-shadow shadow-sm"
              >
                −
              </button>
              <div className="text-lg font-bold">{currentQty}</div>
              <button
                aria-label="increase"
                onClick={() => updateQuantity(product.id, selectedVariant?.weight || product.weight, 1)}
                className="h-10 w-10 rounded-full bg-primary-red text-white hover:bg-red-700 flex items-center justify-center transition-shadow shadow-sm"
              >
                +
              </button>
            </div>
          ) : (
            <motion.button
              onClick={() => addToCart(product, selectedVariant)}
              className="w-full bg-gradient-spice hover:shadow-premium text-white py-3 rounded-[14px] font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 whitespace-nowrap"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              Add to Cart
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default memo(ProductCard);
