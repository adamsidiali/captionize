Template.finalPhoto.events({

  "click .back-to-editor": function (e,t) {
    history.back();
  },

  "click .make-another": function (e,t) {
    Router.go("/");
  }

});

Template.finalPhoto.helpers({
  "done": function () {

    if (this.hasStored("images")) {
      return true;
    }

  }
});
