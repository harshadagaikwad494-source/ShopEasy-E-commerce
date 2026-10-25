require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const img = (name) => `/images/${name}.jpg`;

const products = [
  { name: "Running Shoes", price: 1999, description: "Comfortable shoes for daily running", image: img("shoes"), category: "Footwear", stock: 20 },
  { name: "Casual Sneakers", price: 1599, description: "Everyday sneakers with soft cushioning", image: img("sneakers"), category: "Footwear", stock: 25 },
  { name: "Formal Leather Shoes", price: 2799, description: "Classic leather shoes for office and events", image: img("leathershoes"), category: "Footwear", stock: 12 },
  { name: "Hiking Boots", price: 3299, description: "Strong grip boots for trails and trips", image: img("boots"), category: "Footwear", stock: 8 },
  { name: "Slip-on Sandals", price: 699, description: "Light and easy sandals for summer", image: img("sandals"), category: "Footwear", stock: 40 },

  { name: "Wireless Headphones", price: 2499, description: "Bluetooth headphones with deep bass", image: img("headphones"), category: "Electronics", stock: 15 },
  { name: "Smart Watch", price: 3499, description: "Fitness tracking smart watch", image: img("watch"), category: "Electronics", stock: 10 },
  { name: "Bluetooth Speaker", price: 1799, description: "Portable speaker with 12 hours of playtime", image: img("speaker"), category: "Electronics", stock: 18 },
  { name: "Power Bank 20000mAh", price: 1499, description: "Fast charging power bank for phones and tablets", image: img("powerbank"), category: "Electronics", stock: 30 },
  { name: "Wireless Mouse", price: 599, description: "Silent click wireless mouse for laptop", image: img("mouse"), category: "Electronics", stock: 45 },

  { name: "Cotton T-Shirt", price: 499, description: "Soft cotton t-shirt for everyday wear", image: img("tshirt"), category: "Clothing", stock: 50 },
  { name: "Denim Jacket", price: 2199, description: "Stylish denim jacket for all seasons", image: img("denimjacket"), category: "Clothing", stock: 14 },
  { name: "Slim Fit Jeans", price: 1399, description: "Stretchable slim fit jeans", image: img("jeans"), category: "Clothing", stock: 35 },
  { name: "Hooded Sweatshirt", price: 1199, description: "Warm fleece hoodie with front pocket", image: img("hoodie"), category: "Clothing", stock: 22 },
  { name: "Formal Shirt", price: 999, description: "Wrinkle-free shirt for office wear", image: img("shirt"), category: "Clothing", stock: 28 },

  { name: "Backpack", price: 1299, description: "Spacious backpack for college and travel", image: img("backpack"), category: "Accessories", stock: 30 },
  { name: "Leather Wallet", price: 799, description: "Slim leather wallet with card slots", image: img("wallet"), category: "Accessories", stock: 40 },
  { name: "Sunglasses", price: 899, description: "UV protected sunglasses with a light frame", image: img("sunglasses"), category: "Accessories", stock: 26 },
  { name: "Classic Analog Watch", price: 1899, description: "Elegant analog watch with a steel strap", image: img("analogwatch"), category: "Accessories", stock: 16 },
  { name: "Baseball Cap", price: 399, description: "Adjustable cotton cap for sunny days", image: img("cap"), category: "Accessories", stock: 60 },

  { name: "Steel Water Bottle", price: 549, description: "Insulated bottle, keeps drinks cold for 24 hours", image: img("bottle"), category: "Home", stock: 55 },
  { name: "Coffee Mug Set", price: 699, description: "Set of 4 ceramic coffee mugs", image: img("mugs"), category: "Home", stock: 20 },
  { name: "Table Lamp", price: 1099, description: "Warm light lamp for study and bedroom", image: img("lamp"), category: "Home", stock: 9 },
  { name: "Non-stick Frying Pan", price: 849, description: "Durable non-stick pan for daily cooking", image: img("fryingpan"), category: "Home", stock: 24 },
  { name: "Cushion Cover Set", price: 449, description: "Set of 5 soft cushion covers", image: img("cushions"), category: "Home", stock: 38 },

  { name: "Yoga Mat", price: 799, description: "Anti-slip yoga mat with carry strap", image: img("yogamat"), category: "Sports", stock: 32 },
  { name: "Dumbbell Set", price: 2299, description: "Adjustable dumbbell set for home workouts", image: img("dumbbells"), category: "Sports", stock: 7 },
  { name: "Football", price: 649, description: "Size 5 football for grounds and turf", image: img("football"), category: "Sports", stock: 27 },
  { name: "Badminton Racket", price: 1099, description: "Lightweight racket with a free shuttle pack", image: img("racket"), category: "Sports", stock: 19 },
  { name: "Skipping Rope", price: 249, description: "Speed rope with comfortable handles", image: img("rope"), category: "Sports", stock: 70 },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(`${products.length} products added`);
    process.exit(0);
  })
  .catch((err) => {
    console.log("Error:", err.message);
    process.exit(1);
  });