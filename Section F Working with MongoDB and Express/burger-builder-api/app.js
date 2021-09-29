const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
// console.log(process.env);
const express = require("express");

const app = express();
app.use(express.json());
const { NODE_ENV } = process.env;
if (!NODE_ENV || NODE_ENV === "development") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
  console.log("in development mode");
}

app.get("/", (req, res) => {
  res.send("hello from express");
});

module.exports = app;
