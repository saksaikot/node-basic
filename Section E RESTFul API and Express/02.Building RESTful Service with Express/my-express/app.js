const express = require("express");
const db = require("./db");
const studentsRoutes = require("./Routes/students");
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  req.body.app = "Node"; // add this property to all request
  next(); //then call next middleware
});
// app.use(express.static("public"));
app.use("/static", express.static("public"));
app.use("/api/students", studentsRoutes);
app.get("/", (req, res) => {
  res.send("hello from express");
});

const port = 3000;
app.listen(port, () => console.log(`listening on port ${3000}`));
