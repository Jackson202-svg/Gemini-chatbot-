import { setupAuth } from './auth.js';

const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const chatContainer = document.getElementById('chat-container');

// Initialize Auth
setupAuth();

function appendMessage(role, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${role}`;
    msgDiv.innerHTML = `<p>${text}</p>`;
    chatContainer.appendChild(msgDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

sendBtn.addEventListener('click', () => {
    if (!userInput.value) return;
    appendMessage('user', userInput.value);
    userInput.value = '';
    
    // Simulate AI Response
    setTimeout(() => {
        appendMessage('bot', "I'm processing your request in the Arc-styled Gemini interface.");
    }, 1000);
});
