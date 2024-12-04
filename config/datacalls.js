// // // // import {
// // // //   collection,
// // // //   addDoc,
// // // //   deleteDoc,
// // // //   onSnapshot,
// // // //   doc,
// // // //   writeBatch,
// // // //   updateDoc,
// // // // } from "firebase/firestore";
// // // // import { db } from "./firebase";

// // // // export const addTasks = async (newTask, user) => {
// // // //   if (!user?.id) {
// // // //     throw new Error("User not authenticated");
// // // //   }

// // // //   if (newTask.name) {
// // // //     await addDoc(collection(db, "tasks"), {
// // // //       name: newTask.name,
// // // //       description: newTask.description,
// // // //       startTime: newTask.startTime,
// // // //       endTime: newTask.endTime,
// // // //       date: newTask.date,
// // // //       day: newTask.day,
// // // //       userId: user.id,
// // // //       createdAt: new Date(),
// // // //       priority: 0,
// // // //     });
// // // //   }
// // // // };

// // // // export const readTasks = (onTasksUpdate) => {
// // // //   const tasksCollection = collection(db, "tasks");
// // // //   const stopListening = onSnapshot(
// // // //     tasksCollection,
// // // //     (snapshot) => {
// // // //       const tasks = snapshot.docs.map((doc) => ({
// // // //         id: doc.id,
// // // //         ...doc.data(),
// // // //       }));
// // // //       onTasksUpdate(tasks);
// // // //     },
// // // //     (error) => {
// // // //       console.error("Error fetching tasks in real-time:", error);
// // // //     }
// // // //   );
// // // //   return stopListening;
// // // // };

// // // // export const updateTaskPriorities = async (taskPriorityUpdates) => {
// // // //   const batch = writeBatch(db);

// // // //   taskPriorityUpdates.forEach(({ taskId, priority }) => {
// // // //     const taskRef = doc(db, "tasks", taskId);
// // // //     batch.update(taskRef, { priority });
// // // //   });

// // // //   try {
// // // //     await batch.commit();
// // // //     return true;
// // // //   } catch (error) {
// // // //     console.error("Error updating priorities:", error);
// // // //     return false;
// // // //   }
// // // // };

// // // // export const updateTaskPriority = async (taskId, priority) => {
// // // //   try {
// // // //     const taskRef = doc(db, "tasks", taskId);
// // // //     await updateDoc(taskRef, { priority });
// // // //     return true;
// // // //   } catch (error) {
// // // //     console.error("Error updating priority:", error);
// // // //     return false;
// // // //   }
// // // // };

// // // // export const updateTask = async (taskId, updatedTaskData) => {
// // // //   try {
// // // //     if (!taskId) {
// // // //       throw new Error("Task ID is required");
// // // //     }

// // // //     const taskRef = doc(db, "tasks", taskId);
// // // //     await updateDoc(taskRef, {
// // // //       ...updatedTaskData,
// // // //       updatedAt: new Date(), // Optional: Track when the task was last updated
// // // //     });
// // // //     return true;
// // // //   } catch (error) {
// // // //     console.error("Error updating task:", error);
// // // //     return false;
// // // //   }
// // // // };

// // // // // Delete a task
// // // // export const deleteTask = async (taskId) => {
// // // //   try {
// // // //     if (!taskId) {
// // // //       throw new Error("Task ID is required");
// // // //     }

// // // //     const taskRef = doc(db, "tasks", taskId);
// // // //     await deleteDoc(taskRef);
// // // //     return true;
// // // //   } catch (error) {
// // // //     console.error("Error deleting task:", error);
// // // //     return false;
// // // //   }
// // // // };

// // // // // Mark a task as completed
// // // // export const markTaskCompleted = async (taskId) => {
// // // //   try {
// // // //     if (!taskId) {
// // // //       throw new Error("Task ID is required");
// // // //     }

// // // //     const taskRef = doc(db, "tasks", taskId);
// // // //     await updateDoc(taskRef, {
// // // //       isCompleted: true,
// // // //       completedAt: new Date(),
// // // //     });
// // // //     return true;
// // // //   } catch (error) {
// // // //     console.error("Error marking task as completed:", error);
// // // //     return false;
// // // //   }
// // // // };

// // // // // Batch delete tasks
// // // // export const deleteTasks = async (taskIds) => {
// // // //   const batch = writeBatch(db);

// // // //   taskIds.forEach((taskId) => {
// // // //     const taskRef = doc(db, "tasks", taskId);
// // // //     batch.delete(taskRef);
// // // //   });

// // // //   try {
// // // //     await batch.commit();
// // // //     return true;
// // // //   } catch (error) {
// // // //     console.error("Error deleting multiple tasks:", error);
// // // //     return false;
// // // //   }
// // // // };


// // // import {
// // //   collection,
// // //   addDoc,
// // //   deleteDoc,
// // //   onSnapshot,
// // //   doc,
// // //   writeBatch,
// // //   updateDoc,
// // // } from "firebase/firestore";
// // // import { db } from "./firebase";

// // // export const addTasks = async (newTask, user) => {
// // //   if (!user?.id) {
// // //     throw new Error("User not authenticated");
// // //   }

// // //   if (newTask.name) {
// // //     await addDoc(collection(db, "tasks"), {
// // //       name: newTask.name,
// // //       description: newTask.description,
// // //       startTime: newTask.startTime,
// // //       endTime: newTask.endTime,
// // //       date: newTask.date,
// // //       day: newTask.day,
// // //       userId: user.id,
// // //       createdAt: new Date(),
// // //       priority: 0,
// // //       isCompleted: false, // Add default completion status
// // //     });
// // //   }
// // // };

// // // export const readTasks = (onTasksUpdate) => {
// // //   const tasksCollection = collection(db, "tasks");
// // //   const stopListening = onSnapshot(
// // //     tasksCollection,
// // //     (snapshot) => {
// // //       const tasks = snapshot.docs.map((doc) => ({
// // //         id: doc.id,
// // //         ...doc.data(),
// // //       }));
// // //       onTasksUpdate(tasks);
// // //     },
// // //     (error) => {
// // //       console.error("Error fetching tasks in real-time:", error);
// // //     }
// // //   );
// // //   return stopListening;
// // // };

// // // export const updateTaskPriorities = async (taskPriorityUpdates) => {
// // //   const batch = writeBatch(db);

// // //   taskPriorityUpdates.forEach(({ taskId, priority }) => {
// // //     const taskRef = doc(db, "tasks", taskId);
// // //     batch.update(taskRef, { priority });
// // //   });

// // //   try {
// // //     await batch.commit();
// // //     return true;
// // //   } catch (error) {
// // //     console.error("Error updating priorities:", error);
// // //     return false;
// // //   }
// // // };

// // // export const updateTaskPriority = async (taskId, priority) => {
// // //   try {
// // //     const taskRef = doc(db, "tasks", taskId);
// // //     await updateDoc(taskRef, { priority });
// // //     return true;
// // //   } catch (error) {
// // //     console.error("Error updating priority:", error);
// // //     return false;
// // //   }
// // // };

// // // export const updateTask = async (taskId, updatedTaskData) => {
// // //   try {
// // //     if (!taskId) {
// // //       throw new Error("Task ID is required");
// // //     }

// // //     const taskRef = doc(db, "tasks", taskId);
// // //     await updateDoc(taskRef, {
// // //       ...updatedTaskData,
// // //       updatedAt: new Date(),
// // //     });
// // //     return true;
// // //   } catch (error) {
// // //     console.error("Error updating task:", error);
// // //     return false;
// // //   }
// // // };

// // // export const deleteTask = async (taskId) => {
// // //   try {
// // //     if (!taskId) {
// // //       throw new Error("Task ID is required");
// // //     }

// // //     const taskRef = doc(db, "tasks", taskId);
// // //     await deleteDoc(taskRef);
// // //     return true;
// // //   } catch (error) {
// // //     console.error("Error deleting task:", error);
// // //     return false;
// // //   }
// // // };

// // // // Updated markTaskCompleted function to handle toggling
// // // export const markTaskCompleted = async (taskId, completionStatus = true) => {
// // //   try {
// // //     if (!taskId) {
// // //       throw new Error("Task ID is required");
// // //     }

// // //     const taskRef = doc(db, "tasks", taskId);
// // //     const updateData = {
// // //       isCompleted: completionStatus,
// // //     };
    
// // //     // Only add completedAt if we're marking as completed
// // //     if (completionStatus) {
// // //       updateData.completedAt = new Date();
// // //     } else {
// // //       // If unmarking as completed, remove the completedAt field
// // //       updateData.completedAt = null;
// // //     }

// // //     await updateDoc(taskRef, updateData);
// // //     return true;
// // //   } catch (error) {
// // //     console.error("Error updating task completion status:", error);
// // //     return false;
// // //   }
// // // };

// // // export const deleteTasks = async (taskIds) => {
// // //   const batch = writeBatch(db);

// // //   taskIds.forEach((taskId) => {
// // //     const taskRef = doc(db, "tasks", taskId);
// // //     batch.delete(taskRef);
// // //   });

// // //   try {
// // //     await batch.commit();
// // //     return true;
// // //   } catch (error) {
// // //     console.error("Error deleting multiple tasks:", error);
// // //     return false;
// // //   }
// // // };


// // import {
// //   collection,
// //   addDoc,
// //   deleteDoc,
// //   onSnapshot,
// //   doc,
// //   writeBatch,
// //   updateDoc,
// // } from "firebase/firestore";
// // import { db } from "./firebase";

// // // Define constants for task categories and priorities
// // export const TASK_CATEGORIES = {
// //   work: { label: "Work", color: "#4F46E5" },
// //   personal: { label: "Personal", color: "#059669" },
// //   urgent: { label: "Urgent", color: "#DC2626" },
// //   study: { label: "Study", color: "#9333EA" },
// //   health: { label: "Health", color: "#2563EB" },
// // };

// // export const PRIORITY_LEVELS = {
// //   high: { label: "High", value: 3, color: "#DC2626" },
// //   medium: { label: "Medium", value: 2, color: "#F59E0B" },
// //   low: { label: "Low", value: 1, color: "#059669" },
// // };

// // export const TASK_STATUS = {
// //   notStarted: "Not Started",
// //   inProgress: "In Progress",
// //   completed: "Completed",
// // };

// // export const addTasks = async (newTask, user) => {
// //   if (!user?.id) {
// //     throw new Error("User not authenticated");
// //   }

// //   if (newTask.name) {
// //     await addDoc(collection(db, "tasks"), {
// //       name: newTask.name,
// //       description: newTask.description,
// //       startTime: newTask.startTime,
// //       endTime: newTask.endTime,
// //       date: newTask.date,
// //       day: newTask.day,
// //       userId: user.id,
// //       createdAt: new Date(),
// //       priority: 0,
// //       category: newTask.category || "personal",
// //       priorityLevel: newTask.priorityLevel || "medium",
// //       status: "notStarted",
// //       completionPercentage: 0,
// //       isCompleted: false,
// //     });
// //   }
// // };

// // export const readTasks = (onTasksUpdate) => {
// //   const tasksCollection = collection(db, "tasks");
// //   const stopListening = onSnapshot(
// //     tasksCollection,
// //     (snapshot) => {
// //       const tasks = snapshot.docs.map((doc) => ({
// //         id: doc.id,
// //         ...doc.data(),
// //       }));
// //       onTasksUpdate(tasks);
// //     },
// //     (error) => {
// //       console.error("Error fetching tasks in real-time:", error);
// //     }
// //   );
// //   return stopListening;
// // };

// // export const updateTaskPriorities = async (taskPriorityUpdates) => {
// //   const batch = writeBatch(db);

// //   taskPriorityUpdates.forEach(({ taskId, priority }) => {
// //     const taskRef = doc(db, "tasks", taskId);
// //     batch.update(taskRef, { priority });
// //   });

// //   try {
// //     await batch.commit();
// //     return true;
// //   } catch (error) {
// //     console.error("Error updating priorities:", error);
// //     return false;
// //   }
// // };

// // export const updateTaskPriority = async (taskId, priority) => {
// //   try {
// //     const taskRef = doc(db, "tasks", taskId);
// //     await updateDoc(taskRef, { priority });
// //     return true;
// //   } catch (error) {
// //     console.error("Error updating priority:", error);
// //     return false;
// //   }
// // };

// // export const updateTask = async (taskId, updatedTaskData) => {
// //   try {
// //     if (!taskId) {
// //       throw new Error("Task ID is required");
// //     }

// //     const taskRef = doc(db, "tasks", taskId);
// //     await updateDoc(taskRef, {
// //       ...updatedTaskData,
// //       updatedAt: new Date(),
// //     });
// //     return true;
// //   } catch (error) {
// //     console.error("Error updating task:", error);
// //     return false;
// //   }
// // };

// // export const deleteTask = async (taskId) => {
// //   try {
// //     if (!taskId) {
// //       throw new Error("Task ID is required");
// //     }

// //     const taskRef = doc(db, "tasks", taskId);
// //     await deleteDoc(taskRef);
// //     return true;
// //   } catch (error) {
// //     console.error("Error deleting task:", error);
// //     return false;
// //   }
// // };

// // export const updateTaskStatus = async (taskId, status, completionPercentage) => {
// //   try {
// //     if (!taskId) {
// //       throw new Error("Task ID is required");
// //     }

// //     const taskRef = doc(db, "tasks", taskId);
// //     const updateData = {
// //       status,
// //       completionPercentage,
// //       isCompleted: status === "completed",
// //       completedAt: status === "completed" ? new Date() : null,
// //     };

// //     await updateDoc(taskRef, updateData);
// //     return true;
// //   } catch (error) {
// //     console.error("Error updating task status:", error);
// //     return false;
// //   }
// // };

// // export const deleteTasks = async (taskIds) => {
// //   const batch = writeBatch(db);

// //   taskIds.forEach((taskId) => {
// //     const taskRef = doc(db, "tasks", taskId);
// //     batch.delete(taskRef);
// //   });

// //   try {
// //     await batch.commit();
// //     return true;
// //   } catch (error) {
// //     console.error("Error deleting multiple tasks:", error);
// //     return false;
// //   }
// // };

// import {
//   collection,
//   addDoc,
//   deleteDoc,
//   onSnapshot,
//   doc,
//   writeBatch,
//   updateDoc,
//   setDoc,
// } from "firebase/firestore";
// import { db } from "./firebase";

// // Default categories that are always available
// export const DEFAULT_TASK_CATEGORIES = {
//   work: { label: "Work", color: "#4F46E5" },
//   personal: { label: "Personal", color: "#059669" },
//   urgent: { label: "Urgent", color: "#DC2626" },
//   study: { label: "Study", color: "#9333EA" },
//   health: { label: "Health", color: "#2563EB" },
// };

// export const PRIORITY_LEVELS = {
//   high: { label: "High", value: 3, color: "#DC2626" },
//   medium: { label: "Medium", value: 2, color: "#F59E0B" },
//   low: { label: "Low", value: 1, color: "#059669" },
// };

// export const TASK_STATUS = {
//   notStarted: "Not Started",
//   inProgress: "In Progress",
//   completed: "Completed",
// };

// // Function to add a custom category
// export const addCustomCategory = async (userId, categoryName, color = "#64748b") => {
//   try {
//     const customCategoryRef = doc(db, "users", userId, "customCategories", categoryName.toLowerCase());
//     await setDoc(customCategoryRef, {
//       label: categoryName,
//       color: color,
//       createdAt: new Date()
//     });
//     return true;
//   } catch (error) {
//     console.error("Error adding custom category:", error);
//     return false;
//   }
// };

// // Function to get all categories (default + custom) for a user
// export const getUserCategories = (userId, onCategoriesUpdate) => {
//   const customCategoriesRef = collection(db, "users", userId, "customCategories");
  
//   return onSnapshot(customCategoriesRef, (snapshot) => {
//     const customCategories = {};
//     snapshot.docs.forEach((doc) => {
//       customCategories[doc.id] = doc.data();
//     });
    
//     // Combine default and custom categories
//     const allCategories = {
//       ...DEFAULT_TASK_CATEGORIES,
//       ...customCategories
//     };
    
//     onCategoriesUpdate(allCategories);
//   });
// };

// export const addTasks = async (newTask, user) => {
//   if (!user?.id) {
//     throw new Error("User not authenticated");
//   }

//   if (newTask.name) {
//     await addDoc(collection(db, "tasks"), {
//       name: newTask.name,
//       description: newTask.description,
//       startTime: newTask.startTime,
//       endTime: newTask.endTime,
//       date: newTask.date,
//       day: newTask.day,
//       userId: user.id,
//       createdAt: new Date(),
//       priority: 0,
//       category: newTask.category || "personal",
//       priorityLevel: newTask.priorityLevel || "medium",
//       status: "notStarted",
//       completionPercentage: 0,
//       isCompleted: false,
//     });
//   }
// };

// export const readTasks = (onTasksUpdate) => {
//   const tasksCollection = collection(db, "tasks");
//   const stopListening = onSnapshot(
//     tasksCollection,
//     (snapshot) => {
//       const tasks = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       onTasksUpdate(tasks);
//     },
//     (error) => {
//       console.error("Error fetching tasks in real-time:", error);
//     }
//   );
//   return stopListening;
// };

// export const updateTaskPriorities = async (taskPriorityUpdates) => {
//   const batch = writeBatch(db);

//   taskPriorityUpdates.forEach(({ taskId, priority }) => {
//     const taskRef = doc(db, "tasks", taskId);
//     batch.update(taskRef, { priority });
//   });

//   try {
//     await batch.commit();
//     return true;
//   } catch (error) {
//     console.error("Error updating priorities:", error);
//     return false;
//   }
// };

// export const updateTaskPriority = async (taskId, priority) => {
//   try {
//     const taskRef = doc(db, "tasks", taskId);
//     await updateDoc(taskRef, { priority });
//     return true;
//   } catch (error) {
//     console.error("Error updating priority:", error);
//     return false;
//   }
// };

// export const updateTask = async (taskId, updatedTaskData) => {
//   try {
//     if (!taskId) {
//       throw new Error("Task ID is required");
//     }

//     const taskRef = doc(db, "tasks", taskId);
//     await updateDoc(taskRef, {
//       ...updatedTaskData,
//       updatedAt: new Date(),
//     });
//     return true;
//   } catch (error) {
//     console.error("Error updating task:", error);
//     return false;
//   }
// };

// export const deleteTask = async (taskId) => {
//   try {
//     if (!taskId) {
//       throw new Error("Task ID is required");
//     }

//     const taskRef = doc(db, "tasks", taskId);
//     await deleteDoc(taskRef);
//     return true;
//   } catch (error) {
//     console.error("Error deleting task:", error);
//     return false;
//   }
// };

// export const updateTaskStatus = async (taskId, status, completionPercentage) => {
//   try {
//     if (!taskId) {
//       throw new Error("Task ID is required");
//     }

//     const taskRef = doc(db, "tasks", taskId);
//     const updateData = {
//       status,
//       completionPercentage,
//       isCompleted: status === "completed",
//       completedAt: status === "completed" ? new Date() : null,
//     };

//     await updateDoc(taskRef, updateData);
//     return true;
//   } catch (error) {
//     console.error("Error updating task status:", error);
//     return false;
//   }
// };

// // Delete custom category
// export const deleteCustomCategory = async (userId, categoryName) => {
//   try {
//     const customCategoryRef = doc(db, "users", userId, "customCategories", categoryName.toLowerCase());
//     await deleteDoc(customCategoryRef);
//     return true;
//   } catch (error) {
//     console.error("Error deleting custom category:", error);
//     return false;
//   }
// };

// export const deleteTasks = async (taskIds) => {
//   const batch = writeBatch(db);

//   taskIds.forEach((taskId) => {
//     const taskRef = doc(db, "tasks", taskId);
//     batch.delete(taskRef);
//   });

//   try {
//     await batch.commit();
//     return true;
//   } catch (error) {
//     console.error("Error deleting multiple tasks:", error);
//     return false;
//   }
// };

import {
  collection,
  addDoc,
  deleteDoc,
  onSnapshot,
  doc,
  writeBatch,
  updateDoc,
  setDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase";

const AVAILABLE_COLORS = [
  "#4F46E5", // Indigo (work)
  "#059669", // Green (personal)
  "#DC2626", // Red (urgent)
  "#9333EA", // Purple (study)
  "#2563EB", // Blue (health)
  "#F59E0B", // Amber
  "#EC4899", // Pink
  "#14B8A6", // Teal
  "#8B5CF6", // Violet
  "#F97316", // Orange
];

export const DEFAULT_TASK_CATEGORIES = {
  work: { label: "Work", color: AVAILABLE_COLORS[0] },
  personal: { label: "Personal", color: AVAILABLE_COLORS[1] },
  urgent: { label: "Urgent", color: AVAILABLE_COLORS[2] },
  study: { label: "Study", color: AVAILABLE_COLORS[3] },
  health: { label: "Health", color: AVAILABLE_COLORS[4] },
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

const getNextAvailableColor = (existingCategories) => {
  const usedColors = new Set(Object.values(existingCategories).map(cat => cat.color));
  return AVAILABLE_COLORS.find(color => !usedColors.has(color)) || AVAILABLE_COLORS[5];
};

export const addCustomCategory = async (userId, categoryName) => {
  try {
    if (!userId || !categoryName.trim()) {
      throw new Error("User ID and category name are required");
    }

    const customCategoriesRef = collection(db, "users", userId, "customCategories");
    const snapshot = await getDocs(customCategoriesRef);
    const existingCategories = {};
    snapshot.docs.forEach(doc => {
      existingCategories[doc.id] = doc.data();
    });

    const newColor = getNextAvailableColor({ ...DEFAULT_TASK_CATEGORIES, ...existingCategories });
    const categoryId = categoryName.toLowerCase().replace(/\s+/g, '-');

    await setDoc(doc(customCategoriesRef, categoryId), {
      label: categoryName,
      color: newColor,
      createdAt: new Date()
    });

    return { id: categoryId, color: newColor };
  } catch (error) {
    console.error("Error adding custom category:", error);
    throw error;
  }
};

export const getUserCategories = (userId, onCategoriesUpdate) => {
  if (!userId) return () => {};

  const customCategoriesRef = collection(db, "users", userId, "customCategories");
  
  return onSnapshot(customCategoriesRef, (snapshot) => {
    const customCategories = {};
    snapshot.docs.forEach((doc) => {
      customCategories[doc.id] = doc.data();
    });
    
    const allCategories = {
      ...DEFAULT_TASK_CATEGORIES,
      ...customCategories
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

export const updateTaskStatus = async (taskId, status, completionPercentage) => {
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

export const deleteCustomCategory = async (userId, categoryName) => {
  try {
    const customCategoryRef = doc(db, "users", userId, "customCategories", categoryName.toLowerCase());
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