const express = require("express");
const router = express.Router();

// Import logic functions
const { predictRefill } = require("../../logic/predictRefill");
const { personalizeUser } = require("../../logic/personalizeUser");
const { getChatResponse } = require("../logic/chatbotLogic"); // Upstream logic

// Mock data for pharmacy features
const MOCK_INVENTORY = [
    { name: "Metformin", stock: 2500, price: 0.15, unit: "tablet" },
    { name: "Lisinopril", stock: 1200, price: 0.25, unit: "tablet" },
    { name: "Atorvastatin", stock: 3000, price: 0.30, unit: "tablet" },
    { name: "Amoxicillin", stock: 500, price: 0.50, unit: "capsule" },
    { name: "Ibuprofen", stock: 10000, price: 0.05, unit: "tablet" },
    { name: "Omeprazole", stock: 800, price: 0.40, unit: "capsule" },
    { name: "Paracetamol", stock: 5000, price: 0.03, unit: "tablet" }
];

router.post("/chat", async (req, res) => {
    try {
        const { message, history } = req.body;
        const lowerMsg = message ? message.toLowerCase() : "";

        // --- Pharmacy Intent Logic (Custom) ---
        
        // 1. Check Inventory Intent
        if (lowerMsg.includes("inventory") || lowerMsg.includes("stock") || lowerMsg.includes("available medicines")) {
            const inventoryList = MOCK_INVENTORY.map(
                (item) => `- **${item.name}**: ${item.stock} ${item.unit}s available ($${item.price}/${item.unit})`
            ).join("\n");
            
            return res.json({ 
                reply: `Here is our current wholesale inventory:\n\n${inventoryList}\n\nWould you like to place a bulk order?` 
            });
        }

        // 2. Check Bulk Order Intent
        if (lowerMsg.includes("order") || lowerMsg.includes("buy") || lowerMsg.includes("purchase")) {
            const foundItem = MOCK_INVENTORY.find(item => lowerMsg.includes(item.name.toLowerCase()));
            
            if (foundItem) {
                const numberMatch = lowerMsg.match(/\d+/);
                const quantity = numberMatch ? parseInt(numberMatch[0]) : 100;
                const totalCost = (quantity * foundItem.price).toFixed(2);
                
                return res.json({
                    reply: `✅ **Order Confirmed**\n\n- **Item**: ${foundItem.name}\n- **Quantity**: ${quantity}\n- **Total Cost**: $${totalCost}\n\nYour order ID is #${Math.floor(Math.random() * 10000)}. expected delivery in 2 days.`
                });
            } else {
                return res.json({
                    reply: "I can help you place a bulk order. Please specify the medicine name and quantity. (e.g., 'Order 500 Metformin')"
                });
            }
        }

        // 3. Direct Medicine Lookup
        const lookedUpItem = MOCK_INVENTORY.find(item => lowerMsg.includes(item.name.toLowerCase()));
        if (lookedUpItem) {
             return res.json({
                reply: `**${lookedUpItem.name}** is in stock.\n\n- **Stock**: ${lookedUpItem.stock} ${lookedUpItem.unit}s\n- **Price**: $${lookedUpItem.price}/${lookedUpItem.unit}\n\nTo place an order, just say "Order ${lookedUpItem.name}" or specify a quantity.`
            });
        }

        // --- Fallback to Upstream Logic ---
        console.log("🤖 Chat endpoint hit! Message:", message);
        const responseText = await getChatResponse(message, history || []);

        res.json({ reply: responseText });
        
    } catch (error) {
        console.error("AI Chat Error:", error);
        res.status(500).json({ reply: "Sorry, I encountered an error. Please make sure the AI service is correctly configured." });
    }
});

router.post("/quick-action", async (req, res) => {
    try {
        const { action } = req.body;
        let responseText = "";

        switch(action) {
            case "Find medicines":
                responseText = "I can help you find medicines. What specific medicine are you looking for? You can search by name or category.";
                break;
            case "Check interactions":
                responseText = "To check for interactions, please list the medicines you are currently taking.";
                break;
            case "Near pharmacies":
                responseText = "I can locate nearby pharmacies. Please share your location or zip code so I can find the closest ones.";
                break;
            default:
                responseText = "I'm not sure how to help with that action yet.";
        }
        
        res.json({ reply: responseText });
        
    } catch (error) {
        console.error("Quick Action API Error:", error);
        res.status(500).json({ reply: "Sorry, I couldn't process that action." });
    }
});

module.exports = router;
