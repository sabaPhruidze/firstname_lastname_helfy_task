import "../styles/taskList.css";
import TaskItem from "./TaskItem";
import { useEffect, useRef } from "react";

const lerp = (current, target, factor) =>
  current * (1 - factor) + target * factor;

const TaskList = ({ tasks, onToggle, onDelete, onEdit }) => {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const firstSetRef = useRef(null);
  const secondSetRef = useRef(null);
  const frameRef = useRef(0);
  const lastTimeRef = useRef(0);
  const pauseRef = useRef(false);
  const moveRef = useRef({ current: 0, target: 0 });
  const widthRef = useRef(0);
  const animateRef = useRef(true);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const firstSet = firstSetRef.current;
    const secondSet = secondSetRef.current;

    if (!viewport || !track || !firstSet || !secondSet) return undefined;

    const speed = 58;
    const smooth = 0.12;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    moveRef.current.current = 0;
    moveRef.current.target = 0;
    pauseRef.current = false;
    lastTimeRef.current = 0;

    const updateSizes = () => {
      const width = firstSet.getBoundingClientRect().width || 0;
      const viewportWidth = viewport.getBoundingClientRect().width || 0;
      widthRef.current = width;

      const canAnimate =
        !reduceMotion.matches && width > 0 && width > viewportWidth + 10;

      animateRef.current = canAnimate;

      if (!canAnimate) {
        secondSet.style.display = "none";
        track.style.width = "100%";
        track.style.justifyContent = "center";
        firstSet.style.marginInline = "auto";
        moveRef.current.current = 0;
        moveRef.current.target = 0;
        track.style.transform = "translate3d(0, 0, 0)";
        return;
      }

      secondSet.style.display = "flex";
      track.style.width = "max-content";
      track.style.justifyContent = "flex-start";
      firstSet.style.marginInline = "0";
      moveRef.current.current = moveRef.current.current % width;
      moveRef.current.target = moveRef.current.current;
      track.style.transform = `translate3d(${moveRef.current.current - width}px, 0, 0)`;
    };

    const handleMotionChange = () => {
      updateSizes();
    };

    updateSizes();
    window.addEventListener("resize", updateSizes);
    reduceMotion.addEventListener("change", handleMotionChange);

    const loop = (time) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const dt = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      const width = widthRef.current;
      if (!width || !animateRef.current || pauseRef.current) {
        frameRef.current = requestAnimationFrame(loop);
        return;
      }

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

      track.style.transform = `translate3d(${moveRef.current.current - width}px, 0, 0)`;
      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", updateSizes);
      reduceMotion.removeEventListener("change", handleMotionChange);
      lastTimeRef.current = 0;
    };
  }, [tasks]);

  if (tasks.length === 0) {
    return <div className="empty-state">No tasks yet.</div>;
  }

  return (
    <div
      className="marquee"
      ref={viewportRef}
      aria-label="Scrolling task list"
      onMouseEnter={() => {
        pauseRef.current = true;
      }}
      onMouseLeave={() => {
        pauseRef.current = false;
      }}
      onFocusCapture={() => {
        pauseRef.current = true;
      }}
      onBlurCapture={() => {
        pauseRef.current = false;
      }}
    >
      <div className="marquee-track" ref={trackRef}>
        <ul
          className="marquee-set marquee-set-clone"
          ref={secondSetRef}
          aria-hidden="true"
        >
          {tasks.map((task, index) => (
            <TaskItem
              key={`b-${task.id}`}
              task={task}
              index={index}
              isClone
              onEdit={onEdit}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </ul>

        <ul className="marquee-set" ref={firstSetRef}>
          {tasks.map((task, index) => (
            <TaskItem
              key={`a-${task.id}`}
              task={task}
              index={index}
              onEdit={onEdit}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;
