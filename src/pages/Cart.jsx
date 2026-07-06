import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { useCart } from '../context/CartContext';
import { imageAssets } from '../config/imageAssets';
import ImageWithFallback from '../components/common/ImageWithFallback';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, subtotal, deliveryCharge, finalTotal, clearCart } = useCart();
  const [form, setForm] = useState({ name: '', phone: '', address: '', note: '' });
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [placedOrder, setPlacedOrder] = useState(null);

  const discount = useMemo(() => (subtotal >= 1200 ? 75 : 0), [subtotal]);
  const payableTotal = useMemo(() => finalTotal - discount, [finalTotal, discount]);

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;

    const generatedOrderId = `LS-${Date.now().toString().slice(-6)}`;
    setPlacedOrder({
      items: cartItems,
      subtotal,
      deliveryCharge,
      discount,
      payableTotal,
      paymentMethod,
      form,
      orderId: generatedOrderId,
    });
    setOrderId(generatedOrderId);
    setOrderPlaced(true);
    clearCart();
  };

  const handleDownloadInvoice = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.text('Lion Spices Invoice', 14, 18);
    doc.setFont('helvetica', 'normal');
    doc.text(`Order ID: ${orderId}`, 14, 28);
    const currentOrder = placedOrder || {
      items: cartItems,
      subtotal,
      deliveryCharge,
      discount,
      payableTotal,
      paymentMethod,
      form,
      orderId,
    };

    doc.text(`Customer: ${currentOrder.form.name || 'Guest'}`, 14, 36);
    doc.text(`Payment: ${currentOrder.paymentMethod}`, 14, 44);
    doc.text('Items:', 14, 56);

    let y = 64;
    currentOrder.items.forEach((item) => {
      doc.text(`• ${item.title} (${item.selectedWeight}) x ${item.quantity} = ₹${item.price * item.quantity}`, 18, y);
      y += 8;
    });

    doc.text(`Subtotal: ₹${currentOrder.subtotal}`, 14, y + 8);
    doc.text(`Delivery: ₹${currentOrder.deliveryCharge}`, 14, y + 16);
    doc.text(`Discount: -₹${currentOrder.discount}`, 14, y + 24);
    doc.text(`Total: ₹${currentOrder.payableTotal}`, 14, y + 32);

    doc.save(`${currentOrder.orderId || 'lion-spices'}-invoice.pdf`);
  };

  return (
    <main className="pt-28 bg-cream pb-16 text-gray-900">
      <section className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div className="space-y-8">
          <div className="rounded-[32px] bg-white p-6 shadow-[0_18px_45px_-24px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <ImageWithFallback src={imageAssets.logo.main} alt="Lion Spices logo" className="h-[42px] md:h-[60px] w-auto object-contain shadow-sm" loading="lazy" />
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-primary-red">Cart & Checkout</p>
                  <h1 className="mt-2 text-3xl font-bold text-gray-900">Complete your spice order</h1>
                </div>
              </div>
              <button onClick={clearCart} className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100">Clear Cart</button>
            </div>

            <div className="mt-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-4 rounded-[28px] border border-dashed border-gray-200 bg-gray-50 p-10 text-center text-gray-500">
                  <span className="text-6xl">🛒</span>
                  <div className="space-y-2">
                    <p className="text-xl font-semibold text-gray-900">Your Cart is Empty</p>
                    <p className="text-sm text-gray-500">Explore our premium spices and start shopping.</p>
                  </div>
                  <Link to="/products" className="inline-flex rounded-full bg-primary-red px-6 py-3 text-sm font-semibold text-white hover:bg-red-700 transition">
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                cartItems.map((item) => (
                  <article key={`${item.id}-${item.selectedWeight}`} className="flex flex-col gap-4 rounded-[28px] border border-gray-100 bg-gray-50 p-4 md:flex-row md:items-center">
                    <ImageWithFallback src={item.image} alt={item.title} className="h-24 w-24 rounded-[22px] object-cover" loading="lazy" />
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-gray-900">{item.title}</h2>
                      <p className="mt-1 text-sm text-gray-500">Weight: {item.selectedWeight}</p>
                      <p className="mt-1 text-sm text-gray-500">₹{item.price} each</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => updateQuantity(item.id, item.selectedWeight, -1)} className="h-9 w-9 rounded-full bg-white text-lg font-semibold text-gray-700 shadow-sm hover:bg-primary-red hover:text-white">−</button>
                      <span className="min-w-[1.8rem] text-center text-sm font-semibold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.selectedWeight, 1)} className="h-9 w-9 rounded-full bg-white text-lg font-semibold text-gray-700 shadow-sm hover:bg-primary-red hover:text-white">+</button>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-primary-red">₹{item.price * item.quantity}</p>
                      <button onClick={() => removeFromCart(item.id, item.selectedWeight)} className="mt-2 text-sm font-semibold text-red-600 hover:text-red-700">Remove</button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>

          <div className="rounded-[32px] bg-white p-6 shadow-[0_18px_45px_-24px_rgba(0,0,0,0.35)]">
            <h2 className="text-2xl font-bold text-gray-900">Delivery details</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-gray-700">Full name
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3" placeholder="Aarav Sharma" />
              </label>
              <label className="text-sm font-medium text-gray-700">Phone number
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3" placeholder="98765 43210" />
              </label>
              <label className="text-sm font-medium text-gray-700 md:col-span-2">Delivery address
                <textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} rows="3" className="mt-1 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3" placeholder="House no., street, city, pincode" />
              </label>
              <label className="text-sm font-medium text-gray-700 md:col-span-2">Delivery notes
                <textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} rows="2" className="mt-1 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3" placeholder="Leave at the gate / ring the bell" />
              </label>
            </div>
          </div>
        </div>

        <aside className="space-y-8 rounded-[32px] bg-white p-6 shadow-[0_18px_45px_-24px_rgba(0,0,0,0.35)]">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Order summary</h2>
            <div className="mt-6 space-y-3 text-sm text-gray-700">
              <div className="flex items-center justify-between"><span>Subtotal</span><strong>₹{subtotal}</strong></div>
              <div className="flex items-center justify-between"><span>Delivery charge</span><strong>₹{deliveryCharge}</strong></div>
              <div className="flex items-center justify-between"><span>Discount</span><strong>-₹{discount}</strong></div>
              <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-base font-semibold text-gray-900"><span>Total</span><strong>₹{payableTotal}</strong></div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">Payment choice</h3>
            <div className="mt-4 grid gap-3">
              {['COD', 'UPI', 'Card'].map((option) => (
                <label key={option} className={`flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 ${paymentMethod === option ? 'border-primary-red bg-red-50' : 'border-gray-200 bg-gray-50'}`}>
                  <span className="text-sm font-semibold text-gray-800">{option === 'COD' ? 'Cash on delivery' : option === 'UPI' ? 'UPI / QR' : 'Card / Wallet'}</span>
                  <input type="radio" name="payment" checked={paymentMethod === option} onChange={() => setPaymentMethod(option)} className="h-4 w-4 text-primary-red focus:ring-primary-red" />
                </label>
              ))}
            </div>
          </div>

          {orderPlaced ? (
            <div className="rounded-[28px] border border-green-200 bg-green-50 p-5 text-sm text-green-800">
              <p className="text-base font-semibold">Order confirmed!</p>
              <p className="mt-1">Reference: {orderId}</p>
              <p className="mt-1">Your order is being prepared for delivery. Download the invoice below for your records.</p>
              <button onClick={handleDownloadInvoice} className="mt-4 w-full rounded-full bg-primary-red px-4 py-3 text-sm font-semibold text-white hover:bg-red-700">Download invoice PDF</button>
            </div>
          ) : (
            <button onClick={handlePlaceOrder} className="w-full rounded-full bg-primary-red px-5 py-3 text-sm font-semibold text-white hover:bg-red-700">Place order</button>
          )}

          <Link to="/products" className="inline-flex text-sm font-semibold text-primary-red hover:text-red-700">Continue shopping</Link>
        </aside>
      </section>
    </main>
  );
}
