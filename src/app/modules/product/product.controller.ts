import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { productService } from './product.service';

const createProduct = catchAsync(async (req, res) => {
  const product = await productService.createProduct(req.body);
  sendResponse(res, {
    success: true,
    data: product,
    message: 'Product created successfully',
    statusCode: httpStatus.CREATED,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const products = await productService.getAllProducts();
  sendResponse(res, {
    success: true,
    data: products,
    statusCode: httpStatus.OK,
    message: 'Products fetched successfully',
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const product = await productService.getSIngleProduct(req.params.id);
  sendResponse(res, {
    success: true,
    data: product,
    statusCode: httpStatus.OK,
    message: 'Product fetched successfully',
  });
});

export const productController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
};
