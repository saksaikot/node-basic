const fs = require("fs");

const getStudents = (filter = true) => {
  return new Promise((resolve, reject) => {
    fs.readFile("./db.json", "utf-8", (err, data) => {
      const dbData = JSON.parse(data);
      if (filter)
        resolve(JSON.parse(data).filter((student) => student.deleted !== 1));
      else {
        resolve(JSON.parse(data));
      }
    });
  });
};

const writeStudents = (students) => {
  return new Promise((resolve, reject) => {
    fs.writeFile("./db.json", JSON.stringify(students), (error) => {
      resolve(students);
    });
  });
};

const insertStudent = (studentName) => {
  return new Promise(async (resolve, reject) => {
    const students = await getStudents(false);
    const student = { name: studentName, id: students.length + 1 };
    students.push(student);
    await writeStudents(students);
    resolve(student);
  });
};

const updateStudent = (student) => {
  return new Promise(async (resolve, reject) => {
    const students = await getStudents();
    const findIndex = students.findIndex((s) => s.id === student.id);
    students[findIndex] = student;
    await writeStudents(students);
    resolve(student);
  });
};
const deleteStudent = (student) => {
  return new Promise(async (resolve, reject) => {
    const students = await getStudents(false);
    const findIndex = students.findIndex((s) => s.id === student.id);
    students[findIndex].deleted = 1;
    await writeStudents(students);
    resolve(student);
  });
};

module.exports = {
  getStudents,
  insertStudent,
  updateStudent,
  deleteStudent,
};
