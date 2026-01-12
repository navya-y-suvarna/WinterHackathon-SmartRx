const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true, // For faster search
    },
    manufacturer: String,
    packaging: String,
    price: Number,
    originalPrice: Number,
    bulkPrice100: Number,
    bulkPrice500: Number,
    bulkPrice1000: Number,
    rating: Number,
    inStock: Boolean,
    stockCount: Number,
    delivery: String,
    minOrder: String,
    discount: Number,
    trending: Boolean,
    autoRefillAvailable: Boolean,
    tags: [String], // Good for broader search matching
  },
  { timestamps: true }
);

// Create a text index for search
productSchema.index({ name: "text", manufacturer: "text", tags: "text" });

module.exports = mongoose.model("Product", productSchema);
