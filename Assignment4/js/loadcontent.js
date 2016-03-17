// Client-side code
/* jshint browser: true, jquery: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */
// Server-side code
/* jshint node: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */
"use strict";

//Used to fetch default content in db.json
var main = function() {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/actors",
        data: {
            get_param: "value"
        },
        dataType: "json",
        success: function(data) {
            $.each(data, function(index, element) {
                var st;
                if (element.starred) {
                    st = "star";
                } else {
                    st = "star_border";
                }
                $(".mdl-list").append($("<div class='mdl-list__item'><span class='mdl-list__item-primary-content'><i class='material-icons mdl-list__item-avatar'>person</i><span class='elementname'>" + element.name + "</span></span><a class='mdl-list__item-secondary-action' href='#'><i class='material-icons star'>" + st + "</i></a></div>"));
            });
        },
        error: function(error) {
            console.log(error);
        }
    });
};

//Handles the click event on Star
$("body").delegate(".star", "click", function() {
    var data;
    var access_name;
    var index = $(this).index(".star") + 1;
    if ($(this).text() === "star") {
        $(this).text("star_border");
        access_name = $(this).parent().siblings().children(".elementname");
        data = {
            "name": access_name.text(),
            "starred": "false"
        };
        $.ajax({
            url: "http://localhost:3000/actors/" + index,
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(data),
            //success: function() {},
            error: function(xhr, textStatus, error) {
                console.log(xhr.statusText);
                console.log(textStatus);
                console.log(error);
            }
        });
    } else {
        $(this).text("star");
        access_name = $(this).parent().siblings().children(".elementname");
        data = {
            "name": access_name.text(),
            "starred": "true"
        };
        $.ajax({
            url: "http://localhost:3000/actors/" + index,
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(data),
            //success: function(data) {},
            error: function(xhr, textStatus, error) {
                console.log(xhr.statusText);
                console.log(textStatus);
                console.log(error);
            }
        });
    }
});

//Handles input of new usernames
$(".mdl-button").click(function() {
    var namevar = $("#name").val();
    if ((namevar !== "") && ((/^[A-Za-z ]*$/).test(namevar))) {
        var data = {
            "name": namevar,
            "starred": "false"
        };
        $.ajax({
            type: "POST",
            contentType: "application/json", 
            url: "http://localhost:3000/actors",
            dataType: "json",
            data: JSON.stringify(data),
            success: function() {
            location.reload(true);
            },
            error: function(xhr, textStatus, error) {
            console.log(xhr.statusText);
            console.log(textStatus);
            console.log(error);
            }   
        });
    }
});

$(document).ready(main);