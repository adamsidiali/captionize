Meteor.methods({

  "newSearch": function (results) {

    return results;

  },

  "getShot": function (site) {
    webshot(site, "/tmp/screencapture.png", {
      "shotSize": { "width": 612, "height": 612}
    }, function (err) {
      if (err) {
        console.log(err)
      } else {
        console.log("snapshot taken");
      }
    });

  }

});

Meteor.publish("images", function(img){
  return Images.find({"_id":img});
});

Images.deny({
  insert: function(){
    return false;
  },
  update: function(){
    return false;
  },
  remove: function(){
    return false;
  },
  download: function(){
    return false;
  }
  });

Images.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  },
  download: function(){
    return true;
  }
});
