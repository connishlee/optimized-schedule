"use client";
import { useState, useEffect } from "react";
import { readTasks } from "../../../config/datacalls";

export default function TaskProgress() {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    percentage: 0
  });

  useEffect(() => {
    const updateStats = (tasks) => {
      const total = tasks.length;
      const completed = tasks.filter(task => task.isCompleted).length;
      const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

      setStats({
        total,
        completed,
        percentage
      });
    };

    const unsubscribe = readTasks(updateStats);
    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg mb-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">Task Progress</h2>
          <p className="text-gray-400">
            {stats.completed} of {stats.total} tasks completed
          </p>
        </div>
        <div className="text-2xl font-bold">
          {stats.percentage}%
        </div>
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-4">
        <div
          className="bg-purple-600 h-4 rounded-full transition-all duration-500"
          style={{ width: `${stats.percentage}%` }}
        />
      </div>

      <div className="flex justify-between mt-4 text-sm text-gray-400">
        <div>Total Tasks: {stats.total}</div>
        <div>Remaining: {stats.total - stats.completed}</div>
      </div>
    </div>
  );
}