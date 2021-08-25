const events = require("./4.MyEvent");

events.on("log", () => console.log("log event"));
events.emitLog();
