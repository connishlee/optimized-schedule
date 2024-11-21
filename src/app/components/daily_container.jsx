const DailyContainer = ({ day, date, isSelected, onClick }) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <div className="grid gap-6 items-start">
        <div
          className={`col-lg-5 mb-3 mb-lg-0 p-2 font-bold w-40 text-md rounded-md md:w-60 md:text-xl md:p-4 hover:bg-slate-500 hover:transition-all cursor-pointer ${
            isSelected ? "bg-slate-600" : "bg-transparent"
          }  ease-in-out duration-500`}
          onClick={onClick}
        >
          {day}
          <div className="text-sm">{formattedDate}</div>
        </div>
      </div>
    </>
  );
};
export default DailyContainer;
