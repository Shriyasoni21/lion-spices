import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import connectDB from '../config/db.js';
import Product from '../models/Product.js';
import { products as canonicalProducts } from '../../src/data/productData.js';

const normalizeImages = (product) => {
  if (!product.image) return [];
  return [{ secure_url: product.image, public_id: '' }];
};

const buildMatchQuery = (product) => {
  const queries = [];
  if (Number.isFinite(Number(product.id))) {
    queries.push({ legacyId: Number(product.id) });
  }
  if (product.title) {
    queries.push({ title: { $regex: new RegExp(`^${String(product.title).replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}$`, 'i') } });
  }
  return queries.length > 1 ? { $or: queries } : queries[0] || {};
};

const selectKeepRecord = (matches, canonicalProduct) => {
  const sorted = [...matches].sort((a, b) => {
    const aScore = (a.updatedAt ? new Date(a.updatedAt).getTime() : 0) + (a.rating ? 1000 : 0) + (a.variants?.length ? 100 : 0);
    const bScore = (b.updatedAt ? new Date(b.updatedAt).getTime() : 0) + (b.rating ? 1000 : 0) + (b.variants?.length ? 100 : 0);
    return bScore - aScore;
  });

  return sorted[0] || matches[0];
};

const main = async () => {
  await connectDB(process.env.MONGODB_URI);

  const beforeCount = await Product.countDocuments({ isActive: true });
  console.log('Products before cleanup:', beforeCount);

  for (const canonicalProduct of canonicalProducts) {
    const query = buildMatchQuery(canonicalProduct);
    const matches = await Product.find(query).sort({ createdAt: 1, _id: 1 }).lean();

    if (!matches.length) {
      await Product.create({
        legacyId: canonicalProduct.id,
        title: canonicalProduct.title,
        description: canonicalProduct.description,
        longDescription: canonicalProduct.longDescription || canonicalProduct.description,
        images: normalizeImages(canonicalProduct),
        price: canonicalProduct.price,
        variants: canonicalProduct.variants || [],
        sku: canonicalProduct.sku || '',
        category: canonicalProduct.category,
        bestSeller: Boolean(canonicalProduct.bestSeller),
        rating: Number(canonicalProduct.rating) || 0,
        reviewCount: Number(canonicalProduct.reviews) || 0,
        tags: canonicalProduct.category ? [canonicalProduct.category] : [],
        isActive: true,
      });
      console.log('Created missing canonical product:', canonicalProduct.title);
      continue;
    }

    const keep = selectKeepRecord(matches, canonicalProduct);
    const payload = {
      legacyId: canonicalProduct.id,
      title: canonicalProduct.title,
      description: canonicalProduct.description,
      longDescription: canonicalProduct.longDescription || canonicalProduct.description,
      images: normalizeImages(canonicalProduct),
      price: canonicalProduct.price,
      variants: canonicalProduct.variants || [],
      sku: canonicalProduct.sku || '',
      category: canonicalProduct.category,
      bestSeller: Boolean(canonicalProduct.bestSeller),
      rating: Number(canonicalProduct.rating) || 0,
      reviewCount: Number(canonicalProduct.reviews) || 0,
      tags: canonicalProduct.category ? [canonicalProduct.category] : [],
      isActive: true,
    };

    await Product.findByIdAndUpdate(keep._id, payload, { new: true });

    const toDelete = matches.filter((item) => String(item._id) !== String(keep._id)).map((item) => item._id);
    if (toDelete.length) {
      await Product.deleteMany({ _id: { $in: toDelete } });
      console.log('Removed duplicates for', canonicalProduct.title, 'count=', toDelete.length);
    } else {
      console.log('Kept canonical record for', canonicalProduct.title);
    }
  }

  const afterCount = await Product.countDocuments({ isActive: true });
  const remaining = await Product.find({ isActive: true }).sort({ legacyId: 1 }).lean();
  console.log('Products after cleanup:', afterCount);
  console.log(JSON.stringify(remaining.map((item) => ({ title: item.title, legacyId: item.legacyId, price: item.price, category: item.category, image: item.images?.[0]?.secure_url || item.image })), null, 2));
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
