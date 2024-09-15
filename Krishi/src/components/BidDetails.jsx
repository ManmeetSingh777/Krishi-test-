import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BidDetails = () => {
  const { id } = useParams();
  const [bidDetails, setBidDetails] = useState(null);

  useEffect(() => {
    // Fetch bid details by id
    axios.get(`http://localhost:3001/api/getBid/${id}`)
      .then(response => {
        setBidDetails(response.data);
      })
      .catch(err => {
        console.error('Error fetching bid details', err);
      });
  }, [id]);

  if (!bidDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{bidDetails.name}</h1>
      <p>{bidDetails.details}</p>
      <p>Timeline: {bidDetails.timeline}</p>
      <button>Start Chat</button> {/* Placeholder for chat feature */}
    </div>
  );
};

export default BidDetails;
