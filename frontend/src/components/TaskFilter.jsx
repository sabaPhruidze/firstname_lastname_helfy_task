const FILTERS = [
  { key: "all", name: "All" },
  { key: "completed", name: "Completed" },
  { key: "pending", name: "Pending" },
];

const TaskFilter = ({ value, onChange, counts = {} }) => {
  return (
    <div className="filter" role="group" aria-label="Task filters">
      {FILTERS.map((each) => (
        <button
          type="button"
          onClick={() => onChange(each.key)}
          disabled={value === each.key}
          className={`filter-btn ${value === each.key ? "active" : ""}`}
          key={each.key}
        >
          {each.name}{" "}
          <span className="filter-count">{counts[each.key] ?? 0}</span>
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;
