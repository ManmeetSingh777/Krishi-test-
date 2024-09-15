import React, { useState } from 'react';
import axios from 'axios'; // For API requests
import { useNavigate } from 'react-router-dom'; // To navigate to the profile page

const ProfileSetup = () => {
  const [step, setStep] = useState(1); // Track the current step
  const [formData, setFormData] = useState({
    language: '',
    role: '',
    name: '',
    phone: '',
  });
  const navigate = useNavigate(); // For redirection

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle next button and submit the form
  const handleNext = () => {
    if (step === 3 && formData.name && formData.phone) {
      saveProfile();
    } else if (step === 1 && formData.language) {
      setStep(2);
    } else if (step === 2 && formData.role) {
      setStep(3);
    } else {
      alert('Please fill out the required fields');
    }
  };

  // Save the profile data to the database
  const saveProfile = () => {
    axios.post('http://localhost:3001/api/saveUserProfile', formData)
      .then(response => {
        const userId = response.data.id;
        navigate(`/profile/${userId}`); // Redirect to profile page
      })
      .catch(err => {
        console.error('Error saving profile:', err);
      });
  };

  // Render different steps of the quiz
  const renderQuestion = () => {
    if (step === 1) {
      return (
        <div>
          <h2>Select your preferred language</h2>
          <label>
            <input
              type="radio"
              name="language"
              value="English"
              onChange={handleInputChange}
              checked={formData.language === 'English'}
            />
            English
          </label>
          <label>
            <input
              type="radio"
              name="language"
              value="Hindi"
              onChange={handleInputChange}
              checked={formData.language === 'Hindi'}
            />
            Hindi
          </label>
          <button onClick={handleNext}>Next</button>
        </div>
      );
    } else if (step === 2) {
      return (
        <div>
          <h2>Are you a farmer or buyer?</h2>
          <label>
            <input
              type="radio"
              name="role"
              value="Farmer"
              onChange={handleInputChange}
              checked={formData.role === 'Farmer'}
            />
            Farmer
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="Buyer"
              onChange={handleInputChange}
              checked={formData.role === 'Buyer'}
            />
            Buyer
          </label>
          <button onClick={handleNext}>Next</button>
        </div>
      );
    } else if (step === 3) {
      return (
        <div>
          <h2>Enter your details</h2>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your Name"
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Your Phone"
          />
          <button onClick={handleNext}>Submit</button>
        </div>
      );
    }
  };

  return <div>{renderQuestion()}</div>;
};

export default ProfileSetup;
