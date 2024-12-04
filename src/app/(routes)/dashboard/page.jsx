"use client";
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import TaskForm from "../../components/TaskForm";
import TaskProgress from "../../components/TaskProgress";
import TaskCard from "../../components/TaskCard";
import { Menu, Plus } from "lucide-react";

export default function Dashboard() {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Morning Meeting",
      description: "Daily team sync",
      startTime: "09:00",
      endTime: "10:00",
      category: "work",
      status: "not-started",
      priority: "high",
      day: "Monday", // Added day property
    },
    {
      id: 2,
      name: "Project Review",
      description: "Review weekly progress",
      startTime: "14:00",
      endTime: "15:00",
      category: "priority",
      status: "completed",
      priority: "medium",
      day: "Thursday", // Added day property
    },
  ]);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  // Filter tasks based on selected day
  const filteredTasks = tasks.filter((task) => task.day === selectedDay);

  const handleAddTask = (newTask) => {
    // Ensure the new task has the selected day
    const taskWithDay = {
      ...newTask,
      id: Date.now(),
      day: selectedDay, // Add the currently selected day
    };
    setTasks([...tasks, taskWithDay]);
    setShowTaskForm(false);
  };

  const handleEditTask = (updatedTask) => {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(
      tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        isOpen={isNavOpen}
        toggleNav={() => setIsNavOpen(!isNavOpen)}
      />

      <main
        className={`transition-all duration-300 ${
          isNavOpen ? "ml-64" : "ml-16"
        } p-8`}
      >
        <div className="max-w-5xl mx-auto">
          {/* Task Progress Section */}
          <div className="mb-12">
            <TaskProgress tasks={tasks} />
          </div>

          {/* Days Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl">Schedule</h1>
              <button
                onClick={() => setShowTaskForm(true)}
                className="flex items-center space-x-2 text-sm hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Task</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {/* Days List */}
              <div className="space-y-2">
                {days.map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      selectedDay === day ? "bg-gray-100" : "hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-lg">{day}</span>
                  </button>
                ))}
              </div>

              {/* Tasks List - Now using filtered tasks */}
              <div className="space-y-px">
                {filteredTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onStatusChange={handleStatusChange}
                    onEdit={setEditingTask}
                    onDelete={handleDeleteTask}
                  />
                ))}
                {filteredTasks.length === 0 && (
                  <div className="text-gray-500 text-center py-8">
                    No tasks scheduled for {selectedDay}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {showTaskForm && (
        <TaskForm
          onClose={() => setShowTaskForm(false)}
          onSubmit={handleAddTask}
          selectedDay={selectedDay} // Pass selected day to form
        />
      )}

      {editingTask && (
        <TaskForm
          initialData={editingTask}
          onClose={() => setEditingTask(null)}
          onSubmit={handleEditTask}
          selectedDay={selectedDay} // Pass selected day to form
        />
      )}
    </div>
  );
}
