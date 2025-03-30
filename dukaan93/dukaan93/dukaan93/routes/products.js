const express = require('express');
const router = express.Router();

// Destructure the specific functions from the product controller
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');

// Route to retrieve all products
router.get('/', getProducts);

// Route to add a new product
router.post('/add', createProduct);

// Route to update an existing product
router.put('/update/:id', updateProduct);

// Route to delete a product
router.delete('/delete/:id', deleteProduct);

module.exports = router;
