var ToDo  = require("../models/todo.js");
ToDosController = {};

ToDosController.find = function(socket){
 	ToDo.find({}, function (err, result) {
		if (err !== null) {
			console.log(err);
		    // the element did not get saved!
		    return err;
		}
		else{
			console.log(result);
			socket.emit("showTodo", result);
		}
	});
 }

ToDosController.create = function(todo, socket){
	console.log("In create container");
	var newToDo = new ToDo({"description": todo.description, "tags":todo.tags});
    newToDo.save(function (err, result) {
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
		console.log(result);
		socket.emit("showTodo", result);
	    });
	}
    });
}


module.exports = ToDosController;