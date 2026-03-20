const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ IMPORT ROUTES
const productRoutes = require("./routes/productRoutes");

// ✅ CONNECT ROUTES (VERY IMPORTANT)
app.use("/api/products", productRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));