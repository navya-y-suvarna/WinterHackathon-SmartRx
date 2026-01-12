const express = require("express");
const router = express.Router();

// Import logic functions
const { predictRefill } = require("../logic/predictRefill");
const { personalizeUser } = require("../logic/personalizeUser");

// Mock data for demonstration purposes (since we might not have a full DB populated yet)
const MOCK_ORDERS = [
    {
        medicine_id: "Metformin",
        purchase_date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 25).toISOString(), // 25 days ago
        quantity: 30,
        dosage: 1,
    },
    {
        medicine_id: "Metformin",
        purchase_date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 55).toISOString(), // 55 days ago
        quantity: 30,
        dosage: 1,
    },
    {
        medicine_id: "Lisinopril",
        purchase_date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
        quantity: 90,
        dosage: 1,
    },
];

const { getChatResponse } = require("../logic/chatbotLogic");

router.post("/chat", async (req, res) => {
    try {
        const { message, history } = req.body;

        // Use the new intelligent logic
        console.log("🤖 Chat endpoint hit! Message:", message);
        const responseText = await getChatResponse(message, history || []);

        res.json({ reply: responseText });

    } catch (error) {
        console.error("AI Chat Error:", error);
        res.status(500).json({ reply: "Sorry, I encountered an error. Please make sure the AI service is correctly configured." });
    }
});


module.exports = router;
