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
	

// ------------ PLAYERS -------------------------

	
		'insertPlayer': function(user_id, username, x, y, z, color, y_view, fp_view){
			
  			return Players.insert({  	//inserisco nome utente e id nella collection
 	        		nome: username,
    	      		_id: user_id,
    	      		y_view: y_view, //posizione della camera
    	      		fp_view: fp_view,
    	      		x: x,
    	      		y: y,
    	      		z: z,
    	      		color: color,
    	      		quiz: null //attività in corso
        		});
		},
			
		'removePlayer': function(id){
			
  			return Players.remove(id);
  		},
			
			
		'removeAllPlayers': function() {
			return Players.remove({});
		},
		
		
		'setPlayerQuiz': function(id, quiz) {
			console.log('setPlayerQuiz: '+ id + ' = '+ quiz);
			/*
			if (quiz = null) {
				Alerts.update(
						{_id: 'observe'+ quiz},
						{$inc: 
							{
								num_players: -1,
							}
						}
				);
								
			} else {
				Alerts.update(
						{_id: 'observe'+ quiz},
						{$inc: 
							{
								num_players: +1,
							}
						}
				);
			}
			*/
			return Players.update(
    					{ _id: id }, 
    					{ $set: //consente di modificare sono il parametro selezionato 
    						{
    							quiz: quiz, 
    						}
    					}
    				)	
		},
	
//------------- UPLOADS ---------------
	
		'uploadInsert': function(fileInfo){
			console.log(fileInfo);
  			return Uploads.insert(fileInfo);
  		},
	
	
		'deleteFile': function(_id) {
    		check(_id, String);

    		var upload = Uploads.findOne(_id);
    		if (upload == null) {
     	 		throw new Meteor.Error(404, 'Upload not found'); // maybe some other code
    		}

    		UploadServer.delete(upload.path);
    		Uploads.remove(_id);
  		},
  
		
  
  		'clearUpload': function(id){
  			return Uploads.remove(id);
  		},
  
  		'UploadsNumber': function(){
  			return Uploads.find().count();
  		},
  
  		
	
	
	
// ---------------- ALERTS ---------------

		'setAlert': function(id, value){
			console.log('setAlert: '+ id + ' = '+ value);
				return Alerts.update(
    							{ _id: id }, 
    							{ $set: //consente di modificare sono il parametro selezionato 
    								{
    									value: value, 
    								}
    							}
    			);
    		
		},
		
		'insertQuiz': function(id, name){
			Meteor.call('observeQuiz', 'observe'+id);
			return Alerts.insert({
				_id: id,
				name: name,
				
				value: false
			});
		},

		
		'observeQuiz': function(id, name){
			return Alerts.insert({
				_id: id,
				num_players: 0
			});
		},

		
    	
    	'startQuiz': function () {
    			
    					Alerts.update(	
    							{ _id: 'quiz_id' }, 
    							{ $set: //consente di modificare sono il parametro selezionato 
    								{
    									value: true, 
    								}
    							}
    					);
 
  	  	},	
	
	
	
	
	
	
// -------------------- OBJECTS -----------------------------------
	
		'insertObject': function(id, name){
			return Objects.insert({
				_id: id,
				name: name,
				img_path: '/img/quiz.jpg'
			});
		},
		
  		
  		'changeImgLavagna': function(path){
    			
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



//------------------------------------------------------------------------------------------------------------------
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
			Meteor.call('insertQuiz', 'quiz_id', 'quiz');
		
			
		}else{
			Meteor.call('setAlert', 'quiz_id', false );
			console.log("Quiz DEFINITO: nome = " + Alerts.findOne('quiz_id').name + " valore = " +Alerts.findOne('quiz_id').value);
			
		} 
		console.log("Meteor restart ");

    });

}