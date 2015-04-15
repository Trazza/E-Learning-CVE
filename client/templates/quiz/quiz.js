Template.quiz_template.events({
	"click #esci_quiz": function(e, t) {
		if (Players.find({quiz: 'quiz_id'}).count() == 1) {
					
					
					Meteor.call('setAlert', 'quiz_id', false);
					
    				
		}
		
		Meteor.call('setPlayerQuiz', Session.get('user_id'), null );
		/*
    	Players.update(
    					{ _id: Session.get('user_id') }, 
    					{ $set: //consente di modificare sono il parametro selezionato 
    						{
    							quiz: null, 
    						}
    					}
    	)
    	*/
    	console.log('Numero players con quiz = '+ Players.find({quiz: 'quiz' }).count());
    	 AntiModals.dismissAll();
  		
  		
				
       console.log('Esci_quiz');
  },
  
});
