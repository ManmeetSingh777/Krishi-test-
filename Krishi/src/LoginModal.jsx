import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';  // Import only what is needed
import { auth } from './firebaseConfig';  // Import the initialized auth
import './LoginModal.css';

const LoginModal = ({ closeModal }) => {
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('User logged in:', result.user);
      closeModal(); // Close modal after successful login
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Login</h2>
        <button onClick={handleGoogleLogin} className="google-login-button">
          Continue with Google
        </button>
        <button onClick={closeModal} className="close-button">Close</button>
      </div>
    </div>
  );
};

export default LoginModal;
