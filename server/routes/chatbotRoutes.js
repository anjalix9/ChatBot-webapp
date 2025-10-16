// routes/chatbotRoutes.js
const express = require('express');
const router = express.Router();
const { handleChat } = require('../Controllers/ChatbotController');

router.post('/', handleChat);
module.exports = router;
