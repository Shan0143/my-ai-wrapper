const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    // Ollama se response lene ka tarika
    const ollama = spawn('ollama', ['run', 'llama2', message]);

    let responseText = '';

    ollama.stdout.on('data', (data) => {
        responseText += data.toString();
    });

    ollama.on('close', (code) => {
        res.json({ reply: responseText || "No response from AI" });
    });

    ollama.on('error', (err) => {
        res.status(500).json({ error: err.message });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});