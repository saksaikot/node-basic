const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("hello from express");
});

app.get("/students", (req, res) => {
  const students = ["rahim", "karim"];
  res.send(JSON.stringify(students));
});
app.listen(3000, () => console.log("listening on port 3000"));
