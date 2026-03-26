const express = require("express");
const cors = require("cors");
const staticRoutes = require("./routes/static_routes");
const dynamicRoutes = require("./routes/dynamic_routes");
const notFound = require("./middleware/not_found");
const errorHandler = require("./middleware/error_handler");
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use("/api/tasks", staticRoutes);
app.use("/api/tasks", dynamicRoutes);
app.get("/check", (_req, res) => {
  res.status(200).send("server runs");
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `Server is running on http://localhost:${PORT}/api/tasks`,
  );
});
