import { collection, addDoc, query, onSnapshot, doc, writeBatch, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

// Your existing addTasks function
export const addTasks = async (newTask, user) => {
  if (!user?.id) {
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
      priority: 0, // Adding default priority
    });
  }
};

// Your existing readTasks function
export const readTasks = (onTasksUpdate) => {
  const tasksCollection = collection(db, "tasks");
  // listens for updates
  const stopListening = onSnapshot(
    tasksCollection,
    (snapshot) => {
      const tasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      onTasksUpdate(tasks);
    },
    (error) => {
      console.error("Error fetching tasks in real-time:", error);
    }
  );
  return stopListening;
};

// New function to update multiple task priorities at once
export const updateTaskPriorities = async (taskPriorityUpdates) => {
  const batch = writeBatch(db);
  
  taskPriorityUpdates.forEach(({ taskId, priority }) => {
    const taskRef = doc(db, "tasks", taskId);
    batch.update(taskRef, { priority });
  });

  try {
    await batch.commit();
    return true;
  } catch (error) {
    console.error("Error updating priorities:", error);
    return false;
  }
};

// New function to update single task priority
export const updateTaskPriority = async (taskId, priority) => {
  try {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, { priority });
    return true;
  } catch (error) {
    console.error("Error updating priority:", error);
    return false;
  }
};

// Your commented out delItems function
// export const delItems = async (id) => {
//   await deleteDoc(doc(db, "inventory", id));
// };