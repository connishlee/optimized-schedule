import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TaskForm() {
  const router = useRouter();
  const [task, setTask] = useState({
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
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white rounded-lg shadow"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">Day</label>
        <select
          value={task.day}
          onChange={handleDayChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Select a day</option>
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((day) => (
            <option
              key={day}
              value={day}
            >
              {day}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Task Name
        </label>
        <input
          type="text"
          value={task.name}
          onChange={(e) =>
            setTask((prev) => ({ ...prev, name: e.target.value }))
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Time
          </label>
          <input
            type="time"
            value={task.startTime}
            onChange={(e) =>
              setTask((prev) => ({ ...prev, startTime: e.target.value }))
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            End Time
          </label>
          <input
            type="time"
            value={task.endTime}
            onChange={(e) =>
              setTask((prev) => ({ ...prev, endTime: e.target.value }))
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={task.description}
          onChange={(e) =>
            setTask((prev) => ({ ...prev, description: e.target.value }))
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Add Task
      </button>
    </form>
  );
}
