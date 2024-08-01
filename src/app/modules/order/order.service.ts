import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrder = async (order: TOrder) => {
  const result = await Order.create(order);
  return result;
};

const getAllOrder = async () => {
  const result = await Order.find();
  return result;
};

const getSingleOrder = async (id: string) => {
  const result = await Order.findById(id);

  return result;
};

const deleteOrder = async (id: string) => {
  const result = await Order.findByIdAndDelete(id);

  return result;
};

export const orderService = {
  createOrder,
  deleteOrder,
  getSingleOrder,
  getAllOrder,
};
