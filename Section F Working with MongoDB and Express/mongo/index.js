const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => console.log("connected to mongodb"))
  .catch((error) => console.error("couldn't connect to mongodb"));
