import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { imageAssets } from '../config/imageAssets';
import ImageWithFallback from '../components/common/ImageWithFallback';

export default function OrderSuccessPage() {
  const [params] = useSearchParams();
  const orderId = params.get('order') || 'LS-000000';

  return (
    <main className="pt-28 bg-cream pb-16 text-gray-900">
      <section className="mx-auto max-w-3xl rounded-[32px] bg-white p-10 text-center shadow-[0_18px_45px_-24px_rgba(0,0,0,0.35)]">
        <ImageWithFallback src={imageAssets.logo.main} alt="Lion Spices logo" className="mx-auto h-[42px] md:h-[60px] w-auto object-contain shadow-md" loading="lazy" />
        <p className="text-sm uppercase tracking-[0.28em] text-primary-red">Order placed</p>
        <h1 className="mt-3 text-4xl font-bold text-gray-900">Thank you for shopping with Lion Spices</h1>
        <p className="mt-4 text-gray-600">Your premium spices are on the way. Order ID: {orderId}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button className="rounded-full bg-primary-red px-5 py-3 text-sm font-semibold text-white hover:bg-red-700">Download Invoice</button>
          <Link to="/products" className="rounded-full border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100">Continue Shopping</Link>
        </div>
      </section>
    </main>
  );
}
