import { Types } from 'mongoose';
export type TCardPaymentDetails = {
  brand: string;
  cardLast4: string;
  expireMonth: string;
  expireYear: string;
  transitionId: string;
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
  quantity: number;
}

export interface TOrder {
  products: Types.ObjectId[];
  orderData: TOrderData;
}
