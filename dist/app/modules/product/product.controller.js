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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const product_service_1 = require("./product.service");
const createProduct = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_service_1.productService.createProduct(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        data: product,
        message: 'Product created successfully',
        statusCode: http_status_1.default.CREATED,
    });
}));
const getAllProducts = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.productService.getAllProducts(req);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        totalData: result === null || result === void 0 ? void 0 : result.totalProducts,
        data: result === null || result === void 0 ? void 0 : result.products,
        statusCode: http_status_1.default.OK,
        message: 'Products fetched successfully',
    });
}));
const getSingleProduct = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_service_1.productService.getSIngleProduct(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        data: product,
        statusCode: http_status_1.default.OK,
        message: 'Product fetched successfully',
    });
}));
const updateProduct = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_service_1.productService.updateProduct(req.params.id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        data: product,
        statusCode: http_status_1.default.OK,
        message: 'Product updated successfully',
    });
}));
const deleteProduct = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.productService.deleteProduct(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        data: result,
        message: 'Product deleted successfully',
    });
}));
exports.productController = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
