import "../styles/taskList.css";
import TaskItem from "./TaskItem";
import { useEffect, useRef } from "react";

const lerp = (current, target, factor) =>
  current * (1 - factor) + target * factor;

const TaskList = ({ tasks, onToggle, onDelete, onEdit }) => {
  const trackRef = useRef(null);
  const firstSetRef = useRef(null);
  const secondSetRef = useRef(null);

  const moveRef = useRef({ current: 0, target: 0 });
  const setWidthRef = useRef(0);
  const frameRef = useRef(0);
  const lastRef = useRef(0);
  const pauseRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    const firstSet = firstSetRef.current;
    const secondSet = secondSetRef.current;

    if (!track || !firstSet || !secondSet) return;

    const direction = -1;
    const speed = 60;
    const smooth = 0.12;

    const updateSizes = () => {
      const width = firstSet.getBoundingClientRect().width || 0;
      setWidthRef.current = width;

      if (width > 0) {
        secondSet.style.left = `${width * -direction}px`;
        moveRef.current.current = moveRef.current.current % width;
        moveRef.current.target = moveRef.current.current;
        track.style.transform = `translate3d(${moveRef.current.current * direction}px, 0, 0)`;
      }
    };

    updateSizes();
    window.addEventListener("resize", updateSizes);

    const loop = (time) => {
      if (!lastRef.current) lastRef.current = time;
      const dt = (time - lastRef.current) / 1000;
      lastRef.current = time;

      const width = setWidthRef.current;
      if (!width) {
        frameRef.current = requestAnimationFrame(loop);
        return;
      }

      if (!pauseRef.current) {
        moveRef.current.target += speed * dt;
        moveRef.current.current = lerp(
          moveRef.current.current,
          moveRef.current.target,
          smooth,
        );

        if (moveRef.current.current >= width) {
          moveRef.current.current -= width;
          moveRef.current.target -= width;
        }

        track.style.transform = `translate3d(${moveRef.current.current * direction}px, 0, 0)`;
      }

      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", updateSizes);
      lastRef.current = 0;
    };
  }, [tasks.length]);

  if (tasks.length === 0) {
    return <div className="empty-state">No tasks yet</div>;
  }

  return (
    <div
      className="carousel"
      onMouseEnter={() => (pauseRef.current = true)}
      onMouseLeave={() => (pauseRef.current = false)}
    >
      <div className="track" ref={trackRef}>
        <div className="set" ref={firstSetRef}>
          {tasks.map((task) => (
            <TaskItem
              key={`a-${task.id}`}
              task={task}
              onEdit={onEdit}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </div>

        <div className="set set-clone" ref={secondSetRef}>
          {tasks.map((task) => (
            <TaskItem
              key={`b-${task.id}`}
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
