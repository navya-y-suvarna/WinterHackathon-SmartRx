const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');

// Initialize Gemini model
console.log("🤖 Initializing Gemini CDSS Context... Key Present:", !!process.env.GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Loads JSON data to provide structured context for the AI
 */
const loadContext = () => {
    try {
        const medicines = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/medicines.json'), 'utf8'));
        const symptomRules = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/symptom_rules.json'), 'utf8'));

        return `
        SYSTEM IDENTITY:
        You are the SmartRx Clinical Decision Support System (CDSS) for professional pharmacists. 
        You are NOT a customer-facing bot. You speak to pharmacists in a technical, clinical, and data-driven manner.

        KNOWLEDGE BASE (Sample Data):
        ### MEDICINES (Top 100 SKUs):
        ${JSON.stringify(medicines.slice(0, 50))} 

        ### SYMPTOM PROTOCOLS:
        ${JSON.stringify(symptomRules)}

        OPERATIONAL RULES:
        1. When a pharmacist enters a symptom, match it against the SYMPTOM PROTOCOLS. 
        2. If a symptom is marked 'requires_doctor: true', flag it immediately with a [CLINICAL ALERT].
        3. Only suggest 'allowed_categories' for specific symptoms.
        4. Use the MEDICINES database to verify SKU availability and generic matching.
        5. DO NOT act like a friendly customer assistant. Use professional clinical shorthand.
        6. If data is not found, say "[DATA_NOT_FOUND] Query outside local clinical scope. Reverting to general pharmaceutical standards."

        [SESSION_ID: PHARMA-B2B-SECURE]
        `;
    } catch (error) {
        console.error("Error loading chat context:", error);
        return "System Role: Professional clinical pharmacist assistant. Context loading failed.";
    }
};

const chatContext = loadContext();

/**
 * Handles the chat logic
 */
async function getChatResponse(userMessage, history = []) {
    try {
        // Simple approach - just send the message with system context
        const prompt = `${chatContext}\n\nUser Query: ${userMessage}\n\nProvide a professional clinical response:`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("❌ Gemini Chat Error:", error);
        console.error("Error name:", error.name);
        console.error("Error message:", error.message);
        console.error("Error status:", error.status);
        console.error("Error details:", JSON.stringify(error, null, 2));

        // Provide a helpful fallback
        return "I apologize, but I'm currently unable to connect to the AI service. Please check:\n1. API key is valid\n2. Internet connection is active\n3. Gemini API quota is available";
    }
}

module.exports = { getChatResponse };
