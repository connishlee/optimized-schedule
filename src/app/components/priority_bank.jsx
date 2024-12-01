import React from "react";
import Tasks from "@/app/components/tasks";
import { sampleData, dates, daysoftheweek } from "@/app/helpers/data";

const PriorityBank = () => {
  // Filter tasks by priority
  const priorityTasks = sampleData.filter((task) => task.priority === "yes");

  // Group filtered tasks by date
  const tasksByDate = priorityTasks.reduce((acc, task) => {
    acc[task.date] = acc[task.date] || [];
    acc[task.date].push(task);
    return acc;
  }, {});

  return (
    <div className="bg-slate-900 p-8 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {dates.map((date, index) => (
          <div
            key={date}
            className="relative bg-slate-800 p-4 rounded-lg shadow-md"
          >
            <button className="absolute top-2 right-2 text-sm text-white bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded shadow">
              Edit
            </button>
            <h2 className="text-xl font-bold text-white mb-4">
              {daysoftheweek[index]} ({date})
            </h2>
            <ul className="space-y-4">
              {tasksByDate[date] ? (
                tasksByDate[date].map((task, idx) => (
                  <Tasks
                    key={idx}
                    data={task}
                  />
                ))
              ) : (
                <p className="text-gray-400">No priority tasks for this day</p>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriorityBank;
