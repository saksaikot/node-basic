const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
var bodyParser = require("body-parser");

module.exports = (app) => {
  app.use(express.urlencoded({ extended: false }));
  // app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(cors());

  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }
};
