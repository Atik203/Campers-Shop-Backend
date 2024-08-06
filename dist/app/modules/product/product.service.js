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
exports.productService = void 0;
const BuildProductQuery_1 = require("../../builder/BuildProductQuery");
const product_model_1 = require("./product.model");
const createProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.create(product);
    return result;
});
const getAllProducts = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { sort } = req.query;
    const { query, pagination } = (0, BuildProductQuery_1.buildProductQuery)(req);
    const sortOptions = {};
    switch (sort) {
        case 'newest':
            sortOptions.createdAt = -1; // Assuming you have a createdAt field
            break;
        case 'rating':
            sortOptions.averageRating = -1;
            break;
        case 'DSC':
            sortOptions.price = -1;
            break;
        case 'ASC':
            sortOptions.price = 1;
            break;
        default:
            sortOptions.createdAt = -1; // Default sorting by newest
            break;
    }
    const totalProducts = yield product_model_1.Product.find().countDocuments();
    const result = yield product_model_1.Product.find(query)
        .sort(sortOptions)
        .skip(pagination.skip)
        .limit(pagination.limit);
    return {
        products: result,
        totalProducts,
    };
});
const getSIngleProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById(id);
    return result;
});
const updateProduct = (id, product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndUpdate(id, product, { new: true });
    return result;
});
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndUpdate(id, { isDeleted: true });
    return result;
});
exports.productService = {
    createProduct,
    getAllProducts,
    getSIngleProduct,
    updateProduct,
    deleteProduct,
};
