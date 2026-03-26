const express = require("express");
const router = express.Router();
const { tasks, possiblePriorities, getNewId } = require("./tasks_store");

router.get("/", (_req, res) => {
  res.status(200).json(tasks);
});

router.post("/", (req, res) => {
  const { title, description, priority } = req.body;
  const cleanTitle = typeof title === "string" ? title.trim() : "";
  if (!cleanTitle) {
    return res
      .status(400)
      .json({ message: "Title is empty. Please write a title." });
  }

  const cleanDescription =
    typeof description === "string" ? description.trim() : "";
  if (!cleanDescription) {
    return res
      .status(400)
      .json({ message: "Description is empty. Please write a description." });
  }

  if (priority !== undefined && !possiblePriorities.includes(priority)) {
    return res.status(400).json({
      message: "Incorrect priority. Use low, medium or high only.",
    });
  }

  const correctPriority = priority ?? "low";
  const newTask = {
    id: getNewId(),
    title: cleanTitle,
    description: cleanDescription,
    completed: false,
    createdAt: new Date().toISOString(),
    priority: correctPriority,
  };

  tasks.unshift(newTask);
  return res.status(201).json(newTask);
});

module.exports = router;
