import DailyContainer from "@/app/components/daily_container";

import { daysoftheweek, sampleData } from "@/app/helpers/data";
import Tasks from "@/app/components/tasks";

const Dashboard = () => {
  return (
    <div>
      <h1 className="font-bold flex justify-start text-3xl my-8 mx-20">
        Schedule
      </h1>
      <div className="flex flex-col items-center mr-96 gap-2 min-h-screen">
        {daysoftheweek.map((day) => (
          <DailyContainer
            day={day}
            key={day}
            className="mb-4"
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
