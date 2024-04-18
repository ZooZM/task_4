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
import { get } from "firebase/database";
import { doc, setDoc,collection, getDoc, updateDoc } from "firebase/firestore";
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
   const cred= await signInWithEmailAndPassword(auth, email, password);

    // Check if the user's email is verified
    if (auth.currentUser && !auth.currentUser.emailVerified) {
      // Return success if email is verified
    throw new Error('not Verified yet');
    } 
    return cred;
}

async function resetPass(email){
  await sendPasswordResetEmail(auth,email);
}

async function getInfo(uid){
  const docRef = doc(db, "users", uid);
    const docSnapshot = await getDoc(docRef);
    
    if (docSnapshot.exists()) {
      const user = docSnapshot.data();
      return user;
    } else {
      // Document does not exist
      return null;
    }
}
async function addTodo(uid,todos){
await updateDoc(doc(db,"/users",uid),{
  Todos:todos
})
}
export { register, login,resetPass,getInfo,addTodo };
