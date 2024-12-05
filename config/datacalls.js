import {
  collection,
  addDoc,
  deleteDoc,
  onSnapshot,
  doc,
  writeBatch,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export const DEFAULT_TASK_CATEGORIES = {
  work: { label: "Work", color: "#4F46E5" },
  personal: { label: "Personal", color: "#059669" },
  urgent: { label: "Urgent", color: "#DC2626" },
  study: { label: "Study", color: "#9333EA" },
  health: { label: "Health", color: "#2563EB" },
};

export const PRIORITY_LEVELS = {
  high: { label: "High", value: 3, color: "#DC2626" },
  medium: { label: "Medium", value: 2, color: "#F59E0B" },
  low: { label: "Low", value: 1, color: "#059669" },
};

export const TASK_STATUS = {
  notStarted: "Not Started",
  inProgress: "In Progress",
  completed: "Completed",
};

export const addCustomCategory = async (
  userId,
  categoryName,
  color = "#64748b"
) => {
  try {
    const customCategoryRef = doc(
      db,
      "users",
      userId,
      "customCategories",
      categoryName.toLowerCase()
    );
    await setDoc(customCategoryRef, {
      label: categoryName,
      color: color,
      createdAt: new Date(),
    });
    return true;
  } catch (error) {
    console.error("Error adding custom category:", error);
    return false;
  }
};

export const getUserCategories = (userId, onCategoriesUpdate) => {
  const customCategoriesRef = collection(
    db,
    "users",
    userId,
    "customCategories"
  );

  return onSnapshot(customCategoriesRef, (snapshot) => {
    const customCategories = {};
    snapshot.docs.forEach((doc) => {
      customCategories[doc.id] = doc.data();
    });

    const allCategories = {
      ...DEFAULT_TASK_CATEGORIES,
      ...customCategories,
    };

    onCategoriesUpdate(allCategories);
  });
};

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
      category: newTask.category || "personal",
      priorityLevel: newTask.priorityLevel || "medium",
      status: "notStarted",
      completionPercentage: 0,
      isCompleted: false,
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
      updatedAt: new Date(),
    });
    return true;
  } catch (error) {
    console.error("Error updating task:", error);
    return false;
  }
};

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

export const updateTaskStatus = async (
  taskId,
  status,
  completionPercentage
) => {
  try {
    if (!taskId) {
      throw new Error("Task ID is required");
    }

    const taskRef = doc(db, "tasks", taskId);
    const updateData = {
      status,
      completionPercentage,
      isCompleted: status === "completed",
      completedAt: status === "completed" ? new Date() : null,
    };

    await updateDoc(taskRef, updateData);
    return true;
  } catch (error) {
    console.error("Error updating task status:", error);
    return false;
  }
};

// Delete custom category
export const deleteCustomCategory = async (userId, categoryName) => {
  try {
    const customCategoryRef = doc(
      db,
      "users",
      userId,
      "customCategories",
      categoryName.toLowerCase()
    );
    await deleteDoc(customCategoryRef);
    return true;
  } catch (error) {
    console.error("Error deleting custom category:", error);
    return false;
  }
};

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
