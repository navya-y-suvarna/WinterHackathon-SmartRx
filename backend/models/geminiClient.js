const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// Initialize the API client
// We use a dummy key if missing to prevent initialization crash, but isConfigured checks validity
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "dummy_key");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const isConfigured = () => {
    return process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.length > 10 && process.env.GEMINI_API_KEY !== "dummy_key";
};

// Mock responses for fallback
const getMockResponse = (prompt) => {
    return `I can help with that! However, my advanced AI brain is currently offline (API key missing). 

You asked: "${prompt}"

In a real deployment, I would give you a specific medical answer. For now, try asking about "Find medicines" to test the quick actions!`;
};

const getMockPrescription = (condition) => {
    return `[MOCK PRESCRIPTION] for ${condition}

Rx: Simulated AI Prescription
----------------------------
Diagnosis: ${condition} (Simulated)
Treatment: Rest and hydration
Medication: Placebo 500mg, 1 tablet per day

Note: Real AI analysis requires a valid API key.`;
};

const generateResponse = async (prompt) => {
    if (!isConfigured()) {
        console.log("⚠️ Gemini API Key missing, using mock response.");
        return getMockResponse(prompt);
    }

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("❌ Gemini API Error:", error.message);
        return getMockResponse(prompt);
    }
};

const generatePrescriptionResponse = async (symptoms, history) => {
    if (!isConfigured()) {
        console.log("⚠️ Gemini API Key missing, using mock prescription.");
        return getMockPrescription(symptoms);
    }

    const systemPrompt = "Act as a medical assistant. Provide a tentative analysis and suggest over-the-counter treatments if appropriate. Include a strict disclaimer to see a real doctor.";
    const userPrompt = `Symptoms: ${symptoms}. Medical History: ${history || "None provided"}.`;

    try {
        const result = await model.generateContent(systemPrompt + "\n\n" + userPrompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("❌ Gemini API Error:", error.message);
        return getMockPrescription(symptoms);
    }
};

module.exports = { generateResponse, generatePrescriptionResponse };
