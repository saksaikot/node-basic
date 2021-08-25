# Node basic

- # Node module system

  - browser have a global window object, console.log and any function created with function keyword are in global but node use global object to store global property. By default function declared in node js file in included in global object

  - all js files are module and have module property which is used to export and import file
  - module have exports property, we can assign object or function in this module.exports property to export the functionality of that js file
  - to import js file we need to use require method with the file name with path. ie: require("./filename") or require("./filename.js")
  - the imported require method will return same data that was assigned in module.exports in that file

- # 4. Built in Node Module

  - documentation https://nodejs.org/dist/latest-v16.x/docs/api/
  - to import filesystem we use `require('fs')` by convention we store it in `const fs=require('fs')`
    - fs.readFileSync("fileNameWithPath","file-encoder")
    - fs.writeFileSync("fileNameWithPath", StringToWrite);
  - Events

    - module name events
    - it returns a class
    - by convention we store it in `EventEmitter`
    - then we make an object `const emitter= new EventEmitter()`;
    - to add a listener we called it on method which takes the event name and a callback function
    - `emitter.on("event1",()=>console.log("event1 called"))`
    - to trigger event we use `emitter.emit("event name")`;
    - to use event we can extends EvenEmitter class then we can export the object

      ```js
      const EventEmitter = require("events");
      class MyEvent extends EventEmitter {
        emitLog() {
          this.emit("log");
        }
      }
      const events = new MyEvent();
      module.exports = events;
      ```

    - using http module: import `http` module,then use `createServer` method to create server, create server needs a `handler function` which takes `request` and `response` as parameters.then match `request.url`, then if matched use `response.write()` to write response then use `response.end()` to send the response, then listen to desire port `server.listen(port)` ;

      ```js
      const http = require("http");

      const server = http.createServer(serverHandler);

      server.listen(3000, () => console.log("listening on port 3000"));
      function serverHandler(request, response) {
        switch (request.url) {
          case "/":
            response.write("hello nodeJs Server");
            return response.end();
          case "/users":
            const users = [{ name: "user1" }, { name: "user2" }];
            response.write(JSON.stringify(users));
            return response.end();
          default:
            response.write("404 not found");
            return response.end();
        }
      }
      ```
