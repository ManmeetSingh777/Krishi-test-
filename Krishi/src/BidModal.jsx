import React, { useState } from 'react';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebaseConfig';

const BidModal = ({ closeBidModal }) => {
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    details: '',
    timeline: ''
  });

  const [user] = useAuthState(auth); // Get the logged-in user

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!user) {
      alert('You must be logged in to post a bid');
      return;
    }

    // Send POST request to the backend to save the bid
    const bidData = {
      userId: user.uid, // Firebase user ID
      name: formData.name,
      role,
      details: formData.details,
      timeline: formData.timeline,
    };

    axios.post('http://localhost:3001/api/postBid', bidData)
      .then(response => {
        console.log('Bid posted:', response.data);
        closeBidModal(); // Close the modal after successful submission
      })
      .catch(err => {
        console.error('Error posting bid:', err);
      });
  };

  return (
    <div className="modal">
      <h2>Post a Bid</h2>
      <label>
        Are you a Farmer or a Buyer?
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select...</option>
          <option value="Farmer">Farmer</option>
          <option value="Buyer">Buyer</option>
        </select>
      </label>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
      </label>
      <label>
        {role === 'Farmer' ? 'Crop Details' : 'Order Details'}:
        <input type="text" name="details" value={formData.details} onChange={handleInputChange} />
      </label>
      <label>
        Timeline:
        <input type="text" name="timeline" value={formData.timeline} onChange={handleInputChange} />
      </label>
      <button onClick={handleSubmit}>Submit Bid</button>
      <button onClick={closeBidModal}>Close</button>
    </div>
  );
};

export default BidModal;
