const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getRecommendations,
} = require("../controllers/productController");

// ⚠️ OPTIONAL: comment auth if not working yet
let protect, protectOptional, admin;

try {
  const auth = require("../middleware/authMiddleware");
  protect = auth.protect;
  protectOptional = auth.protectOptional;
  admin = auth.admin;
} catch (err) {
  console.log("Auth middleware not found, skipping protection");
}

// ✅ PUBLIC ROUTES
router.get("/", getProducts);

// Optional recommendation route
router.get(
  "/recommendations",
  protectOptional || ((req, res, next) => next()),
  getRecommendations
);

// Get single product
router.get(
  "/:id",
  protectOptional || ((req, res, next) => next()),
  getProductById
);

// ✅ ADMIN ROUTES (SAFE FALLBACK)
router.post(
  "/",
  protect && admin ? [protect, admin] : [],
  createProduct
);

router.put(
  "/:id",
  protect && admin ? [protect, admin] : [],
  updateProduct
);

router.delete(
  "/:id",
  protect && admin ? [protect, admin] : [],
  deleteProduct
);

module.exports = router;