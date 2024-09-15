import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';  // Import LandingPage
import ProfileSetup from './ProfileSetup';  // Import ProfileSetup component
import Profile from './Profile';
import MyBids from './MyBids';
import BidList from './components/BidList';
import BidDetails from './components/BidDetails';
import { auth } from './firebaseConfig';   // Import Firebase Auth (to initialize Firebase)

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/my-bids" element={<MyBids />} />
        <Route path="/bid/:id" element={<BidDetails />} />
        <Route path="/all-bids" element={<BidList />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
