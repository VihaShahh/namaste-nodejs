import http from 'http';

const server = http.createServer(function(req, res){
    if(req.url === "/getSecretData"){
        res.end("smitu chiku")
    }
    res.end("hello world") //http://localhost:3009/getSecretData
});

server.listen(3009)// localhost:3009

//===============================================================================

// const http = require("node:http");  // Import Node's HTTP module
// const port = 999;  // Choose a port (like an address number)

// const server = http.createServer((req, res) => {
//   res.end("Server Created");
// });

// server.listen(port, () => {
//   console.log("Server running on port " + port);
// });

//===============================================================

// const http = require("node:http");
// const port = 999;

// const server = http.createServer((req, res) => {
//   if (req.url === "/getSecretData") {
//     res.end("You are a human and the secret is... so chill 😎");
//   } else {
//     res.end("Server Created");
//   }
// });

// server.listen(port, () => {
//   console.log("Server running on port " + port);
// });
