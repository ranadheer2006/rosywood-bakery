const Product = require('../models/Product');
const User = require('../models/User');

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      // Update user search history with the category of the viewed product
      if (req.user) {
        const user = await User.findById(req.user._id);
        if (user) {
          user.searchHistory.push(product.category);
          // Keep only last 10 searches
          if (user.searchHistory.length > 10) user.searchHistory.shift();
          await user.save();
        }
      }
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create product (Admin)
const createProduct = async (req, res) => {
  const { name, price, description, image, category, stock } = req.body;

  const product = new Product({
    name,
    price,
    description,
    image,
    category,
    stock,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

// Update product (Admin)
const updateProduct = async (req, res) => {
  const { name, price, description, image, category, stock } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.image = image || product.image;
    product.category = category || product.category;
    product.stock = stock || product.stock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

// Delete product (Admin)
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

// Recommendation system: Simple Popularity-based + Content-based
const getRecommendations = async (req, res) => {
  try {
    let recommendations = [];
    
    if (req.user) {
      const user = await User.findById(req.user._id);
      if (user && user.searchHistory.length > 0) {
        // Content-based: Recommend based on search history categories/keywords
        const recentSearch = user.searchHistory[user.searchHistory.length - 1];
        recommendations = await Product.find({
          $or: [
            { category: { $regex: recentSearch, $options: 'i' } },
            { name: { $regex: recentSearch, $options: 'i' } }
          ]
        }).limit(4);
      }
    }

    // If no recommendations yet, or not enough, get top rated / featured items
    if (recommendations.length < 4) {
      const popularItems = await Product.find({ isFeatured: true }).limit(4);
      // Combine and remove duplicates
      const allIds = new Set(recommendations.map(p => p._id.toString()));
      popularItems.forEach(p => {
        if (!allIds.has(p._id.toString()) && recommendations.length < 4) {
          recommendations.push(p);
        }
      });
    }

    // Still less than 4? Just get random ones
    if (recommendations.length < 4) {
      const extraItems = await Product.find({}).limit(4 - recommendations.length);
      recommendations = [...recommendations, ...extraItems];
    }

    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recommendations' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getRecommendations,
};
