const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();
app.use(express.json());

const genAI = new GoogleGenerativeAI("YOUR_GEMINI_API_KEY_HERE");

app.post('/api/chat', async (req, res) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = req.body.message;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        res.json({ text: response.text() });
    } catch (error) {
        res.status(500).json({ error: "API Error" });
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
