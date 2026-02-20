const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
    const message = userInput.value.trim();
    if (message === "") return;

    addMessage(message, 'user');
    userInput.value = "";

    const loadingDiv = document.createElement('div');
    loadingDiv.classList.add('message', 'bot-message');
    loadingDiv.textContent = "Thinking...";
    loadingDiv.id = "loading";
    chatBox.appendChild(loadingDiv);

    try {
        const response = await fetch('http://localhost:5000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();
        document.getElementById('loading').remove();
        addMessage(data.reply || "No response", 'bot');
    } catch (error) {
        document.getElementById('loading').remove();
        addMessage("Error connecting to server", 'bot');
    }
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});