// Load environment variables
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const FridgeItem = require("./models/FridgeItem");
const cron = require("node-cron");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

app.get("/", (req, res) => {
  res.send("MongoDB connection is successful!");
});

const validCategories = [
  "Dairy",
  "Meat",
  "Vegetables",
  "Fruits",
  "Beverages",
  "Leftovers",
  "Baked Goods",
  "Miscellaneous",
];

// POST route to add fridge items
app.post("/items", async (req, res) => {
  const { name, expiryDate, price, quantity, category } = req.body;

  const today = new Date();
  const inputDate = new Date(expiryDate);

  if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
    return res.status(400).json({ error: "Invalid name format" });
  }
  if (!expiryDate || isNaN(inputDate.getTime()) || inputDate < today) {
    return res
      .status(400)
      .json({ error: "Expiry date cannot be before today" });
  }
  if (isNaN(price) || price <= 0) {
    return res.status(400).json({ error: "Invalid price" });
  }
  if (isNaN(quantity) || quantity <= 0) {
    return res.status(400).json({ error: "Invalid quantity" });
  }
  if (!validCategories.includes(category)) {
    return res.status(400).json({
      error: `Invalid category. Choose one of: ${validCategories.join(", ")}`,
    });
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
      category,
    });
    await newItem.save();

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to add item" });
  }
});

// GET route to retrieve fridge items
app.get("/items", async (req, res) => {
  try {
    const items = await FridgeItem.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve items" });
  }
});

app.get("/tips/:category", (req, res) => {
  const { category } = req.params;

  const tipsData = {
    Dairy: [
      "Keep milk in the coldest part of the fridge.",
      "Store cheese in a sealed container.",
      "Use a thermometer to ensure the fridge is between 34°F and 40°F.",
    ],
    Meat: [
      "Store meat on the bottom shelf to avoid cross-contamination.",
      "Freeze if not used within 3 days.",
      "Marinate meat in the fridge, not at room temperature.",
    ],
    Vegetables: [
      "Keep leafy greens in a sealed bag to maintain freshness.",
      "Store potatoes in a cool, dark place.",
      "Do not store tomatoes in the fridge; it changes their flavor.",
    ],
    Fruits: [
      "Keep apples away from bananas to avoid over-ripening.",
      "Store citrus fruits in the fridge for longer shelf life.",
      "Refrigerate berries to avoid mold.",
    ],
    Leftovers: [
      "Cool leftovers to room temperature before refrigerating.",
      "Consume leftovers within 3–4 days for the best taste.",
      "Label leftovers with dates to avoid confusion.",
    ],
    BakedGoods: [
      "Store bread in a cool, dry place to avoid molding.",
      "Freeze cakes and cookies to keep them fresh longer.",
      "Keep muffins in an airtight container to preserve moisture.",
    ],
    Miscellaneous: [
      "Check expiration dates regularly and dispose of expired items.",
      "Use airtight containers to store various dry goods.",
      "Keep spices in a cool, dry place away from direct sunlight.",
    ],
    Beverages: [
      "Refrigerate opened juice bottles and consume within 7 days.",
      "Store soda cans in a cool place, but not in the fridge.",
      "Keep milk and other dairy beverages at the back of the fridge to maintain freshness.",
    ],
  };

  const tips = tipsData[category] || ["No tips available for this category"];
  res.json({ tips });
});

// PUT route to update fridge items
app.put("/items/:id", async (req, res) => {
  const { id } = req.params;
  const { name, expiryDate, price, quantity, category, status } = req.body;

  const today = new Date();
  const inputDate = new Date(expiryDate);

  // Validate the inputs
  if (name && !/^[a-zA-Z\s]+$/.test(name)) {
    return res.status(400).json({ error: "Invalid name format" });
  }
  if (expiryDate && (isNaN(inputDate.getTime()) || inputDate < today)) {
    return res.status(400).json({ error: "Invalid expiry date" });
  }
  if (price !== undefined && (isNaN(price) || price <= 0)) {
    return res.status(400).json({ error: "Invalid price" });
  }
  if (quantity !== undefined && (isNaN(quantity) || quantity <= 0)) {
    return res.status(400).json({ error: "Invalid quantity" });
  }
  const validCategories = [
    "Dairy",
    "Meat",
    "Vegetables",
    "Fruits",
    "Beverages",
    "Leftovers",
    "Baked Goods",
    "Miscellaneous",
  ];
  if (category && !validCategories.includes(category)) {
    return res.status(400).json({
      error: `Invalid category. Choose one of: ${validCategories.join(", ")}`,
    });
  }

  try {
    // Build an update object dynamically
    const updateFields = {};
    if (name) updateFields.name = name;
    if (expiryDate) updateFields.expiryDate = expiryDate;
    if (price !== undefined) updateFields.price = price;
    if (quantity !== undefined) updateFields.quantity = quantity;
    if (category) updateFields.category = category;
    if (status !== undefined) updateFields.status = status;

    const updatedItem = await FridgeItem.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(updatedItem);
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ error: "Failed to update item" });
  }
});

// DELETE route to delete fridge items
app.delete("/items/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await FridgeItem.findByIdAndDelete(id);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete item" });
  }
});

app.get("/savings-stats", async (req, res) => {
  try {
    // Start of the current month
    const currentDate = new Date();
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );

    // Retrieve items added within the current month
    const items = await FridgeItem.find({
      expiryDate: { $gte: startOfMonth.toISOString() },
    });

    let savedMoney = 0;
    let wastedMoney = 0;
    let itemsSaved = 0;
    let itemsWasted = 0;
    let soonToExpire = 0;

    items.forEach((item) => {
      const expiryDate = new Date(item.expiryDate); // Convert expiryDate to Date object

      if (item.status === true && expiryDate >= currentDate) {
        // Item used before expiry
        savedMoney += item.price * item.quantity;
        itemsSaved += 1;
      } else if (item.status === false && expiryDate < currentDate) {
        // Item expired and not used
        wastedMoney += item.price * item.quantity;
        itemsWasted += 1;
      }

      // Soon-to-expire items
      const daysToExpiry = (expiryDate - currentDate) / (1000 * 60 * 60 * 24);
      if (daysToExpiry > 0 && daysToExpiry <= 3 && item.status === false) {
        soonToExpire += 1;
      }
    });

    res.json({
      savedMoney,
      wastedMoney,
      itemsSaved,
      itemsWasted,
      soonToExpire,
    });
  } catch (error) {
    console.error("Error in /savings-stats endpoint:", error);
    res.status(500).json({ error: "Error calculating savings stats" });
  }
});

// Scheduled task to clear expired items at the beginning of each month
cron.schedule("0 0 1 * *", async () => {
  try {
    const currentDate = new Date(); // Current date and time
    await FridgeItem.deleteMany({
      expiryDate: { $lt: currentDate }, // Delete items with expiry dates earlier than now
    });
    console.log("Expired items cleared at the start of the month");
  } catch (error) {
    console.error("Failed to clear expired items:", error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
