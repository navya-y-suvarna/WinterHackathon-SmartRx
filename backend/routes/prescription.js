const express = require("express");
const router = express.Router();
const { generatePrescriptionResponse } = require("../models/geminiClient");

router.post("/", async (req, res) => {
    try {
        const { symptoms, history } = req.body;
        
        // Use Gemini for prescription/symptom analysis
        const aiResponse = await generatePrescriptionResponse(symptoms, history);
        
        // Assuming the response is plain text for now.
        res.json({ reply: aiResponse });
        
    } catch (error) {
        console.error("Prescription API Error:", error);
        res.status(500).json({ reply: "Sorry, I'm unable to process your request at the moment." });
    }
});

module.exports = router;
