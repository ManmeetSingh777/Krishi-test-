import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BiddingPage from './BiddingRoom'; 
import ConfirmationPage from './ConfirmationPage'; 
import Chat from './components/Chat'

import { auth } from './firebaseConfig';   // Import Firebase Auth (to initialize Firebase)

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/chat" element={<Chat />} />
        <Route path="/chat?role=buyer" element={<Chat />} />  {/* Buyer Role */}
        <Route path="/chat?role=farmer" element={<Chat />} /> {/* Farmer Role */}
        <Route path="/bidding" element={<BiddingPage />} />
        <Route path="/confirm" element={<ConfirmationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
