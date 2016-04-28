// Client-side code
/* jshint browser: true, jquery: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */

// Server-side code
/* jshint node: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */

"use strict";
var express = require("express");
var io = require("socket.io");
var mongoose = require("mongoose");
var ToDosController = require("./controllers/todos_controller.js");
 
var port = 3000;
var app = express();
app.use(express.static(__dirname + "/client"));

var server = io.listen(app.listen(port, function(){
    console.log("App started on "+ port);
}));
	// connect to the amazeriffic data store in mongo
mongoose.connect("mongodb://localhost/amazeriffic");

server.sockets.on("connection", function(socket){
	//Handle 'Client On connect evenets'
    console.log("User connected");
    ToDosController.find(server.sockets);

	//handle addTodos Event
    socket.on("addTodos", function(todo){
		ToDosController.create(todo, server.sockets);
    });
	
	//Handle user disconnect event
    socket.on("disconnect", function(){
        console.log("User Disconnected");
    });
});
