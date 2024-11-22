"use client";

import { useState } from "react";

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState({
    Sunday: [],
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: []
  });
  
  const [newTask, setNewTask] = useState({
    day: "",
    name: "",
    description: "",
    startTime: "",
    endTime: ""
  });

  const handleAddTask = (e) => {
    e.preventDefault();
    setTasks(prev => ({
      ...prev,
      [newTask.day]: [...prev[newTask.day], newTask]
    }));
    setNewTask({ day: "", name: "", description: "", startTime: "", endTime: "" });
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Schedule</h1>
        
        {/* Week View */}
        <div className="grid grid-cols-7 gap-4 mb-8">
          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
            <div key={day} className="bg-gray-900 p-4 rounded-lg">
              <h2 className="font-semibold mb-2">{day}</h2>
              <div className="space-y-2">
                {tasks[day]?.map((task, index) => (
                  <div key={index} className="bg-gray-800 p-2 rounded text-sm">
                    <div className="font-medium">{task.name}</div>
                    <div className="text-gray-400 text-xs">
                      {task.startTime} - {task.endTime}
                    </div>
                    <div className="text-gray-400 text-xs mt-1">
                      {task.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Add Task Button */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Add New Task
        </button>

        {/* Simple Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Add New Task</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddTask} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Day</label>
                  <select
                    value={newTask.day}
                    onChange={(e) => setNewTask({...newTask, day: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-md p-2"
                    required
                  >
                    <option value="">Select a day</option>
                    {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Task Name</label>
                  <input
                    type="text"
                    value={newTask.name}
                    onChange={(e) => setNewTask({...newTask, name: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-md p-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-md p-2"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Start Time</label>
                    <input
                      type="time"
                      value={newTask.startTime}
                      onChange={(e) => setNewTask({...newTask, startTime: e.target.value})}
                      className="w-full bg-gray-800 border border-gray-700 rounded-md p-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">End Time</label>
                    <input
                      type="time"
                      value={newTask.endTime}
                      onChange={(e) => setNewTask({...newTask, endTime: e.target.value})}
                      className="w-full bg-gray-800 border border-gray-700 rounded-md p-2"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors"
                  >
                    Add Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}