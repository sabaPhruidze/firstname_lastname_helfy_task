//@ts-check
const express = require("express");
const router = express.Router();
const { tasks, possiblePriorities } = require("./tasks_store");
// PUT [START]
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (!Number.isFinite(id)) {
    return res.status(400).json({ message: "incorrect task id" });
  }
  const task = tasks.find((eachTask) => eachTask.id === id);
  if (!task) {
    return res.status(404).json({ message: "incorrect id" });
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
  if (!possiblePriorities.includes(priority)) {
    return res.status(400).json({ message: "written incorrect priority" });
  }
  task.priority = priority;
  // repeated this part from post [END]
  if (typeof completed === "boolean") {
    task.completed = completed;
  }
  return res.status(200).json(task);
});
// PUT [END]
// DELETE [START]
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (!Number.isFinite(id)) {
    return res.status(400).json({ message: "incorrect task id" });
  }
  const index = tasks.findIndex((each) => each.id === id); //if no = than -1;
  if (index === -1) {
    return res.status(404).json({ message: "No task with this id" });
  }
  tasks.splice(index, 1);
  return res.status(200).json({ message: "succesfully removed task" });
});
// DELETE [END]
// PATCH [START]
router.patch("/:id/toggle", (req, res) => {
  const id = parseInt(req.params.id);
  if (!Number.isFinite(id)) {
    return res.status(400).json({ message: "incorrect task id" });
  }
  const task = tasks.find((eachTask) => eachTask.id === id);
  if (!task) {
    return res.status(404).json({ message: "incorrect id" });
  }
  task.completed = !task.completed;
  return res.status(200).json(task);
});
// PATCH [END]
module.exports = router;
