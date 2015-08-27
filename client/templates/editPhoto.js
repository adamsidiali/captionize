Template.editPhoto.created = function () {
		Session.setDefault("photoCaption", false);
		Session.set("photoToolsDisabled", false);
		Session.setDefault("theme", "dark");
		Session.setDefault("fontTransform", "uppercase");
		Session.setDefault("fontWeight", 700);
		Session.setDefault("horizontal", "center");
		Session.setDefault("vertical", "middle");
		Session.set("snapshot", false);
		Session.setDefault("fontOption", "Oswald");
};

Template.editPhoto.rendered = function () {
		$("#caption").fitText();
		toastr.options = {
			"closeButton": false,
			"debug": false,
			"newestOnTop": false,
			"progressBar": false,
			"positionClass": "toast-top-full-width",
			"preventDuplicates": false,
			"onclick": null,
			"showDuration": "300",
			"hideDuration": "1000",
			"timeOut": "3000",
			"extendedTimeOut": "1000",
			"showEasing": "swing",
			"hideEasing": "linear",
			"showMethod": "fadeIn",
			"hideMethod": "fadeOut"
		}
};

Template.editPhoto.helpers({

	"done": function () {

		if (this.hasStored("images")) {
			return true;
		}

	},

	"fontOption": function () {
		return Session.get("fontOption");
	},

	"fontTransform": function () {
		return Session.get("fontTransform");
	},

	"fontWeight": function () {
		return Session.get("fontWeight");
	},

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
    return Session.get("photoCaption");
  },

  "isLight": function () {
    if (Session.get("theme") == "light") {
      return true;
    }
  },

	"isDark": function () {
    if (Session.get("theme") == "dark") {
      return true;
    }
  },

	"isThemeNone": function () {
    if (Session.get("theme") == "none") {
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
  },

	"isLower": function () {
		if (Session.get("fontTransform") == "lowercase") {
      return true;
    }
	},
	"isCaps": function () {
		if (Session.get("fontTransform") == "capitalize") {
      return true;
    }
	},
	"isUpper": function () {
		if (Session.get("fontTransform") == "uppercase") {
      return true;
    }
	},
	"isTransNone": function () {
		if (Session.get("fontTransform") == "none") {
      return true;
    }
	},

	"showFontList": function () {
		return Session.get("showFontList");
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
      Session.set("theme", "none");
    } else if (theme == "none") {
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

	"keypress #caption": function (e,t) {
		if (e.keyCode === 13) {
      // insert 2 br tags (if only one br tag is inserted the cursor won't go to the next line)
      document.execCommand('insertHTML', false, '<br>');
      // prevent the default behaviour of return key pressed
      return false;
    }
	},


  "click .back-upload": function () {
    Router.go("/");
  },

  "click .finalize-pic": function (e,t) {

		async.series([
			function (call) {
				$(".finalizing").show();
				Session.set("snapshot", true);
				console.log("step 1");
				return call(null);
			},
			function (call) {
				console.log("step 2");
				$(".photo-wrap").addClass("snapped");
				$(".photo").addClass("snapped");
				$("#photo-inner").addClass("snapped");
				$(".captionizer-icon").addClass("snapped");
				$("#caption").fitText();
				return call(null);
			}], function (call) {
				console.log("step 3");
		    html2canvas(document.getElementById("photo-inner"), {
		      onrendered: function(canvas) {
		        document.getElementById("modal").appendChild(canvas);
		        var img = canvas.toDataURL("image/png");
		        console.log(img);

		        Images.insert(img, function (err, fileObj) {
		          console.log("saving " + fileObj._id);
		        	Router.go("/photo/"+ fileObj._id);
		        });

		      },
					width: 612,
		  		height: 612
		    });

			});


  },

	"click .change-font": function (e,t) {

		Session.set("showFontList", true);

	},

	"click .change-caps": function (e,t) {
		var transform = Session.get("fontTransform");

    if (transform == "uppercase") {
      Session.set("fontTransform", "none");
    } else if (transform == "lowercase") {
      Session.set("fontTransform", "capitalize");
    } else if (transform == "capitalize") {
      Session.set("fontTransform", "uppercase");
    } else if (transform == "none") {
      Session.set("fontTransform", "lowercase");
    }

	}

});
