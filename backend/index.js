// Load environment variables from .env file
require("dotenv").config();

const express = require("express");
const cors = require("cors");

// Create an Express app
const app = express();

// Middleware to handle JSON data
app.use(express.json());

// Enable CORS
app.use(cors());

// Simple route for testing
app.get("/", (req, res) => {
  res.send("Hello, world! The server is running.");
});

// Define a port (use PORT from environment or default to 5000)
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
