import React from "react";

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  const handleDelete = () => {
    const ok = window.confirm("Delete this task");
    if (ok) onDelete(task.id);
  };
  return (
    <li>
      <div>
        <strong>{task.title}</strong>({task.priority})
      </div>
      <div>
        <span>{task.completed ? "Done" : "Pending"}</span>
      </div>
      <div>
        <button type="button" onClick={() => onToggle(task.id)}>
          Toggle
        </button>{" "}
        <button type="button" onClick={onEdit(task)}>
          Edit
        </button>
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
