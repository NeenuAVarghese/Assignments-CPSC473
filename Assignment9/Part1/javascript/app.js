// Client-side code
/* jshint browser: true, jquery: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */

// Server-side code
/* jshint node: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */
/*globals ko*/
"use strict";
var commentModel = function(){
  //for input box
  this.newComment =  ko.observable("");

  // initial state of comments array
  this.commentsArray = ko.observableArray([
      {cmt: "First Comment"},
      {cmt: "Second Comment"}
    ]);

  //handles add button action
   this.addComment = function() {
      if(this.newComment() !== ""){
        this.commentsArray.push({cmt: this.newComment()});
        this.newComment("");
      } 
    };
};

ko.applyBindings(commentModel);