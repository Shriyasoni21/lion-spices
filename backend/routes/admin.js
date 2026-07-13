import express from 'express';
import auth from '../middleware/auth.js';
import { createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';

const router = express.Router();

// Admin product CRUD - requires admin role
router.post('/product', auth(true), createProduct);
router.put('/product/:id', auth(true), updateProduct);
router.delete('/product/:id', auth(true), deleteProduct);

export default router;
