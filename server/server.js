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
	
	
		'xmlLoad': function(xml_path){
				console.log('load XML');
    	
    			//$(document).ready(function() {
 
					$.ajax({ type: "GET", url: xml_path, dataType: "xml",
     
    					success: function(xml) {

    						$(xml).find('project').each(function() {   				
    				
	        					var user = $(this).find('user').text();
    	    					console.log('user: '+user);
        				
     		   					var userId = $(this).find('userId').text();
     		   					console.log('userId: '+userId);
     					
    					
         						var sessionId = $(this).find('sessionId').text();
         						console.log('room: '+sessionId);
         				
         						var password = $(this).find('password').text();
         						console.log('pass: '+password);
      					
       						
      							$(this).find('scene').each(function() {
        							var title = $(this).find('title').text();
        							var description = $(this).find('description').text();
        							var stage = $(this).find('stage').text();
        							console.log('title: '+title);
        							console.log('description: '+description);
        							console.log('stage: '+stage);
      							});
      						});   
    					},
    					error: function(request, error, tipo_errore) { alert(error+': '+ tipo_errore); }
  					});
				//});
		  		
  		},	
		
	
		'prova': function(){
			//console.log(Meteor.user().services.google.name);
			Meteor.log.info('prova logfile');
  			return;
  		},	
		
		'reset': function(){
			Meteor.call('removeAllPlayers');
			Meteor.call('removeAllObjects');
			Meteor.call('removeAllAlerts');
			Meteor.call('removeAllRooms');
  			return;
  		},	
  		
  		
  		'insertLog': function(){
  			//var fs = require('fs');
			var LOG_PATH = '/logFile.txt';
  			//fs.writeFileSync(LOG_PATH, "Prova log!");
			console.log(LOG_PATH);
			
			var fso = new ActiveXObject("Scripting.FileSystemObject");
    		var fh = fso.OpenTextFile("/logFile.txt", 8, false, 0);
    		fh.WriteLine('Prova LOG');
    		fh.Close();
    	},

   

// ------------ PLAYERS -------------------------

	
		'insertPlayer': function(room_id, x, y, z, color, y_view, fp_view){
		
			console.log('nome: '+ Meteor.user().services.google.name);
			console.log('_id: '+Meteor.userId());
			
  			return Players.insert({  	//inserisco nome utente e id nella collection
  					room: room_id,
 	        		nome: Meteor.user().services.google.name,
    	      		_id: Meteor.userId(),
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
	
	
		//numero dei modi virtuali cariati (numero di file xml)

		
	
		//caricamento dei mondi virtuali (attualmente solo 1)
		//var xml_path = 'xml/config.xml';
		//Meteor.call('xmlLoad', xml_path); // Caricamento del mondo virtuale dall'XML
		
	
	
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
  //------------------------------------------------------------------------------------------------------------------


} //end 'Meteor.isServer'













