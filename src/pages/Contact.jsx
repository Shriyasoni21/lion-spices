import React, { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const shopAddress = '14-4-274, Joshiwadi, Begum Bazaar, Hyderabad, Telangana, India';
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shopAddress)}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  };

  return (
    <main className="bg-cream pb-16 pt-24 text-gray-900 sm:pt-28">
      <section className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="rounded-[32px] border border-gray-100 bg-white p-6 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.2)] sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-red">Contact</p>
          <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">Let’s talk spices</h1>
          <p className="mt-3 text-sm text-gray-600 sm:text-base">Whether you are a retailer, food brand or home chef, our team is ready to help.</p>

          <div className="mt-6 space-y-4 text-sm text-gray-700">
            <div className="rounded-[24px] border border-gray-100 bg-[#fffaf5] p-4">
              <p className="font-semibold text-gray-900">Address</p>
              <p className="mt-2">14-4-274, Joshiwadi, Begum Bazaar, Hyderabad, Telangana, India</p>
            </div>
            <div className="rounded-[24px] border border-gray-100 bg-[#fffaf5] p-4">
              <p className="font-semibold text-gray-900">Phone</p>
              <a href="tel:+919010782782" className="mt-2 inline-flex text-primary-red hover:underline">+91 90107 82782</a>
            </div>
            <div className="rounded-[24px] border border-gray-100 bg-[#fffaf5] p-4">
              <p className="font-semibold text-gray-900">Email</p>
              <a href="mailto:krishloya789@gmail.com" className="mt-2 inline-flex text-primary-red hover:underline">krishloya789@gmail.com</a>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-[28px] border border-gray-100 bg-gray-50">
            <iframe title="Lion Spices location" src={`https://www.google.com/maps?q=${encodeURIComponent(shopAddress)}&output=embed`} className="h-56 w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center justify-center rounded-full bg-primary-red px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700">
            Open Map
          </a>
        </div>

        <div className="rounded-[32px] border border-gray-100 bg-white p-6 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.2)] sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
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
        </div>
      </section>
    </main>
  );
}
