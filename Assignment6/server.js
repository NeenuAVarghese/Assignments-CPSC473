// Client-side code
/* jshint browser: true, jquery: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */
// Server-side code
/* jshint node: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */
"use strict";
//Including the HTTP, express and body parser modules
var express = require("express");
var bodyParser = require("body-parser");
var redis = require("redis");

//creates a new client
var redisClient = redis.createClient();


//Defining variables
var port = 3000;
var app = express();

app.use(bodyParser.json());

//Responding to GET request
app.get("/stats", function(req, res) {

    redisClient.hgetall("coinsflip", function(err, object) {
        if (err !== null) {
            console.log("ERROR: " + err);
        } else {
            res.json(object);
        }
    });
});

//Responding to POST request
app.post("/flip", function(req, res) {
    //Randomly Select 'heads' or 'tails'
    var val = ["heads", "tails"][Math.round(Math.random())];

    //Output logs are just for demonstration purposes
    console.log("Value generated Randomly by the Computer is: " + val);

    //Read Data obtained fron the request body
    console.log("The Request sent was " + req.body.call);
    console.log("-----------------------------------------------------");

    //Compare the Random value and Request body
    if (val === req.body.call) {
        redisClient.hincrby("coinsflip", "wins", 1, function(err) {
            if (err !== null) {
                console.log("ERROR: " + err);
            } else {
                res.json({
                    "result": "win"
                });
            }
        });

    } else {
        redisClient.hincrby("coinsflip", "looses", 1, function(err) {
            if (err !== null) {
                console.log("ERROR: " + err);
            } else {
                res.send({
                    "result": "looses"
                });
            }
        });
    }
});

//Values Reset
app.delete("/stats", function(req, res) {
    redisClient.hmset("coinsflip", {
        "wins": 0,
        "looses": 0
    });
    res.send("Heads and Tails values !");
});

//Start the HTTP Server
app.listen(port, function() {
    console.log("Server running at port " + port);
    redisClient.on("connect", function() {
        console.log("Connected to Redis Server");
        redisClient.exists("coinsflip", function(err, object) {
            //Checking if hash object already exists    
            if (object !== 1) {
                //Initialized coinsflip hash value to 0
                redisClient.hmset("coinsflip", {
                    "wins": 0,
                    "looses": 0
                });
            }
        });
    });
});