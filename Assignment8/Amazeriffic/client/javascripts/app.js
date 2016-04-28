
// Client-side code
/* jshint browser: true, jquery: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */

// Server-side code
/* jshint node: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */

"use strict";
var io;
var socket = io.connect();
var main = function (toDoObjects) {
    
    console.log("SANITY CHECK");
    
    var toDos = toDoObjects.map(function (toDo) {
        return toDo.description;
        });

    socket.on("addTodos", function(toDoObjects){
        toDos = toDoObjects.map(function (toDo) {
        return toDo.description;
        });
    });
    
    $(".tabs a span").toArray().forEach(function (element) {
        var $element = $(element);
        // create a click handler for this element
        $element.on("click", function () {
            var $content,
                $input,
                $button,
                i;

            $(".tabs a span").removeClass("active");
            $element.addClass("active");
            $("main .content").empty();

            if ($element.parent().is(":nth-child(1)")) {
                $content = $("<ul>");
                for (i = toDos.length-1; i >= 0; i--) {
                    //$content.append($("<li>").text(toDos[i]));
                    $($("<li>").text(toDos[i])).appendTo($content).hide().slideDown();
                   // $content.slideDown( "slow" );
                }
            } else if ($element.parent().is(":nth-child(2)")) {
                $content = $("<ul>");
                toDos.forEach(function (todo) {
                    $($("<li>").text(todo)).appendTo($content).hide().slideDown();
                });

            } else if ($element.parent().is(":nth-child(3)")) {
                var tags = [];

                toDoObjects.forEach(function (toDo) {
                    toDo.tags.forEach(function (tag) {
                        if (tags.indexOf(tag) === -1) {
                            tags.push(tag);
                        }
                    });
                });

                var tagObjects = tags.map(function (tag) {
                    var toDosWithTag = [];

                    toDoObjects.forEach(function (toDo) {
                        if (toDo.tags.indexOf(tag) !== -1) {
                            toDosWithTag.push(toDo.description);
                        }
                    });

                    return { "name": tag, "toDos": toDosWithTag };
                });


                tagObjects.forEach(function (tag) {
                    var $tagName = $("<h3>").text(tag.name),
                        $content = $("<ul>");


                    tag.toDos.forEach(function (description) {
                        var $li = $("<li>").text(description);
                        $content.append($li);
                        $($("<li>").text(toDos[i])).appendTo($content).hide().slideDown();
                    });

                    $("main .content").append($tagName);
                    $("main .content").append($content);
                });

            } else if ($element.parent().is(":nth-child(4)")) {
                    $input = $("<input>").addClass("description");
                    var $inputLabel = $("<p>").text("Description: ");
                    var $tagInput = $("<input>").addClass("tags");
                    var $tagLabel = $("<p>").text("Tags: ");
                    $button = $("<span>").text("+");

                $button.on("click", function () {
                    var description = $input.val(),
                        tags = $tagInput.val().split(","),
                        newToDo = {"description":description, "tags":tags};
                        socket.emit("addTodos", newToDo);
                        $input.val("");
                        $tagInput.val("");
                        alert("New values Added !!");
                });

                $content = $("<div>").append($inputLabel)
                                     .append($input)
                                     .append($tagLabel)
                                     .append($tagInput)
                                     .append($button);
            }

            $("main .content").append($content);
            return false;
        });
    });
    $(".tabs a:first-child span").trigger("click");
      
};

$(document).ready(function () {
   socket.on("showTodo", function(toDoObjects){
        main(toDoObjects);
    });
});
