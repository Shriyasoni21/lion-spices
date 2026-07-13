import express from 'express';
import auth from '../middleware/auth.js';
import { listReviews, createReview } from '../controllers/reviewController.js';

const router = express.Router();

router.get('/', listReviews);
router.post('/', auth(), createReview);

export default router;
