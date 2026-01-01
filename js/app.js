document.addEventListener('DOMContentLoaded', () => {
    const chatDisplay = document.getElementById('chat-display');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    // Function to add a message bubble
    const addMessage = (text, type) => {
        const div = document.createElement('div');
        div.classList.add('message', type);
        div.innerText = text;
        chatDisplay.appendChild(div);
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
        return div;
    };

    // Function to handle the API call
    const handleChat = async () => {
        const message = userInput.value.trim();
        if (!message) return;

        // User message UI
        addMessage(message, 'user-msg');
        userInput.value = '';

        // Temporary AI "Thinking" state
        const loadingBubble = addMessage('...', 'ai-msg');

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: message })
            });

            const data = await response.json();
            loadingBubble.innerText = data.text; // Replace dots with real text
        } catch (error) {
            loadingBubble.innerText = "Error connecting to Gemini.";
            console.error(error);
        }
    };

    // Event Listeners
    sendBtn.addEventListener('click', handleChat);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleChat();
    });
});
