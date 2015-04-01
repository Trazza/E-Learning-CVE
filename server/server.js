Meteor.publish("objects", function () {
  return Objects.find({});
});

Meteor.publish("uploads", function () {
  return Uploads.find({});
});

Meteor.publish("players", function () {
  return Players.find({});
});

Meteor.publish("alerts", function () {
  return Alerts.find({});
});






if (Meteor.isServer) {
	
	Meteor.methods({
		uploadInsert: function(fileInfo){
			console.log(fileInfo);
  			return Uploads.insert(fileInfo);;
  		},
  		
  		changeImgLavagna: function(path){
    			
    			console.log('set Lavagna img');
    			
    			return Objects.update(
    						{ _id: 'lavagna_id' }, 
    						{ $set: //consente di modificare sono il parametro selezionato 
    							{
    								img_path: path, 
    							}
    						}
    			);
    
    	},

	});

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

	Meteor.startup(function() {
	
	
		// Lavagna
		if (typeof(Objects.findOne('lavagna_id')) == 'undefined'){
			console.log("Lavagna NON definito: "+ Objects.findOne('lavagna_id'));
			Meteor.call('insertObject', 'lavagna_id', 'lavagna');
			
		} else {
			console.log("Oggetto Lavagna DEFINITO: nome = " + Objects.findOne('lavagna_id').name);
		}
		
	
	
	
		if (typeof(Alerts.findOne('quiz_id')) == 'undefined'){
			console.log("Quiz NON definito: "+ Alerts.findOne('quiz_id'));
			Meteor.call('insertQuiz');
			
		}else{
			Meteor.call('setQuiz');
			console.log("Quiz DEFINITO: nome = " + Alerts.findOne('quiz_id').name + " valore = " +Alerts.findOne('quiz_id').value);
			
		} 
		console.log("Meteor restart ");

    });

}