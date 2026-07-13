import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import Razorpay from 'razorpay';
import { products } from './src/data/productData.js';
import { testimonials } from './src/data/testimonialData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

const razorpay = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
  ? new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })
  : null;

const transporter = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  : null;

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')));

const buildUpiLink = ({ amount, orderId, customer }) => {
  const upiId = process.env.UPI_ID || 'lionspices@upi';
  const name = encodeURIComponent(customer?.name || 'Lion Spices');
  const note = encodeURIComponent(`Order ${orderId}`);
  return `upi://pay?pa=${upiId}&pn=${name}&am=${Number(amount).toFixed(2)}&cu=INR&tn=${note}`;
};

const sendOrderEmail = async (orderPayload) => {
  if (!transporter || !orderPayload?.customer?.email) {
    return;
  }

  const mailOptions = {
    from: process.env.SMTP_FROM || 'support@lionspices.com',
    to: orderPayload.customer.email,
    subject: `Lion Spices Order ${orderPayload.orderId} Confirmed`,
    text: `Hello ${orderPayload.customer.name || 'there'},\n\nYour order ${orderPayload.orderId} has been confirmed.\nGrand total: ₹${orderPayload.grandTotal}.\nWe will share tracking details shortly.`,
  };

  await transporter.sendMail(mailOptions);
};

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/best-sellers', (req, res) => {
  const bestSellers = products.slice(0, 3);
  res.json(bestSellers);
});

app.get('/api/testimonials', (req, res) => {
  res.json(testimonials);
});

app.post('/api/contact', (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ status: 'error', message: 'Name, email and message are required.' });
  }

  console.log('New contact submission:', { name, email, phone, message });

  res.json({ status: 'success', message: 'Thanks for reaching out! We will get back to you shortly.' });
});

app.post('/api/create-order', async (req, res) => {
  const { amount, currency = 'INR', orderId, customer } = req.body;

  if (!amount || !orderId) {
    return res.status(400).json({ status: 'error', message: 'Amount and order ID are required.' });
  }

  if (razorpay) {
    try {
      const createdOrder = await razorpay.orders.create({
        amount: Math.round(Number(amount) * 100),
        currency,
        receipt: orderId,
        notes: {
          customerName: customer?.name || 'Guest',
          customerEmail: customer?.email || '',
        },
      });

      return res.json({
        success: true,
        provider: 'razorpay',
        key: process.env.RAZORPAY_KEY_ID,
        orderId: createdOrder.id,
        amount: createdOrder.amount,
        currency: createdOrder.currency,
      });
    } catch (error) {
      console.error('Razorpay order creation failed:', error);
    }
  }

  return res.json({
    success: true,
    provider: 'upi',
    upiLink: buildUpiLink({ amount, orderId, customer }),
  });
});

app.post('/api/verify-payment', async (req, res) => {
  const { order_id, payment_id, signature } = req.body;

  if (!order_id || !payment_id || !signature) {
    return res.status(400).json({ status: 'error', message: 'Payment verification data is incomplete.' });
  }

  if (!process.env.RAZORPAY_KEY_SECRET) {
    return res.json({ success: true, verified: true, provider: 'upi' });
  }

  const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(`${order_id}|${payment_id}`).digest('hex');
  const isValid = expectedSignature === signature;

  if (!isValid) {
    return res.status(400).json({ status: 'error', message: 'Payment signature could not be verified.' });
  }

  res.json({ success: true, verified: true, provider: 'razorpay' });
});

app.post('/api/complete-order', async (req, res) => {
  const { orderPayload, paymentReference } = req.body;

  if (!orderPayload?.orderId) {
    return res.status(400).json({ status: 'error', message: 'Order data is required.' });
  }

  try {
    await sendOrderEmail(orderPayload);
  } catch (error) {
    console.error('Order email failed:', error);
  }

  console.log('Order completed:', { orderId: orderPayload.orderId, paymentReference });
  res.json({ status: 'success', message: 'Your payment was successful and your Lion Spices order is confirmed.' });
});

app.post('/api/checkout', async (req, res) => {
  const { items, total, customer, orderPayload, paymentReference } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0 || !total || !customer?.name || !customer?.email) {
    return res.status(400).json({ status: 'error', message: 'Please provide order items, total amount, and customer details.' });
  }

  try {
    await sendOrderEmail(orderPayload || { customer, orderId: `LS-${Date.now()}`, grandTotal: total });
  } catch (error) {
    console.error('Checkout email failed:', error);
  }

  console.log('New checkout order:', { items, total, customer, paymentReference });

  res.json({ status: 'success', message: 'Your payment was successful and your Lion Spices order is confirmed.' });
});

app.listen(PORT, () => {
  console.log(`Lion Spices API server running on http://localhost:${PORT}`);
});
