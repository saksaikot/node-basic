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

- # 05. Node Package Manager

  - 1. initializing node package
    - npm - Node Package Manager, node package repository, auto installed with node
    - address npmjs.com
    - node -v / node --version to get installed node version
    - npm -v to check installed npm version
    - npm i -g npm@6.14.5 , to install npm version 6.14.5 globally, i shorthand for install and -g shorthand for global
    - npm init to initialize npm project, this will ask some question about the project like project name, version,author etc,
    - npm init --yes / npm init -y to init the project with all default answer
  - 2. Installing packages and package dependency

    - will use date-format package
    - search date-format in npmjs.com
    - address https://www.npmjs.com/package/date-format
    - uses instruction is given in the documentation
    - `npm i date-format` to install date-format
    - under node_modules date-format file will be installed
    - there will also change in package.json, the date-format property will be added under dependency property
    - in package-lock.json, there will be package installation url
    - under node_modules folder inside date-format there is another package.json file, inside this if any other dependency package is needed that file is also be installed under node_modules folder
    - so after working on project and adding or install any packages will increase the size of node_modules folder

  - 3. using packages

    - require(''), lookup order:
      - first it will check built-in modules
      - then it will check any installed module in local node_modules folder
      - if we need to import our own module then we will use relative path of that file, "./relative_path/filename"
    - documentation address https://www.npmjs.com/package/date-format
    - to use the date-format module we use
      - `const dateFormat=require('date-format')`
      -

  - 4. Semantic Versioning
    - npm i // will install all required package that is in package.json file
    - npm list // will display the modules that is installed by npm
    - npm list // will also display the installed dependency
    - versioning
      - sample version values:`"date-format": "^3.0.0"`
      - the numbers are Major.Minor.Patch
      - this versioning process is called semantic versioning
      - bug fix is Patch update, it will increase Patch part by 1
      - old feature with new feature will update Minor version 1.1.1=>1.2.0
      - existing functionality change with added new feature,or the api is changed,then update major, 1.1.1->2.0.0
      - sign before version:
        - ^ Caret sign : will update to latest minor version // shorthand 1.x
        - ~ tilde [Teelda]: will update latest patched version // shorthand 1.1.x
        - 1.1.1 is exact version, is written without any sign
          - in npm => npm i react@15.1.1 to specify exact version
  - 5. DevDependencies and Global Package
  - 6. Updating and Uninstalling Packages
  - 7. Publishing Packages
