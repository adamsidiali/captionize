Template.home.created = function () {
  Session.set("photoCaption", false);
}

Template.home.helpers({

  'images': function () {
    return Images.find();
  }

});

Template.home.events({
  'change .myFileInput': FS.EventHandlers.insertFiles(Images, {
      metadata: function (fileObj) {
        return {
          owner: "adam",
          created: new Date()
        };
      },
      after: function (err, fileObj) {
        if (err) {
          alert("Oops, something went wrong. Please try again.");
        } else {
          console.log("Inserting", fileObj);


            Router.go("/edit/"+fileObj._id);


          }
        }
    }),
});
