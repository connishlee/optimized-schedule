import { collection, addDoc, query, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

// functioning addTask
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

// function to get retrieve all Tasks in real time with Snapshot
export const readTasks = (onTasksUpdate) => {
  const tasksCollection = collection(db, "tasks");
  // listens for updates
  const stopListening = onSnapshot(
    tasksCollection,
    (snapshot) => {
      const tasks = snapshot.docs.map((doc) => ({
        id: doc.id, // Include Firestore document ID
        ...doc.data(),
      }));
      onTasksUpdate(tasks); // Pass tasks to the callback
    },
    (error) => {
      console.error("Error fetching tasks in real-time:", error);
    }
  );
  return stopListening;
};

// // function to remove Item from inventory

// export const delItems = async (id) => {
//   await deleteDoc(doc(db, "inventory", id));
// };
