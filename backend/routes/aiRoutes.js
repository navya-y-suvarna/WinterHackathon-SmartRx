const express = require("express");
const router = express.Router();

// Import logic functions
const { predictRefill } = require("../../logic/predictRefill");
const { personalizeUser } = require("../../logic/personalizeUser");

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

router.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;
        const lowerMsg = message.toLowerCase();

        let responseText = "I'm not sure how to help with that yet. You can ask me about refills, interactions, or finding pharmacies.";

        // Simple keyword matching to demonstrate logic integration
        if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
            responseText = "Hello! I'm your SmartRx Assistant. How can I help you today?";
        } else if (lowerMsg.includes("refill") || lowerMsg.includes("medicine")) {
            // Use the predictRefill logic
            const prediction = predictRefill(MOCK_ORDERS);
            if (prediction) {
                responseText = `Based on your history, ${prediction.medicine_id} might need a refill soon. You have about ${prediction.days_remaining} days remaining. Urgency: ${prediction.urgency}.`;
            } else {
                responseText = "I couldn't find enough history to predict refills yet.";
            }
        } else if (lowerMsg.includes("interaction") || lowerMsg.includes("check")) {
            responseText = "I can check for drug interactions. Please upload your prescription or list your current medications.";
        } else if (lowerMsg.includes("pharmacy") || lowerMsg.includes("near")) {
            responseText = "I can help you find nearby pharmacies. Please enable location services.";
        } else if (lowerMsg.includes("stats") || lowerMsg.includes("insight")) {
            const stats = personalizeUser(MOCK_ORDERS);
            if (stats) {
                responseText = `You have ${stats.order_count} orders on record. Frequent meds: ${stats.frequent_medicines.join(", ") || "None"}.`;
            }
        }

        // Simulate network delay for realism
        setTimeout(() => {
            res.json({ reply: responseText });
        }, 500);

    } catch (error) {
        console.error("AI Chat Error:", error);
        res.status(500).json({ reply: "Sorry, I encountered an error processing your request." });
    }
});

module.exports = router;
