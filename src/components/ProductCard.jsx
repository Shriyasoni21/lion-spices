import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiStar } from 'react-icons/fi';
import ImageWithFallback from './common/ImageWithFallback';
import WeightSelector from './WeightSelector';
import { useCart } from '../context/CartContext';
import { getProductImageSrc } from '../utils/imageHelpers';

export default function ProductCard({ product }) {
  const productDetailId = product._id ?? product.legacyId ?? product.id;
  const productIdString = String(productDetailId || '');
  const addToCartId = product._id ? String(product._id) : '';
  const hasValidProductId = /^[0-9a-fA-F]{24}$/.test(addToCartId);
  const initialVariant = product.variants?.[0] || { weight: product.weight || '500g', price: product.price ?? 0 };
  const [selectedVariant, setSelectedVariant] = useState(initialVariant);

  useEffect(() => {
    if (!product.variants?.length) {
      setSelectedVariant({ weight: product.weight || '500g', price: product.price ?? 0 });
      return;
    }

    const nextVariant = product.variants.find((variant) => variant.weight === selectedVariant?.weight) || product.variants[0];
    setSelectedVariant(nextVariant);
  }, [product._id, product.legacyId, product.id, product.variants]);

  const price = selectedVariant?.price ?? product.price ?? 0;
  const { cartItems, addToCart, updateQuantity } = useCart();

  const currentCartItem = cartItems.find(
    (it) => it.id === addToCartId && it.selectedWeight === (selectedVariant?.weight || product.weight)
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
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="relative flex items-center justify-center bg-white rounded-3xl overflow-hidden aspect-square p-3">
        <ImageWithFallback
          src={getProductImageSrc(product)}
          alt={product.title}
          className="w-full h-full max-w-[95%] max-h-[95%] object-contain transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-[12px] font-semibold text-gray-700 shadow-sm">
          <FiStar className="h-3.5 w-3.5 text-amber-500" />
          {product.rating || '4.8'}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <p className="text-[10px] uppercase tracking-[0.32em] text-primary-red sm:text-xs">{product.category}</p>
        <h3 className="text-xl font-semibold text-gray-900 sm:text-2xl">{product.title}</h3>

        {product.variants?.length ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {product.variants.map((variant) => (
              <button
                key={variant.weight}
                type="button"
                onClick={() => handleSelectVariant(variant.weight)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${selectedVariant?.weight === variant.weight ? 'border-primary-red bg-primary-red/10 text-primary-red' : 'border-gray-200 bg-white text-gray-700 hover:border-primary-red hover:text-primary-red'}`}
              >
                {variant.weight}
              </button>
            ))}
          </div>
        ) : null}

        <div className="mt-auto rounded-[26px] border border-gray-100 bg-[#fff7ef] p-4">
          <p className="text-[11px] uppercase tracking-[0.32em] text-gray-500">Selected size</p>
          <p className="mt-1 text-2xl font-bold text-primary-red">₹{price}</p>
          <p className="text-sm text-gray-500">{selectedVariant?.weight || product.weight}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            to={`/product/${productIdString}`}
            state={{ selectedVariant }}
            className="inline-flex h-12 items-center justify-center rounded-full border border-gray-200 bg-white text-sm font-semibold text-gray-700 transition hover:border-primary-red hover:text-primary-red"
          >
            View Details
          </Link>

          {currentQty > 0 ? (
            <div className="flex h-12 items-center justify-between gap-3 rounded-full border border-gray-200 bg-white px-2">
              <button
                type="button"
                aria-label="Decrease"
                onClick={() => updateQuantity(addToCartId, selectedVariant?.weight || product.weight, -1)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg font-semibold text-gray-700 shadow-sm"
              >
                −
              </button>
              <div className="text-sm font-semibold text-gray-900">{currentQty}</div>
              <button
                type="button"
                aria-label="Increase"
                onClick={() => updateQuantity(addToCartId, selectedVariant?.weight || product.weight, 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-red text-lg font-semibold text-white shadow-sm"
              >
                +
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => hasValidProductId ? addToCart(product, selectedVariant, 1) : undefined}
              disabled={!hasValidProductId}
              className={`inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary-red px-4 text-sm font-semibold text-white transition hover:bg-red-700 ${!hasValidProductId ? 'cursor-not-allowed opacity-60' : ''}`}
            >
              <FiShoppingCart className="h-4 w-4" />
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
