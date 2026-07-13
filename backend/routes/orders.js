import express from 'express';
import { createOrder, verifyPayment, completeOrder, getOrdersForUser, listOrders, getOrderById, getGuestOrders, getGuestOrderById, downloadInvoice } from '../controllers/orderController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/create', createOrder);
router.post('/verify', verifyPayment);
router.post('/complete', completeOrder);
router.get('/guest', getGuestOrders);
router.get('/guest/:orderId', getGuestOrderById);
router.get('/:orderId/invoice', downloadInvoice);
router.get('/me', auth(), getOrdersForUser);
router.get('/', auth(true), listOrders);
router.get('/:orderId', auth(), getOrderById);

export default router;
