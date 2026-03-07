const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const { protectAdmin } = require('../middleware/authMiddleware');
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

// A. Get All Products (Public Route)
router.get('/all', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// B. Add Product (Protected Route - Admin Only)
router.post('/add', protectAdmin, (req, res) => {
  upload.fields([{ name: 'images', maxCount: 10 }])(req, res, async (err) => {
    if (err) {
      console.error("❌ Multer Error:", err);
      return res.status(400).json({ message: "Multer Error", error: err.message });
    }

    try {
      const { name, category, priceSqFt, priceBox, description, sizes, colors } = req.body;
      const baseUrl = "http://localhost:5000/uploads/";

      let imagePaths = [];
      if (req.files && req.files['images']) {
        req.files['images'].forEach((file) => {
          imagePaths.push(baseUrl + file.filename);
        });
      }

      const parseArray = (input) => {
        if (!input) return [];
        if (Array.isArray(input)) return input;
        try {
          const parsed = JSON.parse(input);
          return Array.isArray(parsed) ? parsed : [input];
        } catch (e) {
          return String(input).split(',').map(s => s.trim()).filter(s => s !== "");
        }
      };

      const newProduct = new Product({
        name,
        category,
        description,
        priceSqFt: priceSqFt ? Number(priceSqFt) : undefined,
        priceBox: priceBox ? Number(priceBox) : undefined,
        sizes: parseArray(sizes),
        colors: parseArray(colors),
        images: imagePaths
      });

      console.log("💾 Saving product to database...");
      await newProduct.save();
      console.log("✅ Product saved successfully!");
      res.status(201).json(newProduct);
    } catch (saveErr) {
      console.error("❌ Error during save:", saveErr);
      let errorDetails = {};
      if (saveErr.name === 'ValidationError') {
        Object.keys(saveErr.errors).forEach(key => {
          errorDetails[key] = saveErr.errors[key].message;
        });
      }
      res.status(400).json({
        message: "Failed to save product",
        error: saveErr.message,
        details: errorDetails
      });
    }
  });
});

// C. Get Single Product
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;