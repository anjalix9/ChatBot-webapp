import React, { useEffect, useState } from "react";
import "../App.css";
import ChatRoom from "./components/chatroom";

function ChatRoom({ socket, username, room }) {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const sendMessage = async () => {
    if (message.trim() !== "") {
      const msgData = {
        room: room,
        author: username,
        message: message,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", msgData);
      setChatMessages((list) => [...list, msgData]);
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
