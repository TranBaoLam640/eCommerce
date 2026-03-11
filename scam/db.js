/**
 * db.js – Kết nối MongoDB
 */
const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/scam';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`✅ MongoDB connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Events
mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB disconnected');
});

module.exports = connectDB;
