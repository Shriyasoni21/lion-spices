import React, { useMemo, useState } from 'react';
import ImageWithFallback from '../components/common/ImageWithFallback';
import { getProductImageSrc } from '../utils/imageHelpers';
import { apiFetch } from '../utils/apiClient';
import { getOrderLookupErrorMessage, validateEmailInput } from '../utils/orderLookup';

export default function MyOrdersPage() {
  const [email, setEmail] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const isEmailValid = useMemo(() => validateEmailInput(email) === '', [email]);

  const handleLookup = async (event) => {
    event.preventDefault();
    const trimmedEmail = email.trim();
    const emailError = validateEmailInput(trimmedEmail);

    if (emailError) {
      setError(emailError);
      setOrders([]);
      setSearched(true);
      setSuccessMessage('');
      return;
    }

    setLoading(true);
    setError('');
    setSearched(true);
    setSuccessMessage('');

    try {
      const payload = await apiFetch(`/api/orders/guest?email=${encodeURIComponent(trimmedEmail)}`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });

      const normalizedOrders = Array.isArray(payload?.orders)
        ? payload.orders
        : Array.isArray(payload)
          ? payload
          : [];

      setOrders(normalizedOrders);
      setSuccessMessage(normalizedOrders.length > 0 ? 'Your order has been found successfully.' : 'No orders found for this email.');
      if (normalizedOrders.length === 0) {
        setError('');
      }
    } catch (err) {
      console.error('Order lookup failed:', err);
      const friendlyMessage = getOrderLookupErrorMessage(err);
      setError(friendlyMessage);
      setOrders([]);
      setSuccessMessage('');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });

  const formatStatusTag = (status) => {
    const map = {
      Pending: 'bg-yellow-100 text-yellow-800',
      Confirmed: 'bg-green-100 text-green-800',
      Packed: 'bg-sky-100 text-sky-800',
      Shipped: 'bg-blue-100 text-blue-800',
      'Out for Delivery': 'bg-indigo-100 text-indigo-800',
      Delivered: 'bg-emerald-100 text-emerald-800',
      Cancelled: 'bg-red-100 text-red-800',
    };
    return map[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <main className="page-shell-compact bg-cream">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-gray-100 bg-white p-5 shadow-[0_18px_45px_-24px_rgba(0,0,0,0.25)] sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-red">My Orders</p>
          <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">Track your Lion Spices orders</h1>
          <p className="mt-3 text-sm text-gray-600 sm:text-base">Lookup your orders using the email address used during checkout.</p>

          <div className="mt-6 rounded-[24px] border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 sm:p-5">
            <p className="font-semibold text-gray-900">How it works</p>
            <ol className="mt-3 space-y-2 pl-5 text-gray-600">
              <li>1. Place your order on Lion Spices.</li>
              <li>2. Use the same email address during checkout.</li>
              <li>3. Lookup your orders quickly on this page.</li>
              <li>4. View order details and status instantly.</li>
            </ol>
          </div>

          <form onSubmit={handleLookup} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="flex-1 min-w-0">
              <span className="sr-only">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`w-full rounded-2xl border bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary-red focus:ring-2 focus:ring-red-100 ${!isEmailValid && email ? 'border-red-300' : 'border-gray-200'}`}
              />
            </label>
            <button type="submit" disabled={loading || !isEmailValid} className="rounded-full bg-primary-red px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? 'Searching...' : 'Lookup Orders'}
            </button>
          </form>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            {successMessage ? <p className="text-sm text-emerald-600">{successMessage}</p> : null}
          </div>

          {loading ? (
            <div className="mt-5 rounded-[24px] border border-gray-100 bg-gray-50 p-6 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-red border-t-transparent" />
                <span>Searching for your orders...</span>
              </div>
            </div>
          ) : null}

          {searched && !loading && orders.length === 0 && !error && !successMessage && (
            <p className="mt-3 text-sm text-gray-600">No orders found for this email address.</p>
          )}
        </div>

        <div className="mt-6 space-y-4">
          {orders.map((order) => (
            <article key={order.orderId} className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.2)]">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-red">{order.status}</p>
                    <h2 className="mt-2 text-xl font-semibold text-gray-900">Order {order.orderId}</h2>
                    <p className="mt-1 text-sm text-gray-600">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p><span className="font-semibold text-gray-900">Payment:</span> {order.paymentMethod || (order.provider === 'cod' ? 'Cash on Delivery' : 'UPI')}</p>
                    <p><span className="font-semibold text-gray-900">ETA:</span> {order.estimatedDelivery || '2-4 business days'}</p>
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  {(order.items || []).map((item) => (
                    <div key={`${order.orderId}-${item.productId || item.title}-${item.selectedWeight}`} className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3 text-sm text-gray-700">
                      <div className="flex items-center gap-3">
                        <ImageWithFallback src={getProductImageSrc(item)} alt={item.title} className="h-14 w-14 rounded-xl object-contain" loading="lazy" />
                        <span>{item.title} × {item.quantity}</span>
                      </div>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid gap-3 border-t border-gray-100 pt-4 sm:grid-cols-[1fr_auto]">
                  <div className="space-y-2">
                    <div className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${formatStatusTag(order.status)}`}>{order.status}</div>
                    <p className="text-sm text-gray-600">Placed on {formatDate(order.createdAt)}</p>
                  </div>
                  <div className="space-y-2 text-right">
                    <p className="text-sm font-semibold text-gray-900">Grand Total: ₹{order.grandTotal}</p>
                    <a href={`/order-success?order=${encodeURIComponent(order.orderId)}&payment=${encodeURIComponent(order.paymentId || order.providerOrderId || 'N/A')}&method=${encodeURIComponent(order.paymentMethod || 'UPI')}&provider=${encodeURIComponent(order.provider || 'upi')}&email=${encodeURIComponent(order.customer?.email || '')}`} className="inline-flex rounded-full bg-primary-red px-4 py-2 text-sm font-semibold text-white hover:bg-red-700">
                      View Order
                    </a>
                  </div>
                </div>
              </article>
          ))}
        </div>
      </section>
    </main>
  );
}
