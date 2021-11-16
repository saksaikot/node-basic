const express = require("express");
require("express-async-errors");
const userRouter = require("./routers/users");
const app = express();

// const export app;

const cors = require("cors");
const morgan = require("morgan");

app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/user/", userRouter);
app.use("/api/category", require("./routers/category"));

app.use(require("./middlewares/errors"));
module.exports = app;
