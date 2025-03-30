// controllers/productController.js

const Product = require('../models/Product');

// Retrieve all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ message: 'Products retrieved successfully', data: products });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving products', error: err.message });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    const newProduct = new Product({ name, price, stock });
    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully', data: newProduct });
  } catch (err) {
    res.status(500).json({ message: 'Error creating product', error: err.message });
  }
};

// Update an existing product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product updated successfully', data: updatedProduct });
  } catch (err) {
    res.status(500).json({ message: 'Error updating product', error: err.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully', data: deletedProduct });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product', error: err.message });
  }
};
