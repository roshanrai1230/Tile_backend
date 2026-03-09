const mongoose = require('mongoose');

const mongoUri = "mongodb+srv://admin:Tiles123@cluster0.bgwmq6k.mongodb.net/?appName=Cluster0";

const productSchema = new mongoose.Schema({
  name: String,
  sizes: [String],
  colors: [String],
  priceSqFt: Number,
  priceBox: Number,
  category: { type: String, required: true },
  images: [String],
  description: String,
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

const newProducts = [
  {
    name: "Geometric Wood Hexagon",
    category: "FLOOR",
    description: "Premium hexagonal tiles with a complex dark wood grain pattern, perfect for modern interiors.",
    priceSqFt: 140, priceBox: 2100,
    sizes: ["200x230mm"], colors: ["Dark Wood", "Brown"],
    images: ["/products/geometric_wood_hex.jpg"]
  },
  {
    name: "Antique Brown Stone",
    category: "BATHROOM",
    description: "Luxurious brown stone-look wall tiles that create a warm, classic bathroom ambiance.",
    priceSqFt: 125, priceBox: 1750,
    sizes: ["600x600mm"], colors: ["Brown", "Tan"],
    images: ["/products/brown_stone_bathroom.jpg"]
  },
  {
    name: "Modern Chevron Zigzag",
    category: "WALL",
    description: "Artistic chevron pattern wall tiles in a monochromatic palette for a striking visual effect.",
    priceSqFt: 110, priceBox: 1550,
    sizes: ["300x900mm"], colors: ["White", "Grey"],
    images: ["/products/chevron_zigzag_wall.jpg"]
  },
  {
    name: "Rustic Earth Floor",
    category: "FLOOR",
    description: "Durable floor tiles with a natural earthy texture, ideal for high-traffic living spaces.",
    priceSqFt: 95, priceBox: 1350,
    sizes: ["600x600mm", "800x800mm"], colors: ["Brown", "Rust"],
    images: ["/products/brown_stone_floor.jpg"]
  },
  {
    name: "Linear Tan Textured",
    category: "WALL",
    description: "Soft tan wall tiles featuring a delicate linear texture for a contemporary, clean look.",
    priceSqFt: 85, priceBox: 1200,
    sizes: ["300x600mm"], colors: ["Tan", "Beige"],
    images: ["/products/tan_textured_wall.jpg"]
  }
];

async function addProducts() {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(mongoUri);
    console.log("📥 Inserting new products...");
    await Product.insertMany(newProducts);
    console.log("✨ 5 new products added successfully!");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    mongoose.connection.close();
  }
}

addProducts();
