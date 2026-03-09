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
  // BATHROOM (6 items)
  {
    name: "Travertine Pearl Polished",
    category: "BATHROOM",
    description: "Elegant pearl-toned travertine tiles with a high-gloss polished finish.",
    priceSqFt: 120, priceBox: 1800,
    sizes: ["600x600mm", "600x1200mm"], colors: ["Beige", "Ivory"],
    images: ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1000"]
  },
  {
    name: "Azzurro Sky Hexagon",
    category: "BATHROOM",
    description: "Stunning sky blue hexagon tiles perfect for feature walls and shower areas.",
    priceSqFt: 95, priceBox: 1100,
    sizes: ["200x230mm"], colors: ["Blue", "Light Blue"],
    images: ["https://images.unsplash.com/photo-1620626011761-9963d7521438?auto=format&fit=crop&q=80&w=1000"]
  },
  {
    name: "Rose Quartz Glossy",
    category: "BATHROOM",
    description: "Soft pink quartz-look tiles that add a touch of luxury and warmth.",
    priceSqFt: 110, priceBox: 1550,
    sizes: ["300x600mm"], colors: ["Pink", "Rose"],
    images: ["https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1000"]
  },
  {
    name: "Midnight Blue Mosaic",
    category: "BATHROOM",
    description: "Deep ocean blue glass mosaics for a sophisticated wet area look.",
    priceSqFt: 140, priceBox: 1600,
    sizes: ["300x300mm Sheet"], colors: ["Navy", "Blue"],
    images: ["https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=1000"]
  },
  {
    name: "Carrara Mist White",
    category: "BATHROOM",
    description: "Lightly veined Carrara marble finish for a bright, clean bathroom.",
    priceSqFt: 85, priceBox: 1200,
    sizes: ["600x600mm"], colors: ["White"],
    images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1000"]
  },
  {
    name: "Oceanic Teal Gloss",
    category: "BATHROOM",
    description: "Vibrant teal glossy tiles that create a spa-like atmosphere.",
    priceSqFt: 100, priceBox: 1450,
    sizes: ["100x300mm"], colors: ["Teal", "Green"],
    images: ["https://images.unsplash.com/photo-1616486339247-d5dadae4b4ace?auto=format&fit=crop&q=80&w=1000"]
  },

  // LIVING ROOM (6 items)
  {
    name: "Grey Pietra Marble",
    category: "LIVING ROOM",
    description: "Sophisticated grey marble with white veining. High durability.",
    priceSqFt: 145, priceBox: 2200,
    sizes: ["800x800mm", "800x1600mm"], colors: ["Grey"],
    images: ["https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=1000"]
  },
  {
    name: "Royal Walnut Planks",
    category: "LIVING ROOM",
    description: "Rich walnut wood-look tiles with deep grain texture.",
    priceSqFt: 115, priceBox: 1600,
    sizes: ["200x1200mm"], colors: ["Walnut", "Dark Brown"],
    images: ["https://images.unsplash.com/photo-1549413280-36e4f3a47990?auto=format&fit=crop&q=80&w=1000"]
  },
  {
    name: "Ivory Silk Large Format",
    category: "LIVING ROOM",
    description: "Ultra-large format tiles in a satin ivory finish for a grand floor.",
    priceSqFt: 160, priceBox: 2800,
    sizes: ["1200x2400mm"], colors: ["Ivory", "Cream"],
    images: ["https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&q=80&w=1000"]
  },
  {
    name: "Warm Ash Oak",
    category: "LIVING ROOM",
    description: "Scandinavian inspired light oak planks for a modern, airy feel.",
    priceSqFt: 105, priceBox: 1350,
    sizes: ["200x1000mm"], colors: ["Light Brown", "Ash"],
    images: ["https://images.unsplash.com/photo-1581850518616-bcb8186c3c30?auto=format&fit=crop&q=80&w=1000"]
  },
  {
    name: "Concrete Loft Grey",
    category: "LIVING ROOM",
    description: "Industrial style concrete effect tiles for contemporary urban living.",
    priceSqFt: 90, priceBox: 1250,
    sizes: ["600x600mm", "600x1200mm"], colors: ["Grey"],
    images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=1000"]
  },
  {
    name: "Sahara Sand Matte",
    category: "LIVING ROOM",
    description: "Warm sand-colored matte tiles that create a peaceful environment.",
    priceSqFt: 95, priceBox: 1100,
    sizes: ["800x800mm"], colors: ["Sand", "Beige"],
    images: ["https://images.unsplash.com/photo-1545601445-4d6a5a05d6f2?auto=format&fit=crop&q=80&w=1000"]
  },

  // KITCHEN (6 items)
  {
    name: "Subway Carrara White",
    category: "KITCHEN",
    description: "Classic Carrara marble subway tiles for a timeless backsplash.",
    priceSqFt: 80, priceBox: 950,
    sizes: ["75x150mm", "100x300mm"], colors: ["White", "Light Grey"],
    images: ["https://images.unsplash.com/photo-1527385352018-3c26dd6c38cd?auto=format&fit=crop&q=80&w=1000"]
  },
  {
    name: "Emerald Green Mosaic",
    category: "KITCHEN",
    description: "Luxurious mini hexagon mosaic in a deep emerald green glossy finish.",
    priceSqFt: 130, priceBox: 1400,
    sizes: ["300x300mm Sheet"], colors: ["Emerald", "Green"],
    images: ["https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=1000"]
  },
  {
    name: "Matte Black Chevron",
    category: "KITCHEN",
    description: "Modern chevron pattern in matte black. Striking for wall designs.",
    priceSqFt: 105, priceBox: 1300,
    sizes: ["Chevron Mix"], colors: ["Black"],
    images: ["https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1000"]
  },
  {
    name: "Tuscan Sun Yellow",
    category: "KITCHEN",
    description: "Handcrafted look tiles in warm yellow for a Mediterranean kitchen.",
    priceSqFt: 88, priceBox: 1150,
    sizes: ["100x100mm", "150x150mm"], colors: ["Yellow", "Mustard"],
    images: ["https://images.unsplash.com/photo-1556912177-c54030639a09?auto=format&fit=crop&q=80&w=1000"]
  },
  {
    name: "Graphite Hex Splash",
    category: "KITCHEN",
    description: "Small graphite grey hexagons for a modern, textured backsplash.",
    priceSqFt: 110, priceBox: 1250,
    sizes: ["50x50mm on Sheet"], colors: ["Charcoal", "Grey"],
    images: ["https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=1000"]
  },
  {
    name: "Copper Penny Rounds",
    category: "KITCHEN",
    description: "Real copper-look circular mosaics for a high-end industrial kitchen.",
    priceSqFt: 155, priceBox: 1900,
    sizes: ["300x300mm Sheet"], colors: ["Copper", "Brown"],
    images: ["https://images.unsplash.com/photo-1556912178-386055d72370?auto=format&fit=crop&q=80&w=1000"]
  },

  // OUTDOOR (6 items)
  {
    name: "Sandstone Desert Rock",
    category: "OUTDOOR",
    description: "Textured sandstone finish tiles, slip-resistant for patios.",
    priceSqFt: 70, priceBox: 980,
    sizes: ["600x600mm"], colors: ["Sand", "Beige"],
    images: ["https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=1000"]
  },
  {
    name: "Slate Anthracite",
    category: "OUTDOOR",
    description: "Modern dark grey slate look tiles for contemporary decks.",
    priceSqFt: 85, priceBox: 1200,
    sizes: ["300x600mm", "600x600mm"], colors: ["Dark Grey", "Black"],
    images: ["https://images.unsplash.com/photo-1563298723-dcfebaa392e3?auto=format&fit=crop&q=80&w=1000"]
  },
  {
    name: "Cobblestone Grey",
    category: "OUTDOOR",
    description: "Classic cobblestone texture tiles for driveways and paths.",
    priceSqFt: 60, priceBox: 850,
    sizes: ["400x400mm"], colors: ["Grey", "Ash"],
    images: ["https://images.unsplash.com/photo-1516514783307-56747b0a8801?auto=format&fit=crop&q=80&w=1000"]
  },
  {
    name: "Rustic Brick Red",
    category: "OUTDOOR",
    description: "Timeless brick-look tiles for traditional garden walls and floors.",
    priceSqFt: 55, priceBox: 750,
    sizes: ["60x240mm"], colors: ["Red", "Terracotta"],
    images: ["https://images.unsplash.com/photo-1558002038-1055907ede4d?auto=format&fit=crop&q=80&w=1000"]
  },
  {
    name: "Basalt Lava Stone",
    category: "OUTDOOR",
    description: "Natural volcanic rock effect tiles, extremely durable and unique.",
    priceSqFt: 130, priceBox: 1850,
    sizes: ["600x600mm"], colors: ["Deep Black"],
    images: ["https://images.unsplash.com/photo-1558449028-s4c26a575e9f?auto=format&fit=crop&q=80&w=1000"]
  },
  {
    name: "Pebble Stone Mix",
    category: "OUTDOOR",
    description: "Natural river pebble mosaics for water features and walkways.",
    priceSqFt: 110, priceBox: 1300,
    sizes: ["300x300mm Sheet"], colors: ["Mixed Earth"],
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1000"]
  },

  // OTHERS (Bedroom, Wall, Floor, etc. - 8 items)
  {
    name: "Oak Wood Texture",
    category: "BEDROOM",
    description: "Light oak wood finish tiles. Perfect for a cozy atmosphere.",
    priceSqFt: 100, priceBox: 1400,
    sizes: ["200x1000mm"], colors: ["Light Oak"],
    images: ["https://images.unsplash.com/photo-1513519245088-0e12902e35ca?auto=format&fit=crop&q=80&w=1000"]
  },
  {
    name: "Calacatta Gold Floor",
    category: "FLOOR",
    description: "Grand Calacatta marble look with gold veins. High-end floor.",
    priceSqFt: 180, priceBox: 3200,
    sizes: ["600x1200mm", "800x1600mm"], colors: ["White", "Gold"],
    images: ["https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1000"]
  },
  {
    name: "Textured Cement Wall",
    category: "WALL",
    description: "Industrial style cement wall tiles for modern interiors.",
    priceSqFt: 75, priceBox: 900,
    sizes: ["300x900mm"], colors: ["Cement Grey"],
    images: ["https://images.unsplash.com/photo-1518733057094-95b53143d2a7?auto=format&fit=crop&q=80&w=1000"]
  },
  {
    name: "Midnight Granite",
    category: "PARKING",
    description: "Extremely tough granite tiles for heavy vehicle traffic.",
    priceSqFt: 55, priceBox: 800,
    sizes: ["300x300mm", "400x400mm"], colors: ["Black"],
    images: ["https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80&w=1000"]
  },
  {
    name: "Skyline Bedroom Grey",
    category: "BEDROOM",
    description: "Soft grey silk finish tiles for a relaxing bedroom environment.",
    priceSqFt: 90, priceBox: 1100,
    sizes: ["600x600mm"], colors: ["Sky Grey"],
    images: ["https://images.unsplash.com/photo-1620626011761-9963d7521438?auto=format&fit=crop&q=80&w=1000"]
  },
  {
    name: "Hickory Plank Brown",
    category: "BEDROOM",
    description: "Deep brown hickory wood tiles for a traditional rustic bedroom.",
    priceSqFt: 110, priceBox: 1500,
    sizes: ["200x1200mm"], colors: ["Brown"],
    images: ["https://images.unsplash.com/photo-1549413280-36e4f3a47990?auto=format&fit=crop&q=80&w=1000"]
  },
  {
    name: "Super White Gloss",
    category: "FLOOR",
    description: "Pure white high-gloss tiles that make any space look larger.",
    priceSqFt: 85, priceBox: 1150,
    sizes: ["600x600mm", "800x800mm"], colors: ["Pure White"],
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1000"]
  },
  {
    name: "Arctic Slate Floor",
    category: "FLOOR",
    description: "Cool-toned light slate tiles with a natural anti-slip surface.",
    priceSqFt: 115, priceBox: 1600,
    sizes: ["600x600mm"], colors: ["Arctic Blue", "Grey"],
    images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=1000"]
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
