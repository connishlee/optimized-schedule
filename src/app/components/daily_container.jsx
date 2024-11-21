import Tasks from "@/app/components/tasks";

import { sampleData } from "../helpers/data";

const DailyContainer = ({ day, date, isSelected, onClick }) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const filteredData = sampleData.filter((data) => data.date === date);

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-[200px_1fr] gap-6 items-start">
        <div
          className={`col-lg-5 mb-5 mb-lg-0 p-2 font-bold w-40 text-md rounded-md md:w-60 md:text-xl md:p-4 hover:bg-slate-500 hover:transition-all cursor-pointer ${
            isSelected ? "bg-slate-500" : "bg-transparent"
          }  ease-in-out duration-500`}
          onClick={onClick}
        >
          {day}
          <div className="text-sm">{formattedDate}</div>
        </div>
        <div className="flex-col ml-10">
          {filteredData.map((data, index) => (
            <Tasks
              key={index}
              data={data}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default DailyContainer;
