import { collection, addDoc, query, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export const addTasks = async (newTask) => {
  if (!newTask.userId) {
    throw new Error("User not authenticated");
  }

  if (newTask.name) {
    await addDoc(collection(db, "tasks"), {
      name: newTask.name,
      description: newTask.description,
      startTime: newTask.startTime,
      endTime: newTask.endTime,
      date: newTask.date,
      day: newTask.day,
      userId: newTask.userId,
      createdAt: new Date(),
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
