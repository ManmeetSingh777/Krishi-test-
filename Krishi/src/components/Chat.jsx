import React, { useState, useEffect } from 'react';
import { database } from '../firebaseConfig';  // Import the Firebase database
import { ref, push, onValue } from "firebase/database"; // Import specific database functions
import { useLocation } from 'react-router-dom'; // For URL-based roles
import './Chat.css'; // Add CSS for styling

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const sender = params.get('role') || "guest";  // Default to "guest" if no role is provided

  // Fetching chat messages from Firebase
  useEffect(() => {
    const messagesRef = ref(database, 'chat');  // Use the ref() function from Firebase
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Fetched messages:", data);  // Log the fetched data for debugging
      const chatMessages = [];
      for (let id in data) {
        chatMessages.push(data[id]);
      }
      setMessages(chatMessages);
    });
  }, []);

  // Sending a new message
  const sendMessage = () => {
    if (message.trim()) {
      const messagesRef = ref(database, 'chat');  // Use ref() correctly
      console.log("Sending message:", message);  // Log the message being sent
      push(messagesRef, {
        message,
        sender: sender,  // Dynamically use the sender from the URL
        timestamp: new Date().toLocaleString()
      });
      setMessage(''); // Clear input after sending
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-bubble ${msg.sender === "buyer" ? "buyer-bubble" : "farmer-bubble"}`}>
            <strong>{msg.sender}</strong>: {msg.message} <br />
            <small>{msg.timestamp}</small>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
