import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize default app
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);       // ✅ adaugă asta
const analytics = getAnalytics(app);

// Dacă vrei a doua aplicație
const firebaseConfig2 = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY_2,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN_2,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID_2,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET_2,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID_2,
  appId: import.meta.env.VITE_FIREBASE_APP_ID_2,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID_2
};

const app2 = initializeApp(firebaseConfig2, "secondApp");
const db2 = getFirestore(app2);
const analytics2 = getAnalytics(app2);
const storage2 = getStorage(app2);

export { app, auth, db, analytics, app2, db2, analytics2, storage2 }; // ✅ export auth






const provider = new GoogleAuthProvider();

export const auth2 = getAuth(app2); // Auth pentru a doua aplicație
