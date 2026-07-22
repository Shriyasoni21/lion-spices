import mongoose from 'mongoose';
import Order from '../models/Order.js';
import Payment from '../models/Payment.js';
import Product from '../models/Product.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { generateInvoiceBuffer } from '../services/invoiceService.js';
import { sendInvoiceEmail, sendOrderConfirmationEmail, sendPaymentSuccessEmail, sendNewOrderReceivedNotification, sendBusinessPaymentSuccessNotification } from '../services/emailService.js';

const onlinePaymentsEnabled = process.env.ENABLE_ONLINE_PAYMENT === 'true';
const razorpay = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
  ? new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })
  : null;

export const createOrder = async (req, res, next) => {
  try {
    const { amount, currency = 'INR', orderId, customer, items, paymentMethod } = req.body;
    if (!amount || !orderId) return res.status(400).json({ message: 'Amount and orderId required' });

    if (!onlinePaymentsEnabled) {
      return res.status(403).json({ success: false, message: 'Online payments are temporarily disabled. Please choose Cash on Delivery.' });
    }

    if (razorpay) {
      const created = await razorpay.orders.create({ amount: Math.round(Number(amount) * 100), currency, receipt: orderId });
      return res.json({ success: true, provider: 'razorpay', key: process.env.RAZORPAY_KEY_ID, orderId: created.id, amount: created.amount, currency: created.currency });
    }

    // fallback: return UPI link
    const upiId = process.env.UPI_ID || 'lionspices@upi';
    const link = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(customer?.name || 'Lion Spices')}&am=${Number(amount).toFixed(2)}&cu=INR&tn=Order%20${orderId}`;
    return res.json({ success: true, provider: 'upi', upiLink: link });
  } catch (err) {
    next(err);
  }
};

export const verifyPayment = async (req, res, next) => {
  try {
    if (!onlinePaymentsEnabled) {
      return res.status(403).json({ message: 'Online payments are temporarily disabled.' });
    }

    const { order_id, payment_id, signature, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const orderId = order_id || razorpay_order_id;
    const paymentId = payment_id || razorpay_payment_id;
    const signatureValue = signature || razorpay_signature;

    if (!orderId || !paymentId || !signatureValue) return res.status(400).json({ message: 'Missing verification params' });

    const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(`${orderId}|${paymentId}`).digest('hex');
    if (expected !== signatureValue) return res.status(400).json({ message: 'Invalid signature' });

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

export const completeOrder = async (req, res, next) => {
  try {
    console.log('Incoming Order Payload', JSON.stringify(req.body, null, 2));
    const { orderPayload, paymentReference, provider, providerOrderId } = req.body;
    if (!orderPayload || !orderPayload.orderId) return res.status(400).json({ message: 'Order payload required' });

    const existingOrder = await Order.findOne({ orderId: orderPayload.orderId });
    if (existingOrder) return res.status(400).json({ message: 'Order already completed' });

    const items = (orderPayload.items || []).map((item) => {
      const rawProductId = item._id ?? item.productId ?? item.id ?? '';
      const productId = rawProductId ? String(rawProductId) : undefined;
      return {
        productId,
        title: item.title || item.name || '',
        selectedWeight: item.selectedWeight || item.weight || '',
        price: Number(item.price) || 0,
        quantity: Number(item.quantity) || 1,
      };
    });

    const customer = orderPayload.customer || {};
    const order = await Order.create({
      orderId: orderPayload.orderId,
      providerOrderId: providerOrderId || orderPayload.providerOrderId,
      paymentId: paymentReference || orderPayload.paymentId,
      items,
      customer: {
        name: customer.name || '',
        email: customer.email || '',
        phone: customer.phone || '',
        address: customer.address || '',
        city: customer.city || '',
        state: customer.state || '',
        pin: customer.pin || customer.pincode || '',
        pincode: customer.pincode || customer.pin || '',
      },
      subtotal: orderPayload.subtotal,
      gst: orderPayload.gst || 0,
      deliveryCharge: orderPayload.deliveryCharge,
      discount: orderPayload.discount,
      grandTotal: orderPayload.grandTotal || orderPayload.payableTotal,
      paymentMethod: orderPayload.paymentMethod,
      status: provider === 'cod' ? 'Pending' : 'Confirmed',
      paymentStatus: provider === 'cod' ? 'Pending' : 'Paid',
      provider: provider || 'upi',
      estimatedDelivery: orderPayload.estimatedDelivery || '2-4 business days',
      tracking: provider === 'cod' ? 'Pending confirmation' : 'Payment received',
      invoiceNumber: `INV-${Date.now().toString().slice(-8)}`,
    });

    console.log('Order Saved Successfully');
    console.log('Sending Confirmation Email....');

    const itemsToUpdate = order.items || [];
    for (const item of itemsToUpdate) {
      if (!item.productId) continue;
      if (!mongoose.Types.ObjectId.isValid(item.productId)) continue;

      await Product.findByIdAndUpdate(item.productId, {
        $inc: {
          stock: item.quantity ? -item.quantity : 0,
          'variants.$[variant].stock': item.quantity ? -item.quantity : 0,
        },
      }, {
        arrayFilters: [{ 'variant.weight': item.selectedWeight }],
        new: true,
      });
    }

    if (order.paymentId && provider === 'razorpay') {
      await Payment.create({
        order: order._id,
        paymentId: order.paymentId,
        method: 'Razorpay',
        provider: 'razorpay',
        amount: order.grandTotal,
        currency: 'INR',
        status: 'Paid',
        raw: { providerOrderId, paymentReference },
      });
    }

    try {
      let pdfBuffer = null;
      try {
        pdfBuffer = await generateInvoiceBuffer(order);
      } catch (invoiceErr) {
        console.warn('Invoice generation failed, continuing without invoice attachment:', invoiceErr.message || invoiceErr);
      }

      const emailResults = await Promise.allSettled([
        pdfBuffer ? sendInvoiceEmail(order, pdfBuffer) : Promise.resolve(),
        sendOrderConfirmationEmail(order),
        sendNewOrderReceivedNotification(order),
        order.paymentStatus === 'Paid' ? sendBusinessPaymentSuccessNotification(order) : Promise.resolve(),
      ]);

      const failedEmails = emailResults.filter((result) => result.status === 'rejected');
      if (failedEmails.length) {
        console.warn(`Email Sending Failed (${failedEmails.length} email(s))`);
        failedEmails.forEach((result) => {
          console.warn('Reason:', result.reason?.message || result.reason || 'Unknown email error');
        });
        console.warn('Continuing Checkout Process');
      } else {
        console.log('Email Sent Successfully');
      }
    } catch (emailErr) {
      console.warn('Email Sending Failed');
      console.warn('Reason:', emailErr.message || emailErr);
      console.warn('Continuing Checkout Process');
    }

    res.json({ success: true, order });
  } catch (err) {
    next(err);
  }
};

export const getOrdersForUser = async (req, res, next) => {
  try {
    const userEmail = req.user?.email;
    if (!userEmail) return res.status(400).json({ message: 'User email required' });
    const orders = await Order.find({ 'customer.email': userEmail }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

export const getGuestOrders = async (req, res, next) => {
  try {
    const { email } = req.query;
    const trimmedEmail = typeof email === 'string' ? email.trim() : '';

    if (!trimmedEmail) {
      return res.status(400).json({ success: false, message: 'Email is required to lookup orders' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmedEmail)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
    }

    const orders = await Order.find({ 'customer.email': trimmedEmail }).sort({ createdAt: -1 });
    return res.json({ success: true, orders, count: orders.length });
  } catch (err) {
    next(err);
  }
};

export const getGuestOrderById = async (req, res, next) => {
  try {
    const { email } = req.query;
    const { orderId } = req.params;
    if (!email) return res.status(400).json({ message: 'Email is required to lookup order details' });
    const order = await Order.findOne({ orderId, 'customer.email': email });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    next(err);
  }
};

export const downloadInvoice = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const email = req.user?.email || req.query.email;

    if (!orderId) {
      return res.status(400).json({ message: 'Order ID is required' });
    }
    if (!req.user && !email) {
      return res.status(400).json({ message: 'Email is required to download the invoice' });
    }

    const query = { orderId };
    if (email) query['customer.email'] = email;

    const order = await Order.findOne(query);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (req.user && req.user.role !== 'admin' && order.customer.email !== req.user.email) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const pdfBuffer = await generateInvoiceBuffer(order);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${order.orderId}-invoice.pdf"`);
    res.send(pdfBuffer);
  } catch (err) {
    next(err);
  }
};

export const listOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const o = await Order.findOne({ orderId: req.params.orderId });
    if (!o) return res.status(404).json({ message: 'Order not found' });
    if (req.user?.role !== 'admin' && o.customer.email !== req.user?.email) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.json(o);
  } catch (err) {
    next(err);
  }
};
