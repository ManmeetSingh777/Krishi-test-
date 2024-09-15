import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './ConfirmationPage.css';

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    transportation: '',
    cropType: '',
    quantity: '',
    timeline: '',
    paymentDeadline: '',
    paymentAmount: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    // Here you can save the confirmation details to the database or Firebase
    console.log("Confirmation Data:", formData);
    // Redirect or show success message
    alert("Confirmation details submitted!");
    navigate('/');
  };

  return (
    <div className="confirmation-container">
      <h2>Confirmation Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Who is handling transportation?
          <select name="transportation" onChange={handleChange} required>
            <option value="">Select</option>
            <option value="farmer">Farmer</option>
            <option value="buyer">Buyer</option>
            <option value="shiprocket">Shiprocket</option>
          </select>
        </label>
        <label>
          Crop Type:
          <input type="text" name="cropType" onChange={handleChange} required />
        </label>
        <label>
          Quantity:
          <input type="text" name="quantity" onChange={handleChange} required />
        </label>
        <label>
          Timeline:
          <input type="date" name="timeline" onChange={handleChange} required />
        </label>
        <label>
          Payment Deadline:
          <input type="date" name="paymentDeadline" onChange={handleChange} required />
        </label>
        <label>
          Payment Amount:
          <input type="number" name="paymentAmount" onChange={handleChange} required />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ConfirmationPage;
