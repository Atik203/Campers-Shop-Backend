"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
router.put('/update-order', order_controller_1.orderController.updateOrder);
router.post('/create-order', order_controller_1.orderController.createOrder);
router.get('/', order_controller_1.orderController.getAllOrder);
router.get('/:id', order_controller_1.orderController.getSingleOrder);
router.delete('/delete-order/:id', order_controller_1.orderController.deleteOrder);
exports.orderRoutes = router;
