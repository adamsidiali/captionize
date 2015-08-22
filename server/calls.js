Meteor.methods({

  "newSearch": function (results) {

    return resuls;

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
