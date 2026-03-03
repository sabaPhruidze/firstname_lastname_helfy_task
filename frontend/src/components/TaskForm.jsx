import { useState } from "react";

const possiblePriorities = ["low", "medium", "high"];
const TaskForm = ({ onSubmit, loading }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title: title,
      description: description,
    });
    console.log(title, description);
  };
  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Task</h3>
      {error ? <p>{error}</p> : ""}
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Please wait..." : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
