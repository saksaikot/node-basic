const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => console.log("connected to mongodb"))
  .catch((error) => console.error("couldn't connect to mongodb"));

const testSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  dob: Date,
  entryDate: { type: Date, default: Date.now },
  passed: Boolean,
  hobbies: [String],
  parents: {
    father: String,
    mother: String,
  },
  subject: [{ name: String, marks: { type: Number, min: 0, max: 100 } }],
});
