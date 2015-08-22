Template.editPhoto.created = function () {
		Session.setDefault("theme", "dark");
		Session.setDefault("horizontal", "left");
		Session.setDefault("vertical", "top");
};

Template.editPhoto.rendered = function () {
		$("#caption").fitText(0.85);
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

    var c = Session.get("photoCaption");

    var newC = c.split(" ");

    return newC;
  },

  "isLight": function () {
    if (Session.get("theme") == "light") {
      return true;
    }
  },

  "isLeft": function () {
    if (Session.get("horizontal") == "left") {
      return true;
    }
  },

  "isCenter": function () {
    if (Session.get("horizontal") == "center") {
      return true;
    }
  },

  "isRight": function () {
    if (Session.get("horizontal") == "right") {
      return true;
    }
  },
  "isTop": function () {
    if (Session.get("vertical") == "top") {
      return true;
    }
  },

  "isMiddle": function () {
    if (Session.get("vertical") == "middle") {
      return true;
    }
  },

  "isBottom": function () {
    if (Session.get("vertical") == "bottom") {
      return true;
    }
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
      setTimeout(function () {
        $("#caption").fitText(0.85);
      }, 500);
    });
  },

  "click .change-theme": function (e,t) {

    var theme = Session.get("theme");

    if (theme == "dark") {
      Session.set("theme", "light");
    } else if (theme == "light") {
      Session.set("theme", "dark");
    }

  },

  "click .change-horizontal": function (e,t) {

    var align = Session.get("horizontal");

    if (align == "left") {
      Session.set("horizontal", "center");
    } else if (align == "center") {
      Session.set("horizontal", "right");
    } else if (align == "right") {
      Session.set("horizontal", "left");
    }

  },

  "click .change-vertical": function (e,t) {

    var align = Session.get("vertical");

    if (align == "top") {
      Session.set("vertical", "middle");
    } else if (align == "middle") {
      Session.set("vertical", "bottom");
    } else if (align == "bottom") {
      Session.set("vertical", "top");
    }

  },

  "click .change-caption": function (e,t) {

    swal({
      title: "Edit Caption",
      text: '',
      type: 'input',
      showCancelButton: true,
      closeOnConfirm: true,
      animation: "slide-from-top"
    }, function(val){
      if (val != "") {
        Session.set("photoCaption", val);
        setTimeout(function () {
          $("#caption").fitText(0.85);
        }, 500);
      } else {
        return false;
      }

    });
  }

});
