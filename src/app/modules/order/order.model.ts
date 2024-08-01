import { CallbackError, Error, model, Schema, Types } from 'mongoose';
import { Product } from '../product/product.model';
import {
  TCardPaymentDetails,
  TOrder,
  TPaymentDetails,
} from './order.interface';

const cardPaymentDetailsSchema = new Schema<TCardPaymentDetails>({
  brand: { type: String, required: true },
  cardLast4: { type: String, required: true },
  expireMonth: { type: String, required: true },
  expireYear: { type: String, required: true },
  transitionId: { type: String, required: true },
});

const paymentDetailsSchema = new Schema<TPaymentDetails>({
  paymentType: { type: String, enum: ['COD', 'Stripe'], required: true },
  cardPaymentDetails: { type: cardPaymentDetailsSchema, required: false },
});

const orderDataSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  paymentMethod: { type: String },
  deliveryMethod: { type: String },
  paymentDetails: paymentDetailsSchema,
  time: { type: String, required: true },
  orderNumber: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const orderSchema = new Schema({
  products: [{ type: Types.ObjectId, ref: 'Product', required: true }],
  orderData: { type: orderDataSchema, required: true },
});

orderSchema.pre('save', async function (next) {
  try {
    for (const productId of this.products) {
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error(`Product with ID ${productId} not found`);
      }
      product.stock -= this.orderData.quantity;
      if (product.stock < 0) {
        throw new Error(`Insufficient stock for product with ID ${productId}`);
      }
      await product.save();
    }
    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

export const Order = model<TOrder>('Order', orderSchema);
