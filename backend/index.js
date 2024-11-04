// Load environment variables
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const FridgeItem = require("./models/FridgeItem");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for JSON parsing
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Define a test route
app.get("/", (req, res) => {
  res.send("MongoDB connection is successful!");
});

// POST route to add fridge items
app.post("/items", async (req, res) => {
  const { name, expiryDate, price } = req.body;

  try {
    const newItem = new FridgeItem({ name, expiryDate, price });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to add item" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
