// Client-side code
/* jshint browser: true, jquery: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */
// Server-side code
/* jshint node: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */
//Including the HTTP, express and body parser modules
var express = require("express");
var bodyParser = require("body-parser");

//Defining variables
var hostname = "localhost";
var port = "3000";
var app = express();

//Initializing the output
var output = {
    "wins": 0,
    "looses": 0
};

app.use(bodyParser.json());

//Responding to GET request
app.get("/stats", function(req, res) {
    "use strict";
    res.json(output);
});

//Responding to POST request
app.post("/flip", function(req, res) {
    "use strict";
    //Randomly Select 'heads' or 'tails'
    var val = ["heads", "tails"][Math.round(Math.random())];
    console.log("Value generated Randomly by the Computer is: " + val);

    //Read Data obtained fron the request body
    console.log("The Request sent was " + req.body.call);
	console.log("-----------------------------------------------------");

    //Compare the Random value and Request body
    if (val === req.body.call) {
        output.wins += 1;
        res.json({
            "result": "win"
        });
    } else {
        output.looses += 1;
        res.send({
            "result": "looses"
        });
    }
});


//Start the HTTP Server
app.listen(port, hostname, function() {
    "use strict";
    console.log("Server running at http://" + hostname + ":" + port + "/");
});