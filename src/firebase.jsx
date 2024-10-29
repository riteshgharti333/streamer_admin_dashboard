// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_SOME_KEY,
  authDomain: "streamer-admin.firebaseapp.com",
  projectId: "streamer-admin",
  storageBucket: "streamer-admin.appspot.com",
  messagingSenderId: "1049423380039",
  appId: "1:1049423380039:web:946c8f0ad9445cfd3d7b62",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
