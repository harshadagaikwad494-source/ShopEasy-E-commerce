const Order = require("../models/Order");
const Product = require("../models/Product");

// Place an order (logged-in user). Prices are taken from the database.
exports.createOrder = async (req, res) => {
  try {
    const { items, address } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }
    if (!address) {
      return res.status(400).json({ message: "Address is required" });
    }

    const orderItems = [];
    let totalPrice = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      const qty = Number(item.qty) || 1;
      if (product.stock < qty) {
        return res.status(400).json({ message: `Not enough stock for ${product.name}` });
      }
      orderItems.push({ product: product._id, name: product.name, price: product.price, qty });
      totalPrice += product.price * qty;
    }

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalPrice,
      address,
    });

    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.qty } });
    }

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Logged-in user's own orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};