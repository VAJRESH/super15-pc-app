// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { generateRandomId } from "./utils.helper";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDMD3zd5omVb1twzM_1ujonXo8-FrAslOA",
//   authDomain: "pcapp-d2486.firebaseapp.com",
//   projectId: "pcapp-d2486",
//   storageBucket: "pcapp-d2486.appspot.com",
//   messagingSenderId: "612218298030",
//   appId: "1:612218298030:web:345a4049c0cea7fae5573f",
// };
const firebaseConfig = {
  apiKey: "AIzaSyAWgMG1LQg4Eq-EqK_f5Q9Z8-ek9j9BUus",
  authDomain: "temp-365806.firebaseapp.com",
  projectId: "temp-365806",
  storageBucket: "temp-365806.appspot.com",
  messagingSenderId: "739789056678",
  appId: "1:739789056678:web:c0d582ae78f0b08cf12267",
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

export async function addUpdateFirestoreData(
  collection,
  dataObj = {},
  _id = null,
  firebaseOptions = {},
  options = { createNew: null },
) {
  let isEdit = !!_id;
  let docId = isEdit ? _id : generateRandomId();
  if (options?.createNew) {
    isEdit = false;
    docId = _id;
  }

  try {
    if (!isEdit) {
      await setDoc(
        doc(db, collection, `${docId}`),
        {
          createdAt: Timestamp.fromDate(new Date()),
          ...(dataObj || {}),
        },
        firebaseOptions,
      );
    } else {
      await updateDoc(
        doc(db, collection, `${docId}`),
        {
          updatedAt: Timestamp.fromDate(new Date()),
          ...(dataObj || {}),
        },
        firebaseOptions,
      );
    }

    return {
      ...(dataObj || {}),
      docId,
    };
  } catch (error) {
    console.log(error);

    throw error;
  }
}

export async function getDataWithId(collectionName = "", id = "") {
  try {
    const docRef = doc(db, collectionName, id);

    const data = (await getDoc(docRef)).data();

    return data;
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
}

export async function getSubCollectionData(
  collectionName = "",
  id = "",
  ...subIds
) {
  try {
    const querySnapshot = await getDocs(
      collection(db, collectionName, id, ...subIds),
    );

    const data = [];
    querySnapshot.forEach((doc) => data.push(doc.data()));

    return data;
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
}

export async function getDataWithFilter(
  collectionName = "",
  filters = [],
  docLimit = 10,
) {
  try {
    const dataRef = collection(db, collectionName);
    let q = query(dataRef);

    // Add filters to the query
    filters.forEach((filter) => (q = query(q, filter, limit(docLimit))));

    const querySnapshot = await getDocs(q);
    const data = [];

    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });

    return data;
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
}
