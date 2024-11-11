// Load environment variables
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const FridgeItem = require("./models/FridgeItem");
const cron = require("node-cron");
const router = express.Router();

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
  const { name, expiryDate, price, quantity, category } = req.body;

  const today = new Date();
  const inputDate = new Date(expiryDate);

  // Validate the inputs
  if (name && !/^[a-zA-Z\s]+$/.test(name)) {
    return res.status(400).json({ error: "Invalid name format" });
  }
  if (
    expiryDate &&
    isNaN(new Date(expiryDate).getTime()) &&
    inputDate < today
  ) {
    return res.status(400).json({ error: "Invalid expiry date" });
  }
  if (price !== undefined && (isNaN(price) || price <= 0)) {
    return res.status(400).json({ error: "Invalid price" });
  }
  if (quantity !== undefined && (isNaN(quantity) || quantity <= 0)) {
    return res.status(400).json({ error: "Invalid quantity" });
  }
  if (category && !validCategories.includes(category)) {
    return res.status(400).json({
      error: `Invalid category. Choose one of: ${validCategories.join(", ")}`,
    });
  }

  try {
    const updatedItem = await FridgeItem.findByIdAndUpdate(
      id,
      { name, expiryDate, price, quantity, category },
      { new: true }
    );

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

router.get("/savings-stats", async (req, res) => {
  try {
    // Calculate the start of the current month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const items = await FridgeItem.find({ createdAt: { $gte: startOfMonth } });

    let savedMoney = 0;
    let wastedMoney = 0;
    let itemsWasted = 0;
    let soonToExpire = 0;

    const currentDate = new Date();

    items.forEach((item) => {
      const expiryDate = new Date(item.expiryDate);

      if (item.status === true && expiryDate >= currentDate) {
        // Item was used before it expired
        savedMoney += item.price; // Assuming `price` holds the item's value
      } else if (expiryDate < currentDate) {
        // Item expired without being used
        wastedMoney += item.price;
        itemsWasted += 1;
      }

      // Count items that are about to expire soon
      const daysUntilExpiry =
        (expiryDate - currentDate) / (1000 * 60 * 60 * 24);
      if (daysUntilExpiry >= 0 && daysUntilExpiry <= 3) {
        soonToExpire += 1;
      }
    });

    res.json({ savedMoney, wastedMoney, itemsWasted, soonToExpire });
  } catch (error) {
    console.error("Error calculating savings stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

// Scheduled task to clear items at the beginning of each month
cron.schedule("0 0 1 * *", async () => {
  try {
    await FridgeItem.deleteMany({
      expiryDate: {
        $lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
    });
    console.log("Old items cleared at the start of the month");
  } catch (error) {
    console.error("Failed to clear old items:", error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
