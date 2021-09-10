const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { of } = require("await-of");

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

const newStudentObject = {
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
};

// create
const createStudent = async (student) => {
  const newStudent = new Student(student);
  const [saved, error] = await of(newStudent.save());
  if (error) return console.log(error);
  console.log("data saved", saved);
};
// createStudent(newStudentObject);

// R-Read

const readStudent = async () => {
  const [students, error] = await of(
    Student.find().select("firstName lastName").limit(4).sort({ firstName: -1 })
  );
  if (error) return console.log(error);
  console.log("result", students);
};

// readStudent();

const updateStudent = async (id, updateObject) => {
  const [updateResult, updateError] = await of(
    Student.updateOne(
      { _id: id },
      {
        $set: updateObject,
      }
    )
  );

  if (updateError) return console.error(`There was this error: `, updateError);
  console.log(`Update successfully, result`, updateResult);
};

// updateStudent("613a12a035240311bc9eb527", { passed: false });

const deleteStudent = async (id) => {
  const [deleteResult, deleteError] = await of(Student.deleteOne({ _id: id }));

  if (deleteError) return console.error(`There was this error: `, deleteError);
  console.log(`Delete successfully, result`, deleteResult);
};

deleteStudent("613a5c56781af74eee88a81b");
