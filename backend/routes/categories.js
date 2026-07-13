import express from 'express';
import auth from '../middleware/auth.js';
import { listCategories, createCategory, updateCategory, deleteCategory } from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', listCategories);
router.post('/', auth(true), createCategory);
router.put('/:id', auth(true), updateCategory);
router.delete('/:id', auth(true), deleteCategory);

export default router;
