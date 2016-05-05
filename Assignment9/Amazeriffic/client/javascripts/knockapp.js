// Client-side code
/* jshint browser: true, jquery: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */

// Server-side code
/* jshint node: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */
/*{
    "curly": true,
    "eqeqeq": true,
    "forin": true,
    "immed": true,
    "indent": 4,
    "latedef": true,
    "newcap": true,
    "nonew": true,
    "quotmark": "double",
    "undef": true,
    "unused": true,
    "strict": true,
    "trailing": true,
    "node": true
}*/
/*globals ko*/
"use strict";

var todoModel = function(toDoObjects){
    this.description = ko.observable("");
    this.tags = ko.observable("");

    this.tabsArray = ko.observableArray([
      {tab: "Newest"},
      {tab: "Oldest"},
      {tab: "Tags"},
      {tab: "Add"}
    ]);
    this.toDos = ko.observableArray([]);
    
    this.toDos = toDoObjects.map(function (toDo) {
      return toDo.description;
    });


  var newElement;
    this.grabClick = function(){
        var $element =  $(event.target);

        $(".tabs a span").removeClass("active");
        $element.addClass("active");

        if($element.parent().is(":nth-child(1)")){
            if($("#contentlist")[0]){
                ko.removeNode($("#contentlist")[0]);
            }
           newElement = $("<ul id='contentlist' data-bind='foreach: toDos.slice(0).reverse()'><li data-bind='text: $data'></li></ul>");
           $(".content").append(newElement);
           ko.applyBindings(todoModel(toDoObjects), newElement[0]);

        }
        else if($element.parent().is(":nth-child(2)")){
            if($("#contentlist")[0]){
                ko.removeNode($("#contentlist")[0]);
            }
           newElement = $("<ul id='contentlist' data-bind='foreach: toDos'><li data-bind='text: $data'></li></ul>");
           $(".content").append(newElement);
           ko.applyBindings(todoModel(toDoObjects), newElement[0]);
        }
        else if($element.parent().is(":nth-child(3)")){
            if($("#contentlist")[0]){
                ko.removeNode($("#contentlist")[0]);
            }

            var tags = [];

                toDoObjects.forEach(function (toDo) {
                    toDo.tags.forEach(function (tag) {
                        if (tags.indexOf(tag) === -1) {
                            tags.push(tag);
                        }
                    });
                });
                console.log(tags);

                var tagObjects = tags.map(function (tag) {
                    var toDosWithTag = [];

                    toDoObjects.forEach(function (toDo) {
                        if (toDo.tags.indexOf(tag) !== -1) {
                            toDosWithTag.push(toDo.description);
                        }
                    });

                    return { "name": tag, "toDos": toDosWithTag };
                });

                console.log(tagObjects);
                     var $div = $("<div id='contentlist'>");
                $("main .content").append($div);
                tagObjects.forEach(function (tag) {
                    var $tagName = $("<h3>").text(tag.name),
                        $content = $("<ul>");


                    tag.toDos.forEach(function (description) {
                        var $li = $("<li>").text(description);
                        $content.append($li);
                    });

                    $("#contentlist").append($tagName);
                    $("#contentlist").append($content);
                });
               

        }
        else if($element.parent().is(":nth-child(4)")){
                 if($("#contentlist")[0]){
                ko.removeNode($("#contentlist")[0]);
            }
            var $input = $("<input class='description' data-bind='value: description'>");
            var $inputLabel = $("<p>").text("Description: ");
            var $tagInput = $("<input class='tags' data-bind='value: tags'>");
            var $tagLabel = $("<p>").text("Tags: ");
            var $button = $("<span data-bind='click: addContent'>").text("+");

            this.addContent = function(){
                var description = this.description();
                var tags = this.tags().split(",");
                var newToDo = {"description":description, "tags":tags};


                $.post("todos", newToDo, function (result) {
                        toDoObjects = result;
                        // update toDos
                        this.toDos = toDoObjects.map(function (toDo) {
                            return toDo.description;
                        });

                    });

                this.description("");
                this.tags("");
                $(".tabs a:first-child span").trigger("click");
            };

            newElement = $("<div id='contentlist'>").append($inputLabel)
                                     .append($input)
                                     .append($tagLabel)
                                     .append($tagInput)
                                     .append($button);
            $(".content").append(newElement);
          
            ko.applyBindings(todoModel(toDoObjects), newElement[0]);

        }

            return false;
    };
   
};
$(document).ready(function () {
  $.getJSON("todos.json", function (toDoObjects) {
         ko.applyBindings(todoModel(toDoObjects));
    });
});