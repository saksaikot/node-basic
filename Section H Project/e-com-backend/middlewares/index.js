const cors = require("cors");
const morgan = require("morgan");
const express = require("express");

module.exports = (app) => {
  app.use(express.json());
  app.use(cors());
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }
};