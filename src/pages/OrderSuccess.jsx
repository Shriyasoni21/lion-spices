import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { imageAssets } from '../config/imageAssets.js';
import ImageWithFallback from '../components/common/ImageWithFallback';
import { generateInvoicePdf } from '../utils/invoice';
import { apiFetch, getApiUrl } from '../utils/apiClient';

export default function OrderSuccessPage() {
  const [params] = useSearchParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const orderId = params.get('order') || 'LS-000000';
  const paymentId = params.get('payment') || 'PAY-0000';
  const paymentMethod = params.get('method') || 'Cash on Delivery';
  const provider = params.get('provider') || 'cod';
  const email = params.get('email') || '';

  useEffect(() => {
    if (!email || !orderId) return;
    setLoading(true);
    apiFetch(`/api/orders/guest/${encodeURIComponent(orderId)}?email=${encodeURIComponent(email)}`)
      .then((data) => setOrder(data))
      .catch((err) => {
        console.warn('Unable to load order details', err);
        setError(err.message || 'Unable to retrieve full order details at this time.');
      })
      .finally(() => setLoading(false));
  }, [email, orderId]);

  const handleDownloadInvoice = async () => {
    if (!order?.orderId) {
      const invoiceOrder = {
        orderId,
        paymentId,
        paymentMethod,
        provider,
        customer: { name: 'Valued Customer', email },
        items: [],
        subtotal: 0,
        gst: 0,
        deliveryCharge: 0,
        discount: 0,
        grandTotal: 0,
        paymentStatus: 'Paid',
        status: 'Confirmed',
        createdAt: new Date().toISOString(),
      };
      generateInvoicePdf(invoiceOrder);
      return;
    }

    try {
      const invoiceUrl = getApiUrl(`/api/orders/${encodeURIComponent(order.orderId)}/invoice${email ? `?email=${encodeURIComponent(email)}` : ''}`);
      const response = await fetch(invoiceUrl, { method: 'GET' });
      if (!response.ok) {
        throw new Error('Unable to download invoice from server');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${order.orderId}-invoice.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Invoice download failed, falling back to client PDF', err);
      generateInvoicePdf(order);
    }
  };

  const getStatusMessage = () => {
    if (order?.provider === 'cod' || provider === 'cod') {
      return 'Your Cash on Delivery order is confirmed. Our team is preparing it for packing and dispatch.';
    }
    if (order?.paymentStatus === 'Paid' || paymentMethod !== 'Cash on Delivery') {
      return 'Your payment is confirmed and your order is now being processed for shipment.';
    }
    return 'Your order has been received and will be updated shortly.';
  };

  return (
    <main className="page-shell-compact bg-cream">
      <section className="mx-auto max-w-3xl rounded-[32px] bg-white p-10 text-center shadow-[0_18px_45px_-24px_rgba(0,0,0,0.35)]">
        <ImageWithFallback src={imageAssets.logo.main} alt="Lion Spices logo" className="mx-auto h-[42px] md:h-[60px] w-auto object-contain shadow-md" loading="lazy" />
        <p className="text-sm uppercase tracking-[0.28em] text-primary-red">Order confirmed</p>
        <h1 className="mt-3 text-4xl font-bold text-gray-900">Thank you for shopping with Lion Spices</h1>
        <p className="mt-4 text-gray-600">Your premium spices are on the way.</p>

        <div className="mt-6 grid gap-3 rounded-[24px] border border-gray-100 bg-gray-50 p-5 text-left text-sm text-gray-700 sm:grid-cols-2">
          <div><p className="font-semibold text-gray-900">Order ID</p><p>{order?.orderId || orderId}</p></div>
          <div><p className="font-semibold text-gray-900">Payment ID</p><p>{order?.paymentId || paymentId}</p></div>
          <div><p className="font-semibold text-gray-900">Status</p><p>{order?.status || 'Confirmed'}</p></div>
          <div><p className="font-semibold text-gray-900">Payment Method</p><p>{order?.paymentMethod || paymentMethod}</p></div>
          <div><p className="font-semibold text-gray-900">Estimated Delivery</p><p>{order?.estimatedDelivery || '2-4 business days'}</p></div>
          <div><p className="font-semibold text-gray-900">Provider</p><p>{order?.provider === 'razorpay' || provider === 'razorpay' ? 'Razorpay' : order?.provider === 'cod' || provider === 'cod' ? 'Cash on Delivery' : 'UPI / Wallet'}</p></div>
        </div>

        {loading && <p className="mt-4 text-sm text-gray-500">Loading order details…</p>}
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        {order?.items?.length > 0 && (
          <div className="mt-6 rounded-[24px] border border-gray-100 bg-white p-5 text-left text-sm text-gray-700">
            <h2 className="text-lg font-semibold text-gray-900">Order summary</h2>
            <div className="mt-4 space-y-2">
              {order.items.map((item) => (
                <div key={`${item.productId || item.title}-${item.selectedWeight}`} className="flex justify-between border-b border-gray-100 pb-3">
                  <span>{item.title} × {item.quantity}</span>
                  <strong>₹{item.price * item.quantity}</strong>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 rounded-[24px] border border-gray-100 bg-gray-50 p-5 text-left text-sm text-gray-700">
          <h2 className="text-lg font-semibold text-gray-900">Order update</h2>
          <p className="mt-4 text-sm leading-7 text-gray-600">{getStatusMessage()}</p>
          <div className="mt-4 rounded-2xl bg-white p-4 text-sm text-gray-700 shadow-sm">
            <p className="font-semibold text-gray-900">Current status</p>
            <p className="mt-2 text-sm text-gray-600">{order?.status || 'Confirmed'}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button onClick={handleDownloadInvoice} className="rounded-full bg-primary-red px-5 py-3 text-sm font-semibold text-white hover:bg-red-700">Download Invoice</button>
          <Link to="/my-orders" className="rounded-full border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100">View Orders</Link>
          <Link to="/products" className="rounded-full border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100">Continue Shopping</Link>
        </div>
      </section>
    </main>
  );
}
