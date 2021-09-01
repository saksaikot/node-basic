const express = require("express");
const db = require("./db");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from express");
});

app.get("/api/students", async (req, res) => {
  const students = await db.getStudents();
  res.send(JSON.stringify(students));
});

app.post("/api/students", async (req, res) => {
  const studentName = req.body.name;
  const result = await db.insertStudent(studentName);
  res.send(result);
});
const port = 3000;
app.listen(port, () => console.log(`listening on port ${3000}`));
