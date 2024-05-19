// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCvNd5l2dIblDgm11fvhYLObK16LrK9ho",
  authDomain: "expense-tracker-2f8c4.firebaseapp.com",
  projectId: "expense-tracker-2f8c4",
  storageBucket: "expense-tracker-2f8c4.appspot.com",
  messagingSenderId: "238528018493",
  appId: "1:238528018493:web:8c1a44e30358984df29254",
  measurementId: "G-BTEK78N221",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authProvider = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
