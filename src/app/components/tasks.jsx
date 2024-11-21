const Tasks = ({ data }) => {
  return (
    <li className="flex flex-col md:flex-row py-4">
      <span className="text-sm text-gray-300 md:mr-4">{data.time}</span>
      <div className="flex-grow pl-4 border-l-4 border-slate-600">
        <h4 className="text-lg font-bold">{data.title}</h4>
        <p className="mt-2 text-gray-300">{data.description}</p>
      </div>
    </li>
  );
};

export default Tasks;
