var express = require("express");
var https = require("https");
var server = express();
var fs = require("fs")

server.get("/", function(req, res){
	res.send("<h1>hello<h2>");
});

var options = {
	key: fs.readFileSync("./keys/key.key"),
	cert: fs.readFileSync("./keys/cert.crt")
}

https.createServer(options, server).listen(3443, function () {
    console.log('Server is running on https://localhost:3443');
});