import "./App.css";
import { useEffect, useState } from "react";
import {
  getTasks,
  postTask,
  deleteTask,
  patchTask,
  putTask,
} from "./services/api";
import TaskFilter from "./components/TaskFilter";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import TaskList from "./components/TaskList";
function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [saving, setSaving] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [updating, setUpdating] = useState(false);
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
  const toggleTasks = async (id) => {
    try {
      setError("");
      const updated = await patchTask(id);
      setTasks((prev) => prev.map((task) => (task.id === id ? updated : task)));
    } catch (e) {
      setError(e.message || "Error can not toggle tasks");
    }
  };
  const handleDelete = async (id) => {
    try {
      setError("");
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (e) {
      setError(e.message || "Error can not delete task");
    }
  };
  const startEdit = (task) => setEditTask(task);
  const cancelEdit = () => setEditTask(null);
  const updateTask = async (payload) => {
    if (!editTask) return;
    setEditTask(null);
    try {
      setUpdating(true);
      setError("");
      const updated = await putTask(editTask.id, payload);
      setTasks((prev) =>
        prev.map((task) => (task.id === updated.id ? updated : task)),
      );
    } catch (e) {
      setError(e.message || "Error can noty delete task");
    } finally {
      setUpdating(false);
    }
  };
  if (loading) return <div>tasks will be presented soon...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div>
      <h1>Task manager</h1>
      <TaskFilter value={filter} onChange={setFilter} />
      {editTask ? (
        <TaskForm
          key={editTask.id}
          mode="edit"
          values={editTask}
          onSubmit={updateTask}
          cancel={cancelEdit}
          loading={updating}
        />
      ) : (
        <TaskForm onSubmit={createTasks} loading={saving} key="create" />
      )}
      <p>filter: {filter}</p>
      {filteredTasks.length === 0 ? (
        <p>No tasks added yet</p>
      ) : (
        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTasks}
          onDelete={handleDelete}
          onEdit={startEdit}
        />
      )}
    </div>
  );
}

export default App;
