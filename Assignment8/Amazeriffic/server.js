var express = require("express");
var io = require("socket.io");
var mongoose = require("mongoose");
var port = 3000;
var ToDosController = require("./controllers/todos_controller.js");
 
 app = express();

app.use(express.static(__dirname + "/client"));
app.use(express.bodyParser());

var server = io.listen(app.listen(port, function(){
    console.log("App started on "+ port);
}));
// connect to the amazeriffic data store in mongo
mongoose.connect('mongodb://localhost/amazeriffic');

server.sockets.on('connection', function(socket){
    console.log("User connected");
    ToDosController.find(server.sockets);

    socket.on("addTodos", function(todo){
		ToDosController.create(todo, server.sockets);
    });
    socket.on('disconnect', function(){
        console.log("User Disconnected")
    });
});
