import { GEMINI_CONFIG } from './config.js';

export async function fetchGeminiResponse(userPrompt) {
    const url = `${GEMINI_CONFIG.apiUrl}${GEMINI_CONFIG.model}:generateContent?key=${GEMINI_CONFIG.apiKey}`;
    
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts: [{ text: userPrompt }] }]
        })
    });

    if (!response.ok) throw new Error("API Limit reached or Invalid Key");

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}
