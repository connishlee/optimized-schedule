"use client";
import { useState } from "react";
import {
  updateTask,
  deleteTask,
  updateTaskStatus,
} from "../../../config/datacalls";
import {
  DEFAULT_TASK_CATEGORIES,
  PRIORITY_LEVELS,
  TASK_STATUS,
} from "../../../config/datacalls";

function formatTime(time) {
  const [hours, minutes] = time.split(":");
  const amPm = parseInt(hours) >= 12 ? "PM" : "AM";
  const formattedHours = parseInt(hours) % 12 || 12;
  return `${formattedHours}:${minutes} ${amPm}`;
}

export default function Tasks({ data }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    name: data.name,
    description: data.description,
    startTime: data.startTime,
    endTime: data.endTime,
    category: data.category || "personal",
    priorityLevel: data.priorityLevel || "medium",
  });

  const handleUpdate = async () => {
    try {
      const result = await updateTask(data.id, {
        name: editedTask.name,
        description: editedTask.description,
        startTime: editedTask.startTime,
        endTime: editedTask.endTime,
        category: editedTask.category,
        priorityLevel: editedTask.priorityLevel,
      });

      if (result) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const result = await deleteTask(data.id);
      if (!result) {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
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

      await updateTaskStatus(data.id, newStatus, completionPercentage);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const getCategoryColor = (category) => {
    return (
      DEFAULT_TASK_CATEGORIES[category]?.color ||
      DEFAULT_TASK_CATEGORIES.personal.color
    );
  };

  const getPriorityColor = (priority) => {
    return PRIORITY_LEVELS[priority]?.color || PRIORITY_LEVELS.medium.color;
  };

  return (
    <div
      className={`
        rounded-lg transition-all duration-300 
        ${data.status === "completed" ? "opacity-50" : ""}
      `}
    >
      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            value={editedTask.name}
            onChange={(e) =>
              setEditedTask({ ...editedTask, name: e.target.value })
            }
            className="w-full p-2 bg-gray-100 rounded border border-gray-200 text-gray-900"
            placeholder="Task Name"
          />

          <div className="grid grid-cols-2 gap-4">
            <select
              value={editedTask.category}
              onChange={(e) =>
                setEditedTask({ ...editedTask, category: e.target.value })
              }
              className="p-2 bg-gray-100 rounded border border-gray-200 text-gray-900"
            >
              {Object.entries(DEFAULT_TASK_CATEGORIES).map(
                ([value, { label }]) => (
                  <option
                    key={value}
                    value={value}
                  >
                    {label}
                  </option>
                )
              )}
            </select>

            <select
              value={editedTask.priorityLevel}
              onChange={(e) =>
                setEditedTask({ ...editedTask, priorityLevel: e.target.value })
              }
              className="p-2 bg-gray-100 rounded border border-gray-200 text-gray-900"
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

          <textarea
            value={editedTask.description}
            onChange={(e) =>
              setEditedTask({ ...editedTask, description: e.target.value })
            }
            className="w-full p-2 bg-gray-100 rounded border border-gray-200 text-gray-900"
            placeholder="Description"
          />

          <div className="flex space-x-2">
            <input
              type="time"
              value={editedTask.startTime}
              onChange={(e) =>
                setEditedTask({ ...editedTask, startTime: e.target.value })
              }
              className="p-2 bg-gray-100 rounded border border-gray-200 text-gray-900"
            />
            <input
              type="time"
              value={editedTask.endTime}
              onChange={(e) =>
                setEditedTask({ ...editedTask, endTime: e.target.value })
              }
              className="p-2 bg-gray-100 rounded border border-gray-200 text-gray-900"
            />
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleUpdate}
              className="bg-blue-100 text-blue-800 px-4 py-2 rounded hover:bg-blue-200"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  {data.name}
                </h3>
                <span
                  className="px-2 py-0.5 text-xs rounded-full text-white"
                  style={{ backgroundColor: getCategoryColor(data.category) }}
                >
                  {DEFAULT_TASK_CATEGORIES[data.category]?.label || "Personal"}
                </span>
                <span
                  className="px-2 py-0.5 text-xs rounded-full text-white"
                  style={{
                    backgroundColor: getPriorityColor(data.priorityLevel),
                  }}
                >
                  {PRIORITY_LEVELS[data.priorityLevel]?.label || "Medium"}
                </span>
              </div>

              <p className="text-gray-600 mt-2">{data.description}</p>
              <div className="mt-2 text-sm text-gray-500">
                {formatTime(data.startTime)} - {formatTime(data.endTime)}
              </div>

              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${data.completionPercentage || 0}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <select
                value={data.status || "notStarted"}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="p-1 ml-2 bg-gray-100 rounded border border-gray-200 text-sm text-gray-900"
              >
                {Object.entries(TASK_STATUS).map(([value, label]) => (
                  <option
                    key={value}
                    value={value}
                  >
                    {label}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-600 hover:text-blue-700"
                title="Edit Task"
              >
                ✏️
              </button>
              <button
                onClick={handleDelete}
                className="text-red-600 hover:text-red-700"
                title="Delete Task"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
