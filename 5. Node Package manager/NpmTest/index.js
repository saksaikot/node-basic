const dateFormat = require("date-format");

const timeString = dateFormat.asString("hh:mm:ss.SSS", new Date());
console.log(timeString);
