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

Meteor.publish("rooms", function () {
  return Rooms.find({});
});




if (Meteor.isServer) {
	
	Meteor.methods({
		
		'reset': function(){
			Meteor.call('removeAllPlayers');
			Meteor.call('removeAllObjects');
			Meteor.call('removeAllAlerts');
			Meteor.call('removeAllRooms');
  			return;
  		},	


// ------------ PLAYERS -------------------------

	
		'insertPlayer': function(room_id, user_id, username, x, y, z, color, y_view, fp_view){
			
  			return Players.insert({  	//inserisco nome utente e id nella collection
  					room: room_id,
 	        		nome: username,
    	      		_id: user_id,
    	      		y_view: y_view, //posizione della camera
    	      		fp_view: fp_view,
    	      		x: x,
    	      		y: y,
    	      		z: z,
    	      		color: color,
    	      		activity: null //attività in corso
        		});
		},
			
		'removePlayer': function(id){
			
  			return Players.remove(id);
  		},
			
			
		'removeAllPlayers': function() {
			return Players.remove({});
		},
		
		//
		'setPlayerActivity': function(id, activity) {
			console.log('setPlayerActivity: '+ id + ' = '+ activity);
			return Players.update(
    					{ _id: id }, 
    					{ $set: //consente di modificare sono il parametro selezionato 
    						{
    							activity: activity, 
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

		'setActivity': function(name, room, value){
			console.log('setActivity: '+ name + ' = '+ value);
				return Alerts.update(
    							{ name: name, room: room }, 
    							{ $set: //consente di modificare sono il parametro selezionato 
    								{
    									value: value, 
    								}
    							}
    			);
    		
		},
		
		'insertActivity': function(name, room){
			
			return Alerts.insert({
					room: room,
					name: name,
					value: false
				});
		},

		
		'removeAllAlerts': function() {
			return Alerts.remove({});
		},
	
	
	
	
// -------------------- OBJECTS -----------------------------------
	
		
	
		'insertObject': function(name, room){

				return Objects.insert({
					room: room,
					name: name,
					img_path: '/default_img/quiz.jpg'
				});
				
		},
		
  		
  		'changeImgLavagna': function(room, path){
    			
    			console.log('set Lavagna img');
    			
    			return Objects.update(
    						{ name: 'lavagna', room: room}, 
    						{ $set: //consente di modificare sono il parametro selezionato 
    							{
    								img_path: path, 
    							}
    						}
    			);
    
    	},
    	
    	'removeAllObjects': function() {
			return Objects.remove({});
		},
    	
// ---------------------- ROOMS ---------------------------------
	
		'insertRoom': function(id, name){
			return Rooms.insert({
				_id: id,
				name: name
				
			}); 
		},
    	
    	'removeAllRooms': function() {
			return Rooms.remove({});
		}



	}); // fine methods
	
	
	




//------------------------------------------------------------------------------------------------------------------
	Meteor.startup(function() {
	
		//Per ogni stanza si verifica che siano presenti tutti gli oggetti associati
		
		var stanze = Rooms.find({});
		stanze.forEach(function (room) {
			console.log('verifico oggetti e attivita: stanza "'+room.name+'"');
		
			// Lavagna (object)
			if (typeof(Objects.findOne({name:'lavagna', room: room._id })) == 'undefined'){
				console.log("Lavagna NON definito: room = "+ room._id);
				Meteor.call('insertObject', 'lavagna', room.id);
			
			} else {
				console.log("Oggetto Lavagna DEFINITO:  room = "+ room._id);
			}
		
	
	
			// Quiz (activity)
			if (typeof(Alerts.findOne({name: 'quiz', room: room._id})) == 'undefined'){
				console.log("Quiz NON definito: room = "+ room._id);
				Meteor.call('insertActivity', 'quiz', room.id);

			}else{
				Meteor.call('setActivity', 'quiz', room._id, false );
				console.log("Quiz DEFINITO: room = "+ room._id);
			
			} 
			
			
			
		});






    }); //end 'Meteor.startup'  

} //end 'Meteor.isServer'













