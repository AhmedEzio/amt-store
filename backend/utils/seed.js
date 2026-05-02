require('dotenv').config();
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const User = require('../models/User');
const Product = require('../models/Product');

const seedProducts = [
  {
    title: 'AMT Wireless Headphones',
    description: 'High quality wireless headphones with rich bass and premium design.',
    price: 1499,
    category: 'Electronics',
    stock: 12,
    brand: 'AMT',
    featured: true,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'
  },
  {
    title: 'Smart Watch Pro',
    description: 'Elegant smartwatch with fitness tracking and AMOLED display.',
    price: 2299,
    category: 'Wearables',
    stock: 8,
    brand: 'AMT',
    featured: true,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800'
  },
  {
    title: 'Urban Backpack',
    description: 'Durable backpack for everyday work and travel.',
    price: 899,
    category: 'Accessories',
    stock: 20,
    brand: 'AMT',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'
  },
  {
    title: 'Gaming Mouse X1',
    description: 'Precise RGB gaming mouse with ergonomic grip.',
    price: 699,
    category: 'Electronics',
    stock: 15,
    brand: 'AMT',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800'
  },
  {
    title: 'Minimal Sneakers',
    description: 'Comfortable sneakers with a clean modern style.',
    price: 1799,
    category: 'Fashion',
    stock: 10,
    brand: 'AMT',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'
  },
  {
    title: 'Desk Lamp Modern',
    description: 'Stylish LED desk lamp for focused work setup.',
    price: 549,
    category: 'Home',
    stock: 18,
    brand: 'AMT',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800'
  }
];

const seed = async () => {
  try {
    await connectDB();
    await User.deleteMany();
    await Product.deleteMany();

    const adminPassword = await bcrypt.hash('Admin@123', 10);
    const userPassword = await bcrypt.hash('User@123', 10);

    await User.insertMany([
      { name: 'Admin User', email: 'admin@amtstore.com', password: adminPassword, role: 'admin' },
      { name: 'Normal User', email: 'user@amtstore.com', password: userPassword, role: 'user' }
    ]);

    await Product.insertMany(seedProducts);
    console.log('Seed completed successfully');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();
