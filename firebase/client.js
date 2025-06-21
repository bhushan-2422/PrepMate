import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnYgPz_BnABYBqb67uecScNWIOa5InuTM",
  authDomain: "prepmate-dc749.firebaseapp.com",
  projectId: "prepmate-dc749",
  storageBucket: "prepmate-dc749.firebasestorage.app",
  messagingSenderId: "558070131299",
  appId: "1:558070131299:web:e5730d31d48342e98f2656",
  measurementId: "G-RHENJDWKEV"
};

// Initialize Firebase
const app = !getApps.length? initializeApp(firebaseConfig): getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);