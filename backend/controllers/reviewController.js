import Review from '../models/Review.js';
import Product from '../models/Product.js';

export const listReviews = async (req, res, next) => {
  try {
    const query = { product: req.query.productId }; 
    const reviews = await Review.find(query).sort({ createdAt: -1 }).populate('user', 'name');
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

export const createReview = async (req, res, next) => {
  try {
    const { productId, rating, title, comment } = req.body;
    if (!productId || !rating) return res.status(400).json({ message: 'Product and rating are required' });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const existing = await Review.findOne({ product: productId, user: req.user._id });
    if (existing) return res.status(400).json({ message: 'Review already submitted' });

    const review = await Review.create({
      product: productId,
      user: req.user._id,
      rating,
      title,
      comment,
    });

    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
};
