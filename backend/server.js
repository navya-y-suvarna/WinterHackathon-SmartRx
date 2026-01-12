const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/smartrx", {
    dbName: process.env.MONGODB_DATABASE || "smartrx",
  })
  .then(() =>
    console.log("✅ MongoDB connected to database:", process.env.MONGODB_DATABASE)
  )
  .catch((err) => console.log("❌ MongoDB error:", err));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/ai", require("./routes/aiRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
console.log("🛠️ Product routes mounted at /api/products");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
