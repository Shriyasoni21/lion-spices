import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import ImageWithFallback from './common/ImageWithFallback';
import { useCart } from '../context/CartContext';
import { getProductImageSrc } from '../utils/imageHelpers';

export default function ProductCard({ product }) {
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
    <article className="group flex h-full min-h-[300px] flex-col overflow-hidden rounded-[18px] border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-[0_16px_35px_-24px_rgba(15,23,42,0.25)]">
      <div className="flex h-[180px] w-full items-center justify-center bg-[#fff7ef] p-2.5 sm:h-[190px] sm:p-3">
        <ImageWithFallback
          src={getProductImageSrc(product)}
          alt={product.title}
          className="h-full w-full max-w-[120px] object-contain transition duration-300 group-hover:scale-[1.01] sm:max-w-[110px]"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-2 p-3 sm:p-3.5">
        <div className="min-h-[2.75rem]">
          <h3 className="line-clamp-2 text-center text-[15px] font-semibold leading-5 text-gray-900">{product.title}</h3>
        </div>

        <div className="rounded-[14px] border border-gray-100 bg-[#fffaf5] p-2.5">
          <p className="text-[10px] uppercase tracking-[0.32em] text-gray-500">Available sizes</p>
          <div className="mt-1.5 flex flex-wrap justify-center gap-1.5">
            {product.variants?.map((variant) => (
              <button
                key={variant.weight}
                type="button"
                onClick={() => handleSelectVariant(variant.weight)}
                className={`rounded-full border px-2 py-1 text-xs font-semibold ${selectedVariant?.weight === variant.weight ? 'border-primary-red bg-primary-red/10 text-primary-red' : 'border-gray-200 bg-white text-gray-700 hover:border-primary-red hover:text-primary-red'}`}
              >
                {variant.weight}
              </button>
            ))}
          </div>
          <p className="mt-2 text-center text-lg font-semibold text-primary-red sm:text-xl">₹{price}</p>
        </div>

        <div className="mt-1 flex items-stretch gap-2">
          {currentQty > 0 ? (
            <div className="flex h-10 flex-1 items-center justify-between rounded-full border border-gray-200 bg-white px-1.5">
              <button type="button" aria-label="Decrease" onClick={() => updateQuantity(addToCartId, selectedVariant?.weight || product.weight, -1)} className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg font-semibold text-gray-700">−</button>
              <div className="text-sm font-semibold text-gray-900">{currentQty}</div>
              <button type="button" aria-label="Increase" onClick={() => updateQuantity(addToCartId, selectedVariant?.weight || product.weight, 1)} className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-red text-lg font-semibold text-white">+</button>
            </div>
          ) : (
            <button type="button" onClick={() => addToCart(product, selectedVariant, 1)} className="btn-solid h-10 flex-1 gap-1.5 px-2 text-sm">
              <FiShoppingCart className="h-4 w-4" />
              Add to cart
            </button>
          )}
          <Link to={`/product/${productIdString}`} state={{ selectedVariant }} className="btn-soft flex h-10 flex-1 items-center justify-center px-2 text-sm">
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
