import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProduct = async (product: TProduct) => {
  const result = await Product.create(product);
  return result;
};

export const productService = {
  createProduct,
};
