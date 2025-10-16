import React, { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import InputBox from "./components/InputBox";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);

  const sendMessage = (messageText) => {
    if (!messageText.trim()) return;

    const userMessage = { sender: "user", text: messageText };
    setMessages((prev) => [...prev, userMessage]);

    // Temporary bot reply (will connect to Node.js later)
    setTimeout(() => {
      const botReply = { sender: "bot", text: "Hello! I'm your chatbot 🤖" };
      setMessages((prev) => [...prev, botReply]);
    }, 500);
  };

  return (
    <div className="app-container">
      <h1 className="title">ChatBot</h1>
      <ChatWindow messages={messages} />
      <InputBox onSend={sendMessage} />
    </div>
  );
}

export default App;
