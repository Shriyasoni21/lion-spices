import express from 'express';
import auth from '../middleware/auth.js';
import { getCart, updateCart, clearCart } from '../controllers/cartController.js';

const router = express.Router();

router.get('/', auth(), getCart);
router.put('/', auth(), updateCart);
router.delete('/', auth(), clearCart);

export default router;
