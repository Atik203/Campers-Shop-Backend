import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { orderService } from './order.service';

const createOrder = catchAsync(async (req, res) => {
  const result = orderService.createOrder(req.body);
  sendResponse(res, {
    success: true,
    data: result,
    statusCode: httpStatus.OK,
    message: 'Order created successfully',
  });
});

const getAllOrder = catchAsync(async (req, res) => {
  const result = orderService.getAllOrder();

  sendResponse(res, {
    success: true,
    data: result,
    statusCode: httpStatus.OK,
    message: 'Orders fetched successfully',
  });
});

export const orderController = {
  createOrder,
  getAllOrder,
};
