"use client";
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import TaskForm from "../../components/TaskForm";
import TaskProgress from "../../components/TaskProgress";
import TaskCard from "../../components/TaskCard";
import { Plus } from "lucide-react";
import {
  readTasks,
  addTasks,
  updateTask,
  updateTaskStatus,
} from "../../../../config/datacalls";

export default function Dashboard() {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [tasks, setTasks] = useState([]);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  useEffect(() => {
    const unsubscribe = readTasks((retrievedTasks) => {
      setTasks(retrievedTasks);
    });

    return () => unsubscribe();
  }, []);

  const filteredTasks = tasks.filter((task) => task.day === selectedDay);

  const calculateTaskStats = () => {
    const completedTasks = tasks.filter(
      (task) => task.status === "completed"
    ).length;
    const totalTasks = tasks.length;
    const remainingTasks = totalTasks - completedTasks;
    const completionPercentage =
      totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    return {
      completed: completedTasks,
      total: totalTasks,
      remaining: remainingTasks,
      percentage: completionPercentage,
    };
  };

  const handleAddTask = async (newTask) => {
    try {
      await addTasks(newTask, { id: "current-user-id" });
      setShowTaskForm(false);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleEditTask = async (updatedTask) => {
    try {
      await updateTask(updatedTask.id, updatedTask);
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
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
      await updateTaskStatus(taskId, newStatus, completionPercentage);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
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
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <TaskProgress stats={calculateTaskStats()} />
          </div>
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Schedule</h1>
              <button
                onClick={() => setShowTaskForm(true)}
                className="flex items-center space-x-2 text-sm hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Task</span>
              </button>
            </div>

            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-3 space-y-2">
                {days.map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      selectedDay === day ? "bg-gray-200" : ""
                    }`}
                  >
                    <span className="text-lg">{day}</span>
                  </button>
                ))}
              </div>

              <div className="col-span-9 h-[calc(100vh-24rem)] overflow-y-auto pr-4 space-y-4">
                {filteredTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onStatusChange={handleStatusChange}
                    onEdit={setEditingTask}
                    onDelete={() => {}} // Empty function since deletion is handled in TaskCard
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
          selectedDay={selectedDay}
        />
      )}

      {editingTask && (
        <TaskForm
          initialData={editingTask}
          onClose={() => setEditingTask(null)}
          onSubmit={handleEditTask}
          selectedDay={selectedDay}
        />
      )}
    </div>
  );
}
