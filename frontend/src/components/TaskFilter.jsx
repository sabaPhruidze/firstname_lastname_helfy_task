const FILTERS = [
  { key: "all", name: "All" },
  { key: "completed", name: "Completed" },
  { key: "pending", name: "Pending" },
];

const TaskFilter = ({ value, onChange }) => {
  return (
    <div>
      {FILTERS.map((each) => (
        <button
          type="button"
          onClick={() => onChange(each.key)}
          disabled={value === each.key}
          className={`filter-btn ${value === "all" ? "active" : value === "completed" ? "active" : value === "pending" ? "active" : ""}`}
          key={each.key}
        >
          {each.name}
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;
