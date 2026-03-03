import { useState } from "react";
import "../styles/taskForm.css";
const possiblePriorities = ["low", "medium", "high"];
const TaskForm = ({ onSubmit, loading }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
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
    setTitle("");
    setDescription("");
    setPriority("low");
  };
  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h3>Add Task</h3>
      {error ? <p>{error}</p> : ""}
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
      <button type="submit" disabled={loading}>
        {loading ? "Please wait..." : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
