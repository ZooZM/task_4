// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
import {  getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKe4y0NxaeXo6uFqMnQKR-l9tvAP0ohdw",
  authDomain: "list2020-4861f.firebaseapp.com",
  projectId: "list2020-4861f",
  storageBucket: "list2020-4861f.appspot.com",
  messagingSenderId: "1025667293626",
  appId: "1:1025667293626:web:27028533f085ee73ab7d83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {app,auth,db};