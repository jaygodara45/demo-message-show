const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies and enable CORS
app.use(express.json());
app.use(cors());

// Store the latest message in memory (in a real app, use a database)
let currentMessage = "Hello, from vs code!";

// Endpoint to get the latest message (used by ESP8266)
app.get('/api/message', (req, res) => {
    res.status(200).json({message: currentMessage});
});

// Endpoint to update the message (used by the user)
app.post('/api/message', (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    currentMessage = message;  // Update the message
    console.log(`Message updated: ${currentMessage}`);
    res.status(200).json({ success: true, message: 'Message updated successfully' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
