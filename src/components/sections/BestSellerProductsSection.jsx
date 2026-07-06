import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { products } from '../../data/productData';
import WeightSelector from '../WeightSelector';
import ImageWithFallback from '../common/ImageWithFallback';

const BestSellerCard = ({ product, index, onAddToCart }) => {
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
    <motion.div className="flex-1 bg-white rounded-2xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.12 }}>
      <div className="flex flex-col lg:flex-row gap-4 items-center h-full">
        <div className="flex-shrink-0 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm">
            <ImageWithFallback src={product.image} alt={product.title} className="w-full lg:w-48 h-48 object-contain rounded-2xl" width={192} height={192} />
          </div>
        <div className="flex-1 flex flex-col h-full">
          <h3 className="text-xl font-semibold text-gray-900">{product.title}</h3>
          <p className="text-gray-500 mt-2">{product.description}</p>
          {product.variants?.length ? (
            <div className="mt-4">
              <WeightSelector
                options={product.variants.map((variant) => variant.weight)}
                selectedWeight={selectedVariant?.weight}
                onSelect={handleSelectVariant}
              />
            </div>
          ) : null}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="text-2xl font-bold text-red-600">₹{price}</div>
              <div className="text-sm text-gray-500">{selectedVariant?.weight || product.weight}</div>
              {product.originalPrice && <div className="text-sm text-gray-400 line-through">₹{product.originalPrice}</div>}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => onAddToCart(product, selectedVariant)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const BestSellerProductsSection = ({ onAddToCart }) => {
  const top = products.slice(0, 3);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold text-red-600">Popular Picks</p>
          <h2 className="text-3xl font-extrabold text-gray-900">Customer Favorites</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch">
          {top.map((p, i) => (
            <BestSellerCard key={p.id} product={p} index={i} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellerProductsSection;
