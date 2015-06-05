(function(){
Template.__checkName("upload_template");
Template["upload_template"] = new Template("Template.upload_template", (function() {
  var view = this;
  return [ HTML.Raw("<h3>Images</h3>\n    "), Blaze._TemplateWith(function() {
    return {
      fileTypes: Spacebars.call(".png,.jpg"),
      multiple: Spacebars.call(true)
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("upload_bootstrap"));
  }) ];
}));

Template.__checkName("upload_template_view");
Template["upload_template_view"] = new Template("Template.upload_template_view", (function() {
  var view = this;
  return [ HTML.Raw("<h3>Images uploaded</h3>\n  	\n   		"), Blaze.Each(function() {
    return Spacebars.call(view.lookup("uploads"));
  }, function() {
    return [ "\n			", HTML.LI({
      "class": "documentItem"
    }, "\n				\n                 ", HTML.BUTTON({
      "class": "set_img_id",
      type: "button"
    }, HTML.IMG({
      src: function() {
        return [ "/uploads/", Spacebars.mustache(view.lookup("path")) ];
      },
      width: "128",
      height: "128"
    })), HTML.BR(), "\n                    ", HTML.LABEL(Blaze.View("lookup:name", function() {
      return Spacebars.mustache(view.lookup("name"));
    })), " ", HTML.BR(), "\n                    		", Blaze.View("lookup:size", function() {
      return Spacebars.mustache(view.lookup("size"));
    }), " B", HTML.BR(), "\n                    ", Blaze.If(function() {
      return Spacebars.call(view.lookup("_id"));
    }, function() {
      return [ "\n                        ", HTML.A({
        "class": "btn btn-danger deleteUpload"
      }, "Delete"), HTML.BR(), "\n                	", HTML.A({
        "class": "btn btn-danger clearUpload"
      }, "Elimina dalla Collection (for bug)"), " \n                    " ];
    }), "\n            "), " \n		\n		" ];
  }) ];
}));

})();
