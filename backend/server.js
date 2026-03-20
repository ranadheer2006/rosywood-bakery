const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Connect to MongoDB
const db_uri = 'mongodb://localhost:27017/rosywood_bakery';
console.log('Connecting to MongoDB at:', db_uri);
mongoose.connect(db_uri)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB connection error: ', err));

// Routes
app.use('/api/auth', authRoutes);
app.use("/api/products", productRoutes);
app.use('/api/orders', orderRoutes);

// Simple root route
app.get('/', (req, res) => {
  res.send('Rosywood Bakery API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
