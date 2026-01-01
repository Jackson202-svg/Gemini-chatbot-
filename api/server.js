const express = require('express');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = 3000;

// Replace with your actual Gemini API Key from Google AI Studio
const genAI = new GoogleGenerativeAI("YOUR_GEMINI_API_KEY_HERE");

// Middleware
app.use(express.json());
// Serves your HTML, CSS, and JS files from the root directory
app.use(express.static(path.join(__dirname, '../')));

// The API Route
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        // Initialize the model (Gemini 1.5 Flash is fast and efficient)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();

        res.json({ text: text });
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ error: "Failed to fetch response from Gemini" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
