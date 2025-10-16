// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const chatbotRoutes = require('./routes/chatbotRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173' // allow your Vite frontend origin (adjust if different)
}));
app.use(express.json());

// health check
app.get('/', (req, res) => res.json({ status: 'ok', message: 'Chatbot server running' }));

// chatbot routes
app.use('/api/chat', chatbotRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
