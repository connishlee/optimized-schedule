"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { addTasks } from "../../../config/datacalls";
import { getDayDate } from "@/app/helpers/getDate";

export default function TaskForm({ selectedDay, closeModal }) {
  const router = useRouter();
  const { user } = useUser();

  // State to hold form inputs
  const [task, setTask] = useState({
    name: "",
    description: "",
    startTime: "",
    endTime: "",
    day: selectedDay || "",
    date: selectedDay ? getDayDate(selectedDay) : "",
    userId: user?.id || "", // User ID from Clerk
  });

  // Handle input changes for all fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user.id);
    if (!user) {
      console.error("User not logged in");
      // Display an error message or notification to the user
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
        day: "",
        date: "",
        userId: user?.id,
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
          <h2 className="text-xl font-bold">{task.day}</h2>
          <button
            onClick={closeModal} // Close the modal
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        <div className="text-sm text-gray-500">{task.date}</div>
      </div>

      {/* Modal Form */}
      <div className="p-6 border-t border-gray-800">
        <form
          onSubmit={handleSubmit} // Submit form data
          className="space-y-4"
        >
          {/* Task Name */}
          <input
            type="text"
            name="name"
            placeholder="Task name"
            value={task.name}
            onChange={handleInputChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />

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
