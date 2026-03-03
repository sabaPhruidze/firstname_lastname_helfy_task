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
    const removeSpacesInTitle = title.trim();
    const removeSpacesInDescription = description.trim();

    if (!removeSpacesInTitle) return setError("title must be written");
    if (!removeSpacesInDescription)
      return setError("description must be written");
    setError("");
    onSubmit({
      title: removeSpacesInTitle,
      description: removeSpacesInDescription,
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
      <h2>{mode === "edit" ? "Edit Task" : "Add Task"}</h2>
      {error ? <p className="form-error">{error}</p> : null}
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
      />
      <textarea
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={loading}
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        disabled={loading}
      >
        {possiblePriorities.map((priority) => (
          <option value={priority} key={priority}>
            {priority}
          </option>
        ))}
      </select>
      <button className="btn btn-primary" type="submit" disabled={loading}>
        {mode === "edit" ? "Update Task" : "Add Task"}
      </button>
      {mode === "edit" ? (
        <button className="btn" type="button" onClick={cancel}>
          Cancel
        </button>
      ) : (
        ""
      )}
    </form>
  );
};

export default TaskForm;
