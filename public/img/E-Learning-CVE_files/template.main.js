(function(){
Template.body.addContent((function() {
  var view = this;
  return Spacebars.include(view.lookupTemplate("x3d_template"));
}));
Meteor.startup(Template.body.renderToDocument);

})();
