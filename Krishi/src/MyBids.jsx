import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebaseConfig';

const MyBids = () => {
  const [bids, setBids] = useState([]);
  const [user] = useAuthState(auth); // Get the logged-in user

  useEffect(() => {
    if (user) {
      // Fetch bids for the logged-in user
      axios.get(`http://localhost:3001/api/getUserBids/${user.uid}`)
        .then(response => {
          setBids(response.data);
        })
        .catch(err => {
          console.error('Error fetching user bids:', err);
        });
    }
  }, [user]);

  if (!user) {
    return <p>Please log in to view your bids.</p>;
  }

  return (
    <div>
      <h2>My Bids</h2>
      {bids.length === 0 ? (
        <p>No bids posted yet.</p>
      ) : (
        <ul>
          {bids.map(bid => (
            <li key={bid.id}>
              <p>Name: {bid.name}</p>
              <p>Details: {bid.details}</p>
              <p>Timeline: {bid.timeline}</p>
              <p>Posted on: {new Date(bid.createdAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBids;
