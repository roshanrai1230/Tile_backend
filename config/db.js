const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📂 Database in Use: ${conn.connection.name}`); // Ye check karne ke liye ki sahi DB hai
  } catch (error) {
    console.error(`❌ Connection Failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;