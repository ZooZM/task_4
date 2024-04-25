import { auth, db } from "./Config";
import {
  doc,
  setDoc,
  collection,
  getDoc,
  updateDoc,
  addDoc,
  getDocs,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
async function getInfo(userId) {
  const userRef = doc(db, "users", userId);

  // Get user document
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    console.log("User not found");
    return null;
  }
  const user = userSnap.data();

  // Get todos collection
  const todosRef = collection(userRef, "todos");

  // Get documents from todos collection
  const todosQuerySnapshot = await getDocs(todosRef);
  const todos = [];
  todosQuerySnapshot.forEach((doc) => {
    todos.push(doc.data());
  });

  // Get messages collection
  const messagesRef = collection(userRef, "messages");

  // Get documents from messages collection
  const messagesQuerySnapshot = await getDocs(messagesRef);
  const messages = [];
  messagesQuerySnapshot.forEach((doc) => {
    messages.push(doc.data());
  });

  return {
    user: user,
    todos: todos,
    messages: messages,
  };
}

async function updateInfo(path, docId, data) {
  await updateDoc(doc(db, path, docId), {
    data,
  });
}
async function deletetodo(uId, key) {
   try {
     const userRef = doc(db, "users", uId);
     const todosRef = collection(userRef, "todos");
     const q = query(todosRef, where("date", "==", key));
     const querySnapshot = await getDocs(q);
     querySnapshot.forEach((doc) => {
       deleteDoc(doc.ref);
     });
   } catch (error) {
    console.error(error)
   }
  }
  
async function addTodo(userId, data) {
  const userRef = doc(db, "users", userId);

  // Check if the user exists
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    console.log("User not found");
    return null;
  }

  // Get todos collection
  const todosRef = collection(userRef, "todos");

  // Add todo document to the todos collection
  await addDoc(todosRef, {
    todo: data.todo,
    date: data.date,
    done: data.done,
  });

  console.log("Todo added successfully");
}
export { getInfo, updateInfo, addTodo, deletetodo };
