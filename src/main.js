import { setupAuth } from './auth.js';

// 1. Configuration (Get your key from Google AI Studio)
const API_KEY = "YOUR_GEMINI_API_KEY_HERE"; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const chatContainer = document.getElementById('chat-container');

setupAuth();

// 2. Function to call Gemini API
async function askGemini(prompt) {
    appendMessage('bot', "Thinking...", true); // Add a loading state
    
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();
        const aiText = data.candidates[0].content.parts[0].text;
        
        removeLoading();
        appendMessage('bot', aiText);
    } catch (error) {
        removeLoading();
        appendMessage('bot', "Error: Could not connect to Gemini. Check your API key.");
    }
}

// 3. UI Helpers
function appendMessage(role, text, isLoading = false) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${role} ${isLoading ? 'loading-msg' : ''}`;
    msgDiv.innerHTML = `<div class="bubble">${text}</div>`;
    chatContainer.appendChild(msgDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function removeLoading() {
    const loading = document.querySelector('.loading-msg');
    if (loading) loading.remove();
}

sendBtn.onclick = () => {
    const text = userInput.value;
    if (!text) return;
    appendMessage('user', text);
    askGemini(text);
    userInput.value = '';
};
