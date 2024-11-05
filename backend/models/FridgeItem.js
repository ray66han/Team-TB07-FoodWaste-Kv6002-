const mongoose = require("mongoose");

const fridgeItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  expiryDate: { type: Date, required: true },
  price: { type: Number, required: true, min: 0 },
});

module.exports = mongoose.model("FridgeItem", fridgeItemSchema);
