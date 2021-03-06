const authGoggleRoutes = require("../routes/authGoogle");
const express = require("express");
module.exports = (app) => {
  app.use("/auth/google/", authGoggleRoutes);
  app.use("/api/photos", require("../routes/photos"));
  app.use("/", express.static("public"));
};
