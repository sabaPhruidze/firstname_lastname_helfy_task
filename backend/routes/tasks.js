const express = require("express");
const router = express.Router();

// tasks GET [START]
let tasks = [];

router.get("/", (_req, res) => {
  res.status(200).json(tasks);
});
// tasks GET [END]
// tasks POST [START]
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
// tasks POST [END]
module.exports = router;
