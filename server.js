const http = require("http");
const app = require("./app");

// variable de port 
const port = 3000;

const errorHandler = error => {
    console.log(error);
    process.exit(1);
}

const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
    console.log("server en route");

});

server.listen(port);