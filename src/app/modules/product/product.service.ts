import { Request } from 'express';
import { FilterQuery, SortOrder } from 'mongoose';
import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProduct = async (product: TProduct) => {
  const result = await Product.create(product);
  return result;
};

export const buildProductQuery = (req: Request): FilterQuery<TProduct> => {
  const query: FilterQuery<TProduct> = {};

  const {
    averageRating,
    size,
    category,
    stock,
    color,
    minPrice,
    maxPrice,
    searchTerm,
    page = '1',
    limit = '10',
  } = req.query;

  if (averageRating) {
    const ratings = Array.isArray(averageRating)
      ? averageRating
      : [averageRating];
    query.averageRating = {
      $in: ratings.map((rating) => Math.floor(Number(rating))),
    };
  }

  if (size) {
    const sizes = Array.isArray(size) ? size : [size];
    query.sizes = { $in: sizes };
  }

  if (category) {
    const categories = Array.isArray(category) ? category : [category];
    query.category = { $in: categories };
  }

  if (stock) {
    const stocks = Array.isArray(stock) ? stock : [stock];
    query.inStock = { $in: stocks.map((s) => s === 'in') };
  }

  if (color) {
    const colors = Array.isArray(color) ? color : [color];
    query.colors = { $elemMatch: { name: { $in: colors } } };
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) {
      query.price.$gte = Number(minPrice);
    }
    if (maxPrice) {
      query.price.$lte = Number(maxPrice);
    }
  }

  if (searchTerm) {
    query.$or = [
      { title: { $regex: searchTerm, $options: 'i' } },
      { category: { $regex: searchTerm, $options: 'i' } },
    ];
  }

  const pagination = {
    skip: (Number(page) - 1) * Number(limit),
    limit: Number(limit),
  };

  return { query, pagination };
};

const getAllProducts = async (req: Request) => {
  const { sort } = req.query;

  const { query, pagination } = buildProductQuery(req);

  const sortOptions: { [key: string]: SortOrder } = {};

  switch (sort) {
    case 'newest':
      sortOptions.createdAt = -1; // Assuming you have a createdAt field
      break;
    case 'rating':
      sortOptions.averageRating = -1;
      break;
    case 'DSC':
      sortOptions.price = -1;
      break;
    case 'ASC':
      sortOptions.price = 1;
      break;
    default:
      sortOptions.createdAt = -1; // Default sorting by newest
      break;
  }

  const totalProducts = await Product.find().countDocuments();

  const result = await Product.find(query)
    .sort(sortOptions)
    .skip(pagination.skip)
    .limit(pagination.limit);

  return {
    products: result,
    totalProducts,
  };
};

const getSIngleProduct = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

export const productService = {
  createProduct,
  getAllProducts,
  getSIngleProduct,
};
