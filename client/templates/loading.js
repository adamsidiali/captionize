Template.loading.created = function () {
  Session.setDefault("loadingMessage", "uploading");
}

Template.loading.helpers({

  "message": function () {
    return Session.get("loadingMessage");
  }

});
