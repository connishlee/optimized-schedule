const Tasks = ({ data }) => {
  return (
    <>
      <li class="d-flex flex-column flex-md-row py-4">
        <span class="flex-shrink-0 width-13x me-md-4 d-block mb-3 mb-md-0 small text-muted">
          {data.date}
        </span>
        <span>{data.time}</span>
        <div class="flex-grow-1 ps-4 border-start border-3">
          <h4>{data.title}</h4>
          <p class="mb-0">{data.description}</p>
        </div>
      </li>
    </>
  );
};

export default Tasks;
