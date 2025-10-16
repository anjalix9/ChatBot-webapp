import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

function ChatRoom({ socket, username, room }) {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const sendMessage = async () => {
    if (message.trim() !== "") {
      const msgData = {
        room: room,
        author: username,
        message: message,
        time: new Date(Date.now()).getHours().toString().padStart(2, '0') + ":" + new Date(Date.now()).getMinutes().toString().padStart(2, '0'),
      };
      await socket.emit("send_message", msgData);
      setChatMessages((list) => [...list, msgData]);

      // If room is 'bot', send to chatbot API
      if (room === 'bot') {
        try {
          const response = await axios.post('http://localhost:5000/chatbot', { message });
          const botReply = {
            room: room,
            author: 'Bot',
            message: response.data.reply,
            time: new Date(Date.now()).getHours().toString().padStart(2, '0') + ":" + new Date(Date.now()).getMinutes().toString().padStart(2, '0'),
          };
          setChatMessages((list) => [...list, botReply]);
        } catch (error) {
          console.error('Error fetching bot reply:', error);
        }
      }

      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChatMessages((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <h3>Room: {room}</h3>
      <div className="chat-body">
        {chatMessages.map((msg, i) => (
          <div
            key={i}
            className="message"
            id={username === msg.author ? "you" : "other"}
          >
            <div>
              <div className="message-meta">
                <span>{msg.author}</span> <span>{msg.time}</span>
              </div>
              <p>{msg.message}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={message}
          placeholder="Type your message..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatRoom;
