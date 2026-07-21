import React from 'react';
import { Link } from 'react-router-dom';

export default function TermsPage() {
  return (
    <main className="page-shell-compact bg-cream">
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[32px] bg-white p-8 shadow-[0_18px_45px_-24px_rgba(0,0,0,0.35)]">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary-red">Terms of Service</p>
          <h1 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">Terms and conditions</h1>
          <p className="mt-4 text-gray-600">These terms describe how Lion Spices provides service through this website, how customers place orders, and how we manage returns, deliveries, and payments.</p>

          <div className="mt-10 space-y-8 text-sm text-gray-700">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Ordering</h2>
              <p className="mt-3">Orders placed through the website are subject to product availability and order confirmation. Prices are shown in INR and applicable taxes will be added at checkout where required.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">Delivery</h2>
              <p className="mt-3">We deliver across India using trusted logistics partners. Delivery estimates are provided during checkout and may vary depending on the destination.</p>
            </div>

            <div id="returns">
              <h2 className="text-xl font-semibold text-gray-900">Returns & Refunds</h2>
              <p className="mt-3">If a product arrives damaged or incorrect, contact us within 7 days of delivery. We will assist with a replacement or refund according to our return policy.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">Customer Support</h2>
              <p className="mt-3">Need help? Reach out via our <Link to="/contact" className="text-primary-red font-semibold hover:underline">contact page</Link> or WhatsApp support.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
