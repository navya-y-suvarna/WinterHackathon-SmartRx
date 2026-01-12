const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const fs = require("fs");
const path = require("path");

// Mock Data (Backup)
const MOCK_PRODUCTS = [
    {
        name: 'Paracetamol 500mg',
        manufacturer: 'Generic Pharma Ltd.',
        packaging: 'Strip of 10 tablets',
        price: 12,
        originalPrice: 15,
        bulkPrice100: 10.5,
        bulkPrice500: 9.5,
        bulkPrice1000: 8.5,
        rating: 4.5,
        inStock: true,
        stockCount: 5000,
        delivery: '24-48 hrs',
        minOrder: '100 units',
        discount: 20,
        trending: true,
        autoRefillAvailable: true,
        tags: ['pain', 'fever', 'headache']
    }
];

// GET /api/products/search?q=query
router.get("/search", async (req, res) => {
    try {
        const { q } = req.query;
        console.log(`🔍 Product search hit! Query: "${q}"`);
        if (!q) {
            return res.json([]);
        }

        const queryRegex = new RegExp(q, "i");

        const products = await Product.find({
            $or: [
                { name: queryRegex },
                { manufacturer: queryRegex },
                { tags: queryRegex }
            ]
        }).limit(50);

        res.json(products);
    } catch (error) {
        console.error("Search Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// POST /api/products/seed
router.post("/seed", async (req, res) => {
    try {
        await Product.deleteMany({});
        await Product.insertMany(MOCK_PRODUCTS);
        res.json({ message: "Database seeded with MOCK data successfully!" });
    } catch (error) {
        console.error("Seed Error:", error);
        res.status(500).json({ error: "Seed failed" });
    }
});

// POST /api/products/seed-csv
router.post("/seed-csv", async (req, res) => {
    try {
        const csvPath = path.join(__dirname, "../../pharmacy_csv_upload/medicines.csv");

        if (!fs.existsSync(csvPath)) {
            return res.status(404).json({ error: "CSV file not found at " + csvPath });
        }

        const data = fs.readFileSync(csvPath, "utf8");
        const lines = data.split("\n");
        // Simple header check
        const headers = lines[0].split(",").map(h => h.trim());

        const idxName = headers.indexOf("Name");
        const idxCat = headers.indexOf("Category");
        const idxForm = headers.indexOf("Dosage Form");
        const idxStr = headers.indexOf("Strength");
        const idxMan = headers.indexOf("Manufacturer");
        const idxInd = headers.indexOf("Indication");
        const idxClass = headers.indexOf("Classification");
        const idxStock = headers.indexOf("stock_quantity");

        const products = [];
        const seenNames = new Set();

        // Limit to 2000 to be safe
        const limit = Math.min(lines.length, 2000);

        for (let i = 1; i < limit; i++) {
            const line = lines[i];
            if (!line || !line.trim()) continue;

            // Simple split handling quoted values imperfectly but sufficient for this dataset
            // Splitting by comma OUTSIDE of quotes
            const cols = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);

            // Fallback
            const simpleCols = line.split(",");

            // Use simple split if match failed (though match is better)
            const row = cols && cols.length >= headers.length ? cols : simpleCols;

            // Getting values safely
            const getName = (idx) => {
                if (!row[idx]) return "";
                return row[idx].replace(/^"|"$/g, '').trim();
            };

            const name = getName(idxName);
            if (!name || seenNames.has(name)) continue;
            seenNames.add(name);

            const manufacturer = getName(idxMan);
            const form = getName(idxForm);
            const strength = getName(idxStr);
            const indication = getName(idxInd);
            const classification = getName(idxClass);
            const category = getName(idxCat);

            // Random generation
            const price = Math.floor(Math.random() * 450) + 50;
            const discount = Math.floor(Math.random() * 20);
            const rating = (Math.random() * 1.5) + 3.5;

            products.push({
                name: name,
                manufacturer: manufacturer,
                packaging: `${form} ${strength}`,
                price: price,
                originalPrice: Math.floor(price * (1 + (discount / 100))),
                rating: parseFloat(rating.toFixed(1)),
                inStock: true,
                stockCount: 100 + Math.floor(Math.random() * 500), // Random stock
                delivery: '24-48 hrs',
                minOrder: '1 unit',
                discount: discount,
                trending: Math.random() > 0.8,
                autoRefillAvailable: true,
                tags: [indication, classification, category, form].filter(Boolean)
            });
        }

        if (products.length > 0) {
            await Product.deleteMany({});
            await Product.insertMany(products);
            res.json({ message: `Database seeded with ${products.length} products from CSV!` });
        } else {
            res.status(400).json({ error: "No valid products found in CSV to seed." });
        }

    } catch (error) {
        console.error("CSV Seed Error:", error);
        res.status(500).json({ error: "Seed failed: " + error.message });
    }
});

module.exports = router;
