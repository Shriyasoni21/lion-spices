import React, { useState } from 'react';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { API_BASE_URL } from '../utils/apiClient';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const shopAddress = '14-4-274, Joshiwadi, Begum Bazaar, Hyderabad, Telangana, India';
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shopAddress)}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus({ type: 'error', message: 'Please complete all required fields.' });
      return;
    }

    setSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: data.message || 'Your message has been received. We will contact you soon.' });
        setForm({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus({ type: 'error', message: data.message || 'Unable to send your message at the moment.' });
      }
    } catch (err) {
      console.error('Contact submission failed:', err);
      setStatus({ type: 'error', message: 'Unable to send your message. Please try again later.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="bg-gradient-to-b from-cream via-[#fff7ed] to-white pb-16 pt-28 text-gray-900 sm:pt-32">
      <section className="container-custom grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[36px] border border-gray-200 bg-white p-8 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.18)]">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-red">Contact Us</p>
          <h1 className="mt-4 text-4xl font-extrabold text-gray-900 sm:text-5xl">Let’s talk spices</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-gray-600">
            Whether you are a retailer, home chef, or brand partner, our team is ready to help with premium spice solutions and fast support.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[28px] border border-gray-100 bg-[#fff4e5] p-6">
              <div className="flex items-center gap-3 text-primary-red">
                <FiMapPin className="h-5 w-5" />
                <p className="font-semibold">Address</p>
              </div>
              <p className="mt-4 text-sm leading-7 text-gray-700">14-4-274, Joshiwadi, Begum Bazaar, Hyderabad, Telangana, India</p>
            </div>
            <div className="rounded-[28px] border border-gray-100 bg-[#fff4e5] p-6">
              <div className="flex items-center gap-3 text-primary-red">
                <FiPhone className="h-5 w-5" />
                <p className="font-semibold">Phone</p>
              </div>
              <a href="tel:+919010782782" className="mt-4 block text-sm leading-7 text-gray-700 transition hover:text-primary-red">+91 90107 82782</a>
            </div>
            <div className="rounded-[28px] border border-gray-100 bg-[#fff4e5] p-6 sm:col-span-2">
              <div className="flex items-center gap-3 text-primary-red">
                <FiMail className="h-5 w-5" />
                <p className="font-semibold">Email</p>
              </div>
              <a href="mailto:krishloya789@gmail.com" className="mt-4 block text-sm leading-7 text-gray-700 transition hover:text-primary-red">krishloya789@gmail.com</a>
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-[32px] border border-gray-200 bg-gray-50 shadow-sm">
            <iframe
              title="Lion Spices location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(shopAddress)}&output=embed`}
              className="h-80 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-primary-red px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-red-700"
          >
            Open Map
          </a>
        </div>

        <div className="rounded-[36px] border border-gray-200 bg-white p-8 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.18)]">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-red">Send a message</p>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">We’re here to help</h2>
          <p className="mt-4 text-base leading-8 text-gray-600">Share your questions, orders or wholesale inquiries and our team will respond quickly.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {['name', 'email', 'phone'].map((field) => (
              <label key={field} className="block text-sm text-gray-700">
                <span className="mb-2 block capitalize text-sm font-semibold">{field}</span>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  className="w-full rounded-[20px] border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-primary-red focus:ring-2 focus:ring-red-100"
                />
              </label>
            ))}
            <label className="block text-sm text-gray-700">
              <span className="mb-2 block text-sm font-semibold">Message</span>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows="6"
                className="w-full rounded-[20px] border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-primary-red focus:ring-2 focus:ring-red-100"
              />
            </label>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary-red px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? 'Sending...' : 'Send Message'}
            </button>
            {status && (
              <p className={`rounded-[20px] px-4 py-3 text-sm ${status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {status.message}
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}
