import express from 'express';
import { productController } from './product.controller';

const router = express.Router();

router.post('/create-product', productController.createProduct);

router.get('/', productController.getAllProducts);

router.get('/:id', productController.getSingleProduct);

route.delete('/delete/:id', productController.deleteProduct);
router.put('/update/:id', productController.updateProduct);

export const productRoutes = router;
