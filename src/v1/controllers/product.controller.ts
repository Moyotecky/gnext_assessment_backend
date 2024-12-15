import { Request, Response } from 'express';
import upload from '../config/multer.config'; // Import multer config
import Admin from '../models/admin.model'; // admin model
import Product from '../models/product.model';

interface AdminRequest extends Request {
  admin?: {
    _id: string;
  };
}

// Controller to create a product
export const createProduct = [
  upload.array('images', 4),
  async (req: AdminRequest, res: Response) => {
    const { name, price, category, description, stock } = req.body; 
    const adminId = req.admin?._id;  // Extract admin ID from token

    try {
      if (!name || !price || !category || !description || !stock) {
        return res.status(400).json({ message: 'All product details are required' });
      }

      //check to see if no images are uploaded
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'No images uploaded' });
      }

      // Get the uploaded image URLs
      const imageUrls = (req.files as Express.Multer.File[]).map(file => file.path);

      // Create the product 
      const newProduct = new Product({
        name,
        price,
        category,
        description,
        stock,
        images: imageUrls,
      });

      await newProduct.save();
      console.log("Saved Product:", newProduct); // Log for debugging

      return res.status(201).json({ 
        message: 'Product created successfully', 
        product: { ...newProduct.toObject()} 
      });
    } catch (error) {
      console.error("Error creating product:", error); // Log any error
      return res.status(500).json({ message: 'Server error', error });
    }
  }
];

// Update a product
export const updateProduct = [
  upload.array('images', 4), // Handle image uploads
  async (req: AdminRequest, res: Response) => {
    const { id } = req.params;
    const { name, price, category, description, stock } = req.body;

    try {
      // Check if the product exists
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      // Handle new images if uploaded
      let updatedImages = product.images; // Keep existing images by default
      if (req.files && Array.isArray(req.files) && req.files.length > 0) {
        updatedImages = req.files.map((file) => file.path);
      }      

      // Update product details
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        {
          name: name || product.name,
          price: price || product.price,
          category: category || product.category,
          description: description || product.description,
          stock: stock || product.stock,
          images: updatedImages, // Update images if provided
        },
        { new: true, runValidators: true } // Return the updated document and validate updates
      );

      return res.status(200).json({
        message: 'Product updated successfully',
        product: updatedProduct,
      });
    } catch (error) {
      console.error('Error updating product:', error);
      return res.status(500).json({ message: 'Server error', error });
    }
  },
];

// Delete a product
export const deleteProduct = async (req: AdminRequest, res: Response) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found'});
    }

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

//All the GET requests

// Fetch all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    return res.status(200).json({ message: 'Products fetched successfully', products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Fetch a product by ID
export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json({ message: 'Product fetched successfully', product });
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

//Get a product by its category
export const getProductsByCategory = async (req: Request, res: Response) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category });
    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found in this category' });
    }
    return res.status(200).json({ message: 'Products fetched successfully', products });
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};
