import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from '../config/db.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import { products, categories } from '../../src/data/productData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const normalizeImages = (product) => {
  if (!product.image) return [];
  return [{ secure_url: product.image, public_id: '' }];
};

const seedCategories = async () => {
  const results = [];

  for (const category of categories) {
    const payload = {
      name: category.name,
      description: category.description,
    };

    const result = await Category.findOneAndUpdate(
      { name: category.name },
      payload,
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
    );

    results.push(result);
  }

  console.log(`Seeded/updated ${results.length} categories.`);
};

const seedProducts = async () => {
  const results = [];

  for (const product of products) {
    const payload = {
      legacyId: product.id,
      title: product.title,
      description: product.description,
      longDescription: product.longDescription || product.description,
      images: normalizeImages(product),
      price: product.price,
      variants: product.variants || [],
      sku: product.sku || '',
      category: product.category,
      bestSeller: Boolean(product.bestSeller),
      rating: Number(product.rating) || 0,
      reviewCount: Number(product.reviews) || 0,
      tags: product.category ? [product.category] : [],
      isActive: true,
    };

    const result = await Product.findOneAndUpdate(
      { legacyId: product.id },
      payload,
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
    );

    results.push(result);
  }

  console.log(`Seeded/updated ${results.length} products.`);
};

const main = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    await seedCategories();
    await seedProducts();
    console.log('Product seed complete.');
    process.exit(0);
  } catch (error) {
    console.error('Product seed failed:', error);
    process.exit(1);
  }
};

main();
