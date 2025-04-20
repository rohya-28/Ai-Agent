import { getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBx54j3ZATPTgzyDUUZHCSSlYyc02ayN28",
  authDomain: "prepwise-3f7cd.firebaseapp.com",
  projectId: "prepwise-3f7cd",
  storageBucket: "prepwise-3f7cd.firebasestorage.app",
  messagingSenderId: "191044295794",
  appId: "1:191044295794:web:ff3b5d695cc82b8a1a36eb",
  measurementId: "G-2RGTQHZPWW"
};

// Initialize Firebase
const app =!getApps.length ?  initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app)