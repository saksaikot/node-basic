const express = require("express");

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
module.exports = app;
