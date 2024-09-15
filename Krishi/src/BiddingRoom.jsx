import React, { useState, useEffect } from 'react';
import { database } from './firebaseConfig';  
import { ref, push, onValue, remove } from "firebase/database"; // Added remove for clearing chat
import './BiddingRoom.css';
import { useNavigate, useLocation } from 'react-router-dom'; 

const BiddingPage = () => {
  const [bidAmount, setBidAmount] = useState('');
  const [bids, setBids] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const currentUserRole = params.get('role') || "guest";  // Get the role from URL
  const navigate = useNavigate();

  // Fetching bidding messages from Firebase
  useEffect(() => {
    const bidsRef = ref(database, 'bidding');  
    onValue(bidsRef, (snapshot) => {
      const data = snapshot.val();
      const bidMessages = [];
      for (let id in data) {
        bidMessages.push(data[id]);
      }
      setBids(bidMessages);
    });
  }, []);

  // Putting a bid
  const putBid = () => {
    if (isNaN(bidAmount) || bidAmount.trim() === '') {
      alert('Please input a valid amount');
      return;
    }
    const bidsRef = ref(database, 'bidding');  
    push(bidsRef, {
      bidAmount,
      sender: currentUserRole,  // Dynamically set role (Farmer or Buyer)
      timestamp: new Date().toLocaleString()
    });
    setBidAmount('');
  };

  // Closing the bid
  const closeBid = () => {
    const lastBid = bids[bids.length - 1]?.bidAmount || 'No bid';
    if (window.confirm(`The ${currentUserRole} has closed on this price: ${lastBid}. Do you agree?`)) {
      navigate('/confirm');  // Redirect to confirmation page
    }
  };

  // Clearing the chat
  const clearChat = () => {
    if (window.confirm('Are you sure you want to clear the chat?')) {
      const chatRef = ref(database, 'bidding');
      remove(chatRef);
    }
  };

  return (
    <div className="bidding-container">
      <div className="bidding-window">
        {bids.map((bid, index) => (
          <div 
            key={index} 
            className={`bid-bubble ${bid.sender === currentUserRole ? 'my-bid' : 'other-bid'}`}
          >
            <strong>{bid.sender}</strong>: {bid.bidAmount} <br />
            <small>{bid.timestamp}</small>
          </div>
        ))}
      </div>

      <div className="bidding-input">
        <input
          type="text"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          placeholder="Input your bid"
        />
        <div className="bidding-buttons">
          <button className="put-bid" onClick={putBid}>Put</button>
          <button className="close-bid" onClick={closeBid}>Close</button>
        </div>
        <button className="clear-chat" onClick={clearChat}>Clear Chat</button>
      </div>
    </div>
  );
};

export default BiddingPage;
