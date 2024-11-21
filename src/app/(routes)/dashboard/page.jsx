"use client";

import React, { useState } from "react";

import DailyContainer from "@/app/components/daily_container";

import { dates, daysoftheweek } from "@/app/helpers/data";

const Dashboard = () => {
  const [selectedDay, setSelectedDay] = useState("Sunday");

  const handleDayClick = (index) => {
    console.log("selected Day " + selectedDay);
    return setSelectedDay(index);
  };

  return (
    <div>
      <h1 className="font-bold flex justify-start text-3xl my-8 mx-20">
        Schedule
      </h1>
      <div className="flex flex-col ml-60 min-h-screen">
        {daysoftheweek.map((day, index) => (
          <DailyContainer
            day={day}
            date={dates[index]}
            key={day}
            className="mb-4"
            onClick={() => {
              handleDayClick(day);
            }}
            isSelected={selectedDay === day}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
