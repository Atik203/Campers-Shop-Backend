"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const product_model_1 = require("../product/product.model");
const cardPaymentDetailsSchema = new mongoose_1.Schema({
    brand: { type: String },
    cardLast4: { type: String },
    expireMonth: { type: String },
    expireYear: { type: String },
    transactionId: { type: String },
});
const paymentDetailsSchema = new mongoose_1.Schema({
    paymentType: { type: String, enum: ['COD', 'Stripe'], required: true },
    cardPaymentDetails: { type: cardPaymentDetailsSchema, default: null },
});
const orderDataSchema = new mongoose_1.Schema({
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
    productQuantity: [
        {
            productId: { type: String, required: true },
            quantity: { type: Number, required: true },
        },
    ],
    status: {
        type: String,
        enum: ['Order Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Order Placed',
    },
});
const orderSchema = new mongoose_1.Schema({
    products: [{ type: mongoose_1.Types.ObjectId, ref: 'Product', required: true }],
    orderData: { type: orderDataSchema, required: true },
}, {
    timestamps: true,
});
orderSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (const item of this.orderData.productQuantity) {
                const product = yield product_model_1.Product.findById(item.productId);
                if (!product) {
                    throw new mongoose_1.Error(`Product with ID ${item.productId} not found`);
                }
                product.stock -= item.quantity;
                product.quantity = item.quantity;
                if (product.stock <= 0) {
                    product.inStock = false;
                    product.stock = 0;
                    throw new mongoose_1.Error(`Insufficient stock for product with ID ${item.productId}`);
                }
                yield product.save();
            }
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
exports.Order = (0, mongoose_1.model)('Order', orderSchema);
