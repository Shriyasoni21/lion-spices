import express from 'express';
import { listProducts, getProduct, createProduct, updateProduct, deleteProduct, getRelatedProducts } from '../controllers/productController.js';
import auth from '../middleware/auth.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', listProducts);
router.get('/:id/related', getRelatedProducts);
router.get('/:id', getProduct);
router.post('/', auth(true), upload.array('images', 6), createProduct);
router.put('/:id', auth(true), upload.array('images', 6), updateProduct);
router.delete('/:id', auth(true), deleteProduct);

export default router;
