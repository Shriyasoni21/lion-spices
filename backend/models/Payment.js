import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  paymentId: { type: String, required: true, unique: true },
  method: { type: String, required: true },
  provider: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  status: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
  raw: Object,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);
