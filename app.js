var fs = require("fs");
var path =require("path");
var http =require("http");

var express = require("express");
var compress = require("compression");

var app = express();

app.use(compress());
var config = require("./config.json");

app.use(express.static(path.join(__dirname,config.assets)));


var listenPort = config.port;
var listenHost = config.host;

app.listen(listenPort,listenHost, function(){
	console.log("server satarted ! http://"+listenHost + ":" + listenPort);
});


module.exports = app;