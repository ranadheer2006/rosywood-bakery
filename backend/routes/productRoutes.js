const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getRecommendations,
} = require('../controllers/productController');
const { protect, protectOptional, admin } = require('../middleware/authMiddleware');

router.get('/', getProducts);
router.get('/recommendations', protectOptional, getRecommendations);
router.get('/:id', protectOptional, getProductById);

router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;
