const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');

// Load data helper (from Local)
const loadData = (filename) => {
    try {
        return JSON.parse(fs.readFileSync(path.join(__dirname, `../data/${filename}`), 'utf8'));
    } catch (error) {
        console.error(`Error loading ${filename}:`, error);
        return [];
    }
};

// GET /api/products/search (Upstream Logic)
router.get("/search", async (req, res) => {
    const { q } = req.query;
    console.log(`🔍 Product search hit! Query: "${q}"`);
    if (!q) {
        return res.json([]);
    }

    try {
        const queryRegex = new RegExp(q, "i");
        const products = await Product.find({
            $or: [
                { name: queryRegex },
                { manufacturer: queryRegex },
                { tags: queryRegex },
                { category: queryRegex }
            ]
        }).limit(50);

        res.json(products);
    } catch (error) {
        console.error("Search Error:", error);
        // Fallback or empty
        res.json([]);
    }
});

// GET /api/products/categories (Upstream)
router.get("/categories", async (req, res) => {
    try {
        const categories = await Product.distinct("category");
        res.json(categories.filter(Boolean).sort());
    } catch (error) {
        console.error("Categories Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// GET /api/products/category/:category (Upstream)
router.get("/category/:category", async (req, res) => {
    try {
        const { category } = req.params;
        // Case insensitive match
        const regex = new RegExp(`^${category}$`, 'i');
        const products = await Product.find({ category: regex });
        res.json(products);
    } catch (error) {
        console.error("Category Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// POST /api/products/seed (Upstream - Modified to avoid crash if MOCK_PRODUCTS missing)
router.post("/seed", async (req, res) => {
    try {
        // NOTE: MOCK_PRODUCTS was undefined in merge context. 
        // Disabling seed for safety unless we find the source.
        /*
        await Product.deleteMany({});
        await Product.insertMany(MOCK_PRODUCTS);
        res.json({ message: "Database seeded with MOCK data successfully!" });
        */
        res.json({ message: "Seed disabled (Merge Conflict Safety)" });
    } catch (error) {
        console.error("Seed Error:", error);
        res.status(500).json({ error: "Seed failed" });
    }
});

// GET /api/products/trends (Local/Stashed)
router.get("/trends", (req, res) => {
    const rules = loadData('symptom_rules.json');
    const today = new Date();

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    const currentMonth = monthNames[today.getMonth()];
    // const nextMonthIndex = (today.getMonth() + 1) % 12;
    // const nextMonth = monthNames[nextMonthIndex]; // unused variable warning in local?

    // Local code logic reconstruction:
    const nextMonthIndex = (today.getMonth() + 1) % 12;
    const nextMonth = monthNames[nextMonthIndex];

    const isMonthInRange = (range, month) => {
        if (!range || range === "All year" || range.includes("All year")) return true;

        if (range.includes("-")) {
            const [start, end] = range.split("-");
            const startIdx = monthNames.indexOf(start);
            const endIdx = monthNames.indexOf(end);
            const currIdx = monthNames.indexOf(month);

            if (startIdx <= endIdx) {
                return currIdx >= startIdx && currIdx <= endIdx;
            } else {
                return currIdx >= startIdx || currIdx <= endIdx;
            }
        }

        return range.includes(month);
    };

    const currentTrends = rules.filter(r => isMonthInRange(r.trending_month, currentMonth));
    const nextTrends = rules.filter(r => isMonthInRange(r.trending_month, nextMonth) && !isMonthInRange(r.trending_month, currentMonth));

    res.json({
        currentMonth,
        nextMonth,
        trending: currentTrends,
        upcoming: nextTrends
    });
});

module.exports = router;
