import { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";

export default function TaskCard({ task, onStatusChange, onEdit, onDelete }) {
  const [showActions, setShowActions] = useState(false);

  const statusOptions = {
    "not-started": "Not Started",
    "in-progress": "In Progress",
    completed: "Completed",
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-red-500";
      case "medium":
        return "border-yellow-500";
      case "low":
        return "border-green-500";
      default:
        return "border-gray-200";
    }
  };

  return (
    <div
      className={`group bg-white p-6 hover:bg-gray-50 transition-all border-l-4 ${getPriorityColor(
        task.priority
      )}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h3 className="text-lg">{task.name}</h3>
          {task.description && (
            <p className="text-gray-500 text-sm">{task.description}</p>
          )}
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>
              {task.startTime} - {task.endTime}
            </span>
            <span className="capitalize">{task.category}</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <select
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value)}
            className="text-sm border-0 bg-transparent focus:ring-0"
          >
            {Object.entries(statusOptions).map(([value, label]) => (
              <option
                key={value}
                value={value}
              >
                {label}
              </option>
            ))}
          </select>

          {showActions && (
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(task)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
