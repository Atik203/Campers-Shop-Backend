import { Types } from 'mongoose';
export type TCardPaymentDetails = {
  brand: string;
  cardLast4: string;
  expireMonth: string;
  expireYear: string;
  transactionId: string;
};

export type TPaymentDetails = {
  paymentType: 'COD' | 'Stripe';
  cardPaymentDetails?: TCardPaymentDetails;
};

export interface TOrderData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod?: string;
  deliveryMethod?: string;
  paymentDetails?: TPaymentDetails;
  time: string;
  orderNumber: string;
  productQuantity: {
    productId: string;
    quantity: number;
  }[];
  status?:
    | 'Order Placed'
    | 'Pending'
    | 'Processing'
    | 'Shipped'
    | 'Delivered'
    | 'Cancelled';
}

export interface TOrder {
  products: Types.ObjectId[];
  orderData: TOrderData;
}
