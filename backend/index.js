// Load environment variables
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const FridgeItem = require("./models/FridgeItem");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

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
  const { name, expiryDate, price, quantity } = req.body;

  // Validate the inputs
  if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
    return res.status(400).json({ error: "Invalid name format" });
  }
  if (!expiryDate || isNaN(new Date(expiryDate).getTime())) {
    return res.status(400).json({ error: "Invalid expiry date" });
  }
  if (isNaN(price) || price <= 0) {
    return res.status(400).json({ error: "Invalid price" });
  }
  if (isNaN(quantity) || quantity <= 0) {
    return res.status(400).json({ error: "Invalid quantity" });
  }

  try {
    // Format date to YYYY-MM-DD
    const formattedExpiryDate = new Date(expiryDate)
      .toISOString()
      .split("T")[0];
    const newItem = new FridgeItem({
      name,
      expiryDate: formattedExpiryDate,
      price,
      quantity,
    });
    await newItem.save();

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to add item" });
  }
});

app.get("/items", async (req, res) => {
  try {
    const items = await FridgeItem.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve items" });
  }
});

app.put("/items/:id", async (req, res) => {
  const { id } = req.params;
  const { name, expiryDate, price } = req.body;

  try {
    const updatedItem = await FridgeItem.findByIdAndUpdate(
      id,
      { name, expiryDate, price },
      { new: true }
    );
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to update item" });
  }
});

app.delete("/items/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await FridgeItem.findByIdAndDelete(id);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete item" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
