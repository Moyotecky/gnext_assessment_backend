import { Router } from 'express';
import * as cartController from '../controllers/cart.controller';

const router = Router();

// Add a product to the cart
router.post('/add-to-cart', cartController.addToCart);

// Get the current user's cart 
router.get('/all', cartController.getCart);

// Update a specific cart item 
router.put('/update-cart/:itemId', cartController.updateCartItem);

// Remove a specific item from the cart 
router.delete('/remove-from-cart/:itemId', cartController.removeFromCart);

// Clear the entire cart 
router.delete('/clear-cart', cartController.clearCart);

export default router;
