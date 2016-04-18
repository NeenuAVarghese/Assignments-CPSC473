// Client-side code
/* jshint browser: true, jquery: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */
// Server-side code
/* jshint node: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */
"use strict";
//Including the HTTP, express and body parser modules
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//Defining variables
var port = 3000;
var app = express();

app.use(bodyParser.json());

//Creating Schema
var PostSchema = mongoose.Schema({
    "title": String,
    "link": String,
    "clicks": {
        type: Number,
        default: 0
    }
});

//Building Model
var Posts = mongoose.model("Posts", PostSchema);


//Responding to GET /links request
app.get("/links", function(req, res) {
    Posts.find({}, "-_id -__v", function(err, data) {
        res.json(data);
    });
});

//Responding to /click/:title request
app.get("/click/:title", function(req, res) {
    var redirectLink;

    Posts.findOne({
        title: req.params.title
    }, function(err, body) {
        if (err !== null) {
            res.send(err);
        }
        //Checking if title exists in the database
        else if (body === null) {
            res.send("Value not found");
        } else {
            redirectLink = body.link;
            //Updating the database
            Posts.update({
                title: req.params.title
            }, {
                $inc: {
                    clicks: 4
                }
            }, function(err) {
                if (err !== null) {
                    res.send(err);
                } else {
                    res.redirect(redirectLink);
                }
            });
        }
    });
});


//Resonding to POST /links request
app.post("/links", function(req, res) {
    //saving values from the http request
    var newPost = new Posts({
        "title": req.body.title,
        "link": req.body.link
    });
    //search if value of title already exists
    Posts.find({
        title: req.body.title
    }, function(err, body) {
        if (body.length) {
            res.send("Value already exists");
        }
        //save value only if there is no duplicate value of title
        else {
            newPost.save(function(err) {
                if (err !== null) {
                    console.log(err);
                } else {
                    res.send("Database Updated");
                }
            });
        }
    });

});

//Start the HTTP Server
app.listen(port, function() {
    console.log("Server running at port " + port);
    //connecting to the MongoDb server dbs-assignment7
    mongoose.connect("mongodb://localhost/assignment7");
});