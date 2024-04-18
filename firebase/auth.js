import { auth, db } from "./Config";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  signInWithCredential,
  FacebookAuthProvider,
  sendEmailVerification
} from "firebase/auth";
import { doc, setDoc,collection } from "firebase/firestore";
// Listen for authentication state to change.
onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("We are authenticated now!");
  }

  // Do other things
});

async function register(email, password, userName) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);

  // Create user document in Firestore
  await sendEmailVerification(auth.currentUser, {
    handleCodeInApp: true,
    url: "http://list2024-49a0b.firebaseapp.com/",
  });

  // Create a new document in the 'users' collection
  await setDoc(doc(db, "/users", cred.user.uid), {
    userName: userName,
    email: email,
  });
  console.log("Document created successfully");


  return cred;
}

async function login(email, password) {
  // Sign in the user with email and password
    await signInWithEmailAndPassword(auth, email, password);

    // Check if the user's email is verified
    if (auth.currentUser && !auth.currentUser.emailVerified) {
      // Return success if email is verified
    throw new Error('not Verified yet');
    } 
}


export { register, login };
