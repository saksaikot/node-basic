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
