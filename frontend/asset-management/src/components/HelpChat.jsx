import React, { useState } from "react";
import "./HelpChat.css";

const HelpChat = () => {
  const [chatMessages, setChatMessages] = useState([
    { user: false, text: "How can I help you today?" }, 
  ]);
  const [userInput, setUserInput] = useState("");

  const handleSendMessage = () => {
    if (userInput.trim() !== "") {
      setChatMessages([...chatMessages, { user: true, text: userInput }]);
      setTimeout(() => {
        setChatMessages((prevMessages) => [
          ...prevMessages,
          { user: false, text: "Bot response here." },
        ]);
      }, 1000);
      setUserInput("");
    }
  };

  return (
    <div className="help-chatbox">
      <div className="chat-header">
        <h3>Help & Support Chat</h3>
      </div>
      <div className="chat-box">
        {chatMessages.map((message, index) => (
          <div key={index} className={message.user ? "user" : "bot"}>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default HelpChat;
