import { useState } from "react";
import { X } from "lucide-react";
import {
  DEFAULT_TASK_CATEGORIES,
  PRIORITY_LEVELS,
} from "../../../config/datacalls.js";

export default function TaskForm({
  onClose,
  onSubmit,
  initialData = null,
  selectedDay = null,
}) {
  const [task, setTask] = useState(
    initialData || {
      name: "",
      description: "",
      startTime: "",
      endTime: "",
      category: "work",
      status: "notStarted",
      priorityLevel: "medium",
      day: selectedDay || "", // Add selected day from props
      date: new Date().toISOString().split("T")[0], // Add current date
    }
  );

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl">{initialData ? "Edit Task" : "New Task"}</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(task);
          }}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Task name"
            value={task.name}
            onChange={(e) => setTask({ ...task, name: e.target.value })}
            className="w-full p-2 border-b border-gray-200 focus:border-gray-400 outline-none"
            required
          />

          <textarea
            placeholder="Description"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            className="w-full p-2 border-b border-gray-200 focus:border-gray-400 outline-none resize-none"
            rows={3}
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="time"
              value={task.startTime}
              onChange={(e) => setTask({ ...task, startTime: e.target.value })}
              className="p-2 border-b border-gray-200 focus:border-gray-400 outline-none"
              required
            />
            <input
              type="time"
              value={task.endTime}
              onChange={(e) => setTask({ ...task, endTime: e.target.value })}
              className="p-2 border-b border-gray-200 focus:border-gray-400 outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <select
              value={task.category}
              onChange={(e) => setTask({ ...task, category: e.target.value })}
              className="p-2 border-b border-gray-200 focus:border-gray-400 outline-none"
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
              value={task.priorityLevel}
              onChange={(e) =>
                setTask({ ...task, priorityLevel: e.target.value })
              }
              className="p-2 border-b border-gray-200 focus:border-gray-400 outline-none"
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

          <select
            value={task.day}
            onChange={(e) => setTask({ ...task, day: e.target.value })}
            className="w-full p-2 border-b border-gray-200 focus:border-gray-400 outline-none"
            required
          >
            <option value="">Select Day</option>
            {days.map((day) => (
              <option
                key={day}
                value={day}
              >
                {day}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            {initialData ? "Save Changes" : "Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
}
