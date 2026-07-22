import React from 'react';
import { Link } from 'react-router-dom';
import ImageWithFallback from './ImageWithFallback';
import { getProductImageSrc } from '../../utils/imageHelpers';

export default function MobileFeaturedCard({ product }) {
  const id = product._id || product.legacyId || product.id;
  const minPrice = Array.isArray(product.variants) && product.variants.length ? Math.min(...product.variants.map(v => v.price)) : (product.price ?? 0);

  return (
    <article className="sm:hidden flex w-full flex-col items-center gap-2 rounded-lg bg-white p-3 shadow-sm">
      <div className="w-full flex items-center justify-center product-image-container p-2 overflow-hidden">
        <ImageWithFallback src={getProductImageSrc(product)} alt={product.title} className="product-image w-auto" loading="lazy" />
      </div>

      <h3 className="w-full text-center text-sm font-semibold text-gray-900">{product.title}</h3>

      <p className="w-full text-center text-sm text-gray-600">Starting from ₹{minPrice}</p>

      <Link to={`/product/${id}`} className="w-full inline-flex items-center justify-center rounded-md bg-primary-red px-4 py-2 text-sm font-semibold text-white hover:bg-red-700">View product</Link>
    </article>
  );
}
