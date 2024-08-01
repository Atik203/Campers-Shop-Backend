import express from 'express';
import { orderController } from './order.controller';

const router = express.Router();

router.put('/update-order', orderController.updateOrder);

router.post('/create-order', orderController.createOrder);

router.get('/', orderController.getAllOrder);

router.get('/:id', orderController.getSingleOrder);

router.delete('/delete-order/:id', orderController.deleteOrder);

export const orderRoutes = router;
