const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // 1. Ye import karo
require('dotenv').config();

const app = express();

// 2. Middlewares
app.use(cors()); 
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// 3. Routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ Connection Failed:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));