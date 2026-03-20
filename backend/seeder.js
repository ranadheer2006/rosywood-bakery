const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');
const Order = require('./models/Order');

dotenv.config();

const db_uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rosywood_bakery';
console.log('Connecting to:', db_uri);
mongoose.connect(db_uri);

const products = [
  {
    "name": "Chocolate Cake",
    "description": "Rich and decadent chocolate layers with smooth ganache.",
    "price": 500,
    "category": "Cake",
    "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800",
    "isFeatured": true
  },
  {
    "name": "Vanilla Cake",
    "description": "Classic vanilla sponge with light buttercream frosting.",
    "price": 450,
    "category": "Cake",
    "image": "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=800"
  },
  {
    "name": "Red Velvet Cake",
    "description": "Stunning crimson cake with velvety cream cheese frosting.",
    "price": 600,
    "category": "Cake",
    "image": "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?q=80&w=800",
    "isFeatured": true
  },
  {
    "name": "Strawberry Cake",
    "description": "Sweet cake made with fresh strawberries and cream.",
    "price": 550,
    "category": "Cake",
    "image": "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=800"
  },
  {
    "name": "Black Forest Cake",
    "description": "Chocolate layers with cherries and whipped cream.",
    "price": 650,
    "category": "Cake",
    "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800"
  },
  {
    "name": "Chocolate Pastry",
    "description": "Flaky pastry filled with premium dark chocolate.",
    "price": 120,
    "category": "Pastry",
    "image": "https://jambubakers.com/wp-content/uploads/2024/01/choco-pastry.jpg",
    "isFeatured": true
  },
  {
    "name": "Vanilla Pastry",
    "description": "Light and airy pastry with sweet vanilla cream.",
    "price": 100,
    "category": "Pastry",
    "image": "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?q=80&w=800"
  },
  {
    "name": "Red Velvet Pastry",
    "description": "Crimson pastry layers with cream cheese filling.",
    "price": 140,
    "category": "Pastry",
    "image": "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?q=80&w=800"
  },
  {
    "name": "Croissant",
    "description": "Buttery, flaky, and golden French classic.",
    "price": 80,
    "category": "Bread",
    "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800",
    "isFeatured": true
  },
  {
    "name": "Garlic Bread",
    "description": "Toasted bread with aromatic garlic butter and herbs.",
    "price": 150,
    "category": "Bread",
    "image": "https://images.unsplash.com/photo-1544681280-d25a782adc9b?q=80&w=800",
    "isFeatured": true
  },
  {
    "name": "Donut",
    "description": "Soft glazed donut with a sweet finish.",
    "price": 90,
    "category": "Dessert",
    "image": "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800",
    "isFeatured": true
  },
  {
    "name": "Cupcake",
    "description": "Individual cake with a swirl of delicious frosting.",
    "price": 110,
    "category": "Dessert",
    "image": "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=800",
    "isFeatured": true
  },
  {
    "name": "Blueberry Muffin",
    "description": "Moist muffin packed with fresh blueberries.",
    "price": 130,
    "category": "Dessert",
    "image": "https://images.unsplash.com/photo-1558401391-7899b4bd5bbf?q=80&w=800"
  },
  {
    "name": "Brownie",
    "description": "Fudgy chocolate brownie with a rich cocoa flavor.",
    "price": 150,
    "category": "Dessert",
    "image": "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?q=80&w=800"
  },
  {
    "name": "Macarons",
    "description": "Colorful French cookies with a creamy center.",
    "price": 200,
    "category": "Dessert",
    "image": "https://images.unsplash.com/photo-1558326567-98ae2405596b?q=80&w=800",
    "isFeatured": true
  },
  {
    "name": "Cheesecake",
    "description": "Smooth and creamy New York style cheesecake.",
    "price": 700,
    "category": "Cake",
    "image": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=800"
  },
  {
    "name": "Pineapple Cake",
    "description": "Tropical pineapple cake with light cream.",
    "price": 500,
    "category": "Cake",
    "image": "https://images.unsplash.com/photo-1582716401301-b2407dc7563d?q=80&w=800"
  },
  {
    "name": "Chocolate Muffin",
    "description": "Rich muffin with melted chocolate chips.",
    "price": 120,
    "category": "Dessert",
    "image": "https://images.unsplash.com/photo-1583338917451-face2751d8d5?q=80&w=800"
  },
  {
    "name": "Butter Cookies",
    "description": "Traditional melt-in-your-mouth butter cookies.",
    "price": 180,
    "category": "Snack",
    "image": "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=800"
  },
  {
    "name": "Oreo Cake",
    "description": "Cookies and cream flavored chocolate cake.",
    "price": 650,
    "category": "Cake",
    "image": "https://images.unsplash.com/photo-1562773230-5e9d5b47c3bd?q=80&w=800",
    "isFeatured": true
  }
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();

    await Product.insertMany(products);

    // Create Admin User
    await User.create({
      name: 'Admin User',
      email: 'admin@rosywood.com',
      password: 'adminpassword123',
      role: 'admin'
    });

    console.log('Data Imported! All items replaced with the 20 specific products with bakery-only images.');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
