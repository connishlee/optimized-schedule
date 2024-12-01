"use client";
import { useState } from "react";

import Tasks from "@/app/components/tasks";
import Navbar from "@/app/components/navbar";

export default function DashboardPage() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [tasks, setTasks] = useState({
    Sunday: [],
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  });

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

  const getDayDate = (day) => {
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
    const dayIndex = days.indexOf(day);
    const diff = dayIndex - today.getDay();
    const targetDate = new Date();
    targetDate.setDate(today.getDate() + diff);

    return targetDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex">
        <Navbar />
        {/* Main Content */}
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-12">Schedule</h1>

          <div className="grid grid-cols-2 ml-60">
            <div>
              {[
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
              ].map((day) => (
                <div
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`
                  p-4 mb-4 w-72 rounded-lg transition-all duration-200
                  ${selectedDay === day ? "bg-[#1e2a3d]" : ""}
                  hover:bg-slate-700 cursor-pointer
                  group
                `}
                >
                  <div className="flex flex-col">
                    <span className="text-xl font-md group-hover:text-white">
                      {day}
                    </span>
                    <span className="text-sm text-gray-500">
                      {getDayDate(day)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Tasks List */}
            <div className="flex-1 overflow-y-auto ml-8 space-y-4">
              {tasks[selectedDay]?.map((task, index) => (
                <Tasks
                  data={task}
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>

        {/* why is this still conditionally rendering */}
        {/* Sidebar entire sidebar needs to be a modal */}
        <div
          className={`fixed inset-y-0 right-0 w-[400px] bg-[#1a1a1a] transform transition-transform duration-300 ease-in-out ${
            selectedDay ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {selectedDay && (
            <div className="h-full flex flex-col">
              <div className="p-6 border-b border-gray-800">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">{selectedDay}</h2>
                  <button
                    onClick={() => setSelectedDay(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                <div className="text-sm text-gray-500">
                  {getDayDate(selectedDay)}
                </div>
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
                      onChange={(e) =>
                        setNewTask({ ...newTask, name: e.target.value })
                      }
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
          )}
        </div>
        {/* End of sidebar */}
      </div>
    </div>
  );
}
