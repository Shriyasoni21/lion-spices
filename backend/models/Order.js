import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
  productId: { type: String },
  title: String,
  selectedWeight: String,
  price: Number,
  quantity: Number,
});

const OrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  providerOrderId: String,
  paymentId: String,
  items: [OrderItemSchema],
  customer: {
    name: String,
    email: String,
    phone: String,
    address: String,
    line2: String,
    city: String,
    state: String,
    pin: String,
    pincode: String,
    country: { type: String, default: 'India' },
  },
  subtotal: Number,
  gst: Number,
  deliveryCharge: Number,
  discount: Number,
  grandTotal: Number,
  paymentMethod: String,
  status: { type: String, enum: ['Pending', 'Confirmed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'], default: 'Pending' },
  paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
  provider: String,
  estimatedDelivery: String,
  tracking: String,
  invoiceNumber: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
