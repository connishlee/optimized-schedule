import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  query,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase";
import { currentUser } from "@clerk/nextjs/dist/types/server";

// function to add Task
export const addTasks = async (newTask) => {
  const user = await currentUser();
  if (newTask.name && newTask.quantity > 0) {
    await addDoc(collection(db, "tasks"), {
      name: newTask.title,
      description: newTask.description,
      userId: user.id,
    });
  }
};

// function to get Items from inventory
export const readTasks = async () => {
  const q = query(collection(db, "tasks"));
  const querySnapshot = await getDocs(q);
  let itemsArr = [];
  querySnapshot.forEach((doc) => {
    itemsArr.push({ ...doc.data(), id: doc.id });
  });
  return itemsArr;
};

// // function to remove Item from inventory

// export const delItems = async (id) => {
//   await deleteDoc(doc(db, "inventory", id));
// };
