Template.finestra_template.events({
	"click #esci": function(e, t) {

    	 AntiModals.dismissAll();
		 console.log('Esci');
  },
  
  	"click #quiz": function(e, t) {
		AntiModals.dismissAll();
    	if (Session.get("mode") != "login") {
			if (Alerts.findOne({name: 'quiz'}).value == false ) {	
    			console.log("1) Start_quiz: Alerts.findOne(quiz_id).value = "+ Alerts.findOne('quiz_id').value);
    			console.log("Update Alert.quiz.value to 'true'...");
    			Alerts.update(
    						{ _id: 'quiz_id' }, 
    						{ $set: //consente di modificare sono il parametro selezionato 
    							{
    								value: true, 
    							}
    						}
    			);

  				console.log("2) Start_quiz: Alerts.findOne(quiz_id).value = "+ Alerts.findOne('quiz_id').value);
  			}
  		}else{
  			alert("ti devi loggare");
  		};
		 console.log('quiz');
  },
  
  	"click #personalizza": function(e, t) {
  		AntiModals.dismissAll();
  		AntiModals.overlay('personalize_modalView', {
      					modal: true,
      				});

    	
		console.log('personalizza');
  },
  
});