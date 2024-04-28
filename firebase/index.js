// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBE7-bki0Bbgmtj3xT8PmO4L36VLY63718",
  authDomain: "tubes-mobile-everlast.firebaseapp.com",
  projectId: "tubes-mobile-everlast",
  storageBucket: "tubes-mobile-everlast.appspot.com",
  messagingSenderId: "448784271248",
  appId: "1:448784271248:web:4c1d4a1e5f32d309409515",
  measurementId: "G-V4JHTKQPDV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { getFirestore, app, db, collection, addDoc, getDocs, updateDoc, deleteDoc, doc }