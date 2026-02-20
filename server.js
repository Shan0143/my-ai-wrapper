const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    // ✅ YEH MOCK RESPONSE HAI - AI KI JAGAH YE TEXT AAYEGA
    // Isse aap website ka design test kar payenge
    
    const responses = [
        "That's an interesting question! Tell me more.",
        "I'm currently in demo mode, but I understand your message.",
        "Great point! How can I help you further?",
        "I can help you with coding, writing, and more!"
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // 2 second delay (AI jaisa feel aane ke liye)
    setTimeout(() => {
        res.json({ reply: randomResponse });
    }, 2000);
    
    /* 
    // ⚠️ REAL API LAGANE KE LIYE YE CODE UNCOMMENT KAREIN:
    
    const axios = require('axios');
    try {
        const response = await axios.post('REAL_API_URL', {
            prompt: message
        }, {
            headers: { 'Authorization': 'Bearer YOUR_API_KEY' }
        });
        res.json({ reply: response.data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    */
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});