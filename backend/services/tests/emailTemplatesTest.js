import { orderConfirmationTemplate } from '../templates/orderConfirmationTemplate.js';
import { invoiceTemplate } from '../templates/invoiceTemplate.js';
import { paymentSuccessTemplate } from '../templates/paymentSuccessTemplate.js';
import { paymentFailedTemplate } from '../templates/paymentFailedTemplate.js';
import { orderShippingTemplate } from '../templates/orderShippingTemplate.js';
import { orderDeliveredTemplate } from '../templates/orderDeliveredTemplate.js';
import { contactReplyTemplate } from '../templates/contactReplyTemplate.js';
import { adminNotificationTemplate } from '../templates/adminNotificationTemplate.js';
import { contactAdminNotificationTemplate } from '../templates/contactAdminNotificationTemplate.js';

const sampleOrder = {
  orderId: 'SPICE1234',
  invoiceNumber: 'INV-1234',
  createdAt: new Date().toISOString(),
  customer: {
    name: 'Asha Patel',
    email: 'asha@example.com',
    phone: '9000000000',
    address: '42 Spice Lane',
    city: 'Mumbai',
    state: 'MH',
    pin: '400001',
  },
  items: [
    { title: 'Red Chilli Powder', price: 160, quantity: 2 },
    { title: 'Turmeric Powder', price: 135, quantity: 1 },
  ],
  subtotal: 455,
  gst: 41,
  deliveryCharge: 20,
  discount: 0,
  grandTotal: 516,
  paymentMethod: 'Razorpay',
  paymentStatus: 'Paid',
  estimatedDelivery: '2-4 business days',
  providerOrderId: 'order_ABC123',
  paymentId: 'pay_ABC123',
  tracking: 'SPICE123TRACK',
};

const sampleContact = {
  name: 'Rohan Singh',
  email: 'rohan@example.com',
  phone: '9876543210',
  message: 'I would like a gift wrap option on my next order.',
};

const siteUrl = 'https://www.lionspices.com';
const supportEmail = 'support@lionspices.com';
const logoUrl = `${siteUrl}/images/logo.jpg`;

const validateHtml = (html, name) => {
  if (!html || typeof html !== 'string') throw new Error(`${name} did not return a string`);
  const trimmed = html.trim();
  if (!trimmed.startsWith('<!DOCTYPE html>')) throw new Error(`${name} did not return valid HTML`);
  const lower = trimmed.toLowerCase();
  if (lower.includes('undefined') || lower.includes('null')) {
    throw new Error(`${name} contains undefined or null values`);
  }
};

const tests = [
  { name: 'Order Confirmation', html: orderConfirmationTemplate({ order: sampleOrder, siteUrl, supportEmail, logoUrl }) },
  { name: 'Invoice', html: invoiceTemplate({ order: sampleOrder, siteUrl, supportEmail, logoUrl }) },
  { name: 'Payment Success', html: paymentSuccessTemplate({ order: sampleOrder, siteUrl, supportEmail, logoUrl }) },
  { name: 'Payment Failed', html: paymentFailedTemplate({ order: sampleOrder, reason: 'Card declined', siteUrl, supportEmail, logoUrl }) },
  { name: 'Order Shipped', html: orderShippingTemplate({ order: sampleOrder, courierName: 'Spice Express', siteUrl, supportEmail, logoUrl }) },
  { name: 'Order Delivered', html: orderDeliveredTemplate({ order: sampleOrder, siteUrl, supportEmail, logoUrl }) },
  { name: 'Contact Reply', html: contactReplyTemplate({ contact: sampleContact, siteUrl, supportEmail, logoUrl }) },
  { name: 'Admin Order Notification', html: adminNotificationTemplate({ order: sampleOrder, siteUrl, supportEmail, logoUrl, type: 'order' }) },
  { name: 'Admin Payment Notification', html: adminNotificationTemplate({ order: sampleOrder, siteUrl, supportEmail, logoUrl, type: 'payment' }) },
  { name: 'Admin Contact Notification', html: contactAdminNotificationTemplate({ contact: sampleContact, siteUrl, supportEmail, logoUrl }) },
];

for (const test of tests) {
  validateHtml(test.html, test.name);
  console.log(`${test.name} template validated`);
}

console.log('EMAIL SYSTEM COMPLETE');
