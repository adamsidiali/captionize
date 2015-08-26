Template.loading.created = function () {
  Session.setDefault("loadingMessage", "loading photo");
}

Template.loading.helpers({

  "message": function () {
    return Session.get("loadingMessage");
  }

});
