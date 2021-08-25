const fs = require("fs");

const readmeTxt = fs.readFileSync("./1.readme.txt", "utf-8");
fs.writeFileSync(
  "./1.readmeModified.txt",
  `Modified by nodeJs Original text was \n ${readmeTxt}`
);
