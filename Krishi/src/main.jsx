import React from 'react';
import ReactDOM from 'react-dom/client'; // Use client
import App from './App';
import './index.css'; // Assuming you have some global styles

const root = ReactDOM.createRoot(document.getElementById('root')); // Correct usage
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
