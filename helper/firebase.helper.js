// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMD3zd5omVb1twzM_1ujonXo8-FrAslOA",
  authDomain: "pcapp-d2486.firebaseapp.com",
  projectId: "pcapp-d2486",
  storageBucket: "pcapp-d2486.appspot.com",
  messagingSenderId: "612218298030",
  appId: "1:612218298030:web:345a4049c0cea7fae5573f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();

export const signUp = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};