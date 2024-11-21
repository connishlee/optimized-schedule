const DailyContainer = ({ day, date, isSelected, onClick }) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <div
        className={`p-2 font-bold bg-transparent w-40 text-md rounded-md md:w-80 md:text-xl md:p-4 hover:bg-slate-500 hover:transition-all cursor-pointer ease-in-out duration-500 ${
          isSelected ? "bg-slate-500" : ""
        }`}
        onClick={onClick}
      >
        {day}
        <div className="text-sm">{formattedDate}</div>
      </div>
    </>
  );
};
export default DailyContainer;
