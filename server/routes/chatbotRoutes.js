// routes/chatbotRoutes.js
const express = require('express');
const router = express.Router();
const { handleChat } = require('../Controllers/chatbotController');

router.post('/', handleChat);
module.exports = router;
