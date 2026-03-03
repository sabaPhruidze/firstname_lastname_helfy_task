const express = require("express");
const cors = require("cors");
const routes = require("./routes/tasks");
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use("/api/tasks", routes);
app.get("/check", (_req, res) => {
  res.status(200).send("server runs");
});

app.listen(PORT, () => {
  console.log(
    `server runs succesfully on this link: http://localhost:${PORT}/api/tasks`,
  );
});
