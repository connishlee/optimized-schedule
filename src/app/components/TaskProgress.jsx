"use client";

export default function TaskProgress({ stats }) {
  // Destructure stats with default values
  const {
    total: totalTasks = 0,
    completed: completedTasks = 0,
    percentage: progressPercentage = 0,
  } = stats || {};

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl">Task Progress</h2>
          <p className="text-gray-500">
            {completedTasks} of {totalTasks} tasks completed
          </p>
        </div>
        <span className="text-xl">{Math.round(progressPercentage)}%</span>
      </div>

      <div className="w-full bg-gray-100 h-3 rounded-full">
        <div
          className="bg-black h-3 rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="flex justify-between mt-4 text-sm text-gray-500">
        <span>Total Tasks: {totalTasks}</span>
        <span>Remaining: {totalTasks - completedTasks}</span>
      </div>
    </div>
  );
}
