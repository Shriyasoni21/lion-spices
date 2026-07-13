import Razorpay from 'razorpay';
import crypto from 'crypto';

const instance = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
  ? new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })
  : null;

export const createRazorpayOrder = async ({ amount, currency = 'INR', receipt }) => {
  if (!instance) throw new Error('Razorpay not configured');
  const order = await instance.orders.create({ amount: Math.round(Number(amount) * 100), currency, receipt });
  return order;
};

export const verifyRazorpaySignature = ({ order_id, payment_id, signature }) => {
  if (!process.env.RAZORPAY_KEY_SECRET) return false;
  const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(`${order_id}|${payment_id}`).digest('hex');
  return expected === signature;
};
