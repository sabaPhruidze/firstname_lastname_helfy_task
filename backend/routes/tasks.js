//@ts-check
const express = require("express");
const router = express.Router();

// GET [START]
let tasks = [];

router.get("/", (_req, res) => {
  res.status(200).json(tasks);
});
// GET [END]
// POST [START]
const possiblePriorities = ["low", "medium", "high"];
let newId = 1;
router.post("/", (req, res) => {
  const { title, description, priority } = req.body;
  const checkTitle = typeof title === "string" ? title.trim() : "";
  if (!checkTitle) {
    return res
      .status(400)
      .json({ message: "title is emtpy. please write the title" });
  }
  const checkDescriptionm =
    typeof description === "string" ? description.trim() : "";
  if (!checkDescriptionm) {
    return res
      .status(400)
      .json({ message: "description is emtpy. please write the description" });
  }
  const checkPriority = possiblePriorities.includes(priority)
    ? priority
    : "low";

  const newTask = {
    id: newId,
    title: checkTitle,
    description: checkDescriptionm,
    completed: false,
    createdAt: new Date().toISOString(),
    priority: checkPriority,
  };
  tasks.unshift(newTask);
  newId += 1;
  return res.status(201).json(newTask);
});
// POST [END]
// PUT [START]
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (!Number.isFinite(id)) {
    return res.status(400).json({ message: "incorrect task id" });
  }
  const task = tasks.find((eachTask) => eachTask.id === id);
  if (!task) {
    return res.status(404).json({ mesge: "incorrect id" });
  }
  // repeated this part from post [START]
  const { title, description, priority, completed } = req.body;

  const checkTitle = typeof title === "string" ? title.trim() : "";
  if (!checkTitle) {
    return res
      .status(400)
      .json({ message: "title is emtpy. please write the title" });
  }
  task.title = checkTitle;
  const checkDescription =
    typeof description === "string" ? description.trim() : "";
  if (!checkDescription) {
    return res
      .status(400)
      .json({ message: "description is emtpy. please write the description" });
  }
  task.description = checkDescription;
  const checkPriority = possiblePriorities.includes(priority)
    ? priority
    : "low";
  task.priority = checkPriority;
  // repeated this part from post [END]
  if (typeof completed === "boolean") {
    task.completed === completed;
  }
  return res.status(200).json(task);
});
// PUT [END]

module.exports = router;
