(function(){
Template.__checkName("layout");
Template["layout"] = new Template("Template.layout", (function() {
  var view = this;
  return HTML.DIV({
    id: "main",
    "class": "row-fluid"
  }, "\n    ", Spacebars.include(view.lookupTemplate("yield")), "\n  ");
}));

})();
