const mongoose = require("mongoose");
const { Schema, model } = mongoose;

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => console.log("connected to mongodb"))
  .catch((error) => console.error("couldn't connect to mongodb"));

const studentSchema = Schema({
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

const Student = model("Student", studentSchema);

const newStudent = new Student({
  firstName: "Karim",
  lastName: "Sarkar",
  dob: new Date("21 April 1996"),
  passed: true,
  hobbies: ["traveling"],
  parents: {
    father: "A",
    mother: "B",
  },
  subject: [
    { name: "Math", marks: 79 },
    { name: "English", marks: 84 },
  ],
});

newStudent.save().then((data) => console.log(data));
