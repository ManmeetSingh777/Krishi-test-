import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Add useNavigate
import axios from 'axios';

const Profile = () => {
  const { id } = useParams(); // Get user ID from the URL
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate(); // Initialize navigation

  // Fetch the profile data from the backend
  useEffect(() => {
    axios.get(`http://localhost:3001/api/getUserProfile/${id}`)
      .then(response => {
        setProfileData(response.data);
      })
      .catch(err => {
        console.error('Error fetching profile data:', err);
      });
  }, [id]);

  if (!profileData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <form>
        <label>
          Language:
          <input type="text" value={profileData.language} readOnly />
        </label>
        <br />
        <label>
          Role:
          <input type="text" value={profileData.role} readOnly />
        </label>
        <br />
        <label>
          Name:
          <input type="text" value={profileData.name} readOnly />
        </label>
        <br />
        <label>
          Phone:
          <input type="text" value={profileData.phone} readOnly />
        </label>
      </form>
      <button onClick={() => navigate('/')}>Back to Home</button> {/* Back to Home button */}
    </div>
  );
};

export default Profile;
