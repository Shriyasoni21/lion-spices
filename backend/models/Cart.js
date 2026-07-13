import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  title: String,
  selectedWeight: String,
  price: Number,
  quantity: { type: Number, default: 1 },
});

const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [CartItemSchema],
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema);
