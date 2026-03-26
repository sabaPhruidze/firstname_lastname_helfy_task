import { useState } from "react";
import "../styles/taskForm.css";

const possiblePriorities = ["low", "medium", "high"];

const TaskForm = ({ onSubmit, loading, mode = "create", values, cancel }) => {
  const initialTitle = mode === "edit" && values ? values.title || "" : "";
  const initialDescription =
    mode === "edit" && values ? values.description || "" : "";
  const initialPriority =
    mode === "edit" && values ? values.priority || "low" : "low";

  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [priority, setPriority] = useState(initialPriority);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanTitle = title.trim();
    const cleanDescription = description.trim();

    if (!cleanTitle) return setError("Title is required.");
    if (!cleanDescription) return setError("Description is required.");

    setError("");

    onSubmit({
      title: cleanTitle,
      description: cleanDescription,
      priority,
    });

    if (mode === "create") {
      setTitle("");
      setDescription("");
      setPriority("low");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2 className="task-form-title">
        {mode === "edit" ? "Edit Task" : "Create New Task"}
      </h2>
      {error ? <p className="form-error">{error}</p> : null}

      <div className="form-grid">
        <label className="field">
          <span className="field-label">Title</span>
          <input
            type="text"
            placeholder="Write task title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError("");
            }}
            maxLength={100}
            disabled={loading}
          />
        </label>

        <label className="field field-wide">
          <span className="field-label">Description</span>
          <textarea
            name="description"
            placeholder="Add details for this task"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (error) setError("");
            }}
            maxLength={260}
            disabled={loading}
          />
        </label>

        <label className="field">
          <span className="field-label">Priority</span>
          <select
            value={priority}
            onChange={(e) => {
              setPriority(e.target.value);
              if (error) setError("");
            }}
            disabled={loading}
          >
            {possiblePriorities.map((level) => (
              <option value={level} key={level}>
                {level}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="form-actions">
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Saving..." : mode === "edit" ? "Update Task" : "Add Task"}
        </button>
        {mode === "edit" ? (
          <button className="btn" type="button" onClick={cancel} disabled={loading}>
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
};

export default TaskForm;
