const express = require("express");
const controller = require("../Controllers/students");
const Router = express.Router();

Router.route("/").get(controller.list).post(controller.create);

Router.route("/:id")
  .get(controller.item)
  .put(controller.update)
  .delete(controller.remove);

module.exports = Router;
