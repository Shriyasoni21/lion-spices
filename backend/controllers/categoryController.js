import Category from '../models/Category.js';

export const listCategories = async (req, res, next) => {
  try {
    const categories = await Category.aggregate([
      { $sort: { name: 1 } },
      {
        $lookup: {
          from: 'products',
          localField: 'name',
          foreignField: 'category',
          as: 'products',
        },
      },
      {
        $addFields: {
          count: { $size: '$products' },
        },
      },
      {
        $project: {
          products: 0,
        },
      },
    ]);
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (err) {
    next(err);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
