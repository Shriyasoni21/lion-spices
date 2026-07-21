import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-cream pt-16 pb-12 text-gray-900 sm:pt-20 sm:pb-16">
      <section className="mx-auto max-w-3xl rounded-[32px] bg-white p-10 text-center shadow-[0_18px_45px_-24px_rgba(0,0,0,0.35)]">
        <p className="text-sm uppercase tracking-[0.28em] text-primary-red">Page not found</p>
        <h1 className="mt-4 text-5xl font-bold text-gray-900">404</h1>
        <p className="mt-4 text-lg text-gray-600">The page you are looking for doesn’t exist or has been moved.</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="/" className="rounded-full bg-primary-red px-6 py-3 text-sm font-semibold text-white hover:bg-red-700">
            Back to Home
          </Link>
          <Link to="/products" className="rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100">
            Browse Products
          </Link>
        </div>
      </section>
    </main>
  );
}
