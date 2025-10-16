// controllers/chatbotController.js

function generateBotReply(message) {
  if (!message || typeof message !== 'string') return "I couldn't read that — please type something.";

  const m = message.toLowerCase();

  // simple rules
  if (m.includes('hello') || m.includes('hi')) return "Hi there! How can I help you today?";
  if (m.includes('how are you')) return "I'm a bot — running smoothly! How about you?";
  if (m.includes('name')) return "I'm your friendly chatbot built for your FSD project.";
  if (m.includes('help')) return "Sure — tell me what you need help with (UI, backend, deployment, etc.).";
  if (m.includes('bye') || m.includes('goodbye')) return "Goodbye! Good luck with your project 😊";
  
  // fallback with a little variety
  const fallbackReplies = [
    "Sorry, I didn't get that. Can you rephrase?",
    "Interesting! Tell me more.",
    "Hmm — I don't have an answer for that yet. Try asking something else."
  ];
  return fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
}

exports.handleChat = (req, res) => {
  try {
    const { message } = req.body;
    const reply = generateBotReply(message);
    // You could add metadata (timestamp, intent, confidence) here
    return res.json({ reply });
  } catch (err) {
    console.error('Chat error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
