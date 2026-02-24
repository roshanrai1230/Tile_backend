// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   name: { type: String }, // Ab mandatory nahi hai
//   size: { type: String, default: '300x300mm' },
//   priceSqFt: { type: Number }, // Ab mandatory nahi hai
//   priceBox: { type: Number }, // Ab mandatory nahi hai
//   category: { 
//     type: String, 
//     required: true, // 🔥 Sirf ye mandatory rahega
//     enum: ['BATHROOM', 'KITCHEN', 'LIVING ROOM', 'BEDROOM', 'OUTDOOR', 'COMMERCIAL SPACES']
//   },
//   image: { type: String },
//   images: [String],
//   video: { type: String },
//   description: { type: String },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Product', productSchema);

// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  size: String,
  priceSqFt: Number,
  priceBox: Number,
  category: { 
    type: String, 
    required: true // 🔥 Sirf category mandatory hai
  },
  
  images: [String],
  video: String,
  description: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);