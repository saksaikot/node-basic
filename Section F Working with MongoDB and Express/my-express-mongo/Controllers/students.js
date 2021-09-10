// const db = require("../db");
const { Student } = require("../models/Student");
const { of } = require("await-of");

const errorBadRequest = (res, { errors }) => {
  const message = [];
  for (const errorKey in errors) {
    message.push(errors[errorKey].message);
  }
  return res.status(400).send(message);
};
const errorNotFound = (res) => {
  return res.status(404).send("Resource not found!");
};
const remove = async (req, res) => {
  const id = +req.params.id;
  //const name = req.body.name;

  // const students = await db.getStudents();
  // const student = students.find((student) => student.id === id);
  // if (!student) return res.status(404).send("Student not found");
  // console.log("student from delete student", student);
  // const deleteResult = await db.deleteStudent(student);
  res.send(deleteResult);
};
const create = async (req, res) => {
  const studentName = req.body.name;
  const [saveResult, saveError] = await of(new Student(req.body).save());
  if (saveError) return errorBadRequest(res, saveError);
  res.send(saveResult);
};

const update = async (req, res) => {
  const id = +req.params.id;
  const name = req.body.name;

  // const students = await db.getStudents();
  // const student = students.find((student) => student.id === id);
  // if (!student) res.status(404).send("Student not found");

  // const insertResult = await db.updateStudent({ name, id });
  // res.send(insertResult);
};
const list = async (req, res) => {
  const [students] = await of(Student.find().sort({ name: 1 }));
  res.send(students);
};
const item = async (req, res) => {
  const [findStudent, findStudentError] = await of(
    Student.findById(req.params.id)
  );
  if (findStudentError || !findStudent) return errorNotFound(res);
  res.send(findStudent);
};

module.exports = {
  list,
  item,
  update,
  create,
  remove,
};
