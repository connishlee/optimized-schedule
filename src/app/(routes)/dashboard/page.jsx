import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Schedule</h1>
        
        {/* Week View */}
        <div className="grid grid-cols-7 gap-4 mb-8">
          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
            <div key={day} className="bg-gray-900 p-4 rounded-lg">
              <h2 className="font-semibold mb-2">{day}</h2>
              {/* Task list will go here */}
              <div className="space-y-2">
                {/* Example task */}
                <div className="bg-gray-800 p-2 rounded text-sm">
                  9:00 AM - Team Standup
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Task Button */}
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
          Add New Task
        </button>
      </div>
    </main>
  );
}