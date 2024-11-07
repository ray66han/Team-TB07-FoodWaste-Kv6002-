const mongoose = require("mongoose");

const fridgeItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  expiryDate: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  status: { type: Boolean, default: false },
  category: {
    type: String,
    enum: [
      "Dairy",
      "Meat",
      "Vegetables",
      "Fruits",
      "Beverages",
      "Leftovers",
      "Baked Goods",
      "Miscellaneous",
    ],
    required: true,
  },
});

fridgeItemSchema.pre("save", function (next) {
  if (this.expiryDate) {
    this.expiryDate = new Date(this.expiryDate).toISOString().split("T")[0];
  }
  next();
});

module.exports = mongoose.model("FridgeItem", fridgeItemSchema);