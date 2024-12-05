const mongoose = require("mongoose");

// Define the schema for fridge items
const fridgeItemSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

fridgeItemSchema.pre("save", function (next) {
  if (this.expiryDate) {
    this.expiryDate = new Date(this.expiryDate).toISOString().split("T")[0];
  }
  next();
});
// Export the model for fridge items
module.exports = mongoose.model("FridgeItem", fridgeItemSchema);
