//@ts-check
const express = require("express");
const router = express.Router();
const { tasks, possiblePriorities } = require("./tasks_store");

router.put("/:id", (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  if (!Number.isFinite(id)) {
    return res.status(400).json({ message: "Incorrect task id." });
  }

  const task = tasks.find((eachTask) => eachTask.id === id);
  if (!task) {
    return res.status(404).json({ message: "Task id was not found." });
  }

  const { title, description, priority, completed } = req.body;
  const cleanTitle = typeof title === "string" ? title.trim() : "";
  if (!cleanTitle) {
    return res
      .status(400)
      .json({ message: "Title is empty. Please write a title." });
  }
  task.title = cleanTitle;

  const cleanDescription =
    typeof description === "string" ? description.trim() : "";
  if (!cleanDescription) {
    return res
      .status(400)
      .json({ message: "Description is empty. Please write a description." });
  }
  task.description = cleanDescription;

  if (!possiblePriorities.includes(priority)) {
    return res.status(400).json({ message: "Incorrect priority value." });
  }

  task.priority = priority;

  if (typeof completed === "boolean") {
    task.completed = completed;
  }

  return res.status(200).json(task);
});

router.delete("/:id", (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  if (!Number.isFinite(id)) {
    return res.status(400).json({ message: "Incorrect task id." });
  }

  const index = tasks.findIndex((each) => each.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "No task with this id." });
  }

  tasks.splice(index, 1);
  return res.status(200).json({ message: "Task was removed successfully." });
});

router.patch("/:id/toggle", (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  if (!Number.isFinite(id)) {
    return res.status(400).json({ message: "Incorrect task id." });
  }

  const task = tasks.find((eachTask) => eachTask.id === id);
  if (!task) {
    return res.status(404).json({ message: "Task id was not found." });
  }

  task.completed = !task.completed;
  return res.status(200).json(task);
});

module.exports = router;
