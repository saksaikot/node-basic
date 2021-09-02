const express = require("express");
const db = require("./db");
const studentsRoutes = require("./Routes/students");
const app = express();
app.use(express.json());
app.use("/api/students", studentsRoutes);
app.get("/", (req, res) => {
  res.send("hello from express");
});

const port = 3000;
app.listen(port, () => console.log(`listening on port ${3000}`));
