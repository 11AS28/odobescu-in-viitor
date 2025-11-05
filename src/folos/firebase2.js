// src/folos/firebase2.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configurarea Firebase din .env
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY_4,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN_4,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID_4,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET_4,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID_4,
  appId: import.meta.env.VITE_FIREBASE_APP_ID_4,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID_4
};

// Initializează aplicația Firebase (doar o dată)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Auth și Firestore
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

// Funcții utile pentru login/logout
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Eroare la login:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Eroare la logout:", error);
  }
};
