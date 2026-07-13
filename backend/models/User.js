import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
  label: String,
  name: String,
  phone: String,
  email: String,
  line1: String,
  line2: String,
  city: String,
  state: String,
  pin: String,
  country: { type: String, default: 'India' },
  isDefault: { type: Boolean, default: false },
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isVerified: { type: Boolean, default: false },
  addresses: [AddressSchema],
  phone: { type: String },
  phones: [String],
  alternateEmails: [String],
  refreshToken: String,
  resetOtp: { type: String },
  resetOtpExpires: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
