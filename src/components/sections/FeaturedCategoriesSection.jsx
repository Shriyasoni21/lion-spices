import React, { useEffect, useState } from 'react';
import ProductCard from '../common/ProductCard';

const FeaturedCategoriesSection = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => {
        console.error('Failed to load products:', error);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="shop" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-red-600">Featured</p>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-2">Featured Products</h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">Premium handpicked spices crafted for authentic flavor.</p>
        </div>

        {loading ? (
          <div className="grid place-items-center py-20">
            <p className="text-gray-500">Loading products...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} onAddToCart={onAddToCart} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCategoriesSection;
