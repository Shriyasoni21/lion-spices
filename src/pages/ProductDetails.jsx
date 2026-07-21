import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiShoppingCart, FiStar } from 'react-icons/fi';
import WeightSelector from '../components/WeightSelector';
import QuantitySelector from '../components/QuantitySelector';
import { useCart } from '../context/CartContext';
import ImageWithFallback from '../components/common/ImageWithFallback';
import { getProductImageSrc } from '../utils/imageHelpers';
import { products as localProducts } from '../data/productData';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [shareMessage, setShareMessage] = useState('');

  useEffect(() => {
    const matchedProduct = localProducts.find((item) => {
      const candidates = [item._id, item.legacyId, item.id];
      return candidates.some((candidate) => String(candidate) === String(id));
    });

    if (matchedProduct) {
      setProduct(matchedProduct);
      setLoading(false);
      return;
    }

    setError('Unable to load this product.');
    setLoading(false);
  }, [id]);

  useEffect(() => {
    if (!product) {
      setRelatedProducts([]);
      return;
    }

    const related = localProducts.filter((item) => item.id !== product.id);
    setRelatedProducts(related.slice(0, 3));
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const availableVariants = product.variants || [];
    if (!availableVariants.length) {
      setSelectedVariant({ weight: product.weight || '500g', price: product.price ?? 0 });
      return;
    }

    setSelectedVariant((current) => {
      if (location.state?.selectedVariant) return location.state.selectedVariant;
      if (current && availableVariants.some((variant) => variant.weight === current.weight)) return current;
      return availableVariants[0];
    });
  }, [product, location.state]);

  const price = useMemo(() => selectedVariant?.price ?? product?.price ?? 0, [product, selectedVariant?.price]);

  const detailSections = useMemo(() => {
    if (!product) return [];

    const title = product.title || '';
    const aboutText = product.longDescription || product.description || 'Crafted for authentic flavor and premium everyday cooking.';
    const ingredientsText = product.ingredients || (
      title.includes('Chilli')
        ? '100% pure chilli powder with natural color, aroma, and bold flavor.'
        : title.includes('Turmeric')
          ? '100% pure turmeric powder with natural color and earthy aroma.'
          : title.includes('Coriander')
            ? 'Freshly ground coriander seeds with pleasant fragrance and balanced taste.'
            : 'A pure spice blend sourced from trusted farms and packed with care.'
    );

    return [
      { title: 'About this product', content: aboutText },
      { title: 'Ingredients', content: ingredientsText },
      { title: 'Storage instructions', content: 'Store in a cool, dry place away from sunlight and moisture. Keep the pack sealed after each use for lasting freshness.' },
      { title: 'Delivery information', content: 'Fast delivery across India with secure packaging and prompt dispatch for every order.' },
      { title: 'Return information', content: 'If your order is damaged or incorrect, contact us within 48 hours for a replacement or refund.' },
    ];
  }, [product]);

  const handleShare = async () => {
    const productUrl = `${window.location.origin}/product/${product?._id || product?.legacyId || product?.id}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: product?.title, text: `Check out ${product?.title} from Lion Spices.`, url: productUrl });
        setShareMessage('Shared successfully');
      } catch {
        setShareMessage('Sharing cancelled');
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(productUrl);
      setShareMessage('Product link copied');
    }
  };

  if (loading) return <main className="page-shell-compact text-center text-gray-600">Loading product details...</main>;
  if (!product) return <main className="page-shell-compact text-center text-gray-600">Product not found.</main>;

  return (
    <main className="page-shell-compact">
      <section className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
        <div className="rounded-[24px] border border-gray-200 bg-white p-4 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.28)] sm:p-6">
          <div className="flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="btn-soft h-11 px-4">
              <FiArrowLeft className="mr-2 h-4 w-4" />Back
            </button>
            <span className="rounded-full bg-primary-red/10 px-3 py-1 text-sm font-semibold text-primary-red">In stock</span>
          </div>

          <div className="mt-5 rounded-[24px] bg-[#fffaf5] p-4 sm:p-6">
            <ImageWithFallback src={getProductImageSrc(product)} alt={product.title} className="mx-auto h-[300px] w-full max-w-[320px] object-contain object-center sm:h-[380px]" loading="eager" />
          </div>
        </div>

        <div className="rounded-[24px] border border-gray-200 bg-white p-6 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.28)] sm:p-8">
          <p className="text-sm uppercase tracking-[0.24em] text-primary-red">{product.category}</p>
          <h1 className="mt-3 text-3xl font-semibold text-gray-900 sm:text-4xl">{product.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-600">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#fff7e8] px-3 py-1 font-semibold text-amber-700"><FiStar className="fill-current" /> {product.rating}</span>
            <span>Trusted by 10,000+ happy customers</span>
          </div>

          <div className="mt-6 flex items-end justify-between gap-4 rounded-[20px] border border-gray-100 bg-gray-50 p-4">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-gray-400">Price</p>
              <p className="text-3xl font-semibold text-primary-red">₹{price}</p>
              <p className="mt-1 text-sm text-gray-500">{selectedVariant?.weight || product.weight || product.variants?.[0]?.weight}</p>
            </div>
            <div className="text-right text-sm text-gray-500"><p>Total: ₹{price * quantity}</p></div>
          </div>

          <div className="mt-6 rounded-[20px] border border-gray-100 bg-[#fffaf5] p-4">
            <h2 className="text-lg font-semibold text-gray-900">Available sizes</h2>
            <div className="mt-3">
              {product.variants?.length ? (
                <WeightSelector options={product.variants.map((variant) => variant.weight)} selectedWeight={selectedVariant?.weight} onSelect={(weight) => { const nextVariant = product.variants.find((variant) => variant.weight === weight); if (nextVariant) setSelectedVariant(nextVariant); }} />
              ) : null}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div>
              <p className="text-sm font-semibold text-gray-700">Quantity</p>
              <div className="mt-2"><QuantitySelector quantity={quantity} onDecrease={() => setQuantity((q) => Math.max(1, q - 1))} onIncrease={() => setQuantity((q) => q + 1)} /></div>
            </div>
            <button onClick={() => { addToCart(product, selectedVariant, quantity); navigate('/cart'); }} className="flex h-12 items-center justify-center gap-2 rounded-full bg-primary-red px-6 text-sm font-semibold text-white hover:bg-red-700">
              <FiShoppingCart className="h-4 w-4" />Add to cart
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {detailSections.map((section) => (
              <div key={section.title} className="rounded-[20px] border border-gray-100 bg-gray-50 p-4">
                <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
                <p className="mt-2 text-sm leading-7 text-gray-700">{section.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={handleShare} className="btn-soft h-11 px-4">Share product</button>
            <Link to="/products" className="inline-flex items-center text-sm font-semibold text-primary-red hover:text-red-700">← Back to all products</Link>
          </div>
          {shareMessage ? <p className="mt-3 text-sm text-gray-600">{shareMessage}</p> : null}
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[24px] border border-gray-200 bg-white p-6 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.28)]">
          <h2 className="text-2xl font-semibold text-gray-900">Customer reviews</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              { name: 'Riya M.', review: 'The flavor is rich and authentic. Loved the packaging.', rating: '5.0' },
              { name: 'Sanjay K.', review: 'Fast delivery and excellent quality every time.', rating: '4.9' },
              { name: 'Meera P.', review: 'Perfect for daily cooking and special occasions.', rating: '5.0' },
            ].map((review) => (
              <div key={review.name} className="rounded-[20px] border border-gray-100 bg-[#fffaf5] p-4">
                <div className="flex items-center gap-1 text-amber-500"><FiStar className="fill-current" /> <span className="text-sm font-semibold text-gray-900">{review.rating}</span></div>
                <p className="mt-3 text-sm leading-6 text-gray-700">“{review.review}”</p>
                <p className="mt-3 text-sm font-semibold text-gray-900">{review.name}</p>
              </div>
            ))}
          </div>
        </div>

        <h2 className="mt-10 text-2xl font-semibold text-gray-900">Related products</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {relatedProducts.map((item) => (
            <article key={item._id || item.id} className="rounded-[24px] border border-gray-200 bg-white p-5 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.28)]">
              <ImageWithFallback src={getProductImageSrc(item)} alt={item.title} className="h-44 w-full rounded-[20px] object-contain" loading="lazy" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{item.category}</p>
              <Link to={`/product/${item._id || item.legacyId || item.id}`} className="mt-4 inline-flex rounded-full bg-primary-red px-4 py-2 text-sm font-semibold text-white">View details</Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
