import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    res.json(cart || { items: [] });
  } catch (err) {
    next(err);
  }
};

export const updateCart = async (req, res, next) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items)) return res.status(400).json({ message: 'Invalid cart items' });

    const normalized = items.map((item) => ({
      product: item.productId,
      title: item.title,
      selectedWeight: item.selectedWeight,
      price: item.price,
      quantity: item.quantity,
    }));

    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      { items: normalized, updatedAt: new Date() },
      { new: true, upsert: true }
    ).populate('items.product');

    res.json(cart);
  } catch (err) {
    next(err);
  }
};

export const clearCart = async (req, res, next) => {
  try {
    await Cart.findOneAndDelete({ user: req.user._id });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
