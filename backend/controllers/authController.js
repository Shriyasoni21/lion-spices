import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendOtpEmail } from '../services/emailService.js';

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '7d';
const REFRESH_SECRET = process.env.REFRESH_SECRET || JWT_SECRET;
const REFRESH_EXPIRES = process.env.REFRESH_EXPIRES || '30d';
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 1000 * 60 * 60 * 24 * 7,
};
const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 1000 * 60 * 60 * 24 * 30,
};

const createAuthToken = (user) => jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
const createRefreshToken = (user) => jwt.sign({ id: user._id, type: 'refresh' }, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES });

const attachToken = (res, token) => {
  res.cookie('lion_spices_token', token, COOKIE_OPTIONS);
};
const attachRefreshToken = (res, refreshToken) => {
  res.cookie('lion_spices_refresh', refreshToken, REFRESH_COOKIE_OPTIONS);
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 1000 * 60 * 15);

    const user = await User.create({ name, email, passwordHash, phone, resetOtp: otp, resetOtpExpires: otpExpires });

    try {
      await sendOtpEmail(user.email, otp);
    } catch (e) {
      console.warn('OTP email failed', e.message);
    }

    const token = createAuthToken(user);
    attachToken(res, token);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    next(err);
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.resetOtp !== otp || !user.resetOtpExpires || user.resetOtpExpires < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.isVerified = true;
    user.resetOtp = null;
    user.resetOtpExpires = null;
    await user.save();

    res.json({ success: true, message: 'Email verified' });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = createAuthToken(user);
    const refreshToken = createRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save();

    attachToken(res, token);
    attachRefreshToken(res, refreshToken);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res) => {
  res.clearCookie('lion_spices_token', { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' });
  res.clearCookie('lion_spices_refresh', { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' });
  if (req.user) {
    await User.findByIdAndUpdate(req.user._id, { refreshToken: null });
  }
  res.json({ success: true });
};

export const refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.lion_spices_refresh;
    if (!refreshToken) return res.status(401).json({ message: 'Refresh token missing' });

    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
    if (decoded.type !== 'refresh') return res.status(401).json({ message: 'Invalid refresh token' });

    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) return res.status(401).json({ message: 'Refresh token invalid' });

    const token = createAuthToken(user);
    const newRefreshToken = createRefreshToken(user);
    user.refreshToken = newRefreshToken;
    await user.save();

    attachToken(res, token);
    attachRefreshToken(res, newRefreshToken);
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 1000 * 60 * 15);
    user.resetOtp = otp;
    user.resetOtpExpires = otpExpires;
    await user.save();

    try {
      await sendOtpEmail(user.email, otp);
    } catch (e) {
      console.warn('OTP email failed', e.message);
    }

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.resetOtp !== otp || !user.resetOtpExpires || user.resetOtpExpires < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(newPassword, salt);
    user.resetOtp = null;
    user.resetOtpExpires = null;
    await user.save();

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    res.json({ user: req.user });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const allowed = ['name', 'phone', 'addresses'];
    const updates = Object.keys(req.body).reduce((acc, key) => {
      if (allowed.includes(key)) acc[key] = req.body[key];
      return acc;
    }, {});

    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-passwordHash');
    res.json({ user });
  } catch (err) {
    next(err);
  }
};
