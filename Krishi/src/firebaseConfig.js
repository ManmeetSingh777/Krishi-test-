// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";  // Firebase Realtime Database
import { getStorage } from "firebase/storage";    // Firebase Storage
import { getAuth } from "firebase/auth";          // Firebase Auth

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMQ6GrNcyi9nrGbTZoqPSt6MgZMb_9P3g",
  authDomain: "krishi-5101e.firebaseapp.com",
  projectId: "krishi-5101e",
  storageBucket: "krishi-5101e.appspot.com",
  messagingSenderId: "177337041929",
  appId: "1:177337041929:web:fa659262005e5bcd0324d8",
  measurementId: "G-WE3PJXV4H5"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
const database = getDatabase(app); // Initialize Realtime Database
const storage = getStorage(app);   // Initialize Firebase Storage
const auth = getAuth(app);         // Initialize Firebase Auth

// Export the services
export { app, database, storage, auth };
