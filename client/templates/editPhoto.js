Template.editPhoto.created = function () {
		Session.setDefault("photoCaption", false);
		Session.set("photoToolsDisabled", false);
		Session.setDefault("theme", "dark");
		Session.setDefault("horizontal", "center");
		Session.setDefault("vertical", "middle");
		Session.set("snapshot", false);
};

Template.editPhoto.rendered = function () {
		$("#caption").fitText();
		toastr.options = {
			"closeButton": false,
			"debug": false,
			"newestOnTop": false,
			"progressBar": false,
			"positionClass": "toast-bottom-left",
			"preventDuplicates": false,
			"onclick": null,
			"showDuration": "300",
			"hideDuration": "1000",
			"timeOut": "5000",
			"extendedTimeOut": "1000",
			"showEasing": "swing",
			"hideEasing": "linear",
			"showMethod": "fadeIn",
			"hideMethod": "fadeOut"
		}
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
  "snapshot": function () {
    return Session.get("snapshot");
  },

  "photoToolsDisabled": function () {
    return Session.get("photoToolsDisabled");
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
		toastr.remove();
    swal({
      title: "Add A Caption",
      text: 'Write a caption below to add to your photo.',
      type: 'input',
      showCancelButton: true,
      closeOnConfirm: true,
      animation: "slide-from-top"
    }, function(val){

			if (val == "") {
				return false;
			} else {
				Session.set("photoCaption", val);
	      setTimeout(function () {
	        $("#caption").fitText();
	      }, 500);
				toastr["info"]("Quickly adjust your caption by clicking on the text");
			}

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
          $("#caption").fitText();
        }, 500);
      } else {
        return false;
      }

    });
  },

  "focus #caption": function (e,t) {
    Session.set("photoToolsDisabled", true);
  },

  "blur #caption": function (e,t) {
    if ($(e.target).text() == "") {
      alert("Caption cannot be blank!");
      $(e.target).focus();
    } else {
      Session.set("photoToolsDisabled", false);
    }
  },

  "click .back-to-upload": function () {
    Router.go("/");
  },

  "click .save-pic": function (e,t) {
    $("body *").hide();
    $(".photo-wrap").show();
    $(".photo-wrap").addClass("snapped");
    $(".photo").addClass("snapped");
    $("#photo-inner").addClass("snapped");
    $(".captionizer-icon").addClass("snapped");
    $(".photo-wrap *").show();
    $(".captionizer-title").hide();
    $("#caption").fitText();
    Session.set("snapshot", true);

    var img;

    html2canvas(document.getElementById("photo-inner"), {
      onrendered: function(canvas) {
        document.getElementById("modal").appendChild(canvas);
        img = canvas.toDataURL("image/png");
        console.log(img);

        Images.insert(img, function (err, fileObj) {
          console.log("saving " + fileObj._id);
        	Router.go("/photo/"+ fileObj._id);
        });

      },
			width: 612,
  		height: 612
    });

  }

});
