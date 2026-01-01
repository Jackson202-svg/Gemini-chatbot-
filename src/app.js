import { fetchGeminiResponse } from '../chatbot/engine.js';
import { setupAuth } from './auth.js';

setupAuth();

const sendBtn = document.getElementById('send-btn');
const inputField = document.getElementById('user-input');
const chatBox = document.getElementById('chat-container');

async function handleChat() {
    const prompt = inputField.value.trim();
    if (!prompt) return;

    // 1. Show User Message
    appendMessage('user', prompt);
    inputField.value = '';

    // 2. Show Loading State
    const loadingId = appendMessage('bot', '...', true);

    try {
        // 3. Call the Chatbot folder logic
        const response = await fetchGeminiResponse(prompt);
        updateMessage(loadingId, response);
    } catch (err) {
        updateMessage(loadingId, "Connection error. Please check your API key.");
    }
}

function appendMessage(role, text, isLoading = false) {
    const id = Date.now();
    const div = document.createElement('div');
    div.className = `message ${role}-bubble`;
    div.id = id;
    div.innerText = text;
    chatBox.appendChild(div);
    return id;
}

function updateMessage(id, newText) {
    document.getElementById(id).innerText = newText;
}

sendBtn.onclick = handleChat;
