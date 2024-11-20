import DailyContainer from "@/app/components/daily_container";

const daysoftheweek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Dashboard = () => {
  return (
    <div>
      <h1 className="font-bold flex justify-start text-3xl my-8 mx-20">
        Schedule
      </h1>
      <div className="flex flex-col items-center mr-80 gap-4 min-h-screen md:gap-2">
        {daysoftheweek.map((day) => (
          <DailyContainer
            day={day}
            key={day}
            className="mb-4"
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
