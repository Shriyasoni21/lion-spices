import React from 'react';
import { motion } from 'framer-motion';
import { products } from '../../data/productData';

const BestSellerProductsSection = ({ onAddToCart }) => {
  const top = products.slice(0, 3);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold text-red-600">Best Sellers</p>
          <h2 className="text-3xl font-extrabold text-gray-900">Customer Favorites</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch">
          {top.map((p, i) => (
            <motion.div key={p.id} className="flex-1 bg-white rounded-2xl p-6 shadow" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                <img src={p.image} alt={p.title} className="w-full lg:w-48 h-48 object-contain rounded-lg" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{p.title}</h3>
                  <p className="text-gray-500 mt-2">{p.description}</p>
                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <div className="text-2xl font-bold text-red-600">₹{p.price}</div>
                      {p.originalPrice && <div className="text-sm text-gray-400 line-through">₹{p.originalPrice}</div>}
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => onAddToCart(p)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellerProductsSection;
