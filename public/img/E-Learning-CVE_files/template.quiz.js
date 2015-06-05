(function(){
Template.__checkName("quiz_template");
Template["quiz_template"] = new Template("Template.quiz_template", (function() {
  var view = this;
  return HTML.Raw('<div class="anti-modal-box">\n    <div class="anti-modal-header">\n      <div class="anti-modal-title">Quiz!</div>\n      <!--<div class="anti-modal-closer">&times;</div>  "X" -->\n    </div>\n    <div class="anti-modal-body">\n     <form action="">\n		<fieldset>\n			<legend>Domanda</legend><br>\n 			<input type="checkbox" name="html" value="html"> A. Sono bello\n			 <br> \n 			<input type="checkbox" name="css" value="css"> B. Sono snello \n		</fieldset>\n		\n		<button id="esci_quiz" type="button">Esci</button>\n	</form>\n    </div>\n  </div>');
}));

})();
