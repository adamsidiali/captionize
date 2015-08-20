Template.editPhoto.rendered = function () {
		$(".caption").fitText();		
};

Template.editPhoto.helpers({

  "hasCaption": function () {
    var caption = Session.get("photoCaption");
    if (caption) {
      return true;
    } else {
      return false;
    }
  },

  "caption": function () {
    return Session.get("photoCaption");
  }

});

Template.editPhoto.events({

  "click .add-text-button": function (e,t) {
    swal({
      title: "Add A Caption",
      text: 'Write a caption below to add to your photo.',
      type: 'input',
      showCancelButton: true,
      closeOnConfirm: true,
      animation: "slide-from-top"
    }, function(val){
      Session.set("photoCaption", val);
    });
  }

});
