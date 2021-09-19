const express = require("express");
const authorize = require("../middlewares/authorize.js");
const controller = require("../Controllers/students");
const Router = express.Router();
// console.log(authorize, "authorize");
Router.route("/").get([authorize], controller.list).post(controller.create);

Router.route("/:id")
  .get(controller.item)
  .put(controller.update)
  .delete(controller.remove);

module.exports = Router;
