//************************************* Quiz ***********************
// 	Quando il player finisce il quiz viene settato il campo activity del Players a null
//
//	Prima di uscire viene effettuato un controllo su quanti players devono ancora concludere il quiz
// 	se ne risulta solo uno (se setesso) viene passato il campo value della collezione Alerts riferita al quiz a false 
//**************************************************************************

Template.quiz_template.events({
	"click #esci_quiz": function(e, t) {
		var player = Players.findOne(Meteor.userId());
		if (Players.find({activityType: 'quiz', room: player.room}).count() == 1) {
			Meteor.call('setActivity', player.room, player.activityName, 'quiz', false);			
		}
		
		Meteor.call('setPlayerActivity', null,  null );
		
    	console.log('Numero players con quiz = '+ Players.find({activityType: 'quiz', room: player.room }).count());
    	AntiModals.dismissAll();
  		
  		
				
       	console.log('Esci da quiz');
  },
  
});
