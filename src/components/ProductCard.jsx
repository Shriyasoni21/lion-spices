import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import ImageWithFallback from './common/ImageWithFallback';
import { useCart } from '../context/CartContext';
import { getProductImageSrc } from '../utils/imageHelpers';

export default function ProductCard({ product, onAddToCart }) {
  const productDetailId = product._id ?? product.legacyId ?? product.id;
  const productIdString = String(productDetailId || '');
  const addToCartId = product._id ? String(product._id) : String(product.id || product.legacyId || '');
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
    if (nextVariant) setSelectedVariant(nextVariant);
  };

  return (
    <article className="product-card group flex flex-col h-auto overflow-hidden rounded-[18px] border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-[0_16px_35px_-24px_rgba(15,23,42,0.25)]">
      <div className="product-image-container bg-[#fff7ef] p-1.5 sm:p-3">
        <ImageWithFallback
          src={getProductImageSrc(product)}
          alt={product.title}
          className="product-image transition duration-300 group-hover:scale-[1.01] max-w-[120px]"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-1.5 p-2 sm:gap-2 sm:p-3.5">
        <div className="min-h-[2.25rem] order-1 sm:order-none">
          <h3 className="line-clamp-2 text-center text-[13px] font-semibold leading-4 text-gray-900 break-words sm:text-[15px] sm:leading-5">{product.title}</h3>
        </div>

        <div className="rounded-[12px] border border-gray-100 bg-[#fffaf5] p-1.5 sm:p-2.5 order-2 sm:order-none">
          <div className="mt-1 flex justify-center gap-2 sm:gap-3 weight-options">
            {['100g','500g','1kg'].map((w) => {
              const available = product.variants?.some((v) => v.weight === w);
              return (
                <button
                  key={w}
                  type="button"
                  onClick={() => available && handleSelectVariant(w)}
                  className={`flex-1 min-w-0 text-center rounded-full border px-2 py-1 text-[11px] font-semibold sm:px-3 sm:py-1 sm:text-xs ${selectedVariant?.weight === w ? 'border-primary-red bg-primary-red/10 text-primary-red' : available ? 'border-gray-200 bg-white text-gray-700 hover:border-primary-red hover:text-primary-red' : 'border-transparent bg-white/30 text-gray-400 cursor-not-allowed'}`}
                  disabled={!available}
                >
                  {w}
                </button>
              );
            })}
          </div>
        </div>

        <div className="order-3 sm:order-none">
          <p className="text-center text-base font-semibold text-primary-red sm:text-lg">₹{price}</p>
        </div>

        <div className="mt-0.5 flex items-stretch gap-1.5 sm:mt-1 sm:gap-2 order-4 sm:order-none">
          {currentQty > 0 ? (
            <div className="flex h-9 flex-1 items-center justify-between rounded-full border border-gray-200 bg-white px-1 sm:h-10 sm:px-1.5">
              <button type="button" aria-label="Decrease" onClick={() => updateQuantity(addToCartId, selectedVariant?.weight || product.weight, -1)} className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-base font-semibold text-gray-700 sm:h-8 sm:w-8 sm:text-lg">−</button>
              <div className="text-xs font-semibold text-gray-900 sm:text-sm">{currentQty}</div>
              <button type="button" aria-label="Increase" onClick={() => updateQuantity(addToCartId, selectedVariant?.weight || product.weight, 1)} className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-red text-base font-semibold text-white sm:h-8 sm:w-8 sm:text-lg">+</button>
            </div>
          ) : (
            <button
              type="button"
              aria-label={`Add ${product.title} (${selectedVariant?.weight || ''}) to cart`}
              onClick={() => (onAddToCart ? onAddToCart(product, selectedVariant, 1) : addToCart(product, selectedVariant, 1))}
              className="btn-solid h-9 flex-1 text-xs sm:h-10 sm:text-sm"
            >
              <FiShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4 inline-block mr-2" />Add to cart
            </button>
          )}
          <Link to={`/product/${productIdString}`} state={{ selectedVariant }} aria-label={`View details for ${product.title}`} className="btn-soft ml-2 flex h-9 flex-1 items-center justify-center px-1.5 text-xs sm:h-10 sm:px-2 sm:text-sm">
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
