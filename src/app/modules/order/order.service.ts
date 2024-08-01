import { Request } from 'express';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrder = async (order: TOrder) => {
  const result = await Order.create(order);
  return result;
};

const getAllOrder = async (req: Request) => {
  const query = req.query;

  const { page = 1, limit = 5 } = query;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const result = await Order.find()
    .populate('products')
    .limit(limitNumber)
    .skip((pageNumber - 1) * limitNumber);

  const totalData = Math.ceil(await Order.countDocuments());

  return {
    data: result,
    totalData,
  };
};

const getSingleOrder = async (id: string) => {
  const result = await Order.findById(id).populate('products');

  return result;
};

const deleteOrder = async (id: string) => {
  const result = await Order.findByIdAndDelete(id);

  return result;
};

const updateOrder = async (data: { id: string; status: string }) => {
  const { status, id } = data;
  const result = await Order.findByIdAndUpdate(
    id,
    { 'orderData.status': status },
    { new: true },
  );
  return result;
};

export const orderService = {
  createOrder,
  deleteOrder,
  getSingleOrder,
  getAllOrder,
  updateOrder,
};
