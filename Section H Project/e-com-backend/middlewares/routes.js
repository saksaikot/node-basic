module.exports = (app) => {
  app.use("/api/user/", require("../routers/users"));
  app.use("/api/category", require("../routers/category"));
  app.use("/api/product", require("../routers/product"));
};
