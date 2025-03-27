// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBF_4XTnTZN8DLeLPsaV6_6J3JMO3UaIY8",
  authDomain: "winpad-6c998.firebaseapp.com",
  projectId: "winpad-6c998",
  storageBucket: "winpad-6c998.firebasestorage.app",
  messagingSenderId: "699438786223",
  appId: "1:699438786223:web:26dd6a783ec0d9441fd65a",
  measurementId: "G-TJECHRZ72Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}