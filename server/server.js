Meteor.publish("players", function () {
  return Players.find({});
});

Meteor.publish("alerts", function () {
  return Alerts.find({});
});





if (Meteor.isServer) {
/*
var on_players_quiz = Players.find({});


var handle_quiz_server = on_players_quiz.observeChanges({
	removed: function () {
			console.log(Players.find({quiz: 'quiz' }).count() + " stanno eseguendo il quiz");
			},
	added: function (id, user) {
			console.log(Players.find({quiz: 'quiz' }).count() + " stanno eseguendo il quiz");
			}
		

	
});


*/



	Meteor.methods({
		
		
		/*
	
		startQuiz: function (userId){
			console.log("startQuiz --> " + userId);
			return Players.update(
    					{ _id: userId}, 
    					{ $set: //consente di modificare sono il parametro selezionato 
    						{
    							quiz: 'quiz', 
    						}
    					}
    				);
			},
		*/
		quiz: function () {
			//console.log("Server quiz da: " + user_id);
			/*
			
    				*/
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