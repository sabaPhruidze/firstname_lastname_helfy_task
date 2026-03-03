import "../styles/taskItem.css";

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  const handleDelete = () => {
    const ok = window.confirm("Delete this task");
    if (ok) onDelete(task.id);
  };
  return (
    <li className="task-item">
      <div className="task-top">
        <strong className="task-title">{task.title}</strong>

        <span className={`priority-badge priority-${task.priority}`}>
          {task.priority}
        </span>
      </div>

      <div className="task-status">
        <span className={task.completed ? "status-done" : "status-pending"}>
          {task.completed ? "Done" : "Pending"}
        </span>
      </div>

      <div className="task-actions">
        <button className="btn" type="button" onClick={() => onToggle(task.id)}>
          Toggle
        </button>

        <button className="btn" type="button" onClick={() => onEdit(task)}>
          Edit
        </button>

        <button className="btn btn-danger" type="button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
