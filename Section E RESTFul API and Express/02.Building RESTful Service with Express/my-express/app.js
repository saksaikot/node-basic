const express = require("express");
const fs = require("fs");

const app = express();

app.get("/", (req, res) => {
  res.send("hello from express");
});

app.get("/api/students", (req, res) => {
  fs.readFile("./db.json", "utf-8", (err, data) => {
    const students = JSON.parse(data).students;
    res.send(JSON.stringify(students));
  });
});
app.listen(3000, () => console.log("listening on port 3000"));
