(function(){
Template.__checkName("home");
Template["home"] = new Template("Template.home", (function() {
  var view = this;
  return Spacebars.include(view.lookupTemplate("ui"));
}));

})();
