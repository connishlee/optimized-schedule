import { useState } from "react";
import { useRouter } from "next/navigation";

import { getDayDate } from "@/app/helpers/getDate";

export default function TaskForm({ selectedDay }) {
  const router = useRouter();
  const [tasks, setTasks] = useState({
    day: "",
    date: "",
    name: "",
    startTime: "",
    endTime: "",
    description: "",
  });

  const handleDayChange = (e) => {
    const selectedDay = e.target.value;
    const date = getDateForDay(selectedDay);
    setTask((prev) => ({ ...prev, day: selectedDay, date }));
  };

  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    startTime: "",
    endTime: "",
  });

  const handleAddTask = (e) => {
    e.preventDefault();
    setTasks((prev) => ({
      ...prev,
      [selectedDay]: [...prev[selectedDay], newTask],
    }));
    setNewTask({ name: "", description: "", startTime: "", endTime: "" });
  };

  const getDateForDay = (day) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = new Date();
    const currentDay = today.getDay();
    const targetDay = days.indexOf(day);
    const daysUntilTarget = (targetDay + 7 - currentDay) % 7;
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + daysUntilTarget);
    return targetDate.toISOString().split("T")[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        router.refresh();
        setTask({
          day: "",
          date: "",
          name: "",
          startTime: "",
          endTime: "",
          description: "",
        });
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{selectedDay}</h2>

          {/* close button */}
          <button
            onClick={() => setSelectedDay(null)}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        <div className="text-sm text-gray-500">{getDayDate(selectedDay)}</div>
      </div>

      <div className="p-6 border-t border-gray-800">
        <form
          onSubmit={handleAddTask}
          className="space-y-4"
        >
          <div>
            <input
              type="text"
              placeholder="Task name"
              value={newTask.name}
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <div className="flex gap-2">
            <input
              type="time"
              value={newTask.startTime}
              onChange={(e) =>
                setNewTask({ ...newTask, startTime: e.target.value })
              }
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg p-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
            <input
              type="time"
              value={newTask.endTime}
              onChange={(e) =>
                setNewTask({ ...newTask, endTime: e.target.value })
              }
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg p-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <textarea
            placeholder="Description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows={2}
            required
          />

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
