import "../styles/taskList.css";
import TaskItem from "./TaskItem";
const TaskList = ({ tasks, onToggle, onDelete, onEdit }) => {
  if (tasks.length === 0) {
    return <div className="empty-state">No tasks yet</div>;
  }

  return (
    <div className="carousel">
      <div className="track">
        <div className="set">
          {tasks.map((task) => (
            <TaskItem
              key={`abg-${task.id}`}
              task={task}
              onEdit={onEdit}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </div>
        <div className="set">
          {tasks.map((task) => (
            <TaskItem
              key={`bas-${task.id}`}
              task={task}
              onEdit={onEdit}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
