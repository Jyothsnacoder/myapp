// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4foCFO5QDz7SIImukQ4DsIGeRtvaauc8",
  authDomain: "ptroutes-92150.firebaseapp.com",
  projectId: "ptroutes-92150",
  storageBucket: "ptroutes-92150.firebasestorage.app",
  messagingSenderId: "923388552461",
  appId: "1:923388552461:web:b681a0b188305b1723bc44",
  measurementId: "G-WBZK5SBPTH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth(app);