// Import the functions you need from the SDKs you need
import { CurrentUserAtom, getUserDataObj } from "@/atom/user.atom";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

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
export const storage = getStorage();

export const signUp = async (email, password, name) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password).catch((err) =>
      console.log(err),
    );
    // await sendEmailVerification(auth.currentUser).catch((err) =>
    //   console.log(err)
    // );
    await updateProfile(auth.currentUser, { displayName: name }).catch((err) =>
      console.log(err),
    );
  } catch (err) {
    console.log(err);
  }
};
export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
export const logOut = () => {
  signOut(auth)
    .then(() => {
      console.log("Sign-out successful.");
    })
    .catch((error) => {
      console.log(error);
    });
};

export async function upload(file, currentUser, setLoading, setAvatar) {
  const fileRef = ref(storage, currentUser.uid + ".png");
  setLoading(true);
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);
  updateProfile(currentUser, { photoURL });
  setAvatar(photoURL);
  setLoading(false);
  return photoURL;
}
