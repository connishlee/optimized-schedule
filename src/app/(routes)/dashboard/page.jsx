"use client";
import { useState, useEffect } from "react";

import Tasks from "@/app/components/tasks";
import TaskForm from "@/app/components/TaskForm";
import Navbar from "@/app/components/navbar";

import { getDayDate } from "@/app/helpers/getDate";

// firebase functions: to get documents
import { db } from "../../../../config/firebase";

export default function DashboardPage() {
  const [selectedDay, setSelectedDay] = useState("Sunday");
  const [openMenu, setOpenMenu] = useState(false);

  const [tasks, setTasks] = useState({
    Sunday: [],
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  });

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

        {/* button to open and close menu */}
        <button onClick={() => setOpenMenu(!openMenu)}>Edit</button>

        {/* beginning of sidebar div */}
        <div
          className={`fixed inset-y-0 right-0 w-[400px] bg-[#1a1a1a] transform transition-transform duration-300 ease-in-out ${
            openMenu ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {openMenu && <TaskForm selectedDay={selectedDay} />}
        </div>
        {/* End of sidebar */}
      </div>
    </div>
  );
}
