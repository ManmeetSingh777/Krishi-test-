import React, { useState, useEffect } from 'react';
import { database } from '../firebaseConfig';  
import { ref, push, onValue, remove } from "firebase/database"; // Add remove to clear messages
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './Chat.css';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const currentUserRole = params.get('role') || "guest";  
  const navigate = useNavigate(); // Initialize navigation

  // Fetching chat messages from Firebase
  useEffect(() => {
    const messagesRef = ref(database, 'chat');  
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
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
      const messagesRef = ref(database, 'chat');  
      push(messagesRef, {
        message,
        sender: currentUserRole,  
        timestamp: new Date().toLocaleString()
      });
      setMessage(''); 
    }
  };

  // Clearing all chat messages
  const clearChat = () => {
    if (window.confirm('Are you sure you want to clear the chat?')) {
      const chatRef = ref(database, 'chat');
      remove(chatRef);  // Clears all chat messages
    }
  };

  // Start bidding redirection
  const startBidding = () => {
    navigate('/bidding?role=' + currentUserRole);  // Redirect to bidding page with role
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Buyer-Farmer Chat</h2>
        <button className="start-bidding" onClick={startBidding}>Start Bidding</button>
        <button className="clear-chat" onClick={clearChat}>Clear Chat</button>
      </div>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`chat-bubble ${msg.sender === currentUserRole ? "my-message" : "other-message"}`}
          >
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
