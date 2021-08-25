const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("event1", () => console.log("event1 called"));

emitter.emit("event1");
