require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const products = [
  { name: "Running Shoes", price: 1999, description: "Comfortable shoes for daily running", image: "/images/shoes.jpg", category: "Footwear", stock: 20 },
  { name: "Wireless Headphones", price: 2499, description: "Bluetooth headphones with deep bass", image: "/images/headphones.jpg", category: "Electronics", stock: 15 },
  { name: "Cotton T-Shirt", price: 499, description: "Soft cotton t-shirt for everyday wear", image: "/images/tshirt.jpg", category: "Clothing", stock: 50 },
  { name: "Backpack", price: 1299, description: "Spacious backpack for college and travel", image: "/images/backpack.jpg", category: "Accessories", stock: 30 },
  { name: "Smart Watch", price: 3499, description: "Fitness tracking smart watch", image: "/images/watch.jpg", category: "Electronics", stock: 10 },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Products reset with local images");
    process.exit(0);
  })
  .catch((err) => {
    console.log("Error:", err.message);
    process.exit(1);
  });