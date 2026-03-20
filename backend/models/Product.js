const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['Cake', 'Pastries', 'Breads', 'Cookies', 'Cupcakes', 'Dessert', 'Snack', 'Pastry', 'Bread'] 
  },
  stock: { type: Number, default: 100 },
  rating: { type: Number, default: 4.5 },
  reviewsCount: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
