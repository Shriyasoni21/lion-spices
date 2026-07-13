import express from 'express';
import { submitContact } from '../controllers/contactController.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true, message: 'Contact endpoint is available. Use POST /api/contact to submit a message.' });
});

router.post('/', submitContact);

export default router;
