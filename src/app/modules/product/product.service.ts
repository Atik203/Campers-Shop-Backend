import { Request } from 'express';
import { SortOrder } from 'mongoose';
import { buildProductQuery } from '../../builder/BuildProductQuery';
import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProduct = async (product: TProduct) => {
  const result = await Product.create(product);
  return result;
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
