(function(){//************ Finestra Modale ***************************
//  
// Riferimenti: https://atmospherejs.com/anti/modals
//
//********************************************************


Template.finestra_template.events({
	"click #esci": function(e, t) {

    	 AntiModals.dismissAll();
		 console.log('Esci');
  },

    //
    //attiva quiz passando a true il campo value della colletion Allerts 
  	"click #quiz": function(e, t) {
		AntiModals.dismissAll();
    	if (Meteor.userId() != null) {
    	   console.log('Alert Quiz Room: '+Session.get('room_id')+' => value: '+ Alerts.findOne({name: 'quiz', room: Session.get('room_id')}).value );
			   // Se il 'value' è true significa che il quiz è già stato attivato e che co sono ancora player che devono terminarlo
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





























})();
