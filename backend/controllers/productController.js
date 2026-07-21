import mongoose from 'mongoose';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Review from '../models/Review.js';
import { uploadImage, deleteImage, extractCloudinaryImageObject, isCloudinaryUrl } from '../services/cloudinaryService.js';

const parseVariants = (value) => {
  if (!value) return [];
  if (typeof value === 'string') {
    try {
      value = JSON.parse(value);
    } catch {
      return [];
    }
  }
  if (!Array.isArray(value)) return [];
  return value.map((variant) => ({
    weight: variant.weight || variant.name || variant.label || '500g',
    price: Number(variant.price) || 0,
    stock: Number(variant.stock) || 0,
  }));
};

const parseImages = async (req) => {
  const images = [];
  if (req.files?.length) {
    for (const file of req.files) {
      const uploadResult = await uploadImage(file.buffer, file.originalname);
      if (uploadResult?.secure_url && uploadResult?.public_id) {
        images.push({ secure_url: uploadResult.secure_url, public_id: uploadResult.public_id });
      }
    }
  }
  if (req.body.images) {
    try {
      const bodyImages = typeof req.body.images === 'string' ? JSON.parse(req.body.images) : req.body.images;
      if (Array.isArray(bodyImages)) {
        for (const image of bodyImages.filter(Boolean)) {
          if (typeof image === 'string' && isCloudinaryUrl(image)) {
            images.push(extractCloudinaryImageObject(image));
          } else if (typeof image === 'object' && image.secure_url && image.public_id) {
            images.push(image);
          }
        }
      }
    } catch {
      if (typeof req.body.images === 'string' && req.body.images.trim()) {
        const image = req.body.images.trim();
        if (isCloudinaryUrl(image)) {
          images.push(extractCloudinaryImageObject(image));
        }
      }
    }
  }
  return images.filter(Boolean);
};

export const listProducts = async (req, res, next) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      page = 1,
      limit = 12,
      sort,
      inStock,
      rating,
    } = req.query;

    const filters = [{ isActive: true }];

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      filters.push({
        $or: [
          { title: searchRegex },
          { description: searchRegex },
          { longDescription: searchRegex },
          { category: searchRegex },
          { tags: searchRegex },
        ],
      });
    }

    if (category) filters.push({ category });
    if (rating) filters.push({ rating: { $gte: Number(rating) } });
    if (inStock === 'true') {
      filters.push({ $or: [{ stock: { $gt: 0 } }, { 'variants.stock': { $gt: 0 } }] });
    }

    if (minPrice || maxPrice) {
      const priceFilter = {};
      if (minPrice) priceFilter.$gte = Number(minPrice);
      if (maxPrice) priceFilter.$lte = Number(maxPrice);
      filters.push({ $or: [{ price: priceFilter }, { 'variants.price': priceFilter }] });
    }

    const query = filters.length > 1 ? { $and: filters } : filters[0];

    const sortOptions = {};
    if (sort === 'price_asc') sortOptions.price = 1;
    else if (sort === 'price_desc') sortOptions.price = -1;
    else if (sort === 'newest') sortOptions.createdAt = -1;
    else if (sort === 'rating') sortOptions.rating = -1;
    else sortOptions.createdAt = -1;

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortOptions)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const uniqueProducts = [];
    const seenKeys = new Set();
    for (const product of products) {
      const key = String(product.legacyId || product.title || product._id || '');
      if (seenKeys.has(key)) continue;
      seenKeys.add(key);
      uniqueProducts.push(product);
    }

    res.json({ products: uniqueProducts, total: Math.min(uniqueProducts.length, total), page: Number(page), limit: Number(limit) });
  } catch (err) {
    next(err);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = { $or: [] };

    if (mongoose.Types.ObjectId.isValid(id)) query.$or.push({ _id: id });
    const legacyId = Number(id);
    if (!Number.isNaN(legacyId)) query.$or.push({ legacyId });

    if (query.$or.length === 0) return res.status(404).json({ message: 'Product not found' });

    const product = await Product.findOne(query);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const related = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
      isActive: true,
    })
      .sort({ rating: -1 })
      .limit(4);

    res.json({ ...product.toObject(), relatedProducts: related });
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const payload = { ...req.body };
    payload.price = Number(payload.price) || 0;
    payload.stock = Number(payload.stock) || 0;
    payload.variants = parseVariants(payload.variants);
    payload.tags = payload.tags ? String(payload.tags).split(',').map((tag) => tag.trim()).filter(Boolean) : [];
    payload.images = await parseImages(req);

    const product = await Product.create(payload);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const payload = { ...req.body };
    if (payload.price !== undefined) payload.price = Number(payload.price) || 0;
    if (payload.stock !== undefined) payload.stock = Number(payload.stock) || 0;
    if (payload.variants !== undefined) payload.variants = parseVariants(payload.variants);
    if (payload.tags) payload.tags = String(payload.tags).split(',').map((tag) => tag.trim()).filter(Boolean);

    const images = await parseImages(req);
    if (images.length) {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      const existingImages = product.images || [];
      const existingPublicIds = existingImages.map((image) => image.public_id).filter(Boolean);
      const newPublicIds = images.map((image) => image.public_id).filter(Boolean);
      const imagesToRemove = existingPublicIds.filter((id) => !newPublicIds.includes(id));
      for (const publicId of imagesToRemove) {
        await deleteImage(publicId);
      }
      payload.images = [...existingImages.filter((image) => newPublicIds.includes(image.public_id)), ...images];
    }

    const product = await Product.findByIdAndUpdate(req.params.id, payload, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const images = product.images || [];
    for (const image of images) {
      if (image?.public_id) {
        await deleteImage(image.public_id);
      }
    }

    await product.deleteOne();
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

export const listCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

export const getRelatedProducts = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const related = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
      isActive: true,
    })
      .sort({ rating: -1 })
      .limit(6);

    res.json(related);
  } catch (err) {
    next(err);
  }
};
