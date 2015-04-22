Template.quiz_template.events({
	"click #esci_quiz": function(e, t) {
		if (Players.find({activity: 'quiz', room: Session.get('room_id')}).count() == 1) {
					
					
					Meteor.call('setActivity', 'quiz', Session.get('room_id'), false);
					
    				
		}
		
		Meteor.call('setPlayerActivity', Session.get('user_id'),  null );
		
    	console.log('Numero players con quiz = '+ Players.find({activity: 'quiz', room: Session.get('room_id')}).count());
    	AntiModals.dismissAll();
  		
  		
				
       	console.log('Esci da quiz');
  },
  
});
