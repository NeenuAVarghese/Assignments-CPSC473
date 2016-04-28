
// Client-side code
/* jshint browser: true, jquery: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */

// Server-side code
/* jshint node: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */

"use strict";
var ToDo  = require("../models/todo.js");
var ToDosController = {};


//Controller method for finding todos from database
ToDosController.find = function(socket){
 	ToDo.find({}, function (err, result) {
		if (err !== null) {
			//error in finding todos
			console.log(err);
		    return err;
		}
		else{
			//will emit values to the clients
			console.log(result);
			socket.emit("showTodo", result);
		}
	});
 };


//Controller method for saving todos to database
ToDosController.create = function(todo, socket){
	var newToDo = new ToDo({"description": todo.description, "tags":todo.tags});
    newToDo.save(function (err) {
	if (err !== null) {
	    // the element did not get saved!
	    console.log(err);
	    socket.emit(err);
	} else {
	    // our client expects *all* of the todo items to be returned, so we'll do
	    // an additional request to maintain compatibility
	    ToDo.find({}, function (err, result) {
		if (err !== null) {
		    // the element did not get saved!
		    console.log(err);
		    socket.emit(err);
		}
			//if everything goes well, new todos will be shown on web pages of all clients
		console.log(result);
		socket.emit("showTodo", result);
	    });
	}
    });
};


module.exports = ToDosController;