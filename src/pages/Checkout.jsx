import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { buildOrderPayload, createOrderId, createPaymentId, saveOrder } from '../utils/orders';
import { API_BASE_URL } from '../utils/apiClient';
const onlinePaymentsEnabled = import.meta.env.VITE_ENABLE_ONLINE_PAYMENT === 'true';

const parseJsonResponse = async (response) => {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return { text };
  }
};

const buildFetchErrorMessage = (error, fallback) => {
  if (!error) return fallback;
  if (error.message === 'Failed to fetch') {
    return `Network error: unable to reach backend at ${API_BASE_URL}. Check that the backend is running and CORS is configured correctly.`;
  }
  return error.message || fallback;
};

const validateName = (value) => {
  const trimmed = value.trim();
  return trimmed.length >= 3 && /^[A-Za-z ]+$/.test(trimmed);
};

const validatePhone = (value) => {
  return /^[0-9]{10}$/.test(value);
};

const validateEmail = (value) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
};

const validateAddress = (value) => {
  return value.trim().length >= 10;
};

const validatePin = (value) => {
  return /^[0-9]{6}$/.test(value);
};

export default function CheckoutPage() {
  const { cartItems, subtotal, deliveryCharge, finalTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', pin: '', city: '', state: '' });
  const [placingOrder, setPlacingOrder] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [touched, setTouched] = useState({ name: false, phone: false, email: false, address: false, pin: false });
  const [pinStatus, setPinStatus] = useState('idle');
  const [pinError, setPinError] = useState('');
  const [pinLoading, setPinLoading] = useState(false);
  const navigate = useNavigate();

  const orderId = useMemo(() => createOrderId(), []);
  const paymentId = useMemo(() => createPaymentId(), []);
  const discount = useMemo(() => (subtotal >= 1200 ? 75 : 0), [subtotal]);
  const payableTotal = useMemo(() => finalTotal - discount, [finalTotal, discount]);
  const gst = useMemo(() => Math.round((payableTotal || 0) * 0.05), [payableTotal]);
  const totalAmount = useMemo(() => Number((payableTotal + gst).toFixed(2)), [payableTotal, gst]);
  const estimatedDelivery = '2-4 business days';

  const isFormValid = useMemo(() => {
    return (
      validateName(form.name) &&
      validatePhone(form.phone) &&
      validateEmail(form.email) &&
      validateAddress(form.address) &&
      validatePin(form.pin) &&
      !!form.city &&
      !!form.state &&
      pinStatus === 'valid'
    );
  }, [form, pinStatus]);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const updatePhone = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    updateField('phone', digits);
  };

  const updatePin = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 6);
    updateField('pin', digits);
    if (pinStatus !== 'idle') {
      setPinStatus('idle');
      setPinError('');
      setForm((prev) => ({ ...prev, city: '', state: '' }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const fetchPinDetails = async (pin) => {
    if (!validatePin(pin)) {
      setPinError('Invalid PIN Code');
      setPinStatus('invalid');
      setForm((prev) => ({ ...prev, city: '', state: '' }));
      return;
    }

    setPinLoading(true);
    setPinError('');
    setPinStatus('loading');

    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const data = await response.json();
      const result = Array.isArray(data) && data[0];
      if (!result || result.Status !== 'Success' || !Array.isArray(result.PostOffice) || result.PostOffice.length === 0) {
        setPinError('Invalid PIN Code');
        setPinStatus('invalid');
        setForm((prev) => ({ ...prev, city: '', state: '' }));
      } else {
        const postOffice = result.PostOffice[0];
        setForm((prev) => ({ ...prev, city: postOffice.District || '', state: postOffice.State || '' }));
        setPinStatus('valid');
        setPinError('');
      }
    } catch (err) {
      console.error('PIN lookup failed', err);
      setPinError('Invalid PIN Code');
      setPinStatus('invalid');
      setForm((prev) => ({ ...prev, city: '', state: '' }));
    } finally {
      setPinLoading(false);
    }
  };

  useEffect(() => {
    const pendingPayment = sessionStorage.getItem('lion-spices-pending-order');
    if (!pendingPayment) {
      return;
    }

    try {
      const parsed = JSON.parse(pendingPayment);
      sessionStorage.removeItem('lion-spices-pending-order');
      const emailParam = parsed.email || parsed.orderPayload?.customer?.email || '';
      navigate(
        `/order-success?order=${parsed.orderPayload.orderId}&payment=${parsed.paymentReference || parsed.orderPayload.paymentId}&method=${encodeURIComponent(parsed.orderPayload.paymentMethod)}&provider=${encodeURIComponent(parsed.provider || 'upi')}${emailParam ? `&email=${encodeURIComponent(emailParam)}` : ''}`
      );
    } catch {
      sessionStorage.removeItem('lion-spices-pending-order');
    }
  }, [navigate]);

  const finalizeOrder = async (orderPayload, paymentReference, provider, redirectToSuccess = true, providerOrderId) => {
    try {
      const url = `${API_BASE_URL}/api/orders/complete`;
      const completionResponse = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderPayload, paymentReference, provider, providerOrderId }),
      });
      const completionData = await parseJsonResponse(completionResponse);
      if (!completionResponse.ok) {
        const serverMessage = completionData?.error || completionData?.message || completionResponse.statusText;
        throw new Error(`Backend error: ${serverMessage || 'Order completion failed.'}`);
      }
      if (!completionData?.success) {
        const serverMessage = completionData?.error || completionData?.message || 'Order completion returned an unexpected response.';
        throw new Error(`Backend error: ${serverMessage}`);
      }
      saveOrder(orderPayload);
      sessionStorage.setItem('lion-spices-last-order', JSON.stringify({ orderPayload, email: orderPayload.customer.email }));
    } catch (error) {
      if (redirectToSuccess) {
        setPaymentError(buildFetchErrorMessage(error, 'Unable to complete the order.'));
        setPlacingOrder(false);
        return;
      }
    }

    if (!redirectToSuccess) {
      return;
    }

    clearCart();
    sessionStorage.setItem('lion-spices-last-order', JSON.stringify({ orderPayload, email: orderPayload.customer.email }));
    navigate(`/order-success?order=${orderPayload.orderId}&payment=${paymentReference || orderPayload.paymentId}&method=${encodeURIComponent(orderPayload.paymentMethod)}&provider=${encodeURIComponent(provider || 'upi')}&email=${encodeURIComponent(orderPayload.customer.email)}`);
  };

  const loadRazorpayScript = () => new Promise((resolve) => {
    if (window.Razorpay) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.body.appendChild(script);
  });

  const handlePlaceOrder = async () => {
    setTouched({ name: true, phone: true, email: true, address: true, pin: true });
    if (!isFormValid) {
      setPaymentError('Please fill in valid delivery details before placing the order.');
      return;
    }

    setPlacingOrder(true);
    setPaymentError('');

    const grandTotal = totalAmount;
    const orderPayload = buildOrderPayload({
      customer: { ...form },
      items: cartItems,
      subtotal,
      deliveryCharge,
      discount,
      payableTotal,
      gst,
      grandTotal,
      paymentMethod,
      orderId,
      paymentId,
      estimatedDelivery,
    });

    try {
      if (paymentMethod === 'Cash on Delivery' || !onlinePaymentsEnabled) {
        await finalizeOrder(orderPayload, 'COD', 'cod');
        return;
      }

      const createUrl = `${API_BASE_URL}/api/orders/create`;
      const response = await fetch(createUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: grandTotal, currency: 'INR', orderId, customer: form, paymentMethod }),
      });
      const data = await parseJsonResponse(response);
      if (!response.ok) {
        const serverMessage = data?.error || data?.message || response.statusText;
        throw new Error(`Backend error: ${serverMessage || 'Payment setup failed.'}`);
      }
      if (!data?.success) {
        throw new Error(data?.message || data?.error || 'Payment setup failed. Please try again.');
      }

      if (data.provider === 'upi') {
        const pending = { orderPayload, provider: 'upi', paymentReference: data.upiLink, email: form.email };
        sessionStorage.setItem('lion-spices-pending-order', JSON.stringify(pending));
        window.location.href = data.upiLink;
        return;
      }

      if (data.provider === 'razorpay') {
        await loadRazorpayScript();
        if (!window.Razorpay) {
          throw new Error('Razorpay checkout failed to load.');
        }

        const rzp = new window.Razorpay({
          key: data.key,
          amount: data.amount,
          currency: data.currency,
          order_id: data.orderId,
          name: 'Lion Spices',
          description: `Order ${orderId}`,
          prefill: { name: form.name, email: form.email, contact: form.phone },
          theme: { color: '#b91c1c' },
          handler: async (response) => {
            try {
              const verifyResponse = await fetch(`${API_BASE_URL}/api/orders/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ order_id: data.orderId, payment_id: response.razorpay_payment_id, signature: response.razorpay_signature }),
              });
              const verifyData = await verifyResponse.json();
              if (!verifyResponse.ok || !verifyData?.success) {
                throw new Error(verifyData?.message || 'Payment could not be verified.');
              }
              await finalizeOrder(orderPayload, response.razorpay_payment_id, 'razorpay', true, data.orderId);
            } catch (paymentError) {
              setPaymentError(paymentError.message || 'Payment verification failed.');
            } finally {
              setPlacingOrder(false);
            }
          },
          modal: {
            ondismiss: () => {
              setPlacingOrder(false);
            },
          },
        });

        rzp.open();
      }
    } catch (err) {
      const message = err.message || 'Unable to process payment. Please try again.';
      setPaymentError(message);
      toast.error(message);
      setPlacingOrder(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <main className="page-shell-compact bg-cream">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[32px] bg-white p-10 text-center shadow-[0_18px_45px_-24px_rgba(0,0,0,0.35)]">
            <p className="text-sm uppercase tracking-[0.28em] text-primary-red">Checkout</p>
            <h1 className="mt-4 text-4xl font-bold text-gray-900">Your cart is empty</h1>
            <p className="mt-3 text-sm text-gray-600">Add spices to your cart before completing your order.</p>
            <Link to="/products" className="mt-6 inline-flex rounded-full bg-primary-red px-6 py-3 text-sm font-semibold text-white hover:bg-red-700">Browse Products</Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell-compact">
      <section className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <article className="rounded-[24px] border border-gray-200 bg-white p-6 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.28)] sm:p-8">
          <p className="chip text-primary-red">Checkout</p>
          <h1 className="mt-3 text-3xl font-semibold text-gray-900">Complete your order</h1>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="text-sm text-gray-700">
              <span className="mb-1 block">Full Name</span>
              <input value={form.name} onChange={(e) => updateField('name', e.target.value)} onBlur={() => handleBlur('name')} className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-primary-red focus:ring-2 focus:ring-red-100" />
              {touched.name && !validateName(form.name) ? <p className="mt-2 text-sm text-red-600">Please enter a valid full name (letters and spaces only, min 3 characters).</p> : null}
            </label>
            <label className="text-sm text-gray-700">
              <span className="mb-1 block">Mobile Number</span>
              <input value={form.phone} onChange={(e) => updatePhone(e.target.value)} onBlur={() => handleBlur('phone')} inputMode="numeric" className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-primary-red focus:ring-2 focus:ring-red-100" />
              {touched.phone && !validatePhone(form.phone) ? <p className="mt-2 text-sm text-red-600">Please enter a valid 10-digit mobile number.</p> : null}
            </label>
            <label className="text-sm text-gray-700 md:col-span-2">
              <span className="mb-1 block">Email</span>
              <input type="email" value={form.email} onChange={(e) => updateField('email', e.target.value)} onBlur={() => handleBlur('email')} className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-primary-red focus:ring-2 focus:ring-red-100" />
              {touched.email && !validateEmail(form.email) ? <p className="mt-2 text-sm text-red-600">Please enter a valid email address.</p> : null}
            </label>
            <label className="text-sm text-gray-700 md:col-span-2">
              <span className="mb-1 block">Delivery Address</span>
              <textarea value={form.address} onChange={(e) => updateField('address', e.target.value)} onBlur={() => handleBlur('address')} rows={4} placeholder="House No, Street, Area, Landmark" className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-primary-red focus:ring-2 focus:ring-red-100" />
              {touched.address && !validateAddress(form.address) ? <p className="mt-2 text-sm text-red-600">Please enter a delivery address with at least 10 characters.</p> : null}
            </label>
            <label className="text-sm text-gray-700">
              <span className="mb-1 block">PIN Code</span>
              <input value={form.pin} onChange={(e) => updatePin(e.target.value)} onBlur={() => { handleBlur('pin'); fetchPinDetails(form.pin); }} inputMode="numeric" className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-primary-red focus:ring-2 focus:ring-red-100" />
              {touched.pin && pinStatus === 'invalid' ? <p className="mt-2 text-sm text-red-600">Invalid PIN Code</p> : null}
            </label>
            <label className="text-sm text-gray-700">
              <span className="mb-1 block">City</span>
              <input readOnly value={form.city} className="w-full rounded-2xl border border-gray-200 bg-gray-100 px-4 py-3 outline-none" />
            </label>
            <label className="text-sm text-gray-700">
              <span className="mb-1 block">State</span>
              <input readOnly value={form.state} className="w-full rounded-2xl border border-gray-200 bg-gray-100 px-4 py-3 outline-none" />
            </label>
          </div>

          <div className="mt-6 rounded-[20px] border border-gray-100 bg-gray-50 p-4">
            <h2 className="text-xl font-semibold text-gray-900">Payment Method</h2>
            <div className="mt-3 flex flex-wrap gap-3">
              <button type="button" onClick={() => setPaymentMethod('Cash on Delivery')} className={`rounded-full px-4 py-2 text-sm font-semibold ${paymentMethod === 'Cash on Delivery' ? 'bg-primary-red text-white' : 'bg-white text-gray-700 border border-gray-200'}`}>Cash on Delivery</button>
            </div>
            <p className="mt-3 text-sm text-gray-600">Pay in cash when your order arrives at the delivery address.</p>
          </div>
          {paymentError ? <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{paymentError}</p> : null}
        </article>

        <aside className="rounded-[24px] border border-gray-200 bg-white p-6 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.28)] sm:p-8">
          <h2 className="text-2xl font-semibold text-gray-900">Order summary</h2>
          <div className="mt-5 space-y-3 text-sm text-gray-700">
            {cartItems.map((item) => (
              <div key={`${item._id}-${item.selectedWeight}`} className="flex items-start justify-between gap-4 rounded-[18px] bg-gray-50 p-3">
                <div>
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <p>{item.selectedWeight} × {item.quantity}</p>
                </div>
                <strong>₹{item.price * item.quantity}</strong>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-3 text-sm text-gray-700">
            <div className="flex justify-between"><span>Subtotal</span><strong>₹{subtotal}</strong></div>
            <div className="flex justify-between"><span>GST</span><strong>₹{gst}</strong></div>
            <div className="flex justify-between"><span>Delivery</span><strong>₹{deliveryCharge}</strong></div>
            <div className="flex justify-between"><span>Discount</span><strong>-₹{discount}</strong></div>
            <div className="flex justify-between border-t border-gray-100 pt-3 text-base font-semibold text-gray-900"><span>Grand Total</span><strong>₹{payableTotal + gst}</strong></div>
          </div>
          <button onClick={handlePlaceOrder} disabled={!isFormValid || placingOrder} className="mt-6 w-full rounded-full bg-primary-red px-5 py-3 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70">{placingOrder ? 'Processing...' : 'Place Order'}</button>
          <Link to="/cart" className="mt-3 inline-flex text-sm font-semibold text-primary-red hover:text-red-700">Back to cart</Link>
        </aside>
      </section>
    </main>
  );
}
