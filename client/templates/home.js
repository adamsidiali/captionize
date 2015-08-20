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
          console.log(err);
        } else {
          console.log("Inserted", fileObj);
          Router.go("/edit/"+fileObj._id);
        }
      }
    }),
});
