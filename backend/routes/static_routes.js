const express = require("express");
const router = express.Router();
const { tasks, possiblePriorities, getNewId } = require("./tasks_store");
// GET [START]

router.get("/", (_req, res) => {
  res.status(200).json(tasks);
});
// GET [END]
// POST [START]

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
  if (priority !== undefined && !possiblePriorities.includes(priority)) {
    return res.status(400).json({
      message: "Incorrect priority. use low,medium or high only",
    });
  }
  const correctPriority = priority ?? "low";
  const newTask = {
    id: getNewId(),
    title: checkTitle,
    description: checkDescriptionm,
    completed: false,
    createdAt: new Date().toISOString(),
    priority: correctPriority,
  };
  tasks.unshift(newTask);
  return res.status(201).json(newTask);
});
// POST [END]
module.exports = router;
