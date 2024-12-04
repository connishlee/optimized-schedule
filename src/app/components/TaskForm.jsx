"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  addTasks,
  PRIORITY_LEVELS,
  getUserCategories,
  addCustomCategory,
} from "../../../config/datacalls";
import { getDayDate } from "@/app/helpers/getDate";

export default function TaskForm({ selectedDay, date }) {
  const router = useRouter();
  const { user } = useUser();
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState({});

  const [task, setTask] = useState({
    name: "",
    description: "",
    startTime: "",
    endTime: "",
    day: selectedDay || "",
    date: date,
    userId: user?.id || "",
    category: "personal",
    priorityLevel: "medium",
  });

  useEffect(() => {
    if (user?.id) {
      const unsubscribe = getUserCategories(user.id, setCategories);
      return () => unsubscribe();
    }
  }, [user?.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));

    if (name === "category" && value === "custom") {
      setShowCategoryInput(true);
    }
  };

  const handleNewCategory = async () => {
    if (newCategory.trim() && user?.id) {
      await addCustomCategory(user.id, newCategory.trim());
      setNewCategory("");
      setShowCategoryInput(false);
      setTask((prev) => ({
        ...prev,
        category: newCategory.trim().toLowerCase(),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      console.error("User not logged in");
      return;
    }

    try {
      await addTasks(task, user);
      console.log("Task added successfully");

      router.refresh();
      setTask({
        name: "",
        description: "",
        startTime: "",
        endTime: "",
        day: selectedDay,
        date: getDayDate(selectedDay),
        userId: user?.id,
        category: "personal",
        priorityLevel: "medium",
      });
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Please try again later.");
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Modal Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{selectedDay}</h2>
        </div>
        <div className="text-sm text-gray-500">{date}</div>
      </div>

      {/* Modal Form */}
      <div className="p-6 border-t border-gray-800">
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Task Name */}
          <input
            type="text"
            name="name"
            placeholder="Task Name"
            value={task.name}
            onChange={handleInputChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />

          {/* Category and Priority Selection */}
          <div className="flex gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Category
              </label>
              <select
                name="category"
                value={task.category}
                onChange={handleInputChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {Object.entries(categories).map(([value, { label }]) => (
                  <option
                    key={value}
                    value={value}
                  >
                    {label}
                  </option>
                ))}
                <option value="custom">+ Add Custom Category</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Priority
              </label>
              <select
                name="priorityLevel"
                value={task.priorityLevel}
                onChange={handleInputChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {Object.entries(PRIORITY_LEVELS).map(([value, { label }]) => (
                  <option
                    key={value}
                    value={value}
                  >
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Custom Category Input */}
          {task.category === "custom" && (
            <div className="flex gap-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter new category name"
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg p-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={handleNewCategory}
                className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700"
              >
                Add
              </button>
            </div>
          )}

          {/* Task Times */}
          <div className="flex gap-2">
            <input
              type="time"
              name="startTime"
              value={task.startTime}
              onChange={handleInputChange}
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg p-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
            <input
              type="time"
              name="endTime"
              value={task.endTime}
              onChange={handleInputChange}
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg p-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          {/* Task Description */}
          <textarea
            name="description"
            placeholder="Description"
            value={task.description}
            onChange={handleInputChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows={2}
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-lg transition-all hover:shadow-lg hover:shadow-purple-500/20"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}
