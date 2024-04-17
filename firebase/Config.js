// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGcL41X-yLIhWHHdhILG2d6_HDczoPeUE",
  authDomain: "list2024-49a0b.firebaseapp.com",
  projectId: "list2024-49a0b",
  storageBucket: "list2024-49a0b.appspot.com",
  messagingSenderId: "151471053975",
  appId: "1:151471053975:web:67227aaa1215e5a4051dd2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
