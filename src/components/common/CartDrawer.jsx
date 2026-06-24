import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiX, FiTrash2, FiArrowLeftCircle } from 'react-icons/fi';
import ImageWithFallback from './ImageWithFallback';

const CartDrawer = ({ open, items, onClose, onRemove, onClear, onUpdateQuantity }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState('cart');
  const [form, setForm] = useState({ name: '', email: '', address: '', card: '', expiry: '', cvv: '' });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!open) {
      setStep('cart');
      setForm({ name: '', email: '', address: '', card: '', expiry: '', cvv: '' });
      setSubmitting(false);
      setMessage(null);
    }
  }, [open]);

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const openCheckout = () => {
    onClose();
    navigate('/cart');
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, total: subtotal, customer: form })
      });
      const result = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: result.message });
        onClear();
        setStep('success');
      } else {
        setMessage({ type: 'error', text: result.message || 'Payment failed.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Unable to process payment. Please try again.' });
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const resetCheckout = () => {
    setStep('cart');
    setMessage(null);
    setForm({ name: '', email: '', address: '', card: '', expiry: '', cvv: '' });
  };

  const headerTitle = step === 'checkout' ? 'Checkout' : step === 'success' ? 'Order Confirmed' : 'Your Cart';

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="absolute inset-0 bg-black/40" onClick={onClose} />

          <motion.div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl border-l border-gray-200 overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">{headerTitle}</h2>
                  <p className="text-sm text-gray-500">{items.length} item{items.length !== 1 ? 's' : ''}</p>
                </div>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-900">
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              {step === 'cart' && (
                <>
                  {items.length === 0 ? (
                    <div className="py-20 text-center text-gray-500">
                      <p>Your cart is empty.</p>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      {items.map((item) => (
                        <div key={item.id} className="rounded-3xl border border-gray-100 p-4 shadow-sm">
                          <div className="flex items-start gap-4">
                            <ImageWithFallback src={item.image} alt={item.title} className="w-20 h-20 rounded-2xl object-cover" loading="lazy" />
                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                                  <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                                </div>
                                <button onClick={() => onRemove(item.id)} className="text-red-600 hover:text-red-800">
                                  <FiTrash2 className="w-5 h-5" />
                                </button>
                              </div>
                              <div className="mt-4 flex items-center justify-between text-gray-900 font-semibold">
                                <div className="flex items-center gap-2">
                                  <button onClick={() => onUpdateQuantity?.(item.id, item.selectedWeight, -1)} className="h-8 w-8 rounded-full border border-gray-200 bg-white text-lg leading-none">−</button>
                                  <span className="min-w-[1.5rem] text-center">{item.quantity}</span>
                                  <button onClick={() => onUpdateQuantity?.(item.id, item.selectedWeight, 1)} className="h-8 w-8 rounded-full border border-gray-200 bg-white text-lg leading-none">+</button>
                                </div>
                                <span>₹{item.quantity * item.price}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-6 border-t border-gray-200 pt-6">
                    <div className="flex items-center justify-between text-gray-700 mb-4">
                      <span>Subtotal</span>
                      <span className="font-semibold text-gray-900">₹{subtotal}</span>
                    </div>
                    <button onClick={openCheckout} disabled={items.length === 0} className="w-full mb-3 rounded-2xl bg-red-600 text-white py-3 font-semibold hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
                      Continue to checkout
                    </button>
                    <button onClick={onClear} className="w-full rounded-2xl border border-gray-200 py-3 text-gray-700 hover:bg-gray-50 transition">
                      Clear Cart
                    </button>
                  </div>
                </>
              )}

              {step === 'checkout' && (
                <div className="space-y-6">
                  <button onClick={() => setStep('cart')} className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-800">
                    <FiArrowLeftCircle className="w-5 h-5" /> Back to Cart
                  </button>

                  <div className="rounded-3xl border border-gray-100 p-5 bg-gray-50">
                    <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between text-sm text-gray-700">
                          <span>{item.quantity}× {item.title}</span>
                          <span>₹{item.quantity * item.price}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 border-t border-gray-200 pt-4 flex items-center justify-between font-semibold text-gray-900">
                      <span>Total</span>
                      <span>₹{subtotal}</span>
                    </div>
                  </div>

                  <form onSubmit={handlePayment} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name on card</label>
                      <input name="name" value={form.name} onChange={handleChange} required className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-red-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} required className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-red-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Billing address</label>
                      <input name="address" value={form.address} onChange={handleChange} required className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-red-500 focus:outline-none" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Card number</label>
                        <input name="card" value={form.card} onChange={handleChange} required className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-red-500 focus:outline-none" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Expiry</label>
                        <input name="expiry" value={form.expiry} onChange={handleChange} required className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-red-500 focus:outline-none" placeholder="MM/YY" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">CVV</label>
                        <input name="cvv" value={form.cvv} onChange={handleChange} required className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-red-500 focus:outline-none" placeholder="123" />
                      </div>
                    </div>

                    {message && (
                      <div className={`rounded-2xl px-4 py-3 ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                        {message.text}
                      </div>
                    )}

                    <button type="submit" disabled={submitting} className="w-full rounded-2xl bg-red-600 text-white py-3 font-semibold hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
                      {submitting ? 'Processing...' : 'Pay ₹' + subtotal}
                    </button>
                  </form>
                </div>
              )}

              {step === 'success' && (
                <div className="space-y-6 text-center">
                  <div className="rounded-3xl border border-green-100 bg-green-50 p-8">
                    <h3 className="text-xl font-semibold text-green-800">Payment Complete</h3>
                    <p className="mt-3 text-gray-700">Your order has been placed successfully. We will email you the receipt shortly.</p>
                  </div>
                  <button onClick={() => { resetCheckout(); onClose(); }} className="w-full rounded-2xl bg-red-600 text-white py-3 font-semibold hover:bg-red-700 transition">
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
