import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import Order from '../models/Order.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function run() {
  const backendUrl = 'http://localhost:61857';
  const productsRes = await fetch(`${backendUrl}/api/products`);
  if (!productsRes.ok) {
    throw new Error(`Products fetch failed ${productsRes.status}`);
  }

  const productsBody = await productsRes.json();
  const products = Array.isArray(productsBody.products) ? productsBody.products : productsBody;
  if (!Array.isArray(products) || products.length === 0) {
    console.log('Products route body:', JSON.stringify(productsBody, null, 2));
    throw new Error('No products returned from /api/products');
  }

  const product = products[0];
  const selectedWeight = product.variants?.[0]?.weight || product.weight || '500g';
  const qty = 1;
  const orderId = `TEST-${Date.now()}`;
  const orderPayload = {
    orderId,
    paymentId: null,
    customer: {
      name: 'Test User',
      email: 'testuser@example.com',
      phone: '9999999999',
      address: '123 Test Lane',
      city: 'Test City',
      state: 'Test State',
      pin: '123456',
      country: 'India',
    },
    items: [
      {
        _id: product._id,
        title: product.title,
        selectedWeight,
        price: product.price,
        quantity: qty,
        image: product.image || product.images?.[0] || '',
      },
    ],
    subtotal: Number(product.price || 0) * qty,
    gst: 0,
    deliveryCharge: 49,
    discount: 0,
    grandTotal: Number(product.price || 0) * qty + 49,
    paymentMethod: 'Cash on Delivery',
    payableTotal: Number(product.price || 0) * qty + 49,
    estimatedDelivery: '2-4 business days',
  };

  console.log('Order payload to send:', JSON.stringify(orderPayload, null, 2));

  const completeRes = await fetch(`${backendUrl}/api/orders/complete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderPayload, provider: 'cod' }),
  });

  const completionData = await completeRes.json();
  console.log('Response status:', completeRes.status);
  console.log('Response body:', JSON.stringify(completionData, null, 2));

  if (!completeRes.ok) {
    throw new Error(`Order completion failed with status ${completeRes.status}`);
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('No MONGODB_URI configured');
  }

  await mongoose.connect(uri, { dbName: 'lionspices' });
  const order = await Order.findOne({ orderId }).lean().exec();
  console.log('Persisted order:', JSON.stringify(order, null, 2));
  await mongoose.disconnect();
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
