(function(){
Template.__checkName("ui");
Template["ui"] = new Template("Template.ui", (function() {
  var view = this;
  return [ HTML.Raw("<!-- floating UI box -->\n	"), HTML.DIV({
    "class": "ui"
  }, "\n		\n		\n		", HTML.Raw("<!-- <button id='prova' type=\"button\">Prova!</button> -->"), "\n		\n		", HTML.Raw("<h1>E-Learning-CVE</h1>"), "\n		", HTML.Raw('<p class="subtitle">Demo CVE</p>'), "\n		\n			\n		", Blaze.If(function() {
    return Spacebars.call(view.lookup("currentUser"));
  }, function() {
    return [ "\n			", Spacebars.include(view.lookupTemplate("user_logout")), "\n			", Blaze.If(function() {
      return Spacebars.call(view.lookup("onSession"));
    }, function() {
      return [ "\n				", Spacebars.include(view.lookupTemplate("exit_session")), "\n			" ];
    }, function() {
      return [ "\n				", Spacebars.include(view.lookupTemplate("select_session")), "\n			" ];
    }), "\n			\n		" ];
  }, function() {
    return [ "\n			", Spacebars.include(view.lookupTemplate("user_login")), "\n		" ];
  }), "		\n	") ];
}));

})();
