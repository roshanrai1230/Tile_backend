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

const dummyProducts = [
  {
    name: "Classic White Marble",
    category: "BATHROOM",
    description: "Premium white marble tiles for a luxurious bathroom feel.",
    priceSqFt: 85,
    priceBox: 1200,
    sizes: ["300x300mm", "600x600mm"],
    colors: ["White", "Grey"],
    images: ["https://images.unsplash.com/photo-1620626011761-9963d7521438?auto=format&fit=crop&q=80&w=1000"]
  },
  {
    name: "Rustic Oak Plank",
    category: "LIVING ROOM",
    description: "Natural wood finish tiles that bring warmth to your living space.",
    priceSqFt: 110,
    priceBox: 1500,
    sizes: ["200x1200mm"],
    colors: ["Brown", "Beige"],
    images: ["https://images.unsplash.com/photo-1549413280-36e4f3a47990?auto=format&fit=crop&q=80&w=1000"]
  },
  {
    name: "Modern Slate Grey",
    category: "KITCHEN",
    description: "Antiskid slate grey tiles, perfect for high-traffic kitchen areas.",
    priceSqFt: 75,
    priceBox: 1050,
    sizes: ["600x600mm"],
    colors: ["Grey", "Black"],
    images: ["https://images.unsplash.com/photo-1527385352018-3c26dd6c38cd?auto=format&fit=crop&q=80&w=1000"]
  },
  {
    name: "Terracotta Earth",
    category: "OUTDOOR",
    description: "Traditional terracotta tiles for that perfect patio look.",
    priceSqFt: 65,
    priceBox: 900,
    sizes: ["400x400mm"],
    colors: ["Orange", "Red"],
    images: ["https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=1000"]
  }
];

async function inject() {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(mongoUri);
    console.log("✅ Connected. Deleting old products (if any)...");
    await Product.deleteMany({}); // Clear if user wants fresh start
    console.log("📥 Inserting dummy products...");
    await Product.insertMany(dummyProducts);
    console.log("✨ All products inserted successfully!");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    mongoose.connection.close();
  }
}

inject();
