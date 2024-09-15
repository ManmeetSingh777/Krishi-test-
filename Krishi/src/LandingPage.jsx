import React, { useState } from 'react';
import NavBar from './components/NavBar';
import LoginModal from './LoginModal'; 
import BidModal from './BidModal';  // Import the Bid modal

const LandingPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isBidModalOpen, setBidModalOpen] = useState(false); // For bid modal

  const handleLoginClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleBidClick = () => {
    setBidModalOpen(true);
  };

  const closeBidModal = () => {
    setBidModalOpen(false);
  };

  return (
    <div>
      <NavBar onLoginClick={handleLoginClick} />
      <div className="landing-content">
        <h1>Welcome to Krishi</h1>
        <p>This is some dummy information about your platform.</p>
        <button className="post-bid-button" onClick={handleBidClick}>Post a Bid</button> {/* Post Bid Button */}
      </div>
      {isModalOpen && <LoginModal closeModal={closeModal} />}
      {isBidModalOpen && <BidModal closeBidModal={closeBidModal} />} {/* Bid Modal */}
    </div>
  );
};

export default LandingPage;
