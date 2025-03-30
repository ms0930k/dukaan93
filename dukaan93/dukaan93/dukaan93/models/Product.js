const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Product name is required'], 
    trim: true 
  },
  price: { 
    type: Number, 
    required: [true, 'Price is required'], 
    min: [0, 'Price cannot be negative'] 
  },
  stock: { 
    type: Number, 
    required: [true, 'Stock quantity is required'], 
    min: [0, 'Stock cannot be negative'] 
  }
}, { timestamps: true }); // Automatically adds createdAt & updatedAt fields

// Indexing for better query performance
productSchema.index({ name: 1 });

// Middleware: Trim product name before saving
productSchema.pre('save', function(next) {
  this.name = this.name.trim();
  next();
});

module.exports = mongoose.model('Product', productSchema);
