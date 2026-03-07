require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const dummyProducts = [
  // ── FLOOR ──────────────────────────────────────────────
  {
    name: "Portmore White Subway Tile",
    sizes: ["3x8\"", "4x12\""],
    colors: ["#f0ede8", "#c8c4bc", "#d4b5b0", "#4a4a4a"],
    priceSqFt: 9.95,
    priceBox: 45.00,
    category: "FLOOR",
    images: ["https://i0.wp.com/wp.tilemountain.co.uk/wp-content/uploads/2019/07/03-TileMountain_3160326_PalatinaWhiteGlossTiles.jpg?resize=1000%2C667&ssl=1"],
    description: "White 3x8 Glossy Ceramic Subway Tile. Perfect for kitchen backsplash and bathroom walls.",
  },
  {
    name: "Terrazzo Italy Calacatta",
    sizes: ["24x24\"", "12x24\""],
    colors: ["#e8e4de", "#6b6b6b", "#d4cdc5"],
    priceSqFt: 17.95,
    priceBox: 89.00,
    category: "FLOOR",
    images: ["https://www.roccia.com/cdn/shop/collections/Kitchen_Floor_Tile_1_1_67d4a759-2470-4e44-beab-ce35aea7e54c.jpg?v=1754469575"],
    description: "Sacra Calacatta White 24x24 Honed Terrazzo Tile. Luxury flooring with natural stone chips.",
  },
  {
    name: "Curve Green Fluted Tile",
    sizes: ["5x12\"", "6x12\""],
    colors: ["#8a9e8c", "#2a4a2a", "#6b7c6b", "#1a1a1a"],
    priceSqFt: 9.95,
    priceBox: 52.00,
    category: "FLOOR",
    images: ["https://content.iconworldoftile.com/content/slider/slider-7.jpg"],
    description: "Green Fluted 5x12 3D Glossy Ceramic Tile. Adds dramatic texture to accent walls.",
  },
  {
    name: "Marble Natural Stone Floor",
    sizes: ["18x18\"", "24x24\""],
    colors: ["#f5f0eb", "#d4cfc9", "#9e9890"],
    priceSqFt: 24.50,
    priceBox: 120.00,
    category: "FLOOR",
    images: ["https://www.roccia.com/cdn/shop/files/Cianni_Residence_-_Kitchen_Banner.jpg?v=1727103735&width=1100"],
    description: "Classic marble-look floor tile with subtle veining. Polished finish for a luxurious look.",
  },
  {
    name: "Nordic Grey Matte Floor",
    sizes: ["12x24\"", "24x24\""],
    colors: ["#b8b4ae", "#8c8880", "#5c5850"],
    priceSqFt: 12.50,
    priceBox: 60.00,
    category: "FLOOR",
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"],
    description: "Scandinavian-inspired grey matte floor tile. Minimalist design for modern spaces.",
  },

  // ── WALL ───────────────────────────────────────────────
  {
    name: "Lusso White Gloss Wall",
    sizes: ["3x12\"", "4x16\""],
    colors: ["#ffffff", "#f5f0eb", "#e8e4de"],
    priceSqFt: 8.50,
    priceBox: 42.00,
    category: "WALL",
    images: ["https://i0.wp.com/wp.tilemountain.co.uk/wp-content/uploads/2019/07/03-TileMountain_3160326_PalatinaWhiteGlossTiles.jpg?resize=1000%2C667&ssl=1"],
    description: "Bright white gloss ceramic wall tile. Ideal for creating clean, light-filled spaces.",
  },
  {
    name: "Artisan Handmade Wall",
    sizes: ["4x4\"", "4x8\""],
    colors: ["#c8d4c8", "#a8b8a8", "#7a9a7a", "#4a6a4a"],
    priceSqFt: 11.25,
    priceBox: 58.00,
    category: "WALL",
    images: ["https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=800"],
    description: "Handcrafted-look ceramic wall tile with gentle surface variation. Each tile is unique.",
  },
  {
    name: "Metro Gloss Brick Wall",
    sizes: ["3x6\"", "4x8\""],
    colors: ["#f5f0eb", "#e0dbd4", "#c8c0b8"],
    priceSqFt: 7.95,
    priceBox: 38.00,
    category: "WALL",
    images: ["https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800"],
    description: "Classic metro-style brick wall tile. Timeless subway format in a glossy finish.",
  },

  // ── BATHROOM ───────────────────────────────────────────
  {
    name: "Aqua Wave Bathroom Tile",
    sizes: ["12x24\"", "18x36\""],
    colors: ["#d4e8f0", "#a8ccdc", "#6a9ab0"],
    priceSqFt: 14.95,
    priceBox: 72.00,
    category: "BATHROOM",
    images: ["https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800"],
    description: "Soothing aqua-toned bathroom tile with subtle wave texture. Waterproof and slip-resistant.",
  },
  {
    name: "Calacatta Spa Bathroom",
    sizes: ["24x48\"", "12x24\""],
    colors: ["#f5f0eb", "#d4cfc9", "#a8a0a0"],
    priceSqFt: 19.95,
    priceBox: 98.00,
    category: "BATHROOM",
    images: ["https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800"],
    description: "Luxury spa-inspired calacatta tile for bathroom walls and floors. Polished finish.",
  },
  {
    name: "Pebble Stone Mosaic Bath",
    sizes: ["12x12\" sheet"],
    colors: ["#c8c0b8", "#a0988c", "#787068"],
    priceSqFt: 16.50,
    priceBox: 78.00,
    category: "BATHROOM",
    images: ["https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=800"],
    description: "Natural pebble stone mosaic tile. Perfect for shower floors and feature walls.",
  },

  // ── KITCHEN ────────────────────────────────────────────
  {
    name: "Zellige Terracotta Kitchen",
    sizes: ["4x4\"", "6x6\""],
    colors: ["#c87840", "#a05828", "#8a4820"],
    priceSqFt: 13.75,
    priceBox: 65.00,
    category: "KITCHEN",
    images: ["https://www.roccia.com/cdn/shop/collections/Kitchen_Floor_Tile_1_1_67d4a759-2470-4e44-beab-ce35aea7e54c.jpg?v=1754469575"],
    description: "Handmade Moroccan-style zellige tile in warm terracotta. Adds authentic character to kitchens.",
  },
  {
    name: "Backsplash White Hex Tile",
    sizes: ["1x1\"", "2x2\""],
    colors: ["#f8f5f0", "#e0dbd4", "#c0bab4"],
    priceSqFt: 10.50,
    priceBox: 50.00,
    category: "KITCHEN",
    images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800"],
    description: "Classic white hexagon mosaic tile. Timeless backsplash for kitchens and bathrooms.",
  },
  {
    name: "Green Gloss Kitchen Wall",
    sizes: ["3x9\"", "4x12\""],
    colors: ["#4a7a4a", "#3a6a3a", "#2a5a2a"],
    priceSqFt: 11.95,
    priceBox: 55.00,
    category: "KITCHEN",
    images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800"],
    description: "Bold forest green glossy kitchen wall tile. Makes a stunning statement backsplash.",
  },

  // ── LIVING ROOM ────────────────────────────────────────
  {
    name: "Grande Porcelain Living Room",
    sizes: ["24x48\"", "32x32\""],
    colors: ["#e8e4de", "#c8c4bc", "#a0988c"],
    priceSqFt: 22.00,
    priceBox: 108.00,
    category: "LIVING ROOM",
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"],
    description: "Large format porcelain tile for spacious living rooms. Subtle concrete-look texture.",
  },
  {
    name: "Herringbone Parquet Look",
    sizes: ["4x16\"", "6x24\""],
    colors: ["#d4bc98", "#b89c70", "#8a7050"],
    priceSqFt: 18.50,
    priceBox: 90.00,
    category: "LIVING ROOM",
    images: ["https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800"],
    description: "Wood-look porcelain tile in herringbone format. The warmth of wood with tile durability.",
  },

  // ── OUTDOOR ────────────────────────────────────────────
  {
    name: "Slate Look Outdoor Tile",
    sizes: ["12x24\"", "24x24\""],
    colors: ["#5a5850", "#3a3830", "#6a6860"],
    priceSqFt: 13.95,
    priceBox: 68.00,
    category: "OUTDOOR",
    images: ["https://content.iconworldoftile.com/content/slider/slider-7.jpg"],
    description: "Textured slate-look porcelain tile for outdoor patios and walkways. Frost-resistant.",
  },
  {
    name: "Travertine Outdoor Paver",
    sizes: ["16x16\"", "24x24\""],
    colors: ["#e0d8c8", "#c8c0a8", "#a8a090"],
    priceSqFt: 15.50,
    priceBox: 75.00,
    category: "OUTDOOR",
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"],
    description: "Natural travertine-look outdoor paver tile. Elegant and durable for exterior spaces.",
  },

  // ── CERAMIC ────────────────────────────────────────────
  {
    name: "Classic Ceramic White",
    sizes: ["10x10\"", "12x12\""],
    colors: ["#ffffff", "#f0ede8"],
    priceSqFt: 5.95,
    priceBox: 28.00,
    category: "CERAMIC",
    images: ["https://i0.wp.com/wp.tilemountain.co.uk/wp-content/uploads/2019/07/03-TileMountain_3160326_PalatinaWhiteGlossTiles.jpg?resize=1000%2C667&ssl=1"],
    description: "Versatile white ceramic tile. A budget-friendly classic for walls and light-traffic floors.",
  },
  {
    name: "Speckled Terrazzo Ceramic",
    sizes: ["12x12\"", "18x18\""],
    colors: ["#e8e4de", "#c8c4bc", "#d4cfc9"],
    priceSqFt: 8.95,
    priceBox: 44.00,
    category: "CERAMIC",
    images: ["https://www.roccia.com/cdn/shop/collections/Kitchen_Floor_Tile_1_1_67d4a759-2470-4e44-beab-ce35aea7e54c.jpg?v=1754469575"],
    description: "Terrazzo-look ceramic tile with colorful speckles. Retro charm with modern aesthetics.",
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    const inserted = await Product.insertMany(dummyProducts);
    console.log(`🌱 Seeded ${inserted.length} products successfully!`);

    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed Error:', err.message);
    process.exit(1);
  }
}

seed();
