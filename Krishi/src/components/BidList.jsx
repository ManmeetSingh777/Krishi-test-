import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BidList = () => {
  const [bids, setBids] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all bids from the backend
    axios.get('http://localhost:3001/api/getAllBids')
      .then(response => {
        setBids(response.data);
      })
      .catch(err => {
        console.error('Error fetching bids:', err);
      });
  }, []);

  return (
    <div>
      <h2>Available Bids</h2>
      <ul>
        {bids.map(bid => (
          <li key={bid.id}>
            <p>{bid.name} ({bid.role})</p>
            <p>Details: {bid.details}</p>
            <p>Timeline: {bid.timeline}</p>
            <button onClick={() => navigate(`/bid/${bid.id}`)}>View Bid</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BidList;
