"use client";

import React, { useState } from "react";

import DailyContainer from "@/app/components/daily_container";
import Tasks from "@/app/components/tasks";

import { dates, daysoftheweek, sampleData } from "@/app/helpers/data";

const Dashboard = () => {
  const [selectedDay, setSelectedDay] = useState("Sunday");

  const handleDayClick = (index) => {
    console.log("Selected Day: " + selectedDay);
    return setSelectedDay(index);
  };

  const filteredData = sampleData.filter((data) => data.day === selectedDay);

  return (
    <div>
      <h1 className="font-bold flex justify-start text-3xl my-8 mx-20">
        Schedule
      </h1>
      <div className="flex flex-row">
        <div className="flex flex-col ml-60">
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
        <div className="flex-col ml-24">
          {filteredData.map((data, index) => (
            <Tasks
              key={index}
              data={data}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
