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

export const productController = {
  createProduct,
};
