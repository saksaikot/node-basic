const fs = require("fs");

const getStudents = () => {
  return new Promise((resolve, reject) => {
    fs.readFile("./db.json", "utf-8", (err, data) => {
      resolve(JSON.parse(data));
    });
  });
};

const insertStudent = (studentName) => {
  return new Promise(async (resolve, reject) => {
    const students = await getStudents();
    const student = { name: studentName, id: students.length + 1 };
    students.push(student);
    fs.writeFile("./db.json", JSON.stringify(students), (error) => {
      resolve(student);
    });
  });
};

module.exports = {
  getStudents,
  insertStudent,
};
