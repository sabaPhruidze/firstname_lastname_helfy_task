import "./App.css";
import { useEffect, useState } from "react";
import { getTasks } from "./services/api";
function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

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
  if (loading) return <div>tasks will be presented soon...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div>
      <h1>Task manager</h1>
      {tasks.length === 0 ? (
        <p>No tasks added yet</p>
      ) : (
        <ul>
          {tasks.map((task) => (
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
