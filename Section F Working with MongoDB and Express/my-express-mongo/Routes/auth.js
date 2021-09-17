const express = require("express");
const controller = require("../Controllers/auth");
const Router = express.Router();

Router.route("/").post(controller.create);

module.exports = Router;
