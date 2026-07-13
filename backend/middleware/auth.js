import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

export default (requireAdmin = false) => async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : req.cookies?.lion_spices_token;
    if (!token) return res.status(401).json({ message: 'Missing authorization token' });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-passwordHash');
    if (!user) return res.status(401).json({ message: 'User not found' });

    if (requireAdmin && user.role !== 'admin') return res.status(403).json({ message: 'Admin required' });

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
