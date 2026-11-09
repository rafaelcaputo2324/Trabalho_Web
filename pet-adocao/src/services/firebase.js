import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD0GVh0Tw58gZnX7w5h7_eGkjqWZWxI4kM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "cafofo-dos-peludos-c4897.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "cafofo-dos-peludos-c4897",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "cafofo-dos-peludos-c4897.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "702825285202",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:702825285202:web:c870ff172ed676e491c18b"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export {
  auth,
  db,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
};
