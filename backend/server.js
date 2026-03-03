const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get("/check", (_req, res) => {
  res.status(200).send("server runs");
});
// tasks GET & POST [START]
let tasks = [
  {
    id: 1,
    title: "dance",
    description: "1 hour dance results",
    completed: true,
    createdAt: new Date().toISOString(),
    priority: "low",
  },
];

app.get("/api/tasks", (_req, res) => {
  res.status(200).json(tasks);
});
// tasks GET & POST [END]
app.listen(PORT, () => {
  console.log(
    `server runs succesfully on this link: http://localhost:${PORT}/api/tasks`,
  );
});
