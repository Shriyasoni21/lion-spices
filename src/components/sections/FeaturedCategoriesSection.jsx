import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../common/ProductCard';
import { API_BASE_URL } from '../../utils/apiClient';

const FeaturedCategoriesSection = ({ onAddToCart }) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${API_BASE_URL}/api/products?limit=6`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.products) && data.products.length > 0) {
          setFeaturedProducts(data.products);
        }
      })
      .catch((err) => {
        console.warn('Failed to load featured products from API:', err);
      });

    return () => controller.abort();
  }, []);

  return (
    <section id="shop" className="bg-white py-10 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-red">Featured Products</p>
            <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">Taste the premium range</h2>
            <p className="mt-2 max-w-2xl text-sm text-gray-600 sm:text-base">Handpicked spice powders and blends packed for daily kitchens and special occasions.</p>
          </div>
          <Link to="/products" className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:border-primary-red hover:text-primary-red">View all</Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product._id || product.legacyId || product.id} product={product} index={index} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategoriesSection;
