
if (Meteor.isClient) {	
	Meteor.methods({
	
		
	
  		all_players_color: function (id, color) {
  			console.log(id+' '+color);
  			document.getElementById(id+'__Legs').setAttribute('diffuseColor', color);
  		},
	
	
		finestra: function () {
				AntiModals.overlay('finestra_template', {
    	  					modal: true,
    	  				});
				console.log("Click lavagna da "+ Session.get('user_id'));
			
    	},
    	
    	set_lavagna_img: function(path){
    			
    			console.log('set Lavagna img');
    			
    			return Objects.update(
    						{ _id: 'lavagna_id' }, 
    						{ $set: //consente di modificare sono il parametro selezionato 
    							{
    								path: path, 
    							}
    						}
    			);
    
    	},
    
    
    	set_quiz: function(){
    			
    			console.log('set Quiz');
    			
    			return Alerts.update(
    						{ _id: 'quiz_id' }, 
    						{ $set: //consente di modificare sono il parametro selezionato 
    							{
    								value: true, 
    							}
    						}
    			);
    
    	},
    
    	start_quiz: function () {
    			if (Session.get("mode") != "login") {
				if (Alerts.findOne({name: 'quiz'}).value == false ) {	
	    			console.log("1) Start_quiz: Alerts.findOne(quiz_id).value = "+ Alerts.findOne('quiz_id').value);
	    			console.log("Update Alert.quiz.value to 'true'...");	
    				Alerts.update(	
    							{ _id: 'quiz_id' }, 
    							{ $set: //consente di modificare sono il parametro selezionato 
    								{
    									value: true, 
    								}
    							}
    				);

  					console.log("2) Start_quiz: Alerts.findOne(quiz_id).value = "+ Alerts.findOne('quiz_id').value);
  				}
  			}else{
  				alert("ti devi loggare");
  			};
    
  	  }
	})
}


	
if (Meteor.isServer) {
	Meteor.methods({
		// Uploads methods
		
		
		
		'deleteFile': function(_id) {
    		check(_id, String);

    		var upload = Uploads.findOne(_id);
    		if (upload == null) {
     	 		throw new Meteor.Error(404, 'Upload not found'); // maybe some other code
    		}

    		UploadServer.delete(upload.path);
    		Uploads.remove(_id);
  		},
  
		'clearItems': function(id){
  			return Items.remove(id);
  		},
  
  		'clearUpload': function(id){
  			return Uploads.remove(id);
  		},
  
  		'UploadsNumber': function(){
  			return Uploads.find().count();
  		},
  
  		'ItemsNumber': function(){
  			return Items.find().count();
  		},
		
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
		insertObject: function(id, name){
			Objects.insert({
				_id: id,
				name: name,
				path: null
			});
		},
		
		setQuiz: function(){
			Alerts.update(
    						{ _id: 'quiz_id' }, 
    						{ $set: //consente di modificare sono il parametro selezionato 
    							{
    								value: false, 
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
  		
  		start_quiz: function () {
  			
  		},
  		
  		finestra: function () {
			//console.log("Server quiz da: " + user_id);
			
    	},
	})
}

