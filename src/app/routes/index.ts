import express from 'express';
import { orderRoutes } from '../modules/order/order.route';
import { productRoutes } from '../modules/product/product.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/product',
    route: productRoutes,
  },
  {
    path: '/order',
    route: orderRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
