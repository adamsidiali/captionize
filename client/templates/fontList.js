Template.fontList.created = function () {
  _.each(currentFonts, getFonts);
}

var getFonts = function (font) {
  $("head").append("<link href='https://fonts.googleapis.com/css?family=" + font.name + ":"+ font.optimalWeight +"' rel='stylesheet' type='text/css'>");
};

var currentFonts = [{
  "name": "Oswald",
  "optimalTransform": "uppercase",
  "optimalWeight": 400
},
{
  "name": "Roboto",
  "optimalTransform": "uppercase",
  "optimalWeight": 100
},
{
  "name": "Lato",
  "optimalTransform": "lowercase",
  "optimalWeight": 300
},
{
  "name": "Lobster",
  "optimalTransform": "lowercase",
  "optimalWeight": 400
},
{
  "name": "Pacifico",
  "optimalTransform": "lowercase",
  "optimalWeight": 400
},
{
  "name": "Quicksand",
  "optimalTransform": "lowercase",
  "optimalWeight": 400
}]

Template.fontList.helpers({

  "fonts": function () {
    return currentFonts;
  }

});


Template.fontList.events({

  "click .font-list-modal": function (e,t) {
    Session.set("showFontList", false);
  },

  "click .font-option": function (e,t) {
    var font = $(e.target).css("font-family");
    var trans = $(e.target).css("text-transform");
    var weight = $(e.target).css("font-weight");
    Session.set("fontOption", font);
    Session.set("fontTransform", trans);
    Session.set("fontWeight", weight);
  }

});
