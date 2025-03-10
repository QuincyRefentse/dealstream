import React, { useState } from "react";

const NegotiationSection = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setChat([...chat, { sender: "user", message }]);
      setMessage(""); // Clear the input field after sending
    }
  };

  return (
    <div style={{ padding: "20px", background: "#f9f9f9", marginTop: "20px" }}>
      <h2>Deal Negotiation</h2>
      <div style={{ maxHeight: "200px", overflowY: "scroll", marginBottom: "10px" }}>
        {chat.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.sender === "user" ? "right" : "left" }}>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        rows="3"
        style={{ width: "100%" }}
      />
      <button onClick={handleSendMessage} style={{ marginTop: "10px" }}>
        Send Message
      </button>
    </div>
  );
};

export default NegotiationSection;
