// "use client";
// import { useState, useEffect } from "react";

// import Tasks from "@/app/components/tasks";

// import TaskForm from "@/app/components/TaskForm";
// import Navbar from "@/app/components/navbar";

// import { getDayDate } from "@/app/helpers/getDate";
// import { readTasks } from "../../../../config/datacalls";

// export default function DashboardPage() {
//   const [selectedDay, setSelectedDay] = useState("Sunday");

//   const [tasks, setTasks] = useState({
//     Sunday: [],
//     Monday: [],
//     Tuesday: [],
//     Wednesday: [],
//     Thursday: [],
//     Friday: [],
//     Saturday: [],
//   });

//   useEffect(() => {
//     const updateTasks = (retrievedTasks) => {
//       const groupedTasks = retrievedTasks.reduce((acc, task) => {
//         if (task.day) {
//           if (!acc[task.day]) acc[task.day] = [];
//           acc[task.day].push(task);
//         }
//         return acc;
//       }, {});

//       setTasks(groupedTasks);
//     };
//     const stopListening = readTasks(updateTasks);
//     return () => stopListening();
//   }, []);

//   return (
//     <div className="min-h-screen bg-black text-white">
//       <div className="flex">
//         <Navbar />
//         {/* Main Content */}
//         <div className="flex-1 p-8">
//           <h1 className="text-3xl font-bold mb-12">Schedule</h1>

//           <div className="grid grid-cols-2">
//             <div>
//               {[
//                 "Sunday",
//                 "Monday",
//                 "Tuesday",
//                 "Wednesday",
//                 "Thursday",
//                 "Friday",
//               ].map((day) => (
//                 <div
//                   key={day}
//                   onClick={() => setSelectedDay(day)}
//                   className={`
//                   p-4 mb-4 w-72 rounded-lg transition-all duration-200
//                   ${selectedDay === day ? "bg-[#1e2a3d]" : ""}
//                   hover:bg-slate-700 cursor-pointer
//                   group
//                 `}
//                 >
//                   <div className="flex flex-col">
//                     <span className="text-xl font-md group-hover:text-white">
//                       {day}
//                     </span>
//                     <span className="text-sm text-gray-500">
//                       {getDayDate(day)}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Tasks List */}
//             <div className="flex-1 ml-8">
//               {/* Scrollable container */}
//               <div className="space-y-4 w-128 bg-gray-900 pl-8 rounded-lg max-h-[576px] overflow-y-auto shadow-md scrollbar-track-black scrollbar-thumb-rounded-full scrollbar-track-transparent">
//                 {tasks[selectedDay]?.map((task, index) => (
//                   <Tasks
//                     data={task}
//                     key={index}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div
//           className={`fixed inset-y-0 right-0 w-[400px] bg-[#1a1a1a] transform transition-transform duration-300 ease-in-out ${
//             selectedDay ? "translate-x-0" : "translate-x-full"
//           }`}
//         >
//           {selectedDay && (
//             <TaskForm
//               selectedDay={selectedDay}
//               date={getDayDate(selectedDay)}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import { useState, useEffect } from "react";
import Tasks from "@/app/components/tasks";
import TaskForm from "@/app/components/TaskForm";
import Navbar from "@/app/components/navbar";
import TaskProgress from "@/app/components/TaskProgress"; // Add this import
import { getDayDate } from "@/app/helpers/getDate";
import { readTasks } from "../../../../config/datacalls";

export default function DashboardPage() {
  const [selectedDay, setSelectedDay] = useState("Sunday");

  const [tasks, setTasks] = useState({
    Sunday: [],
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  });

  useEffect(() => {
    const updateTasks = (retrievedTasks) => {
      const groupedTasks = retrievedTasks.reduce((acc, task) => {
        if (task.day) {
          if (!acc[task.day]) acc[task.day] = [];
          acc[task.day].push(task);
        }
        return acc;
      }, {});

      setTasks(groupedTasks);
    };
    const stopListening = readTasks(updateTasks);
    return () => stopListening();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex">
        <Navbar />
        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Add TaskProgress component at the top */}
          <div className="mb-8">
            <TaskProgress />
          </div>

          <h1 className="text-3xl font-bold mb-12">Schedule</h1>

          <div className="grid grid-cols-2">
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
                    {/* Add day progress indicator */}
                    {tasks[day]?.length > 0 && (
                      <div className="mt-2">
                        <div className="text-xs text-gray-400 mb-1">
                          {tasks[day].filter(task => task.isCompleted).length} of {tasks[day].length} completed
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5">
                          <div
                            className="bg-purple-600 h-1.5 rounded-full transition-all duration-300"
                            style={{
                              width: `${(tasks[day].filter(task => task.isCompleted).length / tasks[day].length) * 100}%`
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Tasks List */}
            <div className="flex-1 ml-8">
              {/* Scrollable container */}
              <div className="space-y-4 w-128 bg-gray-900 pl-8 rounded-lg max-h-[576px] overflow-y-auto shadow-md scrollbar-track-black scrollbar-thumb-rounded-full scrollbar-track-transparent">
                {tasks[selectedDay]?.map((task, index) => (
                  <Tasks
                    data={task}
                    key={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`fixed inset-y-0 right-0 w-[400px] bg-[#1a1a1a] transform transition-transform duration-300 ease-in-out ${
            selectedDay ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {selectedDay && (
            <TaskForm
              selectedDay={selectedDay}
              date={getDayDate(selectedDay)}
            />
          )}
        </div>
      </div>
    </div>
  );
}