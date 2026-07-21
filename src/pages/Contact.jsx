import React, { useMemo, useState } from 'react';
import { FiAlertCircle, FiCheckCircle, FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';
import { API_BASE_URL } from '../utils/apiClient';

const initialForm = { name: '', email: '', phone: '', message: '' };
const initialTouched = { name: false, email: false, phone: false, message: false };

const validateName = (value) => {
  const trimmed = value.trim();
  if (!trimmed) return 'Name is required.';
  if (trimmed.length < 3) return 'Name must be at least 3 characters.';
  if (trimmed.length > 50) return 'Name must be at most 50 characters.';
  if (!/^[A-Za-z\s]+$/.test(trimmed)) return 'Name can only contain letters and spaces.';
  return '';
};

const validateEmail = (value) => {
  const trimmed = value.trim();
  if (!trimmed) return 'Email is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) return 'Please enter a valid email address.';
  return '';
};

const validatePhone = (value) => {
  const digits = value.replace(/\D/g, '');
  if (!digits) return 'Phone number is required.';
  if (digits.length !== 10) return 'Phone number must contain exactly 10 digits.';
  if (!/^[6-9]/.test(digits)) return 'Please enter a valid Indian mobile number.';
  return '';
};

const validateMessage = (value) => {
  const trimmed = value.trim();
  if (!trimmed) return 'Message is required.';
  if (trimmed.length < 10) return 'Message must be at least 10 characters.';
  if (trimmed.length > 500) return 'Message must be at most 500 characters.';
  return '';
};

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState(initialTouched);
  const shopAddress = '14-4-274, Joshiwadi, Begum Bazaar, Hyderabad, Telangana, India';
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shopAddress)}`;

  const errors = useMemo(
    () => ({
      name: validateName(form.name),
      email: validateEmail(form.email),
      phone: validatePhone(form.phone),
      message: validateMessage(form.message),
    }),
    [form.name, form.email, form.phone, form.message]
  );

  const isFormValid = useMemo(() => Object.values(errors).every((error) => !error), [errors]);

  const handleChange = (field, value) => {
    setStatus(null);

    if (field === 'phone') {
      const digits = value.replace(/\D/g, '').slice(0, 10);
      setForm((prev) => ({ ...prev, phone: digits }));
      return;
    }

    if (field === 'name') {
      setForm((prev) => ({ ...prev, name: value.replace(/[^A-Za-z\s]/g, '').slice(0, 50) }));
      return;
    }

    if (field === 'message') {
      setForm((prev) => ({ ...prev, message: value.slice(0, 500) }));
      return;
    }

    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextTouched = { name: true, email: true, phone: true, message: true };
    setTouched(nextTouched);

    if (!isFormValid) {
      setStatus({ type: 'error', message: 'Please fix the highlighted fields before submitting.' });
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
        setForm(initialForm);
        setTouched(initialTouched);
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

  const renderField = (field, label, type = 'text', placeholder, rows) => {
    const error = errors[field];
    const isValid = !error && form[field].trim().length > 0;
    const showError = touched[field] && error;
    const showSuccess = touched[field] && isValid;

    return (
      <label className="block text-sm text-gray-700">
        <span className="mb-2 flex items-center justify-between text-sm font-semibold text-gray-800">
          <span>{label}</span>
          {showSuccess ? <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600"><FiCheckCircle className="h-4 w-4" /> Looks good</span> : null}
        </span>
        {rows ? (
          <textarea
            value={form[field]}
            onChange={(e) => handleChange(field, e.target.value)}
            onBlur={() => handleBlur(field)}
            rows={rows}
            placeholder={placeholder}
            className={`min-h-[140px] w-full rounded-[20px] border bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-primary-red focus:ring-2 focus:ring-red-100 ${showError ? 'border-red-300 bg-red-50' : showSuccess ? 'border-green-300 bg-green-50' : 'border-gray-200'}`}
          />
        ) : (
          <input
            type={type}
            value={form[field]}
            onChange={(e) => handleChange(field, e.target.value)}
            onBlur={() => handleBlur(field)}
            placeholder={placeholder}
            maxLength={field === 'phone' ? 10 : field === 'name' ? 50 : undefined}
            className={`w-full rounded-[20px] border bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-primary-red focus:ring-2 focus:ring-red-100 ${showError ? 'border-red-300 bg-red-50' : showSuccess ? 'border-green-300 bg-green-50' : 'border-gray-200'}`}
          />
        )}
        {showError ? <p className="mt-2 flex items-center gap-2 text-sm text-red-600"><FiAlertCircle className="h-4 w-4" />{error}</p> : null}
      </label>
    );
  };

  return (
    <main className="page-shell-compact bg-gradient-to-b from-cream via-[#fff7ed] to-white">
      <section className="container-custom grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
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
            {renderField('name', 'Full name', 'text', 'Enter your full name')}
            {renderField('email', 'Email address', 'email', 'you@example.com')}
            {renderField('phone', 'Phone number', 'tel', 'Enter 10-digit mobile number')}
            {renderField('message', 'Message', 'text', 'Tell us how we can help', 6)}

            <button
              type="submit"
              disabled={submitting || !isFormValid}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary-red px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiSend className="h-4 w-4" />
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
