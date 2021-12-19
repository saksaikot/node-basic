const authGoggleRoutes = require("../routes/authGoogle");

module.exports = (app) => {
  app.use("/auth/google/", authGoggleRoutes);
};
