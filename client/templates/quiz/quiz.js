Template.quiz_template.events({
	"click #esci_quiz": function(e, t) {
		console.log("Update Player.quiz to 'null'...");
    	Players.update(
    					{ _id: Session.get('user_id') }, 
    					{ $set: //consente di modificare sono il parametro selezionato 
    						{
    							quiz: null, 
    						}
    					}
    	)
    	
    	 AntiModals.dismissAll();
  		
  		if (Players.find({quiz: 'quiz' }).count() == 0) {
					console.log("Players.find({quiz: 'quiz' }).count() == "+ Players.find({quiz: 'quiz' }).count());
					console.log("1) Alerts.findOne('quiz_id').value = "+ Alerts.findOne('quiz_id').value);
					console.log("Update Alert.quiz.value to 'false'...");
					
					Alerts.update(
    					{ _id: 'quiz_id' }, 
    					{ $set: //consente di modificare sono il parametro selezionato 
    						{
    							value: false, 
    						}
    					}
    				);
    				console.log("2) Alerts.findOne('quiz_id').value = "+ Alerts.findOne('quiz_id').value);
				}
				
       console.log('Esci_quiz');
  },
  
});
