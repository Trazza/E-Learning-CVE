(function(){
Template.__checkName("finestra_template");
Template["finestra_template"] = new Template("Template.finestra_template", (function() {
  var view = this;
  return HTML.Raw('<div class="anti-modal-box">\n    <div class="anti-modal-header">\n      <div class="anti-modal-title">Cosa vuoi fare?</div>\n      <!--<div class="anti-modal-closer">&times;</div>  "X" -->\n    </div>\n    <div class="anti-modal-body">\n     <form action="">\n		 <button id="quiz" type="button"><img src="/img/quiz.jpg" width="128" height="128"><br><h1>Quiz</h1></button>\n		 <button id="personalizza" type="button"><img src="/img/paint.png" width="128" height="128"><br><h1>Personalizza</h1></button><br>\n		<button id="esci" type="button">Esci</button>\n	</form>\n    </div>\n  </div>');
}));

})();
