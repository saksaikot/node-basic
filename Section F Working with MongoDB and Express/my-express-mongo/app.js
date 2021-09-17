const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
// console.log(process.env);
const express = require("express");
const studentsRoutes = require("./Routes/students");
const usersRoutes = require("./Routes/users");
const authRoutes = require("./Routes/auth");

const app = express();
app.use(express.json());
const { NODE_ENV } = process.env;
if (!NODE_ENV || NODE_ENV === "development") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
  console.log("in development mode");
}

app.use("/api/students", studentsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("hello from express");
});

module.exports = app;
