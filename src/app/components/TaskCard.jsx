"use client";
import { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import {
  updateTaskStatus,
  TASK_STATUS,
  deleteTask,
} from "../../../config/datacalls.js";

export default function TaskCard({ task, onStatusChange, onEdit, onDelete }) {
  const [showActions, setShowActions] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    let completionPercentage = 0;

    switch (newStatus) {
      case "notStarted":
        completionPercentage = 0;
        break;
      case "inProgress":
        completionPercentage = 50;
        break;
      case "completed":
        completionPercentage = 100;
        break;
    }

    await updateTaskStatus(task.id, newStatus, completionPercentage);
    onStatusChange(task.id, newStatus);
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const success = await deleteTask(task.id);
      if (success) {
        onDelete(task.id);
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const getPriorityColor = (priorityLevel) => {
    switch (priorityLevel) {
      case "high":
        return "after:bg-red-500";
      case "medium":
        return "after:bg-yellow-500";
      case "low":
        return "after:bg-green-500";
      default:
        return "after:bg-gray-200";
    }
  };

  return (
    <div
      className={`group bg-white p-6 w-full relative transition-all duration-300 ease-in-out
        shadow-sm hover:shadow-md
        after:absolute after:left-0 after:top-0 after:w-1 after:h-full 
        after:transition-colors after:duration-300 after:ease-in-out
        ${getPriorityColor(task.priorityLevel)}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 space-y-2 min-w-0">
          <h3 className="text-lg font-medium truncate">{task.name}</h3>
          {task.description && (
            <p className="text-gray-500 text-sm line-clamp-2">
              {task.description}
            </p>
          )}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="whitespace-nowrap">
                {task.startTime} - {task.endTime}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
              <span className="capitalize">{task.category}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <select
            value={task.status || "notStarted"}
            onChange={handleStatusChange}
            className="text-base min-w-[140px] py-2 px-4 text-center appearance-none
              bg-transparent border border-gray-200 rounded-lg cursor-pointer
              transition-all duration-200 ease-in-out
              hover:border-gray-300 focus:border-gray-300 focus:ring-0
              focus:outline-none"
            style={{
              WebkitAppearance: "none",
              MozAppearance: "none",
            }}
          >
            {Object.entries(TASK_STATUS).map(([value, label]) => (
              <option
                key={value}
                value={value}
                className="text-center bg-white"
              >
                {label}
              </option>
            ))}
          </select>

          <div
            className={`flex gap-2 transition-all duration-300 ease-in-out ${
              showActions
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-2"
            }`}
          >
            <button
              onClick={() => onEdit(task)}
              className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full 
                hover:bg-gray-100 transition-all duration-200 ease-in-out"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-gray-400 hover:text-red-500 p-1.5 rounded-full 
                hover:bg-red-50 transition-all duration-200 ease-in-out
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
