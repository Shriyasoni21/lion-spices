import React, { useState } from 'react';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });
      const result = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: result.message });
        setForm({ name: '', email: '', phone: '', message: '' });
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
    <section id="contact" className="bg-gray-50 py-10 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center sm:mb-8">
          <p className="text-sm font-semibold text-red-600">Get in Touch</p>
          <h2 className="text-3xl font-extrabold text-gray-900">Contact Lion Spices</h2>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input name="name" value={form.name} onChange={handleChange} required placeholder="Name" className="rounded-2xl border border-gray-200 px-4 py-3" />
          <input name="email" value={form.email} onChange={handleChange} required placeholder="Email" className="rounded-2xl border border-gray-200 px-4 py-3" />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="rounded-2xl border border-gray-200 px-4 py-3 sm:col-span-2" />
          <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" className="h-28 rounded-2xl border border-gray-200 px-4 py-3 sm:col-span-2" />
          <div className="space-y-4 sm:col-span-2">
            <div className="rounded-[24px] border border-gray-200 bg-white p-4 text-sm text-gray-700 shadow-sm sm:p-5">
              <p className="font-semibold text-gray-900">Lion Spices</p>
              <p className="mt-2">Email: <a href="mailto:krishloya789@gmail.com" className="text-red-600 hover:underline">krishloya789@gmail.com</a></p>
              <p className="mt-2">Address: 14-4-274, Joshiwadi, Begum Bazaar, Hyderabad.</p>
            </div>
            <div className="rounded-[24px] border border-gray-200 bg-white p-4 text-sm text-gray-700 shadow-sm sm:p-5">
              Prefer WhatsApp? Message us at <a href="https://wa.me/919010782782" target="_blank" rel="noreferrer" className="text-red-600 hover:underline">+91 90107 82782</a>
            </div>
            {status && (
              <div className={`rounded-2xl px-4 py-3 ${status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                {status.message}
              </div>
            )}
            <div className="text-right">
              <button type="submit" disabled={submitting} className="w-full rounded-2xl bg-red-600 px-6 py-3 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto">
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
