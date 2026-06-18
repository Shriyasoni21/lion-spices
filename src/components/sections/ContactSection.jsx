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
    <section id="contact" className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold text-red-600">Get in Touch</p>
          <h2 className="text-3xl font-extrabold text-gray-900">Contact Lion Spices</h2>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input name="name" value={form.name} onChange={handleChange} required placeholder="Name" className="px-4 py-3 border rounded-lg" />
          <input name="email" value={form.email} onChange={handleChange} required placeholder="Email" className="px-4 py-3 border rounded-lg" />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="px-4 py-3 border rounded-lg" />
          <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" className="px-4 py-3 border rounded-lg sm:col-span-2 h-32" />
          <div className="sm:col-span-2 text-sm text-gray-500">Prefer WhatsApp? Message us at <a href="https://wa.me/919010782782" target="_blank" rel="noreferrer" className="text-red-600 hover:underline">+91 90107 82782</a></div>
          <div className="sm:col-span-2">
            {status && (
              <div className={`rounded-lg px-4 py-3 mb-4 ${status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                {status.message}
              </div>
            )}
            <div className="text-right">
              <button type="submit" disabled={submitting} className="bg-red-600 text-white px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
