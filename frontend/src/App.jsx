import "./App.css";
import { useEffect, useState } from "react";
import { getTasks, postTask } from "./services/api";
import TaskFilter from "./components/TaskFilter";
import TaskForm from "./components/TaskForm";
function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [filter, setFilter] = useState("all");
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getTasks();
        setTasks(data);
      } catch (e) {
        setError(e.message || "Error, can not fetch the taskss");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);
  const filteredTasks = tasks.filter((task) => {
    if (Object.is(filter, "completed")) return task.completed;
    if (Object.is(filter, "pending")) return !task.completed;
    return true; // for returning all
  });
  const createTasks = async (payload) => {
    try {
      setSaving(true);
      setError("");
      const create = await postTask(payload);
      setTasks((prev) => [create, ...prev]); // for the order
    } catch (e) {
      setError(e.message || "error can not create task");
    } finally {
      setSaving(false);
    }
  };
  if (loading) return <div>tasks will be presented soon...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div>
      <h1>Task manager</h1>
      <TaskFilter value={filter} onChange={setFilter} />
      <TaskForm onSubmit={createTasks} loading={saving} />
      <p>filter: {filter}</p>
      {tasks.length === 0 ? (
        <p>No tasks added yet</p>
      ) : (
        <ul>
          {filteredTasks.map((task) => (
            <li key={task.id}>
              {task.title} , {task.priority} ,{" "}
              {task.completed ? "Done" : "Pending..."}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
