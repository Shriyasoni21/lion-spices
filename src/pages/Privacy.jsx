import React from 'react';
import { Link } from 'react-router-dom';

export default function PrivacyPage() {
  return (
    <main className="page-shell-compact bg-cream">
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[32px] bg-white p-8 shadow-[0_18px_45px_-24px_rgba(0,0,0,0.35)]">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary-red">Privacy Policy</p>
          <h1 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">Your privacy matters</h1>
          <p className="mt-4 text-gray-600">At Lion Spices, we collect only the information needed to process orders, respond to inquiries, and improve your experience. We never sell personal data to third parties.</p>

          <div className="mt-10 space-y-8 text-sm text-gray-700">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Information We Collect</h2>
              <p className="mt-3">We collect contact information, shipping details, and payment data needed to fulfill orders and provide customer support. Payment information is processed securely through our payment partner.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">How We Use Your Data</h2>
              <p className="mt-3">Your personal information is used to manage orders, answer questions, and communicate important updates. We also use aggregated data to improve our website and services.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">Security</h2>
              <p className="mt-3">We follow standard security practices to protect your information. Sensitive payment details are handled through secure payment processors and are not stored on our systems.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">Contact</h2>
              <p className="mt-3">If you have questions about your privacy or data handling, please <Link to="/contact" className="text-primary-red font-semibold hover:underline">contact us</Link>.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
