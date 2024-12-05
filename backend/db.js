const mongoose = require("mongoose");

//Connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/fridgeSystem", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
