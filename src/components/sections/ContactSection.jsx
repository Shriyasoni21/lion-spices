import React, { useState } from 'react';
import { API_BASE_URL } from '../../utils/apiClient';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });
      const result = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: result.message });
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus({ type: 'error', message: result.message || 'Failed to send message.' });
      }
    } catch (error) {
      console.error('Contact form submit error:', error);
      setStatus({ type: 'error', message: 'Unable to send your message. Please try again later.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center sm:mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary-red">Get in Touch</p>
          <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">Contact Lion Spices</h2>
          <p className="mt-3 text-sm text-gray-600">We usually respond within 24 hours.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Name"
            className="rounded-[24px] border border-gray-200 bg-[#fff7ee] px-5 py-4 text-gray-900 shadow-sm focus:border-primary-red focus:outline-none"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Email"
            className="rounded-[24px] border border-gray-200 bg-[#fff7ee] px-5 py-4 text-gray-900 shadow-sm focus:border-primary-red focus:outline-none"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            placeholder="Message"
            className="min-h-[160px] rounded-[24px] border border-gray-200 bg-[#fff7ee] px-5 py-4 text-gray-900 shadow-sm focus:border-primary-red focus:outline-none"
          />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1 text-sm text-gray-600">
              <p>
                Email: <a href="mailto:krishloya789@gmail.com" className="text-primary-red hover:underline">krishloya789@gmail.com</a>
              </p>
              <p>
                WhatsApp: <a href="https://wa.me/919010782782" target="_blank" rel="noreferrer" className="text-primary-red hover:underline">+91 90107 82782</a>
              </p>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex justify-center rounded-full bg-primary-red px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>

          {status && (
            <div className={`rounded-2xl px-4 py-3 text-sm ${status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              {status.message}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
