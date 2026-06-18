import express from 'express';
import cors from 'cors';
import { products } from './src/data/productData.js';
import { testimonials } from './src/data/testimonialData.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

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

app.post('/api/checkout', (req, res) => {
  const { items, total, customer } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0 || !total || !customer?.name || !customer?.email) {
    return res.status(400).json({ status: 'error', message: 'Please provide order items, total amount, and customer details.' });
  }

  console.log('New checkout order:', { items, total, customer });

  res.json({ status: 'success', message: 'Your payment was successful and your Lion Spices order is confirmed.' });
});

app.listen(PORT, () => {
  console.log(`Lion Spices API server running on http://localhost:${PORT}`);
});
