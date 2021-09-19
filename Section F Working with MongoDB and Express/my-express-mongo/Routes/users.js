const express = require("express");
const controller = require("../Controllers/users");
const authorize = require("../middlewares/authorize.js");

const Router = express.Router();

Router.route("/")
  // .get(controller.list)
  .post(controller.create);
Router.route("/me").get([authorize], controller.me);
// Router.route("/:id")
//   .get(controller.item)me
//   .put(controller.update)
//   .delete(controller.remove);

module.exports = Router;
