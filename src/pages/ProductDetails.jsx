import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiShoppingCart, FiStar } from 'react-icons/fi';
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
    <main className="bg-cream pb-16 pt-24 text-gray-900 sm:pt-28">
      <section className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[32px] border border-gray-100 bg-white p-4 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.2)] sm:p-6">
          <div className="flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:border-primary-red hover:text-primary-red">
              <FiArrowLeft className="h-4 w-4" />
              Back
            </button>
            <span className="rounded-full bg-primary-red/10 px-3 py-1 text-sm font-semibold text-primary-red">In stock</span>
          </div>

          <div className="mt-5 rounded-[28px] bg-[#fffaf5] p-4 sm:p-6">
            <ImageWithFallback src={product.image} alt={product.title} className="mx-auto h-[300px] w-full max-w-[320px] object-contain object-center sm:h-[380px]" loading="eager" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[32px] border border-gray-100 bg-white p-6 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.2)] sm:p-8">
          <p className="text-sm uppercase tracking-[0.24em] text-primary-red">{product.category}</p>
          <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">{product.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-600">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#fff7e8] px-3 py-1 font-semibold text-amber-700"><FiStar className="fill-current" /> {product.rating}</span>
            <span>Trusted by 10,000+ happy customers</span>
          </div>

          <p className="mt-6 text-sm leading-7 text-gray-600 sm:text-base">{product.longDescription || product.description}</p>

          <div className="mt-6 rounded-[24px] border border-gray-100 bg-[#fffaf5] p-4">
            <h2 className="text-lg font-semibold text-gray-900">Available sizes</h2>
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

          <div className="mt-6 flex items-end justify-between gap-4 rounded-[24px] border border-gray-100 bg-gray-50 p-4">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-gray-400">Price</p>
              <p className="text-3xl font-bold text-primary-red">₹{price}</p>
              <p className="mt-1 text-sm text-gray-500">{selectedVariant?.weight || product.weight}</p>
            </div>
            <div className="text-right text-sm text-gray-500">
              <p>Total: ₹{price * quantity}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div>
              <p className="text-sm font-semibold text-gray-700">Quantity</p>
              <div className="mt-2"><QuantitySelector quantity={quantity} onDecrease={() => setQuantity((q) => Math.max(1, q - 1))} onIncrease={() => setQuantity((q) => q + 1)} /></div>
            </div>
            <button
              onClick={() => {
                addToCart(product, selectedVariant, quantity);
                navigate('/cart');
              }}
              className="flex h-12 items-center justify-center gap-2 rounded-full bg-primary-red px-6 text-sm font-semibold text-white shadow-md transition hover:bg-red-700"
            >
              <FiShoppingCart className="h-4 w-4" />
              Add to Cart
            </button>
          </div>

          <div className="mt-6 rounded-[24px] border border-gray-100 bg-gray-50 p-4">
            <h2 className="text-lg font-semibold text-gray-900">Product highlights</h2>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li>• 100% authentic spices with natural aroma</li>
              <li>• No artificial colors or preservatives</li>
              <li>• Hygienically packed for long-lasting freshness</li>
            </ul>
          </div>

          <Link to="/products" className="mt-6 inline-flex text-sm font-semibold text-primary-red hover:text-red-700">← Back to all products</Link>
        </motion.div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900">Related products</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {relatedProducts.map((item) => (
            <article key={item.id} className="rounded-[28px] border border-gray-100 bg-white p-5 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.2)]">
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
