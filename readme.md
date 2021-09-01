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
    - dev dependency is used when we need the package while developing not while running the app
    - to install package as dev dependency we use `npm i package-name --save-dev`
    - package will be saved under dedDependency property
    - some package needs to be installed globally, ie: nodemon is a global package of npm, it helps to reload development server after code change
    - the flag for global package is `-g` or `--global`
    - `npm list -g` to view globally installed packages
    - root option will show the root of the app `npm root`
    - `npm root -g` will show the root of global package
  - 6. Updating and Uninstalling Packages
    - `npm outdated` will show packages updatable information like current version, wanted latest version and actual latest version
    - `npm update` will update package if it updatable
    - for global packages
      - `npm outdated -g`
      - `npm update -g`
    - to uninstall package use npm `uninstall` or `un` then package name, if the package is global then add `-g` flag
  - 7. Publishing Packages
    - `npm adduser` to register to npmjs
    - `npm login` to login to npmjs
    - then make sure the package name in unique in npmjs to check for package name use `npm search package-name`, and have a index.js with `module.exports`
    - then `npm publish` to publish, must verify email address before publish
    - `npm version major|minor|patch` will update the version, or we can manually update package.json

- # 06. Version Control with git

  - # 1. Setting Up Git
    - version controlling system keep tracks of file modification and can revert changes and helps managing a project including multiple person developing same project
    - install git from https://git-scm.com/downloads
    - just stick to default is enough
    - to check if git is installed `git --version`
    - then add few config to configure git
    - `git config --global user.name "Name Of The User"`
    - `git config --global user.email github@user.email`
    - `git config --list` to see all configs
  - # 2. Git Commit

    - to initialize git `git init`
    - `git status` to check the status
    - untracked file is also called unstaged file
    - to add changed file into staged file use `git add filename1 filename2 ...` or `git add .`
    - `git commit -m"commit message"` to make a new point
    - `git log` git detail log
    - `git log --oneline` git log in oneline // sort version
    - head works like cursor pointer in a text editor, where the head is pointing the files will be on that version

  - # 3. More Git Commands
    - `git checkout commit-id filename` to see that old committed file
    - `git checkout -- filename.ext` to revert to the latest file version
    - use a `.gitignore` file to list any files or directory to ignore from git, it help full for ignoring dependency that can be installed from file, any build directory, or any log file that is not mandatory for project.
    - # we must specify gitignore before a commit, any listed file that is already committed will not be ignore
    - for only filename we use just `filename.ext`
    - for directory we use forward slash '/' `/ignore-directory-name`
    - 'node_modules' is an example we can ignore it in gitignore `/node_modules`
  - # 4. Online Git Repositories
    - git is a version controlling system, while github provide online or cloud version of git system.

- # 07. ES6 Refresher

  - # 1. let and const

    - var and let

      - var is function scoped and let is block scoped
      - var has Hoisted, or it can be used before declaration
      - ```js
        x = 5;

        var x;
        ```

      - let is not hoisted, variable declared in let cant be used before
      - const is same as let but cannot be reassigned
      - `const a=20;` then we cannot do `a=10`
      - const array and object can be modified though

  - # 2. Arrow Function

    - arrow functions are bind this where it created but normal functions are not bind this property
    - syntax
      ```js
      ()=>1;
      // is same as
      function(){
        return 1
      }
      // if there is only one parameter we can ignore the first bracket pair
      number=>number*2;
      //is same as
      function (number){
        return number*2;
      }
      ()=>({
        name:1,
        id:2
      })
      //is same as
      function (){
        return {
          .....
        }
      }
      // if there is other statement inside function block then we need to use curly brackets
      ()=>{
        let random=Math.random();
        return random;
      }
      ```

  - # 3. Class

    - class example

    ```js
    class MyClass {
      madeIn = "Bangladesh"; // this is new feature it will automatically add to constructor function
      // a constructor function is method of class which get called when a new object is created using the class

      constructor(color, passenger) {
        this.color = color; // here this is referred to the object
        this.passenger = passenger;
      }
      whatColor() {
        console.log(this.color);
      }
    }

    class MyEnhancedClass extends MyClass {
      constructor(modelName, color, passenger) {
        super(color, passenger); // must call super inside derivate class constructor, also need to supply super class constructor argument or else those will be empty
        this.modelName = modelName;
      }
    }
    ```

  - # 4. Spread and Rest Operator
    - Spread operator, ... before array or object name. it will make the array or object flat one level, like ...[1,2,3] will be 1,2,3 no array
    - ie: array=[1,2,3] , newArray=[...array,4,5,6];// result will be newArray=[1,2,3,4,5,6];
    - it will work same on object
    - rest operator/parameter, The rest parameter syntax allows a function to accept an indefinite number of arguments as an array, providing a way to represent variadic functions in JavaScript.
    - (number1,number2,...rest)// then any other argument send to this function other then number1 and number2 will be in rest array, rest is variable name, so this name can be any name, also number1 and number2 is not mandatory
  - # 5. Destructing
    - ie array=[1,2,3]; const [a,b,c]=array; or , const [a,b]=array; or const [a,,c]=array; or object={name:"rahat"}, const {name}=object
  - # 6. Array mapping
    -
    ```js
    const numbers = [1, 2, 3, 4];
    const squares = numbers.map((number) => number * number);
    ```

- # 8. Asynchronous NodeJs Callback

  - # 1. Asynchronous Pattern

    - synchronous or blocking pattern, waits for statement to be finished
    - asynchronous or non blocking pattern, does not wait for a statement to finished, we need it when we works with any io, ie: fetching data from db.

  - # 2. Callback Function

    - sync approach:

      ```js
      const students=getStudents();
      console.log(students);// here students is undefined
      // mock function to get data from db
      function getStudents(){
        console.log("getting data from db");
        return setTimeout(()=>{name:"rahim",id:1},500);
      }

      ```

    - the problem with this approach is js uses non-blocking or async pattern by default.it will not wait for setTimeout function to be finished. thats why students will have a undefined value.
    - to solve this problem we can use a callback function, when a function accept another function as parameter is call callback function. here inside setTimeout the function is used is a callback function.
    - async approach:

      ```js
      getStudents((students)=>console.log(students);
      function getStudents(callback){
        setTimeout(()=>callback({name:"rahim",id:1}),500);

      }

      ```

  - # 3. callback hell

    - this happens when we need to wait for some data, and based on that data if we need to again use any i/o intensive work or get data from a db then we need to use the callback again. this will become very complex in no time. this callback inside a callback approach is called callback hell. there can be many callback inside another callback.
    - ie

      ```js
      getUser((userName) =>
        getGitRepository(userName, (repository) =>
          getRepositoryItems(repository)
        )
      );
      ```

  - # 4. using named function

    - ie: instead of using anonymous function we can use named function

      ```js
      getUser((userName,getGitRepository(repository,getRepositoryItems(repository)));


      ```

- # 9. Asynchronous NodeJs Promise

  - # 1. Promises

    - real life promise
      - we promise to do a job in future, until we do this job it is in not done state
      - in future if the job is done then we say promise is completed or fulfilled
      - if not completed we say did not keep the promise
    - in js the promise object will have a in pending state until the promise return a complete or failed status
    - if it complete then the state is resolved
    - if it failed then the state is rejected
    - example code:

      ```js
      const jobDone = new Promise(jobDonePromiseHandler);

      function jobDonePromiseHandler(resolve, reject) {
        setTimeout(() => resolve(1), 1000); //this will resolve in 1 seconds
        setTimeout(() => reject(0), 2000); //this will reject in 2 seconds
      }
      jobDone
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
      ```

  - # 2. Replacing Callback
    - ```js
      getUser(userName)
        .then(getGitRepository)
        .then(getRepositoryItems)
        .catch(catchError);
      ```
  - # 3. Async-Await

    - async-await helps asynchronous code look like synchronous, that help for better understanding
      ```js
      async function getUserData() {
        try {
          const userDetails = await getUser(userId);
          const repository = await getGitRepository(userDetails);
          const repositoryItems = await getRepositoryItems(repository);
        } catch (error) {
          console.log(error);
        }
      }
      ```

# Section E RESTful API and Express

- # 01. What is RESTful service

  - # 01.1 Client-server communication(HTTP)
    - browser=>client/user
    - server=> where the expected resource/ web site stored
    - URL -> Uniform Resource locator, ie: www.google.com
  - # 01.2 RESTful API

    - application 1 <--API--> application 2
    - API -> Application Programming Interface
    - Among many there is REST API
    - REST -> Representational State Transfer
    - RESTful api uses HTTP Request and HTTP Response
    - RESTful concept
      - Resource/Nouns
        - Any information provided by rest api or endpoint
        - uses URI to communicate
          - ie
          - example.com/books
          - example.com/books/4
          - example.com/authors
      - Methods/Verb
        - actions to be perform on resource
        - perform CRUD (Create Read Update Delete) operation
          - HTTP POST -> Create
          - HTTP GET -> Read
          - HTTP PUT/PATCH -> Update
          - HTTP DELETE -> Delete
      - Representation
        - How to data is presented, or how client will get the data when perform an action to the api
        - most used format is JSON and XML
    - Crud Operation details
      - GET https://example.com/books // this will get all book information in Json format
      - GET https://example.com/books/1 // get book details of book id 1
      - POST https://example.com/books {"bookName":"book name"} // will create new book
      - PUT or PATCH https://example.com/books/1 {"bookName":"new book name"} // will update book name of id 1
      - Delete https://example.com/books/1 // will delete book of id 1

  - # 01.3 Example of REST API
    - rest api link and example https://jsonplaceholder.typicode.com/

- # F-02. Building RESTful Service with Express

  - # 02.1 Installing Express

    - init npm : `npm init -y`
    - use the basic http module

      - create a basic http

        ```js
        const http = require("http");
        const server = http.createServer(serverHandler);
        function serverHandler(request, response) {
          switch (request.url) {
            case "/":
              response.write("this is index page");
              return response.end();
            case "/home":
              response.write("this is home page");
              return response.end();

            default:
              response.write("404 page not found");

              return response.end();
          }
        }

        server.listen(3000, () => console.log("listening to port 3000...."));
        ```

      - it is not suitable to maintain http server using built-in http module
      - instead we will use express package
      - install the express package `npm i express`

  - # 02.2 Creating server and Running with Nodemon

    - created server using express,
    - first require express and put it in a constant
    - then call the express and store it in app constant
    - here is the sample code

      ```js
      const express = require("express");

      const app = express();

      app.get("/", (req, res) => {
        res.send("hello from express");
      });

      app.get("/students", (req, res) => {
        const students = ["rahim", "karim"];
        res.send(JSON.stringify(students));
      });
      app.listen(3000, () => console.log("listening on port 3000"));
      ```

    - we need to install nodemon, nodemon is a global package, it watch for changes in file and if changed automatically restart the file.
    - install nodemon globally `npm i nodemon -g`
    - run app file using nodemon `nodemon app.js`

  - # 02.3 Using Postman for GET Request

    - download postman and install it,postman help to send http request,like post,patch,delete. In browser we can do the same but we need to setup custom page/script to send different http request. But postman have all features.
    - used mocked db.json file to replace db
    - read the db.json file using fs module
    - code

      ```js
      fs.readFile("./db.json", "utf-8", (err, data) => {
        const students = JSON.parse(data).students;
        res.send(JSON.stringify(students));
      });
      ```

  - # 02.4 Handling POST Request

    - used `app.post("/api/students",()=>{})` method to receive post request, post request on same uri is used to create new resource, in this case will create new student object
    - to get the sended data to this uri we used a middleware express.json(), `app.use(express.json())`, after this we can receive data in `req.body`
    - we first loaded the db.json, and inserted the new student object in db by `db.students.push(student)`
    - then we save the db object as json using

      ```js
      fs.writeFile("filename", JSON.stringify(db), (error) => {
        // now the file is saved, we need to return the created student data using `res.send()`
      });
      ```

  - # 02.5 Creating a Module for managing data
    - db.json is formatted as only array of student object
    - created new db module to handle db.json file read and write
    - create two promises to handel read and write, getStudent and insertStudent
    - imported new db module in app.js and used new function in async-await syntax
  - # 02.6 Route Parameters
    - we used hard coded uri, using route parameter we can use dynamic uri
    - syntax `uri/:variable-name` ie: for getting a id from uri we can use `/api/students/:id`
    - this id is accessed by `req.params.id`
    - then we simply used the find method of array to find the id and then send the student data;
    - we converted id string to integer
    - if student not found we send a status code of 404, ie: `res.status(404).send("any message")`
  - # 02.7 Handling PUT Request
  - # 02.8 Handling DELETE Request

- # 03. Express Router
  - # 03.1 Using Named Function
  - # 03.2 Refactoring the Routes
  - # 03.3 Implementing Router
- # 04. Express Middleware
  - # 04.1 What is Middleware
  - # 04.2 Writing Custom Middleware
  - # 04.3 Request-Response Cycle
  - # 04.4 Built-in Middleware
  - # 04.5 Third Party Middleware

# Section F Working with MongoDB and Express

- # 1. Introduction to MongoDB
  - # 1.1 Installing Mongodb(Windows)
  - # 1.2 Running Mongodb Server
  - # 1.3 Crud Operations - Create
  - # 1.4 Crud Operation - Read
  - # 1.5 Crud Operation - Update and Delete
  - # 1.6 Mongodb Compass
- # 2. Working with Mongoose
  - # 2.1 Connecting to Mongodb
  - # 2.2 Mongoose Schema
  - # 2.3 Schema types
  - # 2.4 Creating Model and Saving document
  - # 2.5 Querying Documents
  - # 2.6 Updating and deleting documents
  - # 2.7 Built-in Validators
  - # 2.8 Custom Validators
  - # 2.9 Error messages
- # 3. Combining MongoDB with Express
  - # 3.1 Structuring Project
  - # 3.2 Defining Model
  - # 3.3 Connecting Mongodb
  - # 3.4 Post Request - Create Document
  - # 3.5 Get Request - Read Documents
  - # 3.6 Put and delete - update and delete document
- # 4. Authentication
  - # 4.1 Creating user Model
  - # 4.2 Registering User
  - # 4.3 Hashing Password
  - # 4.4 Authenticate
  - # 4.5 Json Web Token
  - # 4.6 Environment variables
  - # 4.7 Storing Secret Key in environment variable
  - # 4.8 Send JWT to new user
- # 5. Authorization
  - # 5.1 Request Header
  - # 5.2 Protect Route using middleware
  - # 5.3 Current user and logging out
  - # 5.4 Role based Authorization
- # 6. Burger Builder Project Back-end with Node
  - # 6.1 Setting up project
  - # 6.2 Creating user schema
  - # 6.3 Validation with joi
  - # 6.4 Registering new user
  - # 6.5 Authenticating user
  - # 6.6 Creating order schema
  - # 6.7 New order and order list
  - # 6.8. Testing our backend API
- # 7. Burger Builder Project Customizing React App (Front-End)
  - # 7.1 Project setup
  - # 7.2 Authentication URLS
  - # 7.3 Order URLS

# Section G Deployment

- # 1. Deployment Overview
  - # 1.1 Deployment Overview
- # 2. Hosting Mongodb Database
  - # 2.1 Mongodb Atlas
  - # 2.2 Connecting to hosted Database
  - # 2.3 Network Access
- # 3. Deploying Node Application
  - # 3.1 Preparing our app
  - # 3.2 Getting started with heroku
  - # 3.3 Deploying to heroku
  - # 3.4 Setting environment variables

# Section H project - E-Commerce Site with Payment Gateway

- # 1. Project intro and planning
  - # 1.1 Assignment Overview
  - # 1.2 Planning models
  - # 1.3 Project setup (E-Com)
- # 2. Node - Authentication and Authorization
  - # 2.1 User model
  - # 2.2 User router and signup
  - # 2.3 User sign in
  - # 2.4 Handle Rejected promise errors
  - # 2.5 Authorization middleware
- # 3. Node - Category and Product
  - # 3.1 Category model and router
  - # 3.2 Category routes
  - # 3.3 Product model and router
  - # 3.4 Create product with file upload
  - # 3.5 Upload product with postman
  - # 3.6 Filter Product by query string
  - # 3.7 Product details and update
  - # 3.8 Product update
  - # 3.9 Filter products part-1
  - # 3.10 Filter products part 2
- # 4. Node - Product cart
  - # 4.1 Refactoring codes
  - # 4.2 Cart model
  - # 4.3 Cart controller and router
  - # 4.4 Cart item Crud
  - # 4.5 Profile model and router
- # 5. React - Routing and User Authentication
  - # 5.1 Loading the React app
  - # 5.2 Project setup
  - # 5.3 Navigation menu
  - # 5.4 Login and register user part 1
  - # 5.5 Login and register user part 2
  - # 5.6 Json web token
  - # 5.7 Sign out User
  - # 5.8 Private route
  - # 5.9 Admin Dashboard and route
- # 6. React - Category and product
  - # 6.1 Create category
  - # 6.2 Create product part 1
  - # 6.3 Create product part 2
  - # 6.4 Product details
  - # 6.5 Show products in home page
  - # 6.6 Filter products by category part 1
  - # 6.7 Filter products by category part 2
  - # 6.8 Filter products by category part 3
  - # 6.9 Filter products by price
- # 7. React - Product cart and checkout page
  - # 7.1 Add product to cart
  - # 7.2 Showing product in cart
  - # 7.3 Increase, decrease and remove cart item
  - # 7.4 Saving shipping address
  - # 7.5 Checkout page
- # 8. Payment Gateway (SSLCommerz)
  - # 8.1 Sslcommerz sandbox
  - # 8.2 Initiate payment session
  - # 8.3 Initiate payment session in Node
  - # 8.4 Node - payment controller part 1
  - # 8.5 Node - payment controller part 2
  - # 8.6 React - payment component
  - # 8.7 node - instant payment notification
  - # 8.8 Node - accept response in ipn url
  - # 8.9 Node - order and payment model
  - # 8.10 Node - ipn controller
  - # 8.11 Node - Success message
- # 9. Assignment
  - # 9.1 Assignment overview

# Section I Project (OAuth, File Upload)

- # 1. Project setup
  - # 1.1 OAuth, file upload project setup
- # 2. Social login
  - # 2.1 User model (OAuth, file upload)
  - # 2.2 OAuth workflow
  - # 2.3 Setting up router
  - # 2.4 Setting up google account
  - # 2.5 Passport google OAuth strategy
  - # 2.6 Passport authenticate
  - # 2.7 Redirect call back function
  - # 2.8 Storing user in database
  - # 2.9 Sending JWT as response
- # 3. Uploading files with multer
  - # 3.1 Multer configuration
  - # 3.2 Upload function
  - # 3.3 Testing with postman
