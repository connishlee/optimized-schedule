const DailyContainer = ({ day }) => {
  return (
    <>
      <div className="p-2 font-bold bg-transparent w-40 text-md rounded-md md:w-80 md:text-xl md:p-4 hover:bg-slate-500 hover:transition-all cursor-pointer ease-in-out duration-500">
        {day}
        <div className="text-sm">Jan 1, 2024</div>
      </div>
    </>
  );
};
export default DailyContainer;
