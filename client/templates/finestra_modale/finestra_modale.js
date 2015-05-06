



Template.finestra_template.events({
	"click #esci": function(e, t) {

    	 AntiModals.dismissAll();
		 console.log('Esci');
  },
  
  	"click #quiz": function(e, t) {
		AntiModals.dismissAll();
    	if (Meteor.userId() != null) {
    		console.log('Alert Quiz Room: '+Session.get('room_id')+' => value: '+ Alerts.findOne({name: 'quiz', room: Session.get('room_id')}).value );
			if (Alerts.findOne({name: 'quiz', room: Session.get('room_id')}).value == false ) {
				console.log('quiz');
    			
    			Meteor.call('setActivity', 'quiz', Session.get('room_id'), true);  //modificando il parametro value =true viene scatenato l'evento "quiz" su tutti i client
    			

  				
  			}else{
  				alert("Utenti che ancora devono finire il quiz: "+Players.find({activity: 'quiz', room: Session.get('room_id')}).count());
  			}
  		}else{
  			alert("ti devi loggare");
  		};
		 
  },
  
  	"click #personalizza": function(e, t) {
  		AntiModals.dismissAll();
  		AntiModals.overlay('personalize_modalView', {
      					modal: true,
      				});

    	
		console.log('personalizza');
  },
  
});




























