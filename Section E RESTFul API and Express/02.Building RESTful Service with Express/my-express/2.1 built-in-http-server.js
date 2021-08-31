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
