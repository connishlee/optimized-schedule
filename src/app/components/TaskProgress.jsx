export default function TaskProgress({ tasks }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const progressPercentage =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl mb-1">Task Progress</h2>
          <p className="text-gray-500">
            {completedTasks} of {totalTasks} tasks completed
          </p>
        </div>
        <span className="text-xl">{Math.round(progressPercentage)}%</span>
      </div>

      <div className="w-full bg-gray-100 h-1 rounded-full">
        <div
          className="bg-black h-1 rounded-full transition-all duration-500"
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
