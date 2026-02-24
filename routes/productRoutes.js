const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');

// Storage Config
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`
    );
  }
});

const upload = multer({ storage: storage });

// A. Get All Products
router.get('/all', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// B. Add Product (Multiple Images Fix)
router.post('/add', upload.fields([{ name: 'images', maxCount: 10 }]), async (req, res) => {
  try {
    const { name, size, category, priceSqFt, priceBox, description } = req.body;
    const baseUrl = "http://localhost:5000/uploads/";

    let imagePaths = [];

    // ✅ Yeh raha loop jo har file ko alag path dega
    if (req.files && req.files['images']) {
      req.files['images'].forEach((file) => {
        const fullPath = baseUrl + file.filename;
        imagePaths.push(fullPath); 
      });
    }

    const newProduct = new Product({
      name,
      size,
      category,
      priceSqFt,
      priceBox,
      description,
      images: imagePaths, // Isme ab pakka alag-alag URLs honge
      images: imagePaths
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("❌ Error during save:", err);
    res.status(400).json({ message: "Galti ho gayi bhai!" });
  }
});

// C. Get Single Product
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Mongoose Object ID validation
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Bhai, product ki ID ka format sahi nahi hai." });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Sorry, ye product database mein nahi mila." });
    }
    
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server mein kuch garbar hai." });
  }
});

module.exports = router;