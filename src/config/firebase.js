import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCKQrNVjxQnXnchm4ecz8_EpoGDOO_RCXQ",
  authDomain: "fir-react-bef6f.firebaseapp.com",
  projectId: "fir-react-bef6f",
  storageBucket: "fir-react-bef6f.appspot.com",
  messagingSenderId: "400908449085",
  appId: "1:400908449085:web:d51cd2adf509d0e0318154",
  measurementId: "G-9NVZ96JRWE"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);