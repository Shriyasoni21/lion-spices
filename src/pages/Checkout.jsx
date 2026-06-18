import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CheckoutPage() {
  const { cartItems, subtotal, deliveryCharge, finalTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const navigate = useNavigate();

  const orderId = useMemo(() => `LS-${Math.floor(100000 + Math.random() * 900000)}`, []);

  const handlePlaceOrder = () => {
    clearCart();
    navigate(`/order-success?order=${orderId}`);
  };

  return (
    <main className="pt-28 bg-cream pb-16 text-gray-900">
      <section className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <article className="rounded-[32px] bg-white p-8 shadow-[0_18px_45px_-24px_rgba(0,0,0,0.35)]">
          <p className="text-sm uppercase tracking-[0.28em] text-primary-red">Checkout</p>
          <h1 className="mt-3 text-4xl font-bold text-gray-900">Complete your order</h1>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {['Full Name', 'Mobile Number', 'House/Flat Number', 'Street', 'Area', 'City', 'State', 'PIN Code'].map((label) => (
              <label key={label} className="text-sm text-gray-700">
                <span className="mb-1 block">{label}</span>
                <input className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-primary-red focus:ring-2 focus:ring-red-100" />
              </label>
            ))}
          </div>

          <div className="mt-6 rounded-[28px] bg-gray-50 p-4">
            <h2 className="text-xl font-semibold text-gray-900">Payment Method</h2>
            <div className="mt-3 flex flex-wrap gap-3">
              {['UPI', 'Debit/Credit Card', 'Net Banking', 'Cash on Delivery'].map((method) => (
                <button key={method} type="button" onClick={() => setPaymentMethod(method)} className={`rounded-full px-4 py-2 text-sm font-semibold ${paymentMethod === method ? 'bg-primary-red text-white' : 'bg-white text-gray-700 border border-gray-200'}`}>{method}</button>
              ))}
            </div>
            <p className="mt-3 text-sm text-gray-600">Payment placeholder: Razorpay / Stripe integration can be connected here.</p>
          </div>
        </article>

        <aside className="rounded-[32px] bg-white p-8 shadow-[0_18px_45px_-24px_rgba(0,0,0,0.35)]">
          <h2 className="text-2xl font-bold text-gray-900">Order summary</h2>
          <div className="mt-5 space-y-3 text-sm text-gray-700">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.selectedWeight}`} className="flex items-start justify-between gap-4 rounded-2xl bg-gray-50 p-3">
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
            <div className="flex justify-between"><span>Delivery</span><strong>₹{deliveryCharge}</strong></div>
            <div className="flex justify-between"><span>Discount</span><strong>₹0</strong></div>
            <div className="flex justify-between border-t border-gray-100 pt-3 text-base font-semibold text-gray-900"><span>Total</span><strong>₹{finalTotal}</strong></div>
          </div>
          <button onClick={handlePlaceOrder} className="mt-6 w-full rounded-full bg-primary-red px-5 py-3 text-sm font-semibold text-white hover:bg-red-700">Place Order</button>
          <Link to="/cart" className="mt-3 inline-flex text-sm font-semibold text-primary-red hover:text-red-700">Back to Cart</Link>
        </aside>
      </section>
    </main>
  );
}
