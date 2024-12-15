import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Cart from '../models/cart.model';
import Product from '../models/product.model';

export const addToCart = async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;

  try {
    // Validate product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check for cartId in cookies
    let cartId = req.cookies.cartId;
    if (!cartId) {
      cartId = uuidv4(); // Generate a new cartId
      res.cookie('cartId', cartId, { httpOnly: true }); // Store cartId in a cookie
    }

    // Fetch or create cart
    let cart = await Cart.findOne({ cartId });
    if (!cart) {
      cart = new Cart({ cartId, items: [] });
    }

    // Check if product already exists in cart
    const existingItem = cart.items.find((item) => item.product.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
          product: productId, quantity,
          _id: undefined
      });
    }

    await cart.save();
    return res.status(200).json({ message: 'Product added to cart', cart });
  } catch (error) {
    console.error('Error adding to cart:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

export const getCart = async (req: Request, res: Response) => {
  try {
    const cartId = req.cookies.cartId;

    if (!cartId) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const cart = await Cart.findOne({ cartId }).populate('items.product');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    return res.status(200).json({ cart });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

export const updateCartItem = async (req: Request, res: Response) => {
  const { itemId } = req.params; // Get item ID from route parameter
  const { quantity } = req.body; // New quantity from request body

  try {
    const cartId = req.cookies.cartId;

    if (!cartId) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const cart = await Cart.findOne({ cartId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the item in the cart by product ID
    const item = cart.items.find((item) => item._id.toString() === itemId); 
    if (!item) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // Update the item's quantity
    item.quantity = quantity;
    await cart.save();

    return res.status(200).json({ message: 'Cart item updated', cart });
  } catch (error) {
    console.error('Error updating cart item:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};


export const removeFromCart = async (req: Request, res: Response) => {
  const { itemId } = req.params; // Get item ID from route parameter

  try {
    const cartId = req.cookies.cartId;

    if (!cartId) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const cart = await Cart.findOne({ cartId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Remove the item from the cart by its item ID
    cart.items = cart.items.filter((item) => item._id.toString() !== itemId);
    await cart.save();

    return res.status(200).json({ message: 'Product removed from cart', cart });
  } catch (error) {
    console.error('Error removing product from cart:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};


export const clearCart = async (req: Request, res: Response) => {
  try {
    const cartId = req.cookies.cartId;

    if (!cartId) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const cart = await Cart.findOne({ cartId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = [];
    await cart.save();

    return res.status(200).json({ message: 'Cart cleared', cart });
  } catch (error) {
    console.error('Error clearing cart:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};


