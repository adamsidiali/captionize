Router.configure({
  layoutTemplate: "layout",
  notFoundTemplate: "notFound",
  loadingTemplate: "loading"
});

Router.route("/", {
  name: "home",
  template: "home",
  action: function () {
    this.render();
  }
});

Router.route("/edit/:photoId", {
  name: "editPhoto",
  template: "editPhoto",
  data: function () {
    return Images.findOne({"_id": this.params.photoId});
  },
  waitOn: function () {
    return Meteor.subscribe('images', this.params.photoId);
  },
  action: function () {
    if (this.ready()) {
      this.render('editPhoto');
    } else {
      this.render('loading');
    }
  }
});

Router.route("/render/:photoId", {
  name: "finalPhoto",
  template: "finalPhoto",
  data: function () {
    return Images.findOne(this.params.photoId);
  },
  waitOn: function () {
    return Meteor.subscribe('images', this.params.photoId);
  },
  action: function () {
    if (this.ready()) {
      Session.set("photoId", this.params.photoId);
      this.render('finalPhoto');
    } else {
      this.render('loading');
    }
  }
});
