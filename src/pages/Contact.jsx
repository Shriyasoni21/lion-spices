import React, { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  };

  return (
    <main className="pt-28 bg-cream pb-16 text-gray-900">
      <section className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <article className="rounded-[32px] bg-white p-8 shadow-[0_18px_45px_-24px_rgba(0,0,0,0.35)]">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary-red">Contact</p>
          <h1 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">Let’s talk spices</h1>
          <p className="mt-4 text-gray-600">Whether you are a retailer, food brand, or home chef, we are ready to help with premium spice sourcing and support.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {['name', 'email', 'phone'].map((field) => (
              <label key={field} className="block text-sm text-gray-700">
                <span className="mb-1 block capitalize">{field}</span>
                <input type={field === 'email' ? 'email' : 'text'} value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })} className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-primary-red focus:ring-2 focus:ring-red-100" />
              </label>
            ))}
            <label className="block text-sm text-gray-700">
              <span className="mb-1 block">Message</span>
              <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows="5" className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-primary-red focus:ring-2 focus:ring-red-100" />
            </label>
            <button type="submit" className="rounded-full bg-primary-red px-5 py-3 text-sm font-semibold text-white hover:bg-red-700">Send Message</button>
            {submitted && <p className="rounded-2xl bg-green-50 p-3 text-sm text-green-700">Thanks! Your message has been received. We will respond soon.</p>}
          </form>
        </article>

        <article className="space-y-6 rounded-[32px] bg-white p-8 shadow-[0_18px_45px_-24px_rgba(0,0,0,0.35)]">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Company Information</h2>
            <p className="mt-3 text-sm text-gray-600">Lion Spices<br />Hyderabad, Telangana, India</p>
            <p className="mt-2 text-sm text-gray-600">Phone: +91 98765 43210</p>
            <p className="mt-2 text-sm text-gray-600">Email: support@lionspices.com</p>
          </div>
          <div className="rounded-[28px] border border-gray-100 bg-gray-50 p-4 text-sm text-gray-700">Google Maps embed placeholder for Hyderabad office.</div>
          <div className="flex flex-wrap gap-3">
            <a href="https://wa.me/919876543210" className="rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-white">WhatsApp</a>
            <a href="https://instagram.com" className="rounded-full bg-pink-500 px-4 py-2 text-sm font-semibold text-white">Instagram</a>
            <a href="https://facebook.com" className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Facebook</a>
          </div>
          <div id="faq" className="rounded-[28px] bg-gray-50 p-4 text-sm text-gray-700">
            <h3 className="font-semibold text-gray-900">FAQ</h3>
            <p className="mt-2">Do you ship pan India? Yes, we deliver across India.</p>
          </div>
        </article>
      </section>
    </main>
  );
}
