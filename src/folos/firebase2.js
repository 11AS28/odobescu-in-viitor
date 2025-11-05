import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY_4,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN_4,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID_4,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET_4,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID_4,
  appId: import.meta.env.VITE_FIREBASE_APP_ID_4,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID_4
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

export const login = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("User logged in:", user.displayName, user.email);
    return user;
  } catch (error) {
    console.error("Login failed:", error);
    alert(error.message);
  }
};

export const logout = async () => {
  await signOut(auth);
};
