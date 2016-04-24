var express = require("express"),
    io = require("socket.io");
    port = 3000;
    // import the mongoose library
    mongoose = require("mongoose"),
    app = express();

app.use(express.static(__dirname + "/client"));
app.use(express.bodyParser());

var server = io.listen(app.listen(port, function(){
    console.log("App started on "+ port);
}));
// connect to the amazeriffic data store in mongo
mongoose.connect('mongodb://localhost/amazeriffic');

// This is our mongoose model for todos
var ToDoSchema = mongoose.Schema({
    description: String,
    tags: [ String ]
});

var ToDo = mongoose.model("ToDo", ToDoSchema);


server.sockets.on('connection', function(socket){
    console.log("User connected");
    ToDo.find({}, function (err, result) {
		if (err !== null) {
		    // the element did not get saved!
		    socket.emit("ERROR");
		}
		else{
			console.log("Emitting: " + result);
		socket.emit("addTodos", result);	
		}
		
	    });

    socket.on("addTodos", function(todo){
    console.log(todo);
    
    var newToDo = new ToDo({"description": todo.description, "tags":todo.tags});
    newToDo.save(function (err, result) {
	if (err !== null) {
	    // the element did not get saved!
	    console.log(err);
	    socket.emit("ERROR");
	} else {
	    // our client expects *all* of the todo items to be returned, so we'll do
	    // an additional request to maintain compatibility
	    ToDo.find({}, function (err, result) {
		if (err !== null) {
		    // the element did not get saved!
		    socket.emit("ERROR");
		}
		server.sockets.emit("addTodos", result);
	    });
	}
    });
    });
    socket.on('disconnect', function(){
        console.log("User Disconnected")
    });
});
