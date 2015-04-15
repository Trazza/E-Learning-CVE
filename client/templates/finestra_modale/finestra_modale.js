



Template.finestra_template.events({
	"click #esci": function(e, t) {

    	 AntiModals.dismissAll();
		 console.log('Esci');
  },
  
  	"click #quiz": function(e, t) {
		AntiModals.dismissAll();
    	if (Session.get("mode") != "login") {
			if (Alerts.findOne({name: 'quiz'}).value == false ) {
				
    			
    			Meteor.call('setAlert', 'quiz_id', true);  //modificando il parametro value =true viene scatenato l'evento "quiz" su tutti i client
    			/*
    			Alerts.update(
    						{ _id: 'quiz_id' }, 
    						{ $set: //consente di modificare sono il parametro selezionato 
    							{
    								value: true, 
    							}
    						}
    			);
    			*/

  				
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




























