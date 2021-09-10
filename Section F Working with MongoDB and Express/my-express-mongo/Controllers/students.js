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
  const [deleteResult, deleteError] = await of(
    Student.findByIdAndDelete(req.params.id)
  );
  if (deleteError || !deleteResult) return errorNotFound(res);
  res.send(deleteResult);
};
const create = async (req, res) => {
  const studentName = req.body.name;
  const [saveResult, saveError] = await of(new Student(req.body).save());
  if (saveError) return errorBadRequest(res, saveError);
  res.send(saveResult);
};

const update = async (req, res) => {
  const [updateResult, updateError] = await of(
    Student.findByIdAndUpdate(req.params.id, req.body, { new: true })
  );
  if (updateError || !updateResult) return errorNotFound(res);
  res.send(updateResult);
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
