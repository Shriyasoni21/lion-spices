import ContactMessage from '../models/ContactMessage.js';
import { sendContactNotification, sendContactAutoReply } from '../services/emailService.js';

export const submitContact = async (req, res, next) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ message: 'Missing fields' });

    const saved = await ContactMessage.create({ name, email, phone, message });

    try {
      await sendContactNotification(saved);
      await sendContactAutoReply(saved);
    } catch (err) {
      console.warn('Contact emails failed', err.message);
    }

    res.json({ success: true, message: 'Thanks for reaching out. We will get back soon.' });
  } catch (err) {
    next(err);
  }
};
