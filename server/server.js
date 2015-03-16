


/*
var num_players_quiz = Players.find({quiz: 'quiz' }).count();
var handle_quiz_server = num_players_quiz.observeChanges({
	if (Players.find({quiz: 'quiz' }).count() == 0) {
		Alerts.update(
    					{ _id: 'quiz_id' }, 
    					{ $set: //consente di modificare sono il parametro selezionato 
    						{
    							value: false, 
    						}
    					}
    				)
	}
});

*/

if (Meteor.isServer) {

	Meteor.methods({
	
		
		setupQuiz: function (user_id) {
			console.log("Server quiz da: " + user_id);
			return Players.update(
    					{ _id: user_id}, 
    					{ $set: //consente di modificare sono il parametro selezionato 
    						{
    							quiz: 'quiz', 
    						}
    					}
    	);
    	},
		
		
		
		insertQuiz: function(){
			Alerts.insert({
				_id: "quiz_id",
				name: "quiz",
				value: false
			});
		},

		removeAllPlayers: function() {
			return Players.remove({});
		},

		all_players_color: function (id, color) {
  			
  		},
	
		quiz: function () {
    		
    	}
    });


	Meteor.startup(function() {
		if (typeof(Alerts.findOne('quiz_id')) == 'undefined'){
			console.log("Quiz NON definito: "+ Alerts.findOne('quiz_id'));
			Meteor.call('insertQuiz');
			
		}else{
			console.log("Quiz DEFINITO: nome = " + Alerts.findOne('quiz_id').name + " valore = " +Alerts.findOne('quiz_id').value);
		} 
		console.log("Meteor restart ");

    });

}