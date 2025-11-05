import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const firebaseConfig2 = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY_2,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN_2,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL_2,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID_2,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET_2,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID_2,
  appId: import.meta.env.VITE_FIREBASE_APP_ID_2,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID_2
};



const firebaseConfig3 = {
 apiKey: import.meta.env.VITE_FIREBASE_API_KEY_4,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN_4,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL_4,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID_4,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET_4,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID_4,
  appId: import.meta.env.VITE_FIREBASE_APP_ID_4,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID_4
};

const app3 = initializeApp(firebaseConfig, "thirdApp");

export const auth = getAuth(app3);
export const provider = new GoogleAuthProvider();
export const db3 = getFirestore(app3);

export const login = () => signInWithPopup(auth, provider);
export const logout = () => signOut(auth);

// ✅ Initialize ambele aplicații
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // prima baza de date

const app2 = initializeApp(firebaseConfig2, "secondApp");
const analytics2 = getAnalytics(app2);
const db2 = getFirestore(app2); // a doua baza de date
const storage2 = getStorage(app2); // a doua zona de stocare

// ✅ Export tot ce ai nevoie
export { app, analytics, db, app2, analytics2, db2, storage2,app3 };