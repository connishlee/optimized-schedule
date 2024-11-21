"use client";

import React, { useState, useEffect } from "react";

import DailyContainer from "@/app/components/daily_container";
import Tasks from "@/app/components/tasks";

import { dates, daysoftheweek, sampleData } from "@/app/helpers/data";

const Dashboard = () => {
  const [selectedDay, setSelectedDay] = useState(null);

  const handleDayClick = (index) => {
    setSelectedDay(index);
    console.log("index " + index);
    console.log("selectedDay " + selectedDay);
  };
  useEffect(() => {
    console.log("Updated selectedDay: " + selectedDay);
  }, [selectedDay]);

  return (
    <div>
      <h1 className="font-bold flex justify-start text-3xl my-8 mx-20">
        Schedule
      </h1>
      <div className="flex flex-col items-center mr-96 gap-2 min-h-screen">
        {daysoftheweek.map((day, index) => (
          <DailyContainer
            day={day}
            date={dates[index]}
            key={day}
            className="mb-4"
            onClick={() => handleDayClick(day)}
            isSelected={selectedDay === index}
          />
        ))}
      </div>
      {sampleData.map((task) => (
        <Tasks data={task} />
      ))}
    </div>
  );
};

export default Dashboard;
