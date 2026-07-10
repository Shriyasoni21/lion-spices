import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiStar } from 'react-icons/fi';
import ImageWithFallback from './common/ImageWithFallback';
import WeightSelector from './WeightSelector';
import { useCart } from '../context/CartContext';

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
  }, [product.id, product.variants]);

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
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -8, scale: 1.01 }}
      className="group flex h-full flex-col rounded-[24px] border border-gray-100 bg-white p-3 shadow-[0_12px_30px_-20px_rgba(15,23,42,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(15,23,42,0.3)]"
    >
      <div className="relative h-[180px] overflow-hidden rounded-[18px] bg-white sm:h-[210px]">
        <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#fff7e8] px-2.5 py-1 text-[12px] font-semibold text-amber-700 shadow-sm">
          <FiStar className="h-3.5 w-3.5 fill-current" />
          {product.rating}
        </div>
        <ImageWithFallback
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain object-center"
          loading="lazy"
        />
      </div>

      <div className="mt-3 flex flex-1 flex-col">
        <p className="text-[10px] uppercase tracking-[0.24em] text-primary-red sm:text-xs">{product.category}</p>
        <h3 className="mt-1 text-lg font-semibold text-gray-900 sm:text-xl">{product.title}</h3>

        {product.variants?.length ? (
          <div className="mt-3">
            <WeightSelector
              options={product.variants.map((variant) => variant.weight)}
              selectedWeight={selectedVariant?.weight}
              onSelect={handleSelectVariant}
            />
          </div>
        ) : null}

        <div className="mt-4 flex flex-col gap-2 border-t border-gray-100 pt-4 sm:mt-auto">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-gray-400 sm:text-xs">Selected size</p>
            <p className="text-lg font-bold text-primary-red sm:text-xl">₹{price}</p>
            <p className="text-sm text-gray-500">{selectedVariant?.weight || product.weight}</p>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Link
              to={`/product/${product.id}`}
              state={{ selectedVariant }}
              className="flex h-11 items-center justify-center rounded-full border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-700 transition hover:border-primary-red hover:text-primary-red"
            >
              View Details
            </Link>

            {currentQty > 0 ? (
              <div className="flex h-11 items-center justify-center gap-3 rounded-full border border-gray-200 bg-gray-50">
                <button
                  aria-label="decrease"
                  onClick={() => updateQuantity(product.id, selectedVariant?.weight || product.weight, -1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg font-semibold text-gray-700 shadow-sm"
                >
                  −
                </button>
                <div className="text-sm font-semibold text-gray-900">{currentQty}</div>
                <button
                  aria-label="increase"
                  onClick={() => updateQuantity(product.id, selectedVariant?.weight || product.weight, 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-red text-lg font-semibold text-white shadow-sm"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={() => addToCart(product, selectedVariant, 1)}
                className="flex h-11 items-center justify-center gap-2 rounded-full bg-primary-red px-4 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                <FiShoppingCart className="h-4 w-4" />
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
