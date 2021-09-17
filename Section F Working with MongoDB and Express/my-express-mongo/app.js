const express = require("express");
const studentsRoutes = require("./Routes/students");
const usersRoutes = require("./Routes/users");
const authRoutes = require("./Routes/auth");
const morgan = require("morgan");

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/my-express-mongo")
  .then((e) => console.log("connected to mongo db"))
  .catch((e) => console.error("couldn't connect to mongodb"));
const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/students", studentsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("hello from express");
});

const port = 3000;
app.listen(port, () => console.log(`listening on port ${3000}`));
