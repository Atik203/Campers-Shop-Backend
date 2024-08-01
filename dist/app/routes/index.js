"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_route_1 = require("../modules/order/order.route");
const product_route_1 = require("../modules/product/product.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/product',
        route: product_route_1.productRoutes,
    },
    {
        path: '/order',
        route: order_route_1.orderRoutes,
    },
];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
