import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';  // Import LandingPage
import Chat from './components/Chat'
import ProfileSetup from './ProfileSetup';  // Import ProfileSetup component
import { auth } from './firebaseConfig';   // Import Firebase Auth (to initialize Firebase)

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Chat />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
