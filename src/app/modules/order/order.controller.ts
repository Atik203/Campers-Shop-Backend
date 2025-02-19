import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { orderService } from './order.service';

const createOrder = catchAsync(async (req, res) => {
  const result = await orderService.createOrder(req.body);
  sendResponse(res, {
    success: true,
    data: result,
    statusCode: httpStatus.OK,
    message: 'Order created successfully',
  });
});

const getAllOrder = catchAsync(async (req, res) => {
  const result = await orderService.getAllOrder(req);
  sendResponse(res, {
    success: true,
    data: result.data,
    totalData: result.totalData,
    statusCode: httpStatus.OK,
    message: 'Orders fetched successfully',
  });
});

const getSingleOrder = catchAsync(async (req, res) => {
  const result = await orderService.getSingleOrder(req.params.id);
  sendResponse(res, {
    success: true,
    data: result,
    statusCode: httpStatus.OK,
    message: 'Order fetched successfully',
  });
});

const deleteOrder = catchAsync(async (req, res) => {
  const result = await orderService.deleteOrder(req.params.id);
  sendResponse(res, {
    success: true,
    data: result,
    statusCode: httpStatus.OK,
    message: 'Order deleted successfully',
  });
});

const updateOrder = catchAsync(async (req, res) => {
  const result = await orderService.updateOrder(req.body);
  sendResponse(res, {
    success: true,
    data: result,
    statusCode: httpStatus.OK,
    message: 'Order updated successfully',
  });
});

export const orderController = {
  createOrder,
  getAllOrder,
  getSingleOrder,
  deleteOrder,
  updateOrder,
};
