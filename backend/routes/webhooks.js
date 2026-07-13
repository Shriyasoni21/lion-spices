import express from 'express';
import crypto from 'crypto';
import Order from '../models/Order.js';
import Payment from '../models/Payment.js';
import { sendPaymentSuccessEmail, sendBusinessPaymentSuccessNotification } from '../services/emailService.js';

const router = express.Router();

router.post('/razorpay', async (req, res) => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const rawBody = req.rawBody || req.body;

    if (!signature || !webhookSecret) {
      return res.status(400).json({ message: 'Missing webhook credentials' });
    }

    const expectedSignature = crypto.createHmac('sha256', webhookSecret).update(rawBody).digest('hex');
    if (expectedSignature !== signature.toString()) {
      return res.status(400).json({ message: 'Invalid webhook signature' });
    }

    const event = JSON.parse(rawBody.toString());
    const { payload, event: eventType } = event;

    if (eventType === 'payment.captured' || eventType === 'payment.authorized') {
      const paymentEntity = payload.payment.entity;
      const orderId = paymentEntity.order_id;
      const paymentStatus = paymentEntity.status;
      const razorpayPaymentId = paymentEntity.id;
      const amount = paymentEntity.amount / 100;
      const currency = paymentEntity.currency;

      const existingPayment = await Payment.findOne({ paymentId: razorpayPaymentId });
      if (existingPayment) {
        existingPayment.status = paymentStatus === 'captured' ? 'Paid' : 'Pending';
        existingPayment.raw = paymentEntity;
        await existingPayment.save();
      } else {
        const order = await Order.findOne({ providerOrderId: orderId });
        if (order) {
          await Payment.create({
            order: order._id,
            paymentId: razorpayPaymentId,
            method: 'Razorpay',
            provider: 'razorpay',
            amount,
            currency,
            status: paymentStatus === 'captured' ? 'Paid' : 'Pending',
            raw: paymentEntity,
          });
        }
      }

      if (paymentStatus === 'captured') {
        const order = await Order.findOneAndUpdate(
          { $or: [{ providerOrderId: orderId }, { orderId: orderId }] },
          { status: 'Confirmed', paymentId: razorpayPaymentId },
          { new: true }
        );
        if (order) {
          order.paymentStatus = 'Paid';
          await order.save();
          try {
            await sendPaymentSuccessEmail(order);
            await sendBusinessPaymentSuccessNotification(order);
          } catch (emailErr) {
            console.error('Webhook email notification failed', emailErr);
          }
        }
      }
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Webhook error', err);
    res.status(500).json({ success: false, message: 'Webhook processing failed' });
  }
});

export default router;
