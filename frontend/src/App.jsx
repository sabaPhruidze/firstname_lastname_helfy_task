import "./App.css";
import { useEffect, useMemo, useState } from "react";
import {
  getTasks,
  postTask,
  deleteTask,
  patchTask,
  putTask,
} from "./services/api";
import TaskFilter from "./components/TaskFilter";
import TaskForm from "./components/TaskForm";
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
        setError(e.message || "Could not load tasks.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) => {
        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
        return true;
      }),
    [tasks, filter],
  );

  const totalCount = tasks.length;
  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = totalCount - completedCount;
  const highPriorityCount = tasks.filter((task) => task.priority === "high").length;

  const createTask = async (payload) => {
    try {
      setSaving(true);
      setError("");
      const createdTask = await postTask(payload);
      setTasks((prev) => [createdTask, ...prev]);
    } catch (e) {
      setError(e.message || "Could not create task.");
    } finally {
      setSaving(false);
    }
  };

  const toggleTask = async (id) => {
    try {
      setError("");
      const updated = await patchTask(id);
      setTasks((prev) => prev.map((task) => (task.id === id ? updated : task)));
    } catch (e) {
      setError(e.message || "Could not update task status.");
    }
  };

  const handleDelete = async (id) => {
    try {
      setError("");
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (e) {
      setError(e.message || "Could not delete task.");
    }
  };

  const startEdit = (task) => {
    setEditTask(task);
  };

  const cancelEdit = () => {
    setEditTask(null);
  };

  const updateTask = async (payload) => {
    if (!editTask) return;

    try {
      setUpdating(true);
      setError("");
      const updated = await putTask(editTask.id, payload);
      setTasks((prev) =>
        prev.map((task) => (task.id === updated.id ? updated : task)),
      );
      setEditTask(null);
    } catch (e) {
      setError(e.message || "Could not update task.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="app-shell">
      <div className="bg-blob bg-blob-a" />
      <div className="bg-blob bg-blob-b" />

      <div className="app">
        <header className="hero">
          <div>
            <p className="eyebrow">Productivity Workspace</p>
            <h1 className="app-title">Task Manager</h1>
            <p className="hero-text">
              Track, prioritize, and complete your work from one focused board.
            </p>
          </div>

          <div className="stats-grid">
            <article className="stat-card">
              <p className="stat-label">Total</p>
              <p className="stat-value">{totalCount}</p>
            </article>
            <article className="stat-card">
              <p className="stat-label">Completed</p>
              <p className="stat-value">{completedCount}</p>
            </article>
            <article className="stat-card">
              <p className="stat-label">Pending</p>
              <p className="stat-value">{pendingCount}</p>
            </article>
            <article className="stat-card">
              <p className="stat-label">High Priority</p>
              <p className="stat-value">{highPriorityCount}</p>
            </article>
          </div>
        </header>

        {loading ? <div className="banner">Loading tasks...</div> : null}
        {error ? <div className="banner banner-error">{error}</div> : null}

        <section className="panel">
          <TaskFilter
            value={filter}
            onChange={setFilter}
            counts={{
              all: totalCount,
              completed: completedCount,
              pending: pendingCount,
            }}
          />

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
            <TaskForm onSubmit={createTask} loading={saving} key="create" />
          )}
        </section>

        <section className="panel">
          <div className="section-head">
            <h2 className="section-title">Tasks</h2>
            <p className="muted">
              Showing <strong>{filteredTasks.length}</strong> of{" "}
              <strong>{totalCount}</strong> ({filter})
            </p>
          </div>

          {filteredTasks.length === 0 ? (
            <p className="empty-message">
              No tasks in this filter. Create one from the form above.
            </p>
          ) : (
            <TaskList
              tasks={filteredTasks}
              onToggle={toggleTask}
              onDelete={handleDelete}
              onEdit={startEdit}
            />
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
