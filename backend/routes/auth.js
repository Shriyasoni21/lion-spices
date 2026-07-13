import express from 'express';
import auth from '../middleware/auth.js';
import { register, login, logout, refreshToken, forgotPassword, resetPassword, verifyOtp, getProfile, updateProfile } from '../controllers/authController.js';

const router = express.Router();

router.get('/', (req, res) => res.json({ status: 'ok', message: 'Auth endpoint active' }));
router.post('/register', register);
router.post('/verify-otp', verifyOtp);
router.post('/login', login);
router.post('/refresh', refreshToken);
router.post('/logout', auth(), logout);
router.post('/forgot', forgotPassword);
router.post('/reset', resetPassword);
router.get('/profile', auth(), getProfile);
router.put('/profile', auth(), updateProfile);

export default router;
