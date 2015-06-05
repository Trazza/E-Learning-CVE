(function(){
Template.__checkName("personalize");
Template["personalize"] = new Template("Template.personalize", (function() {
  var view = this;
  return [ HTML.Raw("<h3>Scegli la tua immagine</h3>\n  	 \n    "), Spacebars.include(view.lookupTemplate("upload_template")), "\n  	", Spacebars.include(view.lookupTemplate("upload_template_view")) ];
}));

Template.__checkName("personalize_modalView");
Template["personalize_modalView"] = new Template("Template.personalize_modalView", (function() {
  var view = this;
  return HTML.DIV({
    "class": "anti-modal-box"
  }, HTML.Raw('\n    <div class="anti-modal-header">\n      <div class="anti-modal-title">Personalizza</div>\n      <!--<div class="anti-modal-closer">&times;</div>  "X" -->\n    </div>\n    '), HTML.DIV({
    "class": "anti-modal-body"
  }, "\n     	", Spacebars.include(view.lookupTemplate("personalize")), "\n     	", HTML.Raw("<br>"), "\n     	", HTML.Raw('<button id="esci" type="button">Esci</button>'), "\n    "), "\n  ");
}));

})();
