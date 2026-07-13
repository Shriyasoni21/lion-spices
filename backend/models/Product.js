import mongoose from 'mongoose';

const VariantSchema = new mongoose.Schema({
  weight: String,
  price: Number,
  stock: { type: Number, default: 0 },
});

const CloudinaryImageSchema = new mongoose.Schema({
  secure_url: String,
  public_id: String,
}, { _id: false });

const ProductSchema = new mongoose.Schema({
  legacyId: { type: Number, index: true },
  title: { type: String, required: true },
  description: String,
  longDescription: String,
  images: { type: [CloudinaryImageSchema], default: [] },
  price: { type: Number, required: true },
  variants: { type: [VariantSchema], default: [] },
  sku: String,
  category: String,
  stock: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  bestSeller: { type: Boolean, default: false },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
}, {
  toJSON: {
    virtuals: true,
    transform(doc, ret) {
      if (ret.images && Array.isArray(ret.images)) {
        ret.images = ret.images.map((image) => (image && typeof image === 'object' ? image.secure_url || '' : image));
      }
      if (!ret.image) {
        const first = ret.images?.[0];
        ret.image = first || '';
      }
      return ret;
    },
  },
  toObject: {
    virtuals: true,
    transform(doc, ret) {
      if (ret.images && Array.isArray(ret.images)) {
        ret.images = ret.images.map((image) => (image && typeof image === 'object' ? image.secure_url || '' : image));
      }
      if (!ret.image) {
        const first = ret.images?.[0];
        ret.image = first || '';
      }
      return ret;
    },
  },
});

ProductSchema.virtual('image').get(function () {
  if (this.images?.length) {
    const first = this.images[0];
    if (typeof first === 'string') return first;
    return first?.secure_url || '';
  }
  return this._doc?.image || '';
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
