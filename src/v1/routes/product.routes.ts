import { Router } from 'express';
import * as productController from '../controllers/product.controller';
import { adminAuthMiddleware } from '../middlewares/auth.middleware'; // Middleware to check user authentication

const router = Router();

// Route for adding property type
router.post('/create-product', adminAuthMiddleware, productController.createProduct);
router.get('/get-all-products', productController.getAllProducts); // Public
router.get('/get-single-product/:id', productController.getProductById); // Public
router.get('/category/:category', productController.getProductsByCategory); // Public
router.put('/update-product/:id', adminAuthMiddleware, productController.updateProduct); // Admin-only
router.delete('/delete-product/:id', adminAuthMiddleware, productController.deleteProduct); // Admin-only

export default router;
