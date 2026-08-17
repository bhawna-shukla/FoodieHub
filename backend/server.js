const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware

app.use(cors());
app.use(express.json());

// User Routes
app.use("/api/users", userRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("FoodieHub Backend is running!");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully..........");

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error.message);
  });