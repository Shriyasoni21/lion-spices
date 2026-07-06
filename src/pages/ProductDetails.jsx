import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import { products } from '../data/productData';
import WeightSelector from '../components/WeightSelector';
import QuantitySelector from '../components/QuantitySelector';
import { useCart } from '../context/CartContext';
import ImageWithFallback from '../components/common/ImageWithFallback';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find((item) => item.id === Number(id));
  const [selectedVariant, setSelectedVariant] = useState(() => location.state?.selectedVariant || product?.variants?.[0] || { weight: product?.weight || '500g', price: product?.price ?? 0 });
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!product) return;
    const availableVariants = product.variants || [];
    if (!availableVariants.length) {
      setSelectedVariant({ weight: product.weight || '500g', price: product.price ?? 0 });
      return;
    }

    if (!selectedVariant || !availableVariants.some((variant) => variant.weight === selectedVariant.weight)) {
      setSelectedVariant(availableVariants[0]);
    }
  }, [product, selectedVariant?.weight]);

  const price = useMemo(() => selectedVariant?.price ?? product?.price ?? 0, [product, selectedVariant?.price]);

  if (!product) {
    return <main className="pt-28 pb-16 text-center text-gray-600">Product not found.</main>;
  }

  const relatedProducts = products.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 3);

  return (
    <main className="pt-28 bg-cream pb-16 text-gray-900">
      <section className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[32px] bg-white p-5 shadow-[0_18px_45px_-24px_rgba(0,0,0,0.35)]">
          <div className="grid gap-4 md:grid-cols-[80px_1fr]">
            <div className="flex flex-col gap-3">
              {[product.image, product.image, product.image].map((img, idx) => (
                <button key={idx} type="button" className="rounded-2xl border border-gray-100 bg-gray-50 p-2 hover:border-primary-red">
                  <ImageWithFallback src={img} alt={`${product.title}-${idx + 1}`} className="h-16 w-full rounded-xl object-contain" loading="lazy" />
                </button>
              ))}
            </div>
            <div className="relative overflow-hidden rounded-[28px] bg-cream p-4">
              <ImageWithFallback src={product.image} alt={product.title} className="h-[420px] w-full rounded-[24px] object-contain transition duration-500 hover:scale-110" loading="eager" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[32px] bg-white p-8 shadow-[0_18px_45px_-24px_rgba(0,0,0,0.35)]">
          <p className="text-sm uppercase tracking-[0.28em] text-primary-red">{product.category}</p>
          <h1 className="mt-3 text-4xl font-bold text-gray-900">{product.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-600">
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 font-semibold text-amber-600"><FiStar className="fill-current" /> {product.rating}</span>
            <span>Trusted by 10,000+ happy customers</span>
            <span className="rounded-full bg-green-50 px-3 py-1 text-green-700">In Stock</span>
          </div>

          <p className="mt-6 text-gray-600">{product.longDescription || product.description}</p>

          <div className="mt-6 rounded-[24px] bg-gray-50 p-4">
            <h2 className="text-lg font-semibold text-gray-900">Benefits</h2>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li>• 100% Pure & natural spice blend</li>
              <li>• No artificial colors or preservatives</li>
              <li>• Hygienically packed for freshness</li>
            </ul>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900">Choose Weight</h2>
            <div className="mt-3">
              {product.variants?.length ? (
                <WeightSelector
                  options={product.variants.map((variant) => variant.weight)}
                  selectedWeight={selectedVariant?.weight}
                  onSelect={(weight) => {
                    const nextVariant = product.variants.find((variant) => variant.weight === weight);
                    if (nextVariant) setSelectedVariant(nextVariant);
                  }}
                />
              ) : null}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4 rounded-[24px] bg-gray-50 p-4">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-gray-400">Price</p>
              <p className="text-3xl font-bold text-primary-red">₹{price}</p>
            </div>
            <div className="text-right text-sm text-gray-500">
              <p>Selected: {selectedVariant?.weight || product.weight}</p>
              <p>Total: ₹{price * quantity}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-700">Quantity</p>
              <div className="mt-2"><QuantitySelector quantity={quantity} onDecrease={() => setQuantity((q) => Math.max(1, q - 1))} onIncrease={() => setQuantity((q) => q + 1)} /></div>
            </div>
            <button
              onClick={() => {
                addToCart(product, selectedVariant, quantity);
                navigate('/cart');
              }}
              className="rounded-full bg-primary-red px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-red-700"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart(product, selectedVariant, quantity);
                navigate('/checkout');
              }}
              className="rounded-full border border-primary-red px-6 py-3 text-sm font-semibold text-primary-red hover:bg-red-50"
            >
              Buy Now
            </button>
          </div>

          <Link to="/products" className="mt-6 inline-flex text-sm font-semibold text-primary-red hover:text-red-700">← Back to all products</Link>
        </motion.div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900">Related products</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {relatedProducts.map((item) => (
            <article key={item.id} className="rounded-[28px] bg-white p-5 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)]">
              <ImageWithFallback src={item.image} alt={item.title} className="h-44 w-full rounded-[22px] object-contain" loading="lazy" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{item.description}</p>
              <Link to={`/product/${item.id}`} className="mt-4 inline-flex rounded-full bg-primary-red px-4 py-2 text-sm font-semibold text-white">View Details</Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
