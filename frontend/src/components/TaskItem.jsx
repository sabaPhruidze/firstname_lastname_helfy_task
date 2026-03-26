import "../styles/taskItem.css";

const TaskItem = ({ task, onToggle, onDelete, onEdit, index = 0, isClone = false }) => {
  const handleDelete = () => {
    const ok = window.confirm("Delete this task?");
    if (ok) onDelete(task.id);
  };

  const dateLabel = task.createdAt
    ? new Date(task.createdAt).toLocaleDateString()
    : "No date";

  const priority = task.priority || "low";
  const priorityLabel = priority.charAt(0).toUpperCase() + priority.slice(1);

  return (
    <li
      className={`task-item ${task.completed ? "is-completed" : ""}`}
      style={{ "--stagger-delay": `${index * 55}ms` }}
    >
      <span className="card-rail" aria-hidden="true" />

      <div className="task-top">
        <strong className="task-title" title={task.title}>
          {task.title}
        </strong>

        <span className={`priority-badge priority-${priority}`}>
          {priorityLabel}
        </span>
      </div>

      <p className="task-description">{task.description}</p>

      <div className="task-status">
        <span
          className={`status-chip ${task.completed ? "status-done" : "status-pending"}`}
        >
          {task.completed ? "Done" : "Pending"}
        </span>
        <span className="task-date">{dateLabel}</span>
      </div>

      <div className="task-actions">
        <button
          className="btn"
          type="button"
          onClick={() => onToggle(task.id)}
          tabIndex={isClone ? -1 : undefined}
        >
          {task.completed ? "Mark Pending" : "Mark Done"}
        </button>

        <button
          className="btn"
          type="button"
          onClick={() => onEdit(task)}
          tabIndex={isClone ? -1 : undefined}
        >
          Edit
        </button>

        <button
          className="btn btn-danger"
          type="button"
          onClick={handleDelete}
          tabIndex={isClone ? -1 : undefined}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
