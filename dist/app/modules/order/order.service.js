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
exports.orderService = void 0;
const order_model_1 = require("./order.model");
const createOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.create(order);
    return result;
});
const getAllOrder = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const { page = 1, limit = 5 } = query;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const result = yield order_model_1.Order.find()
        .populate('products')
        .limit(limitNumber)
        .skip((pageNumber - 1) * limitNumber);
    const totalData = Math.ceil(yield order_model_1.Order.countDocuments());
    return {
        data: result,
        totalData,
    };
});
const getSingleOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.findById(id).populate('products');
    return result;
});
const deleteOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.findByIdAndDelete(id);
    return result;
});
const updateOrder = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, id } = data;
    const result = yield order_model_1.Order.findByIdAndUpdate(id, { 'orderData.status': status }, { new: true });
    return result;
});
exports.orderService = {
    createOrder,
    deleteOrder,
    getSingleOrder,
    getAllOrder,
    updateOrder,
};
