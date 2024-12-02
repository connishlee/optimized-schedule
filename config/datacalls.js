import {
  collection,
  addDoc,
  deleteDoc,
  onSnapshot,
  doc,
  writeBatch,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

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
      userId: user.id,
      createdAt: new Date(),
      priority: 0,
    });
  }
};

export const readTasks = (onTasksUpdate) => {
  const tasksCollection = collection(db, "tasks");
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

export const updateTask = async (taskId, updatedTaskData) => {
  try {
    if (!taskId) {
      throw new Error("Task ID is required");
    }

    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, {
      ...updatedTaskData,
      updatedAt: new Date(), // Optional: Track when the task was last updated
    });
    return true;
  } catch (error) {
    console.error("Error updating task:", error);
    return false;
  }
};

// Delete a task
export const deleteTask = async (taskId) => {
  try {
    if (!taskId) {
      throw new Error("Task ID is required");
    }

    const taskRef = doc(db, "tasks", taskId);
    await deleteDoc(taskRef);
    return true;
  } catch (error) {
    console.error("Error deleting task:", error);
    return false;
  }
};

// Mark a task as completed
export const markTaskCompleted = async (taskId) => {
  try {
    if (!taskId) {
      throw new Error("Task ID is required");
    }

    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, {
      isCompleted: true,
      completedAt: new Date(),
    });
    return true;
  } catch (error) {
    console.error("Error marking task as completed:", error);
    return false;
  }
};

// Batch delete tasks
export const deleteTasks = async (taskIds) => {
  const batch = writeBatch(db);

  taskIds.forEach((taskId) => {
    const taskRef = doc(db, "tasks", taskId);
    batch.delete(taskRef);
  });

  try {
    await batch.commit();
    return true;
  } catch (error) {
    console.error("Error deleting multiple tasks:", error);
    return false;
  }
};
