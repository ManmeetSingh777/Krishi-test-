import React from 'react';
import './NavBar.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';
import { Link } from 'react-router-dom'; // Use Link from React Router for navigation

const NavBar = ({ onLoginClick }) => {
  const [user] = useAuthState(auth); // Track authentication state

  return (
    <nav className="navbar">
      <div className="navbar-logo">Krishi</div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/services">Services</Link></li>
        {user && <li><Link to="/my-bids">My Bids</Link></li>} {/* My Bids visible only when logged in */}
      </ul>
      <div className="user-section">
        {user ? (
          <div className="user-info">
            <img src={user.photoURL} alt="Profile" className="profile-pic" />
          </div>
        ) : (
          <button className="login-button" onClick={onLoginClick}>Login</button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
