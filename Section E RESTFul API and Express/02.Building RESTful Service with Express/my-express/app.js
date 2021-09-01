const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from express");
});

app.get("/api/students", (req, res) => {
  fs.readFile("./db.json", "utf-8", (err, data) => {
    const students = JSON.parse(data).students;
    res.send(JSON.stringify(students));
  });
});

app.post("/api/students", (req, res) => {
  fs.readFile("./db.json", "utf-8", (err, data) => {
    const db = JSON.parse(data);
    const name = req.body.name;
    console.log("name", name);
    const student = { name, id: db.students.length + 1 };
    db.students.push(student);
    fs.writeFile("./db.json", JSON.stringify(db), (error) => {
      res.send(student);
    });
  });
});
app.listen(3000, () => console.log("listening on port 3000"));
