var commentModel = function(){
  //for input box
  this.newComment =  ko.observable("");

  // initial state of comments array
  this.commentsArray = ko.observableArray([
      {cmt: 'First Comment'},
      {cmt: 'Second Comment'}
    ]);

  //handles add button action
   this.addComment = function() {
      if(this.newComment() != ""){
        commentsArray.push({cmt: this.newComment()});
        this.newComment("");
      } 
    };
};

ko.applyBindings(commentModel);