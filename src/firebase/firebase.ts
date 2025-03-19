// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARvdX3kYsPoY2lc78EEowY8xNv2u0M9QQ",
  authDomain: "oppdal-hike.firebaseapp.com",
  projectId: "oppdal-hike",
  storageBucket: "oppdal-hike.firebasestorage.app",
  messagingSenderId: "884269749498",
  appId: "1:884269749498:web:ecb34ac0a12c31e3f12543",
  measurementId: "G-XX6TY46DFV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut };