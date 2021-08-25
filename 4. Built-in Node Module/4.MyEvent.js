const EventEmitter = require("events");

class MyEvent extends EventEmitter {
  emitLog() {
    this.emit("log");
  }
}
const events = new MyEvent();
module.exports = events;
