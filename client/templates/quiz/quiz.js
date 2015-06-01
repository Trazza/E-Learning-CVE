//************************************* Quiz ***********************
// 	Quando il player finisce il quiz viene settato il campo activity del Players a null
//
//	Prima di uscire viene effettuato un controllo su quanti players devono ancora concludere il quiz
// 	se ne risulta solo uno (se setesso) viene passato il campo value della collezione Alerts riferita al quiz a false 
//**************************************************************************

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
